'use client';

import { useState, useEffect, useCallback } from 'react'; // 1. Tambahkan useCallback
import StatusBadge from '@/components/StatusBadge';
// 2. Ganti ke UniversalModal
import UniversalModal from '@/components/UniversalModal';
import axios from '@/lib/axios';

interface Deadline {
  id: number;
  jenis_deadline: string;
  tanggal_mulai: string; // DD/MM/YYYY
  tanggal_akhir: string; // DD/MM/YYYY
  sisa_waktu: string;
  status: 'Aktif' | 'Berakhir' | string;
}

// 3. Buat state awal (untuk reset)
const INITIAL_MODAL_CONFIG = {
  title: '',
  message: '',
  variant: 'warning' as 'success' | 'warning' | 'danger',
  showCancelButton: true,
  onConfirm: () => {},
  confirmLabel: 'Ya',
  cancelLabel: 'Batal',
};

export default function EditDeadlinePage() {
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [selectedDlh, setSelectedDlh] = useState<string>('');
  
  // 4. Tambahkan state isDeleting
  const [isDeleting, setIsDeleting] = useState(false);

  // 5. Perbarui state modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState(INITIAL_MODAL_CONFIG);

  // 6. Buat fungsi fetch terpisah dengan useCallback
  const fetchAndSetDeadlines = useCallback(async () => {
    try {
      const response = await axios.get('/api/deadlines/all');
      setDeadlines(response.data);
    } catch (error) {
      console.error('Gagal mengambil data deadline:', error);
    }
  }, []); // Dependency array kosong

  useEffect(() => {
    fetchAndSetDeadlines();
  }, [fetchAndSetDeadlines]); // Panggil di useEffect

  // 7. Buat fungsi closeModal dan resetModalConfig
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const resetModalConfig = () => {
    setModalConfig(INITIAL_MODAL_CONFIG);
  };

  const handleEdit = () => {
    // 8. Cek isDeleting
    if (isDeleting) return;

    setModalConfig({
      title: 'Fitur Belum Tersedia',
      message: 'Fungsionalitas untuk mengedit dari halaman ini belum diimplementasikan.',
      variant: 'warning',
      showCancelButton: false, // <-- Update
      onConfirm: closeModal,     // <-- Update
      confirmLabel: 'OK',      // <-- Update
      cancelLabel: '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    // 9. Cek isDeleting
    if (isDeleting) return;

    setModalConfig({
      title: 'Hapus Deadline',
      message: 'Apakah anda yakin ingin menghapus deadline ini?',
      variant: 'danger',
      showCancelButton: true, // <-- Update
      confirmLabel: 'Hapus',  // <-- Update
      cancelLabel: 'Batal',   // <-- Update
      onConfirm: () => performDelete(id), // <-- Panggil fungsi terpisah
    });
    setIsModalOpen(true);
  };

  // 10. Buat fungsi performDelete terpisah
  const performDelete = async (id: number) => {
    setIsDeleting(true);
    setIsModalOpen(false); // Tutup modal "Yakin?"

    try {
      await axios.delete(`/api/deadlines/${id}`);
      
      setModalConfig({
        title: 'Hapus Deadline',
        message: 'Deadline berhasil dihapus.',
        variant: 'success',
        showCancelButton: false,
        onConfirm: closeModal,
        confirmLabel: 'OK',
        cancelLabel: '',
      });
      setIsModalOpen(true); // Buka modal "Berhasil"
      
      // Muat ulang data setelah berhasil menghapus
      fetchAndSetDeadlines();

    } catch (error) {
      console.error('Gagal menghapus deadline:', error);
      setModalConfig({
        title: 'Gagal',
        message: 'Gagal menghapus deadline.',
        variant: 'danger',
        showCancelButton: false,
        onConfirm: closeModal,
        confirmLabel: 'Tutup',
        cancelLabel: '',
      });
      setIsModalOpen(true); // Buka modal "Gagal"
    } finally {
      setIsDeleting(false); // Selalu lepas lock
    }
  };

  return (
    <div className="space-y-8 p-8">
      {/* Breadcrumb dan Header */}
      <div>
        <span className="text-sm text-green-600 mb-4">Pengaturan Deadline</span> &gt;{' '} <span className="text-sm text-gray-600 mb-4">Edit Deadline</span>
      </div>
      <header>
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Edit Deadline</h1>
        <p className="text-gray-600">Lihat dan hapus semua deadline yang telah diatur.</p>
      </header>

      {/* Filter */}
      <div className="flex gap-4 items-end">
        <div>
          <label className="bg-white block text-sm font-medium text-gray-700 mb-1">Jenis DLH</label>
          <select 
            value={selectedDlh} 
            onChange={(e) => setSelectedDlh(e.target.value)} 
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isDeleting} // <-- 11. Tambah disabled
          >
            <option value="">Pilih Jenis DLH</option>
            <option value="provinsi">Provinsi</option>
            <option value="kabupaten">Kabupaten/Kota</option>
          </select>
        </div>
        <button 
          className="bg-[#00A86B] hover:bg-[#00945F] text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isDeleting} // <-- 11. Tambah disabled
        >
          Filter
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="bg-green-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
              <th className="bg-green-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Deadline</th>
              <th className="bg-green-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Mulai</th>
              <th className="bg-green-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Akhir</th>
              <th className="bg-green-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sisa Waktu</th>
              <th className="bg-green-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="bg-green-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {deadlines.map((deadline, index) => (
              <tr key={deadline.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{deadline.jenis_deadline}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{deadline.tanggal_mulai}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{deadline.tanggal_akhir}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{deadline.sisa_waktu}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={deadline.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex space-x-2">
                    <button 
                      onClick={handleEdit} 
                      className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                      disabled={isDeleting || true} // <-- 12. Tambah disabled (true karena fitur belum ada)
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button 
                      onClick={() => handleDelete(deadline.id)} 
                      className="text-red-600 hover:text-red-900 disabled:opacity-30 disabled:cursor-not-allowed"
                      disabled={isDeleting} // <-- 12. Tambah disabled
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0117.138 21H6.862a2 2 0 01-1.995-2.142L4.867 7M10 11v6M14 11v6M4 7h16" /></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 13. Ganti ke UniversalModal */}
      <UniversalModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onExitComplete={resetModalConfig} // <-- Kunci reset animasi
        title={modalConfig.title}
        message={modalConfig.message}
        variant={modalConfig.variant}
        showCancelButton={modalConfig.showCancelButton}
        onConfirm={modalConfig.onConfirm}
        confirmLabel={modalConfig.confirmLabel}
        cancelLabel={modalConfig.cancelLabel}
      />
    </div>
  );
}