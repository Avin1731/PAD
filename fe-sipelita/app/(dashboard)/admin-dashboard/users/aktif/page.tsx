'use client';

import { useState, useEffect } from 'react';
import { User } from '@/context/AuthContext';
import InnerNav from '@/components/InnerNav';
import UserTable from '@/components/UserTable';
import Pagination from '@/components/Pagination';
import Link from 'next/link';
import axios from '@/lib/axios';
import { FiSearch } from 'react-icons/fi'; 

const USERS_PER_PAGE = 25;

// 🎨 Warna per-card untuk StatCard biasa
const statCardColors = [
  { bg: 'bg-blue-50', border: 'border-blue-300', titleColor: 'text-blue-600', valueColor: 'text-blue-800' },
  { bg: 'bg-blue-50', border: 'border-blue-300', titleColor: 'text-blue-600', valueColor: 'text-blue-800' },
  { bg: 'bg-green-50', border: 'border-green-300', titleColor: 'text-green-600', valueColor: 'text-green-800' },
  { bg: 'bg-red-50', border: 'border-red-300', titleColor: 'text-red-600', valueColor: 'text-red-800' },
];

// Komponen StatCard dengan Progress Bar
const ProgressStatCard = ({ title, current, max, color = 'blue' }: { title: string; current: number; max: number; color?: 'blue' | 'green' | 'red' }) => {
  const percentage = Math.min(100, (current / max) * 100);
  const colorClasses = {
    blue: { bar: 'bg-blue-500', border: 'border-blue-300', text: 'text-blue-600' },
    green: { bar: 'bg-green-500', border: 'border-green-300', text: 'text-green-600' },
    red: { bar: 'bg-red-500', border: 'border-red-300', text: 'text-red-600' },
  };

  const selectedColors = colorClasses[color];

  return (
    <div className={`bg-white rounded-xl shadow-sm border ${selectedColors.border} p-6 h-full flex flex-col`}>
      <div>
        <h3 className={`text-sm font-medium ${selectedColors.text} mb-1`}>{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{current} / {max}</p>
      </div>
      <div className="mt-auto">
        <div className="mt-3 w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${selectedColors.bar}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default function UsersAktifPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Tab state
  const [activeTab, setActiveTab] = useState('dlh');
  const [activeDlhTab, setActiveDlhTab] = useState('provinsi');
  
  // Search state
  const [searchTerm, setSearchTerm] = useState('');

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

  // --- Filter berdasarkan Tab DAN Search ---
  const filteredUsers = () => {
    // PERBAIKAN: Tambahkan tipe eksplisit ': User[]' di sini
    let result: User[] = []; 

    // 1. Filter by Tab/Role
    if (activeTab === 'dlh') {
      result = activeDlhTab === 'provinsi'
        ? users.filter((u) => u.jenis_dlh?.name === 'DLH Provinsi')
        : users.filter((u) => u.jenis_dlh?.name === 'DLH Kab-Kota');
    } else if (activeTab === 'pusdatin') {
      result = users.filter((u) => u.role?.name === 'Pusdatin');
    } else if (activeTab === 'admin') {
      result = users.filter((u) => u.role?.name === 'Admin');
    }

    // 2. Filter by Search Term
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(user => 
        user.name.toLowerCase().includes(lowerTerm) || 
        user.email.toLowerCase().includes(lowerTerm)
      );
    }

    return result;
  };

  // --- Pagination ---
  const totalPages = Math.ceil(filteredUsers().length / USERS_PER_PAGE);

  const paginatedUsers = () => {
    const start = (currentPage - 1) * USERS_PER_PAGE;
    return filteredUsers().slice(start, start + USERS_PER_PAGE);
  };

  // Reset page & search ketika tab berubah
  useEffect(() => {
    setCurrentPage(1);
    setSearchTerm(''); 
  }, [activeTab, activeDlhTab]);

  // Reset page ketika search berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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

  // Stats Data
  const statsData = [
    { title: 'Total DLH Provinsi Aktif', value: stats.dlhProvinsi, max: 38, type: 'progress', color: 'blue' as const, link: '#dlh' },
    { title: 'Total DLH Kab/Kota Aktif', value: stats.dlhKabKota, max: 514, type: 'progress', color: 'blue' as const, link: '#dlh' },
    { title: 'Total Pusdatin Aktif', value: stats.pusdatin, type: 'simple', color: 'green' as const, link: '#pusdatin' },
    { title: 'Total Admin Aktif', value: stats.admin, type: 'simple', color: 'red' as const, link: '#admin' },
  ];

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
        <h1 className="text-3xl font-extrabold text-green-800">Manajemen Pengguna Aktif</h1>
        <p className="text-gray-600">Daftar pengguna yang telah diverifikasi dan aktif di sistem.</p>
      </header>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
        {statsData.map((stat, index) => (
          <Link
            key={index}
            href={stat.link}
            onClick={(e) => {
              e.preventDefault();
              if (stat.link === '#dlh') {
                setActiveTab('dlh');
                setActiveDlhTab(stat.title.includes('Provinsi') ? 'provinsi' : 'kabkota');
              } else if (stat.link === '#pusdatin') {
                setActiveTab('pusdatin');
              } else if (stat.link === '#admin') {
                setActiveTab('admin');
              }
            }}
            className="h-full block transition-transform hover:scale-105"
          >
            {stat.type === 'progress' ? (
              <ProgressStatCard
                title={stat.title}
                current={stat.value ?? 0}
                max={stat.max ?? 0}
                color={stat.color}
              />
            ) : (
              <div className={`bg-white rounded-xl shadow-sm border ${statCardColors[index].border} p-6 h-full flex flex-col justify-center`}>
                <h3 className={`text-sm font-medium ${statCardColors[index].titleColor} mb-1`}>{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            )}
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

      {/* --- SEARCH BAR --- */}
      <div className="flex items-center mb-4">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={`Cari nama atau email ${activeTab === 'dlh' ? (activeDlhTab === 'provinsi' ? 'DLH Provinsi' : 'DLH Kab/Kota') : activeTab}...`}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

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