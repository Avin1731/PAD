'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DeadlineCard from '@/components/DeadlineCard';
import ConfirmationModal from '@/components/ConfirmationModal'; // ← versi baru sudah terpasang
import axios from '@/lib/axios';

// Tipe data deadline yang diterima dari API
interface ApiDeadline {
  id: number;
  jenis_deadline: string;
  tanggal_mulai: string;  // Format YYYY-MM-DD
  tanggal_akhir: string;  // Format YYYY-MM-DD
}

export default function PenerimaanDataPage() {
  const router = useRouter();
  
  const [slhdDeadline, setSlhdDeadline] = useState<ApiDeadline | null>(null);
  const [iklhDeadline, setIklhDeadline] = useState<ApiDeadline | null>(null);
  const [selectedDlh, setSelectedDlh] = useState<string>(''); // State untuk filter
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: '',
    message: '',
    variant: 'warning' as 'success' | 'warning' | 'danger',
    showButtons: true,
    onConfirm: () => {},
    confirmLabel: 'Ya',
    cancelLabel: 'Kembali',
    confirmActionLabel: undefined as string | undefined,
  });

  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return '';
    return dateString.split('-').reverse().join('/');
  };

  useEffect(() => {
    const fetchDeadlines = async () => {
      try {
        const response = await axios.get('/api/deadlines/penerimaan');
        const allDeadlines: ApiDeadline[] = response.data;
        setSlhdDeadline(allDeadlines.find(d => d.jenis_deadline === 'Dokumen SLHD') || null);
        setIklhDeadline(allDeadlines.find(d => d.jenis_deadline === 'Nilai IKLH') || null);
      } catch (error) {
        console.error('Gagal mengambil data deadline:', error);
      }
    };
    fetchDeadlines();
  }, []);

  const handleSave = async (
    deadlineData: ApiDeadline | null,
    newStartDate: string,
    newEndDate: string,
    jenis: 'Dokumen SLHD' | 'Nilai IKLH'
  ) => {
    const formattedStart = newStartDate.split('/').reverse().join('-');
    const formattedEnd = newEndDate.split('/').reverse().join('-');

    const payload = {
      jenis_deadline: jenis,
      tanggal_mulai: formattedStart,
      tanggal_akhir: formattedEnd,
    };

    try {
      let response;
      if (deadlineData && deadlineData.id) {
        response = await axios.put(`/api/deadlines/${deadlineData.id}`, payload);
      } else {
        response = await axios.post('/api/deadlines', payload);
      }

      if (jenis === 'Dokumen SLHD') {
        setSlhdDeadline(response.data);
      } else {
        setIklhDeadline(response.data);
      }

      setModalConfig({
        title: 'Berhasil',
        message: 'Deadline berhasil disimpan.',
        variant: 'success',
        showButtons: false,
        onConfirm: () => setIsModalOpen(false),
        confirmLabel: 'Oke',
        cancelLabel: 'Tutup',
        confirmActionLabel: undefined,
      });
      setIsModalOpen(true);
    } catch (error) {
      console.error(`Gagal menyimpan deadline ${jenis}:`, error);
      setModalConfig({
        title: 'Gagal',
        message: 'Gagal menyimpan deadline.',
        variant: 'danger',
        showButtons: false,
        onConfirm: () => setIsModalOpen(false),
        confirmLabel: 'Tutup',
        cancelLabel: '',
        confirmActionLabel: undefined,
      });
      setIsModalOpen(true);
    }
  };

  const handleEditClick = () => {
    router.push('/pusdatin-dashboard/pengaturan-deadline/edit-deadline');
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDlh(e.target.value);
  };

  return (
    <div className="space-y-8 p-8">
      {/* Header dan Breadcrumb */}
      <div>
        <span className="text-sm text-green-600 mb-4">Pengaturan Deadline</span> &gt;{' '}
        <span className="text-sm text-gray-600 mb-4">Pengaturan Deadline Penerimaan Data</span>
      </div>
      <header>
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
          Pengaturan Deadline Penerimaan Data
        </h1>
        <p className="text-gray-600">
          Atur jadwal penerimaan data untuk dokumen-dokumen dari DLH Provinsi dan Kab/Kota.
        </p>
      </header>

      {/* --- BAGIAN FILTER --- */}
      <div className="flex gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Jenis DLH</label>
          <select
            value={selectedDlh}
            onChange={handleFilterChange}
            className="bg-white px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Pilih Jenis DLH</option>
            <option value="provinsi">Provinsi</option>
            <option value="kabupaten">Kabupaten/Kota</option>
          </select>
        </div>
        <button className="bg-[#00A86B] hover:bg-[#00945F] text-white font-medium py-2 px-4 rounded-md transition-colors">
          Filter
        </button>
      </div>
      
      <h2 className="text-xl font-bold text-gray-800 pt-4">
        Pengaturan Deadline Penerimaan Dokumen
      </h2>

      {/* Kartu Deadline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DeadlineCard
          title="Dokumen SLHD"
          startDate={formatDate(slhdDeadline?.tanggal_mulai)}
          endDate={formatDate(slhdDeadline?.tanggal_akhir)}
          onSave={(start, end) => handleSave(slhdDeadline, start, end, 'Dokumen SLHD')}
        />
        <DeadlineCard
          title="Nilai IKLH"
          startDate={formatDate(iklhDeadline?.tanggal_mulai)}
          endDate={formatDate(iklhDeadline?.tanggal_akhir)}
          onSave={(start, end) => handleSave(iklhDeadline, start, end, 'Nilai IKLH')}
        />
      </div>

      <button
        onClick={handleEditClick}
        className="bg-[#00A86B] hover:bg-[#00945F] text-white font-medium py-2 px-6 rounded-md transition-colors"
      >
        Edit Deadline
      </button>

      {/* Modal dengan properti baru */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalConfig.title}
        message={modalConfig.message}
        variant={modalConfig.variant}
        showButtons={modalConfig.showButtons}
        onConfirm={modalConfig.onConfirm}
        confirmLabel={modalConfig.confirmLabel}
        cancelLabel={modalConfig.cancelLabel}
        confirmActionLabel={modalConfig.confirmActionLabel}
      />
    </div>
  );
}
