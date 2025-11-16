// src/context/AuthContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import axios from '../lib/axios';
import { isAxiosError } from 'axios';

// --- TIPE DATA UTAMA ---

// Tipe Wilayah
interface Province { id: string; name: string; }
interface Regency { id: string; name: string; }

// Tipe Role dan Jenis DLH
interface Role { id: number; name: string; }
interface JenisDlh { id: number; name: string; } // <-- Tipe ini dibutuhkan

// Tipe User
export interface User {
  id: number;
  name: string;
  email: string;
  role_id: number;
  jenis_dlh_id?: number;
  role: Role;
  jenis_dlh?: JenisDlh; // (Relasi ini bisa jadi null dari backend)
  nomor_telepon?: string;
  province_id?: string;
  regency_id?: string;
  province_name?: string;
  regency_name?: string;
  pesisir?: string;
}

// Tipe Data untuk Login
interface LoginCredentials {
  email: string;
  password: string;
  role_id: string | null;
  jenis_dlh_id: string | null;
}

// Tipe Data untuk Register
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

// Tipe Context (SATU deklarasi)
interface AuthContextType {
  user: User | null;
  loading: boolean;
  provinces: Province[];
  regencies: Regency[];
  jenisDlhs: JenisDlh[]; // <-- 1. TAMBAHKAN JENIS DLH DI SINI
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

// 2. Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [regencies, setRegencies] = useState<Regency[]>([]);
  const [jenisDlhs, setJenisDlhs] = useState<JenisDlh[]>([]); // <-- 2. TAMBAHKAN STATE-NYA

  const fetchUser = async () => {
    try {
      const res = await axios.get('/api/user');
      setUser(res.data);
      return res.data;
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        if (error.response?.status !== 401) {
          console.error("Error fetching user:", error.message);
        }
      } else {
        console.error("An unexpected error occurred:", error);
      }
      setUser(null);
      return null;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      await fetchUser(); // Cek login

      // Fetch semua data pendukung secara paralel
      const fetchProvinces = axios.get('/api/provinces').then(res => setProvinces(res.data));
      const fetchRegencies = axios.get('/api/regencies/all').then(res => setRegencies(res.data));
      // 3. TAMBAHKAN FETCH JENIS DLH
      const fetchJenisDlhs = axios.get('/api/jenis-dlh').then(res => setJenisDlhs(res.data));

      try {
        // Tunggu semua selesai
        await Promise.all([fetchProvinces, fetchRegencies, fetchJenisDlhs]);
      } catch (err) {
        console.error("Error fetching initial data:", err);
      }

      setLoading(false); // Selesai loading
    };

    initAuth();
  }, []); // '[]' = Jalankan sekali

  const register = async (data: RegisterData) => {
    try {
      await axios.get('/sanctum/csrf-cookie');
      await axios.post('/api/register', data);
      await login({ 
        email: data.email, 
        password: data.password,
        role_id: String(data.role_id), 
        jenis_dlh_id: String(data.jenis_dlh_id) 
      });
    } catch (error) {
      console.error("Register failed:", error);
      throw error;
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      await axios.get('/sanctum/csrf-cookie');
      const payload = {
        email: credentials.email,
        password: credentials.password,
        role_id: credentials.role_id ? Number(credentials.role_id) : null,
        jenis_dlh_id: credentials.jenis_dlh_id ? Number(credentials.jenis_dlh_id) : null,
      };
      await axios.post('/api/login', payload);

      const loggedInUser = await fetchUser();
      
      if (loggedInUser && loggedInUser.role && loggedInUser.role.name) {
        const roleName = loggedInUser.role.name.toLowerCase();
        if (roleName === 'admin') router.push('/admin-dashboard');
        else if (roleName === 'pusdatin') router.push('/pusdatin-dashboard');
        else if (roleName === 'dlh') router.push('/dlh-dashboard');
        else router.push('/');
      } else {
        console.error("Login sukses tapi data user atau role tidak lengkap:", loggedInUser);
        await logout();
        throw new Error("Data pengguna tidak lengkap setelah login.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.get('/sanctum/csrf-cookie');
      await axios.post('/api/logout');
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error("Logout failed:", error);
      if (isAxiosError(error)) console.error("Detail error logout:", error.response?.data);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Memuat...
      </div>
    );
  }

  // 4. KIRIM 'jenisDlhs' KE PROVIDER
  return (
    <AuthContext.Provider value={{ user, loading, provinces, regencies, jenisDlhs, login, register, logout }}> 
      {children}
    </AuthContext.Provider>
  );
};

// 4. Hook kustom
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContext');
  }
  return context;
};