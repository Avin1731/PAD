'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DeadlineCard from '@/components/DeadlineCard';
// 1. Ganti ke UniversalModal
import UniversalModal from '@/components/UniversalModal';
import axios from '@/lib/axios';

// Tipe data deadline yang diterima dari API
interface ApiDeadline {
  id: number;
  jenis_deadline: string;
  tanggal_mulai: string;  // Format YYYY-MM-DD
  tanggal_akhir: string;  // Format YYYY-MM-DD
}

// 2. Buat state awal (untuk reset)
const INITIAL_MODAL_CONFIG = {
  title: '',
  message: '',
  variant: 'warning' as 'success' | 'warning' | 'danger',
  showCancelButton: true,
  onConfirm: () => {},
  confirmLabel: 'Ya',
  cancelLabel: 'Kembali',
};

export default function PenerimaanDataPage() {
  const router = useRouter();
  
  const [slhdDeadline, setSlhdDeadline] = useState<ApiDeadline | null>(null);
  const [iklhDeadline, setIklhDeadline] = useState<ApiDeadline | null>(null);
  const [selectedDlh, setSelectedDlh] = useState<string>('');
  
  // 3. Gunakan state awal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState(INITIAL_MODAL_CONFIG);
  
  // 4. Tambahkan state isSaving (isSubmitting)
  const [isSaving, setIsSaving] = useState(false);

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

  // 5. Buat fungsi closeModal dan resetModalConfig
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const resetModalConfig = () => {
    setModalConfig(INITIAL_MODAL_CONFIG);
  }

  const handleSave = async (
    deadlineData: ApiDeadline | null,
    newStartDate: string,
    newEndDate: string,
    jenis: 'Dokumen SLHD' | 'Nilai IKLH'
  ) => {
    // 6. Cek isSaving
    if (isSaving) return;
    
    // 7. Set isSaving
    setIsSaving(true);

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

      // 8. Update Modal Config (gunakan showCancelButton & closeModal)
      setModalConfig({
        title: 'Berhasil',
        message: 'Deadline berhasil disimpan.',
        variant: 'success',
        showCancelButton: false, // <-- Diperbarui
        onConfirm: closeModal,      // <-- Diperbarui
        confirmLabel: 'Oke',
        cancelLabel: 'Tutup',
      });
      setIsModalOpen(true);
      
    } catch (error) {
      console.error(`Gagal menyimpan deadline ${jenis}:`, error);
      
      // 9. Update Modal Config (gunakan showCancelButton & closeModal)
      setModalConfig({
        title: 'Gagal',
        message: 'Gagal menyimpan deadline.',
        variant: 'danger',
        showCancelButton: false, // <-- Diperbarui
        onConfirm: closeModal,      // <-- Diperbarui
        confirmLabel: 'Tutup',
        cancelLabel: '',
      });
      setIsModalOpen(true);
      
    } finally {
      // 10. Selalu matikan isSaving
      setIsSaving(false);
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
            disabled={isSaving} // <-- Tambahkan disabled
          >
            <option value="">Pilih Jenis DLH</option>
            <option value="provinsi">Provinsi</option>
            <option value="kabupaten">Kabupaten/Kota</option>
          </select>
        </div>
        <button 
          className="bg-[#00A86B] hover:bg-[#00945F] text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSaving} // <-- Tambahkan disabled
        >
          Filter
        </button>
      </div>
      
      <h2 className="text-xl font-bold text-gray-800 pt-4">
        Pengaturan Deadline Penerimaan Dokumen
      </h2>

      {/* 11. Kirim 'disabled' ke DeadlineCard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DeadlineCard
          title="Dokumen SLHD"
          startDate={formatDate(slhdDeadline?.tanggal_mulai)}
          endDate={formatDate(slhdDeadline?.tanggal_akhir)}
          onSave={(start, end) => handleSave(slhdDeadline, start, end, 'Dokumen SLHD')}
          disabled={isSaving} // <-- TAMBAHKAN INI
        />
        <DeadlineCard
          title="Nilai IKLH"
          startDate={formatDate(iklhDeadline?.tanggal_mulai)}
          endDate={formatDate(iklhDeadline?.tanggal_akhir)}
          onSave={(start, end) => handleSave(iklhDeadline, start, end, 'Nilai IKLH')}
          disabled={isSaving} // <-- TAMBAHKAN INI
        />
      </div>

      <button
        onClick={handleEditClick}
        className="bg-[#00A86B] hover:bg-[#00945F] text-white font-medium py-2 px-6 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isSaving} // <-- TAMBAHKAN INI
      >
        Edit Deadline
      </button>

      {/* 12. Ganti ke UniversalModal dan tambahkan onExitComplete */}
      <UniversalModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onExitComplete={resetModalConfig} // <-- KUNCI RESET ANIMASI
        title={modalConfig.title}
        message={modalConfig.message}
        variant={modalConfig.variant}
        showCancelButton={modalConfig.showCancelButton} // <-- Prop baru
        onConfirm={modalConfig.onConfirm}
        confirmLabel={modalConfig.confirmLabel}
        cancelLabel={modalConfig.cancelLabel}
      />
    </div>
  );
}