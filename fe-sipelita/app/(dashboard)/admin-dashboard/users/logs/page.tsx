'use client';

import { useState, useEffect } from 'react';
import StatCard from '@/components/StatCard';
import InnerNav from '@/components/InnerNav';
import LastActivityCard, { Log } from '@/components/LastActivityCard';
import Pagination from '@/components/Pagination';
import Link from 'next/link';
import axios from '@/lib/axios';

const LOGS_PER_PAGE = 25;

// 🎨 Warna per-card
const statCardColors = [
  { bg: 'bg-slate-50', border: 'border-slate-300', titleColor: 'text-slate-600', valueColor: 'text-slate-800' },
  { bg: 'bg-blue-50', border: 'border-blue-300', titleColor: 'text-blue-600', valueColor: 'text-blue-800' },
  { bg: 'bg-blue-50', border: 'border-blue-300', titleColor: 'text-blue-600', valueColor: 'text-blue-800' },
  { bg: 'bg-green-50', border: 'border-green-300', titleColor: 'text-green-600', valueColor: 'text-green-800' },
  { bg: 'bg-red-50', border: 'border-red-300', titleColor: 'text-red-600', valueColor: 'text-red-800' },
];

type TabValue = 'all' | 'dlh' | 'pusdatin' | 'admin';
type DlhTabValue = 'provinsi' | 'kabkota';

export default function UsersLogsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  // State untuk tab
  const [activeTab, setActiveTab] = useState<TabValue>('all');
  const [activeDlhTab, setActiveDlhTab] = useState<DlhTabValue>('provinsi');

  // Statistik
  const [stats, setStats] = useState({
    totalLogs: 0,
    dlhProvinsiLogs: 0,
    dlhKabKotaLogs: 0,
    pusdatinLogs: 0,
    adminLogs: 0,
  });

  // Fetch data dari API
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get('/api/admin/logs');
        // Handle response: Laravel Resource biasanya membungkus data dalam properti 'data'
        const data: Log[] = Array.isArray(res.data) ? res.data : res.data.data;

        // Hitung statistik dari data yang diterima
        const totalLogs = data.length;
        const dlhProvinsiLogs = data.filter(log => log.role === 'dlh' && log.jenis_dlh === 'provinsi').length;
        const dlhKabKotaLogs = data.filter(log => log.role === 'dlh' && log.jenis_dlh === 'kabkota').length;
        const pusdatinLogs = data.filter(log => log.role === 'pusdatin').length;
        const adminLogs = data.filter(log => log.role === 'admin').length;

        setLogs(data);
        setStats({
          totalLogs,
          dlhProvinsiLogs,
          dlhKabKotaLogs,
          pusdatinLogs,
          adminLogs,
        });
      } catch (error) {
        console.error('Gagal mengambil data log:', error);
        setLogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  // Filter logs berdasarkan tab aktif
  const filteredLogs = logs.filter(log => {
    if (activeTab === 'all') return true;
    if (activeTab === 'dlh') {
      if (activeDlhTab === 'provinsi') return log.role === 'dlh' && log.jenis_dlh === 'provinsi';
      if (activeDlhTab === 'kabkota') return log.role === 'dlh' && log.jenis_dlh === 'kabkota';
    }
    return log.role === activeTab;
  });

  // Pagination Logic
  const paginatedLogs = () => {
    const startIndex = (currentPage - 1) * LOGS_PER_PAGE;
    const endIndex = startIndex + LOGS_PER_PAGE;
    return filteredLogs.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    const totalPages = Math.ceil(filteredLogs.length / LOGS_PER_PAGE);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, activeDlhTab]);

  // Tabs Configuration
  const mainTabs: { label: string; value: TabValue }[] = [
    { label: 'Semua', value: 'all' },
    { label: 'DLH', value: 'dlh' },
    { label: 'Pusdatin', value: 'pusdatin' },
    { label: 'Admin', value: 'admin' },
  ];

  const dlhTabs: { label: string; value: DlhTabValue }[] = [
    { label: 'Provinsi', value: 'provinsi' },
    { label: 'Kab/Kota', value: 'kabkota' },
  ];

  const isDlhTabActive = activeTab === 'dlh';

  const statsData = [
    { 
      title: 'Total Log Aktivitas', 
      value: stats.totalLogs.toString(), 
      link: '#all', 
      color: statCardColors[0] 
    },
    { 
      title: 'Log DLH Provinsi', 
      value: stats.dlhProvinsiLogs.toString(), 
      link: '#dlh-provinsi', 
      color: statCardColors[1] 
    },
    { 
      title: 'Log DLH Kab/Kota', 
      value: stats.dlhKabKotaLogs.toString(), 
      link: '#dlh-kabkota', 
      color: statCardColors[2] 
    },
    { 
      title: 'Log Pusdatin', 
      value: stats.pusdatinLogs.toString(), 
      link: '#pusdatin', 
      color: statCardColors[3] 
    },
    { 
      title: 'Log Admin', 
      value: stats.adminLogs.toString(), 
      link: '#admin', 
      color: statCardColors[4] 
    },
  ];

  const getTabColor = (tabValue: TabValue) => {
    switch (tabValue) {
      case 'all': return 'slate';
      case 'dlh': return 'blue';
      case 'pusdatin': return 'green';
      case 'admin': return 'red';
      default: return 'slate';
    }
  };

  if (loading) {
    return (
      <div className="space-y-8 p-8">
        <h1 className="text-3xl font-extrabold text-slate-500">Memuat Log...</h1>
        <div className="h-64 bg-gray-100 rounded-xl animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">
      <header>
        <h1 className="text-3xl font-extrabold text-slate-600">Log Aktivitas Pengguna</h1>
        <p className="text-gray-600">Catatan semua aktivitas yang dilakukan oleh pengguna di sistem.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {statsData.map((stat, index) => (
          <Link 
            key={index} 
            href={stat.link}
            onClick={(e) => {
              e.preventDefault();
              if (stat.link === '#all') setActiveTab('all');
              else if (stat.link === '#dlh-provinsi') { setActiveTab('dlh'); setActiveDlhTab('provinsi'); }
              else if (stat.link === '#dlh-kabkota') { setActiveTab('dlh'); setActiveDlhTab('kabkota'); }
              else if (stat.link === '#pusdatin') setActiveTab('pusdatin');
              else if (stat.link === '#admin') setActiveTab('admin');
            }}
            className="h-full block transition-transform hover:scale-105"
          >
            <StatCard
              bgColor={stat.color.bg}
              borderColor={stat.color.border}
              titleColor={stat.color.titleColor}
              valueColor={stat.color.valueColor}
              title={stat.title}
              value={stat.value}
            />
          </Link>
        ))}
      </div>

      <InnerNav 
        tabs={mainTabs} 
        activeTab={activeTab} 
        onChange={(value) => setActiveTab(value as TabValue)}
        activeColor={getTabColor(activeTab)}
      />

      {isDlhTabActive && (
        <InnerNav
          tabs={dlhTabs}
          activeTab={activeDlhTab}
          onChange={(value) => setActiveDlhTab(value as DlhTabValue)}
          className="mt-0"
          activeColor="blue"
        />
      )}

      <LastActivityCard 
        logs={paginatedLogs()} 
        showDlhSpecificColumns={isDlhTabActive}
        theme={activeTab === 'all' ? 'slate' : 
               activeTab === 'dlh' ? 'blue' : 
               activeTab === 'pusdatin' ? 'green' : 'red'}
      />

      <div className="flex justify-between items-center mt-6">
        <span className="text-sm text-gray-600">
          Menampilkan {paginatedLogs().length} dari {filteredLogs.length} log
        </span>

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredLogs.length / LOGS_PER_PAGE)}
          onPageChange={handlePageChange}
          siblings={1}
        />
      </div>
    </div>
  );
}