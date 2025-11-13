// app/(dashboard)/pusdatin-dashboard/pengaturan-deadline/edit-deadline/page.tsx
'use client';

import { useState, useEffect } from 'react';
import StatusBadge from '@/components/StatusBadge';
import ConfirmationModal from '@/components/ConfirmationModal';
import axios from '@/lib/axios';

interface Deadline {
  id: number;
  jenis_deadline: string;
  tanggal_mulai: string; // DD/MM/YYYY
  tanggal_akhir: string; // DD/MM/YYYY
  sisa_waktu: string;
  status: 'Aktif' | 'Berakhir' | string;
}

export default function EditDeadlinePage() {
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [selectedDlh, setSelectedDlh] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: '',
    message: '',
    variant: 'warning' as 'success' | 'warning' | 'danger',
    showButtons: true,
    onConfirm: () => {},
  });

  useEffect(() => {
    const fetchAndSetDeadlines = async () => {
      try {
        const response = await axios.get('/api/deadlines/all');
        setDeadlines(response.data);
      } catch (error) {
        console.error('Gagal mengambil data deadline:', error);
      }
    };

    fetchAndSetDeadlines();
  }, []);

  const handleEdit = () => {
    setModalConfig({
      title: 'Fitur Belum Tersedia',
      message: 'Fungsionalitas untuk mengedit dari halaman ini belum diimplementasikan.',
      variant: 'warning',
      showButtons: false,
      onConfirm: () => setIsModalOpen(false),
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setModalConfig({
      title: 'Hapus Deadline',
      message: 'Apakah anda yakin ingin menghapus deadline ini?',
      variant: 'danger',
      showButtons: true,
      onConfirm: async () => {
        try {
          await axios.delete(`/api/deadlines/${id}`);
          setIsModalOpen(false);

          // Tampilkan notifikasi berhasil
          setModalConfig({
            title: 'Berhasil Dihapus',
            message: 'Deadline berhasil dihapus.',
            variant: 'success',
            showButtons: false,
            onConfirm: () => setIsModalOpen(false),
          });
          setIsModalOpen(true);

          // Reload data
          const response = await axios.get('/api/deadlines/all');
          setDeadlines(response.data);
        } catch (error) {
          console.error('Gagal menghapus deadline:', error);
          setModalConfig({
            title: 'Gagal Menghapus',
            message: 'Terjadi kesalahan saat menghapus deadline.',
            variant: 'danger',
            showButtons: false,
            onConfirm: () => setIsModalOpen(false),
          });
          setIsModalOpen(true);
        }
      },
    });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 p-8">
      {/* Breadcrumb dan Header */}
      <div>
        <span className="text-sm text-green-600 mb-4">Pengaturan Deadline</span> &gt;{' '}
        <span className="text-sm text-gray-600 mb-4">Edit Deadline</span>
      </div>

      <header>
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Edit Deadline</h1>
        <p className="text-gray-600">
          Lihat dan hapus semua deadline yang telah diatur.
        </p>
      </header>

      {/* Filter */}
      <div className="flex gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Jenis DLH</label>
          <select
            value={selectedDlh}
            onChange={(e) => setSelectedDlh(e.target.value)}
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

      {/* Tabel Deadline */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                'No',
                'Jenis Deadline',
                'Tanggal Mulai',
                'Tanggal Akhir',
                'Sisa Waktu',
                'Status',
                'Aksi',
              ].map((header) => (
                <th
                  key={header}
                  className="bg-green-200 px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {deadlines.map((deadline, index) => (
              <tr key={deadline.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {deadline.jenis_deadline}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {deadline.tanggal_mulai}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {deadline.tanggal_akhir}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {deadline.sisa_waktu}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={deadline.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex space-x-3">
                    <button
                      onClick={handleEdit}
                      className="text-gray-400 hover:text-gray-600 cursor-not-allowed"
                      title="Edit (Belum tersedia)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414
                             a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(deadline.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Hapus Deadline"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0117.138 21H6.862
                             a2 2 0 01-1.995-2.142L4.867 7M10 11v6M14 11v6M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Konfirmasi */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalConfig.title}
        message={modalConfig.message}
        variant={modalConfig.variant}
        showButtons={modalConfig.showButtons}
        onConfirm={modalConfig.onConfirm}
      />
    </div>
  );
}
