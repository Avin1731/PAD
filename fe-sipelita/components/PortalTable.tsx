"use client";

import React from 'react';

// Tipe Data
type Status = "Sudah" | "Belum" | "Diterima" | "Ditolak" | "N/A";
type AkunStatus = "Aktif" | "Tidak Aktif";

// Tipe data yang diterima dari API
export interface PortalData {
  id: number;
  province_id: string;
  regency_id: string | null;
  pembagian_daerah: string;
  tipologi: string;
  status_upload: { [key: string]: Status };
  status_dokumen: { [key: string]: Status };
  status_akun: AkunStatus;
  // Ditambahkan oleh 'page.tsx' setelah dicocokkan
  province_name?: string; 
  regency_name?: string;
}

interface PortalTableProps {
  data: PortalData[];
  activeTab: 'upload' | 'dokumen' | 'akun';
}

// Helper styling untuk status
const StatusBadge = ({ status }: { status: Status }) => {
  const styles = {
    "Sudah": "bg-green-100 text-green-800",
    "Belum": "bg-gray-100 text-gray-600",
    "Diterima": "bg-blue-100 text-blue-800",
    "Ditolak": "bg-red-100 text-red-800",
    "N/A": "bg-gray-100 text-gray-400",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[status] || styles['N/A']}`}>
      {status}
    </span>
  );
};

// Helper styling untuk status akun
const AkunBadge = ({ status }: { status: AkunStatus }) => {
  const styles = {
    "Aktif": "bg-green-100 text-green-800",
    "Tidak Aktif": "bg-red-100 text-red-800",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
};

export default function PortalTable({ data, activeTab }: PortalTableProps) {
  
  // --- 1. Render Header Tabel (Kolom Berubah) ---
  const renderHeader = () => {
    // Header Kolom Umum
    const commonHeaders = (
      <>
        <th className="th">Provinsi</th>
        <th className="th">Kabupaten/Kota</th>
        <th className="th">Pembagian Daerah</th>
        <th className="th">Tipologi</th>
      </>
    );

    // JSX diletakkan di dalam `style` tag agar Tailwind bisa memprosesnya
    return (
      <thead className="bg-gray-50">
        <tr>
          {commonHeaders}
          
          {/* Kolom Dinamis berdasarkan Tab */}
          {activeTab === 'upload' && (
            <>
              <th className="th text-center">Buku 1</th>
              <th className="th text-center">Buku 2</th>
              <th className="th text-center">IKLH</th>
              <th className="th text-center">Tabel Utama</th>
            </>
          )}
          {activeTab === 'dokumen' && (
            <>
              <th className="th text-center">Buku 1</th>
              <th className="th text-center">Buku 2</th>
              <th className="th text-center">IKLH</th>
              <th className="th text-center">Tabel Utama</th>
            </>
          )}
          {activeTab === 'akun' && (
            <th className="th text-center">Status Akun</th>
          )}
        </tr>
      </thead>
    );
  };

  // --- 2. Render Isi Tabel (Data Berubah) ---
  const renderBody = () => {
    return (
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((item) => (
          <tr key={item.id} className="hover:bg-gray-50">
            {/* Kolom Umum */}
            <td className="td font-medium">{item.province_name}</td>
            <td className="td">{item.regency_name || 'N/A (Provinsi)'}</td>
            <td className="td">{item.pembagian_daerah}</td>
            <td className="td">{item.tipologi}</td>

            {/* Kolom Dinamis berdasarkan Tab */}
            {activeTab === 'upload' && (
              <>
                <td className="td text-center"><StatusBadge status={item.status_upload.buku1} /></td>
                <td className="td text-center"><StatusBadge status={item.status_upload.buku2} /></td>
                <td className="td text-center"><StatusBadge status={item.status_upload.iklh} /></td>
                <td className="td text-center"><StatusBadge status={item.status_upload.tabel_utama} /></td>
              </>
            )}
            {activeTab === 'dokumen' && (
              <>
                <td className="td text-center"><StatusBadge status={item.status_dokumen.buku1} /></td>
                <td className="td text-center"><StatusBadge status={item.status_dokumen.buku2} /></td>
                <td className="td text-center"><StatusBadge status={item.status_dokumen.iklh} /></td>
                <td className="td text-center"><StatusBadge status={item.status_dokumen.tabel_utama} /></td>
              </>
            )}
            {activeTab === 'akun' && (
              <td className="td text-center"><AkunBadge status={item.status_akun} /></td>
            )}
          </tr>
        ))}
      </tbody>
    );
  };

  // --- 3. Render Komponen Utama ---
  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Definisi CSS Lokal untuk 'th' dan 'td' */}
      <style jsx global>{`
        .th {
          padding: 0.75rem 1rem;
          text-align: left;
          font-size: 0.75rem;
          font-weight: 600;
          color: #4B5563; /* text-gray-600 */
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .td {
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          color: #374151; /* text-gray-700 */
          white-space: nowrap;
        }
      `}</style>

      <div className="overflow-x-auto">
        <table className="w-full min-w-max divide-y divide-gray-200">
          {renderHeader()}
          {renderBody()}
        </table>
      </div>
      
      {/* Tampilkan pesan jika data kosong setelah difilter */}
      {data.length === 0 && (
        <div className="text-center p-8 text-gray-500">
          Tidak ada data yang sesuai dengan filter Anda.
        </div>
      )}
    </div>
  );
}