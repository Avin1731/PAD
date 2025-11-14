'use client';

import { useAuth } from '@/context/AuthContext';
import StatCard from '@/components/StatCard';
import LastActivityCard, { Log } from '@/components/LastActivityCard';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const { user } = useAuth();

  // Statistik utama
  const stats = [
    { title: 'Total User DLH Provinsi Aktif', value: '38/34', link: '/admin-dashboard/users/aktif' },
    { title: 'Total User DLH Kab/Kota Aktif', value: '514/450', link: '/admin-dashboard/users/aktif' },
    { title: 'Total User Pusdatin Aktif', value: '5', link: '/admin-dashboard/users/aktif' },
    { title: 'Total Admin Aktif', value: '4', link: '/admin-dashboard/users/aktif' },
    { title: 'Akun DLH Baru Menunggu', value: '3', link: '/admin-dashboard/users/pending' },
  ];

  // 🎨 Warna per-card
  const colors = [
    { bg: 'bg-gray-50', border: 'border-blue-300', titleColor: 'text-blue-600', valueColor: 'text-blue-800' },
    { bg: 'bg-gray-50', border: 'border-blue-300', titleColor: 'text-blue-600', valueColor: 'text-blue-800' },
    { bg: 'bg-gray-50', border: 'border-green-300', titleColor: 'text-green-600', valueColor: 'text-green-800' },
    { bg: 'bg-gray-50', border: 'border-red-300', titleColor: 'text-red-600', valueColor: 'text-red-800' },
    { bg: 'bg-gray-50', border: 'border-yellow-300', titleColor: 'text-yellow-600', valueColor: 'text-yellow-800' },
  ];

  // Log terakhir
  const recentLogs: Log[] = [
    { id: 1, user: 'DLH Kota Bogor', action: 'upload dokumen SLHD.', timestamp: '09:15', role: 'dlh' },
    { id: 2, user: 'DLH Provinsi Jawa Barat', action: 'ganti file IKLH.', timestamp: '09:00', role: 'dlh' },
    { id: 3, user: 'Pusdatin A', action: 'atur deadline penilaian data.', timestamp: '08:50', role: 'pusdatin' },
    { id: 4, user: 'Pusdatin B', action: 'atur deadline penerimaan data.', timestamp: '08:45', role: 'pusdatin' },
    { id: 5, user: 'Admin Satu', action: 'hapus akun DLH Kabupaten Malang.', timestamp: '08:30', role: 'admin' },
    { id: 6, user: 'Admin Dua', action: 'approve DLH Provinsi Aceh.', timestamp: '08:25', role: 'admin' },
    { id: 7, user: 'DLH Kabupaten Bandung', action: 'upload IKLH.', timestamp: '08:20', role: 'dlh' },
    { id: 8, user: 'Pusdatin C', action: 'lihat dashboard.', timestamp: '08:15', role: 'pusdatin' },
    { id: 9, user: 'Admin Tiga', action: 'buat akun pusdatin baru.', timestamp: '08:10', role: 'admin' },
    { id: 10, user: 'DLH Provinsi Banten', action: 'logout.', timestamp: '08:05', role: 'dlh' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-extrabold text-red-700">
          Dashboard Kontrol Utama, {user?.name || 'Admin'}
        </h1>
        <p className="text-gray-600">Fokus: Pengelolaan User dan Pengawasan Sistem.</p>
      </header>

      {/* Statistik utama */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, index) => {
          const color = colors[index % colors.length];

          return (
            <Link key={index} href={stat.link} className="h-full">
              <StatCard
                title={stat.title}
                value={stat.value}
                bgColor={color.bg}
                borderColor={color.border}
                titleColor={color.titleColor}
                valueColor={color.valueColor}
              />
            </Link>
          );
        })}
      </section>

      {/* Aktivitas terakhir */}
      <section>
        <LastActivityCard logs={recentLogs} />
      </section>
    </div>
  );
}
