'use client';

import { useAuth } from '@/context/AuthContext';
import StatCard from '@/components/StatCard';
import ProgressCard from '@/components/ProgressCard';
import NotificationCard from '@/components/NotificationCard';
import ActivityTable, { Activity } from '@/components/ActivityTable'; // Impor tipe Activity
import { useState, useEffect } from 'react';
import axios from '@/lib/axios'; // Gunakan axios kustom Anda (dari AuthContext)

// Definisikan tipe untuk data yang akan di-fetch
interface DashboardData {
  stats: { title: string; value: string | number }[];
  progressStages: { stage: string; progress: number; detail: string; isCompleted: boolean }[];
  notifications: { announcement?: string; notification?: string };
  recentActivities: Activity[];
}

export default function PusdatinDashboardPage() {
  const { user } = useAuth();
  const userName = user?.name || 'Pusdatin';
  
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data dari dummy BE
    const fetchData = async () => {
      try {
        setLoading(true);
        // ✅ Panggil API Laravel (bukan /api/...)
        const response = await axios.get('/api/pusdatin-dashboard');
        setData(response.data);
      } catch (error) {
        console.error("Gagal mengambil data dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); // Jalankan sekali saat komponen dimuat

  // Tampilkan UI Loading
  if (loading || !data) {
    return (
      <div className="p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-400 animate-pulse">
            Selamat Datang, {userName.toUpperCase()}
          </h1>
        </header>
        <div className="h-96 w-full bg-gray-200 rounded-xl animate-pulse flex items-center justify-center">
          Memuat data dashboard...
        </div>
      </div>
    );
  }

  // Tampilkan UI setelah data terisi
  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-extrabold text-gray-800">
          Selamat Datang, {userName.toUpperCase()}
        </h1>
      </header>

      {/* Statistik Utama (5 Kartu) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {data.stats.map((stat, index) => {
          const colors = [
            { bg: 'bg-gray-50', border: 'border-blue-300', titleColor: 'text-blue-600', valueColor: 'text-blue-800' },
            { bg: 'bg-gray-50', border: 'border-blue-300', titleColor: 'text-blue-600', valueColor: 'text-blue-800' },
            { bg: 'bg-gray-50', border: 'border-yellow-300', titleColor: 'text-yellow-600', valueColor: 'text-yellow-800' },
            { bg: 'bg-gray-50', border: 'border-green-300', titleColor: 'text-green-600', valueColor: 'text-green-800' },
            { bg: 'bg-gray-50', border: 'border-green-300', titleColor: 'text-green-600', valueColor: 'text-green-800' },
          ];

          const { bg, border } = colors[index % colors.length];

          return (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              bgColor={bg}
              borderColor={border}
              titleColor={colors[index % colors.length].titleColor}
              valueColor={colors[index % colors.length].valueColor}
            />
          );
        })}
      </section>

      {/* Tahapan & Notifikasi */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom Kiri: Tahapan (5 Kartu) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.progressStages.map((stage, index) => (
              <ProgressCard 
                key={index}
                stage={stage.stage} 
                progress={stage.progress} 
                detail={stage.detail} 
                isCompleted={stage.isCompleted}
              />
            ))}
          </div>
        </div>

        {/* Kolom Kanan: Notifikasi & Pengumuman */}
        <div className="lg:col-span-1">
          <NotificationCard
            announcement={data.notifications.announcement}
            notification={data.notifications.notification}
          />
        </div>
      </section>

      {/* Tabel Aktivitas Terkini */}
      <section>
        <ActivityTable activities={data.recentActivities} />
      </section>
    </div>
  );
}