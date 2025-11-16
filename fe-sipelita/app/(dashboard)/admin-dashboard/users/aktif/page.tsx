'use client';

import { useState, useEffect } from 'react';
import { User } from '@/context/AuthContext';
import StatCard from '@/components/StatCard';
import InnerNav from '@/components/InnerNav';
import UserTable from '@/components/UserTable';
import Pagination from '@/components/Pagination';
import Link from 'next/link';
import axios from '@/lib/axios';

const USERS_PER_PAGE = 25;

// 🎨 Warna per-card
const statCardColors = [
  { bg: 'bg-blue-50', border: 'border-blue-300', titleColor: 'text-blue-600', valueColor: 'text-blue-800' },
  { bg: 'bg-blue-50', border: 'border-blue-300', titleColor: 'text-blue-600', valueColor: 'text-blue-800' },
  { bg: 'bg-green-50', border: 'border-green-300', titleColor: 'text-green-600', valueColor: 'text-green-800' },
  { bg: 'bg-red-50', border: 'border-red-300', titleColor: 'text-red-600', valueColor: 'text-red-800' },
];

export default function UsersAktifPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Tab state
  const [activeTab, setActiveTab] = useState('dlh');
  const [activeDlhTab, setActiveDlhTab] = useState('provinsi');

  const [stats, setStats] = useState({
    dlhProvinsi: 0,
    dlhKabKota: 0,
    pusdatin: 0,
    admin: 0,
  });

  // --- Fetch ---
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/admin/users/aktif');
        const data: User[] = res.data;

        const dlhProvinsi = data.filter(
          (u: User) => u.role?.name === 'DLH' && u.jenis_dlh?.name === 'DLH Provinsi'
        );
        const dlhKabKota = data.filter(
          (u: User) => u.role?.name === 'DLH' && u.jenis_dlh?.name === 'DLH Kab-Kota'
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
      } catch (e) {
        console.error('Gagal mengambil data user aktif:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // --- Filter berdasarkan Tab ---
  const filteredUsers = () => {
    if (activeTab === 'dlh') {
      return activeDlhTab === 'provinsi'
        ? users.filter((u) => u.jenis_dlh?.name === 'DLH Provinsi')
        : users.filter((u) => u.jenis_dlh?.name === 'DLH Kab-Kota');
    }
    if (activeTab === 'pusdatin') return users.filter((u) => u.role?.name === 'Pusdatin');
    if (activeTab === 'admin') return users.filter((u) => u.role?.name === 'Admin');
    return [];
  };

  // --- Pagination ---
  const totalPages = Math.ceil(filteredUsers().length / USERS_PER_PAGE);

  const paginatedUsers = () => {
    const start = (currentPage - 1) * USERS_PER_PAGE;
    return filteredUsers().slice(start, start + USERS_PER_PAGE);
  };

  // Reset page ketika tab berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, activeDlhTab]);

  // Tabs
  const dlhTabs = [
    { label: 'Provinsi', value: 'provinsi' },
    { label: 'Kab/Kota', value: 'kabkota' },
  ];

  const mainTabs = [
    { label: 'DLH', value: 'dlh' },
    { label: 'Pusdatin', value: 'pusdatin' },
    { label: 'Admin', value: 'admin' },
  ];

  const isDlhTabActive = activeTab === 'dlh';

  // Stats untuk StatCard dengan link
  const statsData = [
    { title: 'Total DLH Provinsi Aktif', value: stats.dlhProvinsi.toString(), link: '#dlh' },
    { title: 'Total DLH Kab/Kota Aktif', value: stats.dlhKabKota.toString(), link: '#dlh' },
    { title: 'Total Pusdatin Aktif', value: stats.pusdatin.toString(), link: '#pusdatin' },
    { title: 'Total Admin Aktif', value: stats.admin.toString(), link: '#admin' },
  ];

  if (loading) {
    return (
      <div className="p-8 space-y-8">
        <h1 className="text-3xl font-extrabold text-[#00A86B]">Memuat Data...</h1>
        <div className="h-64 bg-gray-100 animate-pulse rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-extrabold text-[#00A86B]">Manajemen Pengguna Aktif</h1>
        <p className="text-gray-600">Daftar pengguna yang telah diverifikasi dan aktif di sistem.</p>
      </header>

      {/* Statistik dengan Link */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <Link 
            key={index} 
            href={stat.link}
            onClick={(e) => {
              e.preventDefault();
              // Scroll ke section atau set active tab
              if (stat.link === '#dlh') {
                setActiveTab('dlh');
                setActiveDlhTab(stat.title.includes('Provinsi') ? 'provinsi' : 'kabkota');
              } else if (stat.link === '#pusdatin') {
                setActiveTab('pusdatin');
              } else if (stat.link === '#admin') {
                setActiveTab('admin');
              }
            }}
            className="h-full"
          >
            <StatCard
              {...statCardColors[index]}
              title={stat.title}
              value={stat.value}
            />
          </Link>
        ))}
      </div>

      {/* Main Tabs */}
      <InnerNav tabs={mainTabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* DLH Sub Tabs */}
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
        users={paginatedUsers().map((u) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          role: u.role?.name ?? '-',
          jenis_dlh: u.jenis_dlh?.name,
          status: 'aktif',
          province: u.province_name ?? '-',
          regency: u.regency_name ?? '-',
        }))}
        showLocation={isDlhTabActive}
        showDlhSpecificColumns={isDlhTabActive}
      />

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <span className="text-sm text-gray-600">
          Menampilkan {paginatedUsers().length} dari {filteredUsers().length} pengguna
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