'use client';

// ... impor lainnya
import { useState, useEffect } from 'react';
import { useAuth, User } from '@/context/AuthContext';
import StatCard from '@/components/StatCard';
import InnerNav from '@/components/InnerNav';
import UserTable from '@/components/UserTable';
import axios from '@/lib/axios';

const USERS_PER_PAGE = 25;

export default function UsersAktifPage() {
  // ✅ Tambahkan state untuk pagination
  const [currentPage, setCurrentPage] = useState(1);
  const { provinces, regencies } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // State untuk tab
  const [activeTab, setActiveTab] = useState('dlh');
  const [activeDlhTab, setActiveDlhTab] = useState('provinsi');

  // Statistik
  const [stats, setStats] = useState({
    dlhProvinsi: 0,
    dlhKabKota: 0,
    pusdatin: 0,
    admin: 0,
  });

  // Fetch data dari API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/admin/users/aktif');
        const data: User[] = res.data;

        const dlhProvinsi = data.filter(
          (u: User) => u.role?.name === 'DLH' && u.jenisDlh?.name === 'DLH Provinsi'
        );
        const dlhKabKota = data.filter(
          (u: User) => u.role?.name === 'DLH' && u.jenisDlh?.name === 'DLH Kab-Kota'
        );
        const pusdatin = data.filter((u: User) => u.role?.name === 'Pusdatin');
        const admin = data.filter((u: User) => u.role?.name === 'Admin');

        setUsers(data);
        setStats({
          dlhProvinsi: dlhProvinsi.length,
          dlhKabKota: dlhKabKota.length,
          pusdatin: pusdatin.length,
          admin: admin.length,
        });
      } catch (error) {
        console.error('Gagal mengambil data user aktif:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // ✅ Filter user berdasarkan tab aktif
  const filteredUsers = () => {
    if (activeTab === 'dlh') {
      return activeDlhTab === 'provinsi'
        ? users.filter((u) => u.jenisDlh?.name === 'DLH Provinsi')
        : users.filter((u) => u.jenisDlh?.name === 'DLH Kab-Kota');
    } else if (activeTab === 'pusdatin') {
      return users.filter((u) => u.role?.name === 'Pusdatin');
    } else if (activeTab === 'admin') {
      return users.filter((u) => u.role?.name === 'Admin');
    }
    return [];
  };

  // ✅ Pagination Logic
  const paginatedUsers = () => {
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const endIndex = startIndex + USERS_PER_PAGE;
    return filteredUsers().slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredUsers().length / USERS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const dlhTabs = [
    { label: 'Provinsi', value: 'provinsi' },
    { label: 'Kab/Kota', value: 'kabkota' },
  ];

  const mainTabs = [
    { label: 'DLH', value: 'dlh' },
    { label: 'Pusdatin', value: 'pusdatin' },
    { label: 'Admin', value: 'admin' },
  ];

  if (loading) {
    return (
      <div className="space-y-8 p-8">
        <h1 className="text-3xl font-extrabold text-gray-800">Memuat Data...</h1>
        <div className="h-64 bg-gray-100 rounded-xl animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-extrabold text-gray-800">Manajemen Pengguna Aktif</h1>
        <p className="text-gray-600">Daftar pengguna yang telah diverifikasi dan aktif di sistem.</p>
      </header>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total DLH Provinsi Aktif"
          value={stats.dlhProvinsi}
          bgColor="bg-white"
          borderColor="border-gray-200"
          titleColor="text-gray-700"
          valueColor="text-blue-600"
        />
        <StatCard
          title="Total DLH Kab/Kota Aktif"
          value={stats.dlhKabKota}
          bgColor="bg-white"
          borderColor="border-gray-200"
          titleColor="text-gray-700"
          valueColor="text-blue-600"
        />
        <StatCard
          title="Total Pusdatin Aktif"
          value={stats.pusdatin}
          bgColor="bg-white"
          borderColor="border-gray-200"
          titleColor="text-gray-700"
          valueColor="text-green-600"
        />
        <StatCard
          title="Total Admin Aktif"
          value={stats.admin}
          bgColor="bg-white"
          borderColor="border-gray-200"
          titleColor="text-gray-700"
          valueColor="text-red-600"
        />
      </div>

      {/* Inner Nav Utama */}
      <InnerNav tabs={mainTabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Inner Nav DLH (hanya muncul jika tab DLH aktif) */}
      {activeTab === 'dlh' && (
        <InnerNav
          tabs={dlhTabs}
          activeTab={activeDlhTab}
          onChange={setActiveDlhTab}
          className="mt-0"
        />
      )}

      {/* Tabel User */}
      <UserTable
        users={paginatedUsers().map(u => {
          const provinceName = provinces.find(p => p.id === u.province_id)?.name ?? null;
          const regencyName = regencies.find(r => r.id === u.regency_id)?.name ?? null;

          return {
            id: u.id,
            name: u.name,
            email: u.email,
            role: u.role?.name ?? '-',
            jenis_dlh: u.jenisDlh?.name,
            status: 'aktif',
            province: provinceName,
            regency: regencyName,
          };
        })}
        showLocation={activeTab === 'dlh'}
      />

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Sebelumnya
        </button>

        <span className="text-gray-700">
          Halaman {currentPage} dari {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Selanjutnya
        </button>
      </div>
    </div>
  );
}