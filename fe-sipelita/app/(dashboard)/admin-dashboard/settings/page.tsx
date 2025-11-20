'use client';

import { useState, useEffect } from 'react';
import { User } from '@/context/AuthContext'; 
import StatCard from '@/components/StatCard'; 
import UserTable from '@/components/UserTable'; 
import Pagination from '@/components/Pagination'; 
import Link from 'next/link';
import axios from '@/lib/axios';
import { HiPlus } from 'react-icons/hi'; // Ikon tambah
import { FiSearch } from 'react-icons/fi'; // Ikon search

const USERS_PER_PAGE = 10;

// 🎨 Warna khusus untuk Pusdatin (Hijau)
const pusdatinColor = { 
  bg: 'bg-green-50', 
  border: 'border-green-300', 
  titleColor: 'text-green-600', 
  valueColor: 'text-green-800' 
};

export default function SettingsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [allPusdatinUsers, setAllPusdatinUsers] = useState<User[]>([]); 
  const [filteredPusdatinUsers, setFilteredPusdatinUsers] = useState<User[]>([]); 
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); 

  const [stats, setStats] = useState({
    pusdatin: 0, 
  });

  // --- Fetch Data ---
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // Kita menggunakan endpoint users/aktif yang sudah ada
        // Backend akan mengembalikan semua user aktif, lalu kita filter di client
        const res = await axios.get('/api/admin/users/aktif');
        const data: User[] = res.data;

        // Filter: Ambil hanya yang role-nya 'Pusdatin'
        const pusdatinUsers = data.filter(
          (u: User) => u.role?.name === 'Pusdatin'
        );

        setAllPusdatinUsers(pusdatinUsers);
        setFilteredPusdatinUsers(pusdatinUsers); // Init filtered
        setStats({
          pusdatin: pusdatinUsers.length,
        });
      } catch (e) {
        console.error('Gagal mengambil data user Pusdatin:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // --- Logic Search ---
  useEffect(() => {
    const lowerTerm = searchTerm.toLowerCase();
    const filtered = allPusdatinUsers.filter(user =>
      user.name.toLowerCase().includes(lowerTerm) ||
      user.email.toLowerCase().includes(lowerTerm)
    );
    setFilteredPusdatinUsers(filtered);
    setCurrentPage(1); // Reset ke halaman 1 jika hasil search berubah
  }, [searchTerm, allPusdatinUsers]);

  // --- Pagination ---
  const totalPages = Math.ceil(filteredPusdatinUsers.length / USERS_PER_PAGE);

  const paginatedUsers = () => {
    const start = (currentPage - 1) * USERS_PER_PAGE;
    return filteredPusdatinUsers.slice(start, start + USERS_PER_PAGE);
  };

  if (loading) {
    return (
      <div className="p-8 space-y-8">
        <h1 className="text-3xl font-extrabold text-green-800">Memuat Data...</h1>
        <div className="h-64 bg-gray-100 animate-pulse rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-extrabold text-green-800">Pengaturan Pusdatin</h1>
        <p className="text-gray-600">Kelola akun pengguna khusus tim Pusdatin.</p>
      </header>

      {/* Statistik (Single Card untuk Pusdatin) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="h-full">
          <StatCard
            bgColor={pusdatinColor.bg}
            borderColor={pusdatinColor.border}
            titleColor={pusdatinColor.titleColor}
            valueColor={pusdatinColor.valueColor}
            title="Total Akun Pusdatin"
            value={stats.pusdatin.toString()}
          />
        </div>
      </div>

      {/* Search & Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Cari nama atau email Pusdatin..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tombol Buat Akun */}
        <Link
          href="/admin-dashboard/settings/add"
          className="flex items-center justify-center gap-2 px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm hover:shadow"
        >
          <HiPlus className="text-xl" />
          Buat Akun Pusdatin
        </Link>
      </div>

      {/* Tabel User */}
      <UserTable
        users={paginatedUsers().map((u) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          role: 'Pusdatin', // Kita hardcode tampilan role agar rapi
          jenis_dlh: '-',   // Pusdatin tidak punya jenis DLH
          status: 'aktif',
          province: '-',
          regency: '-',
        }))}
        showLocation={false} // Sembunyikan kolom lokasi
        showDlhSpecificColumns={false} 
        // onApprove/onReject tidak perlu karena ini halaman manajemen akun aktif
      />

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <span className="text-sm text-gray-600">
          Menampilkan {paginatedUsers().length} dari {filteredPusdatinUsers.length} pengguna
        </span>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          siblings={1}
        />
      </div>
    </div>
  );
}