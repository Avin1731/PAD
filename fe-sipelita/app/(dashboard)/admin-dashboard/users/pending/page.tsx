'use client';

// HAPUS 'useRef'
import { useState, useEffect } from 'react';
import { User } from '@/context/AuthContext';
import StatCard from '@/components/StatCard';
import InnerNav from '@/components/InnerNav';
import UserTable from '@/components/UserTable';
import Pagination from '@/components/Pagination';
import UniversalModal from '@/components/UniversalModal';
import axios from '@/lib/axios';

const USERS_PER_PAGE = 25;

const statCardColors = [
  { bg: 'bg-gray-50', border: 'border-yellow-300', titleColor: 'text-yellow-600', valueColor: 'text-yellow-800' },
  { bg: 'bg-gray-50', border: 'border-yellow-300', titleColor: 'text-yellow-600', valueColor: 'text-yellow-800' },
];

const INITIAL_MODAL_CONFIG = {
  title: '',
  message: '',
  variant: 'warning' as 'success' | 'warning' | 'danger',
  confirmLabel: 'Ya',
  showCancelButton: true,
  onConfirm: () => {},
};

export default function UsersPendingPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'provinsi' | 'kabkota'>('provinsi');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [stats, setStats] = useState({
    dlhProvinsi: 0,
    dlhKabKota: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState(INITIAL_MODAL_CONFIG);
  
  // --- 1. HAPUS STATE INI ---
  // const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // ---------------- FETCH USERS (Tidak Berubah) ---------------------
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/admin/users/pending');
        const data: User[] = res.data;

        setUsers(data);
        setStats({
          dlhProvinsi: data.filter(u => u.jenis_dlh?.name === 'DLH Provinsi').length,
          dlhKabKota: data.filter(u => u.jenis_dlh?.name === 'DLH Kab-Kota').length,
        });
      } catch (error) {
        console.error('Gagal mengambil data user pending:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // ---------------- FILTER + PAGINATION (Tidak Berubah) -------------
  const filteredUsers = users.filter((u) => {
    const jenis = activeTab === 'provinsi' ? 'DLH Provinsi' : 'DLH Kab-Kota';
    return u.jenis_dlh?.name === jenis;
  });

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);
  
  // --- FUNGSI CLOSE YANG SIMPLE ---
  const closeModal = () => {
    setIsModalOpen(false);
    // Kita juga bisa reset isSubmitting di sini untuk keamanan
    // jika modal ditutup manual
    if (isSubmitting) {
      setIsSubmitting(false);
    }
  };
  
  // --- FUNGSI RESET YANG AKAN DIPANGGIL OLEH ANIMASI ---
  const resetModalConfig = () => {
    setModalConfig(INITIAL_MODAL_CONFIG);
  }

  // ---------------- PERFORM ACTION -------------------
  // --- 2. UBAH TANDA TANGAN FUNGSI: TAMBAHKAN 'id' ---
  const performAction = async (action: 'approve' | 'reject', id: number) => {
    console.log("DEBUG: performAction called with action:", action, "id:", id, "isSubmitting (before):", isSubmitting);
    
    // --- 3. CEK 'id' LANGSUNG ---
    if (!id) {
      console.warn("performAction called but id is missing.");
      closeModal();
      return;
    }
    
    setIsSubmitting(true);

    const originalUsers = [...users];
    // --- 4. GUNAKAN 'id' ---
    const optimisticUsers = users.filter(u => u.id !== id);
    setUsers(optimisticUsers);

    const key = activeTab === 'provinsi' ? 'dlhProvinsi' : 'dlhKabKota';
    setStats(prev => ({ ...prev, [key]: prev[key] - 1 }));

    setIsModalOpen(false); // Tutup modal "Konfirmasi"

    try {
      if (action === 'approve') {
        // --- 5. GUNAKAN 'id' ---
        await axios.post(`/api/admin/users/${id}/approve`);
        setModalConfig({
          title: 'Berhasil Approve',
          message: 'Pengguna telah berhasil disetujui.',
          variant: 'success',
          confirmLabel: 'OK',
          showCancelButton: false,
          onConfirm: closeModal, 
        });
        setIsModalOpen(true); // Buka modal sukses

      } else {
        // --- 6. GUNAKAN 'id' ---
        await axios.delete(`/api/admin/users/${id}/reject`);
        setModalConfig({
          title: 'Berhasil Reject',
          message: 'Pengguna berhasil ditolak dan dihapus.',
          variant: 'success',
          confirmLabel: 'OK',
          showCancelButton: false,
          onConfirm: closeModal,
        });
        setIsModalOpen(true);
      }

    } catch (error) {
      console.error(`Gagal ${action} pengguna:`, error);
      setUsers(originalUsers);
      
      setModalConfig({
        title: `Gagal ${action}`,
        message: 'Terjadi kesalahan. Data dikembalikan ke kondisi semula.',
        variant: 'danger',
        confirmLabel: 'Tutup',
        showCancelButton: false,
        onConfirm: closeModal,
      });
      setIsModalOpen(true);
    } finally {
      // --- 7. HAPUS 'setSelectedUserId(null)' ---
      setIsSubmitting(false);
    }
  };

  // ---------------- HANDLE APPROVE/REJECT -----------
  const handleApproveClick = (id: number) => {
    console.log("DEBUG: handleApproveClick called with id:", id, "isSubmitting:", isSubmitting, "isModalOpen:", isModalOpen);
    if (isSubmitting) {console.log("DEBUG: handleApproveClick prevented by isSubmitting check."); return;}
    
    // HAPUS 'setSelectedUserId(id)'
    
    setModalConfig({
      title: 'Konfirmasi Approve',
      message: 'Apakah Anda yakin ingin menyetujui pengguna ini?',
      variant: 'warning',
      confirmLabel: 'Approve',
      showCancelButton: true,
      // --- 8. KIRIM 'id' LANGSUNG KE 'performAction' ---
      onConfirm: () => {
        // Pengecekan isSubmitting masih bagus untuk keamanan
        if (isSubmitting) {
            console.warn("Aksi approve dicegah karena sedang ada proses lain.");
            closeModal();
            return;
        }
        performAction('approve', id); // <-- KIRIM ID DI SINI
      },
    });
    setIsModalOpen(true);
  };

  const handleRejectClick = (id: number) => {
    if (isSubmitting) return;

    // HAPUS 'setSelectedUserId(id)'
    
    setModalConfig({
      title: 'Konfirmasi Reject',
      message: 'Apakah Anda yakin ingin menolak dan menghapus pengguna ini?',
      variant: 'danger',
      confirmLabel: 'Reject',
      showCancelButton: true,
      // --- 9. KIRIM 'id' LANGSUNG KE 'performAction' ---
      onConfirm: () => {
         if (isSubmitting) {
            console.warn("Aksi reject dicegah karena sedang ada proses lain.");
            closeModal();
            return;
         }
        performAction('reject', id); // <-- KIRIM ID DI SINI
      },
    });
    setIsModalOpen(true);
  };

  // ---------------- LOADING (Tidak Berubah) --------------------------
  if (loading) {
    return (
      <div className="p-8 space-y-8">
        <h1 className="text-3xl font-extrabold text-yellow-600">Memuat Data...</h1>
        <div className="h-64 bg-gray-100 animate-pulse rounded-xl"></div>
      </div>
    );
  }

  // ---------------- RENDER PAGE ----------------------
  return (
    <div className="p-8 space-y-8">
      
      <header>
        <h1 className="text-3xl font-extrabold text-gray-800">Manajemen Pengguna Pending</h1>
        <p className="text-gray-600">Daftar pengguna DLH yang menunggu persetujuan admin.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard {...statCardColors[0]} title="Total DLH Provinsi Pending" value={stats.dlhProvinsi} />
        <StatCard {...statCardColors[1]} title="Total DLH Kab/Kota Pending" value={stats.dlhKabKota} />
      </div>

      <InnerNav
        tabs={[
          { label: 'DLH Provinsi', value: 'provinsi' },
          { label: 'DLH Kab/Kota', value: 'kabkota' },
        ]}
        activeTab={activeTab}
        onChange={(value) => setActiveTab(value as 'provinsi' | 'kabkota')}
      />

      <UserTable
        users={paginatedUsers.map((u) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          role: u.role?.name ?? 'DLH',
          jenis_dlh: u.jenis_dlh?.name,
          status: 'pending',
          province: u.province_name ?? '-',
          regency: u.regency_name ?? '-',
        }))}
        onApprove={handleApproveClick}
        onReject={handleRejectClick}
        showLocation={true}
        showDlhSpecificColumns={true}
        isSubmitting={isSubmitting} 
      />

      <div className="flex justify-between items-center mt-6">
        <span className="text-sm text-gray-600">
          Menampilkan {paginatedUsers.length} dari {filteredUsers.length} pengguna
        </span>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          siblings={1}
        />
      </div>

      {/* ---------------- MODAL UNIVERSAL ---------------- */}
      <UniversalModal
        isOpen={isModalOpen}
        onClose={closeModal} 
        onExitComplete={resetModalConfig} // Ini sudah benar
        title={modalConfig.title}
        message={modalConfig.message}
        variant={modalConfig.variant}
        onConfirm={modalConfig.onConfirm}
        confirmLabel={modalConfig.confirmLabel}
        cancelLabel="Batal"
        showCancelButton={modalConfig.showCancelButton}
      />
    </div>
  );
}