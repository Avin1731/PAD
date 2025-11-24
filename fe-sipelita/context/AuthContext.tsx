"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import axios from '../lib/axios';
import { isAxiosError } from 'axios';

// --- TIPE DATA UTAMA ---
interface Province { id: string; name: string; }
interface Regency { id: string; name: string; }
interface Role { id: number; name: string; }
interface JenisDlh { id: number; name: string; }

export interface User {
  id: number;
  name: string;
  email: string;
  role_id: number;
  jenis_dlh_id?: number;
  role: Role;
  jenis_dlh?: JenisDlh;
  nomor_telepon?: string;
  province_id?: string;
  regency_id?: string;
  province_name?: string;
  regency_name?: string;
  pesisir?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
  role_id: string | null;
  jenis_dlh_id: string | null;
}

interface RegisterData {
  name: string;
  email: string;
  nomor_telepon: string;
  password: string;
  password_confirmation: string;
  role_id: number;
  jenis_dlh_id: number;
  province_id: string;
  regency_id?: string;
  pesisir: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  provinces: Province[];
  regencies: Regency[];
  jenisDlhs: JenisDlh[];
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- MOCK DATA FALLBACK (Hanya untuk Dropdown Wilayah) ---
const MOCK_PROVINCES: Province[] = [
  { id: '1', name: 'Jawa Barat' },
  { id: '2', name: 'Jawa Tengah' },
  { id: '3', name: 'Jawa Timur' },
  { id: '4', name: 'DI Yogyakarta' },
];

const MOCK_REGENCIES: Regency[] = [
  { id: '1', name: 'Kota Bandung' },
  { id: '2', name: 'Kota Semarang' },
  { id: '3', name: 'Kota Surabaya' },
  { id: '4', name: 'Kota Yogyakarta' },
];

const MOCK_JENIS_DLHS: JenisDlh[] = [
  { id: 1, name: 'Kabupaten/Kota Kecil' },
  { id: 2, name: 'Kabupaten/Kota Sedang' },
  { id: 3, name: 'Kabupaten/Kota Besar' },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [regencies, setRegencies] = useState<Regency[]>([]);
  const [jenisDlhs, setJenisDlhs] = useState<JenisDlh[]>([]);

  // --- FUNGSI FETCH USER YANG DIPERBAIKI ---
  const fetchUser = async (): Promise<User | null> => {
    try {
      const res = await axios.get<User>('/api/user');
      setUser(res.data);
      return res.data;
    } catch (error: unknown) {
      // Jika error (misal 401 Unauthorized), kita anggap user sebagai Tamu (Guest).
      // JANGAN melakukan auto-login Mock User di sini agar header Admin tidak bocor.
      if (isAxiosError(error) && error.response?.status !== 401) {
        console.error("Error fetching user:", error.message);
      }
      
      setUser(null);
      return null;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        // 1. Inisialisasi CSRF Protection
        await axios.get('/sanctum/csrf-cookie');
        
        // 2. Cek status login pengguna saat ini
        await fetchUser();

        // 3. Ambil data dropdown (Wilayah & Jenis DLH) secara paralel
        const [provincesResult, regenciesResult, jenisDlhsResult] = await Promise.allSettled([
          axios.get<Province[]>('/api/wilayah/provinces').then(res => setProvinces(res.data)),
          axios.get<Regency[]>('/api/wilayah/regencies/all').then(res => setRegencies(res.data)),
          axios.get<JenisDlh[]>('/api/jenis-dlh').then(res => setJenisDlhs(res.data)),
        ]);

        // 4. Gunakan Mock Data HANYA untuk dropdown jika API gagal (Mode Development)
        if (process.env.NODE_ENV === 'development') {
          if (provincesResult.status === 'rejected') {
            console.warn('Using Mock Provinces');
            setProvinces(MOCK_PROVINCES);
          }
          if (regenciesResult.status === 'rejected') {
            console.warn('Using Mock Regencies');
            setRegencies(MOCK_REGENCIES);
          }
          if (jenisDlhsResult.status === 'rejected') {
            console.warn('Using Mock Jenis DLH');
            setJenisDlhs(MOCK_JENIS_DLHS);
          }
        }

      } catch (error: unknown) {
        console.error("Error during auth initialization:", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const register = async (data: RegisterData): Promise<void> => {
    try {
      await axios.get('/sanctum/csrf-cookie');
      await axios.post('/api/auth/register', data);
      
      // Login otomatis setelah register berhasil
      await login({ 
        email: data.email, 
        password: data.password,
        role_id: String(data.role_id), 
        jenis_dlh_id: String(data.jenis_dlh_id) 
      });
    } catch (error: unknown) {
      console.error("Register failed:", error);
      throw error;
    }
  };

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      await axios.get('/sanctum/csrf-cookie');
      
      const payload = {
        email: credentials.email,
        password: credentials.password,
        role_id: credentials.role_id ? Number(credentials.role_id) : null,
        jenis_dlh_id: credentials.jenis_dlh_id ? Number(credentials.jenis_dlh_id) : null,
      };
      
      await axios.post('/api/auth/login', payload);

      // Ambil data user terbaru dari server untuk memastikan role valid
      const loggedInUser = await fetchUser();
      
      if (loggedInUser && loggedInUser.role && loggedInUser.role.name) {
        const roleName = loggedInUser.role.name.toLowerCase();
        if (roleName === 'admin') router.push('/admin-dashboard');
        else if (roleName === 'pusdatin') router.push('/pusdatin-dashboard');
        else if (roleName === 'dlh') router.push('/dlh-dashboard');
        else router.push('/');
      } else {
        console.error("Login API sukses, tetapi gagal mengambil profil user.");
        await logout(); // Logout paksa untuk keamanan jika data korup
        throw new Error("Gagal mengambil data profil pengguna.");
      }
    } catch (error: unknown) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await axios.get('/sanctum/csrf-cookie');
      await axios.post('/api/auth/logout');
    } catch (error: unknown) {
      console.error("Logout error (ignoring):", error);
    } finally {
      // Selalu bersihkan state user di client side, apa pun hasil API-nya
      setUser(null);
      router.push('/');
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        <span className="ml-2">Memuat...</span>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, provinces, regencies, jenisDlhs, login, register, logout }}> 
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContext');
  }
  return context;
};