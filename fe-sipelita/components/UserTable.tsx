'use client';

import { FaCheck, FaTimes } from 'react-icons/fa';

// Tipe data khusus untuk TABEL (tidak bentrok dengan AuthContext)
export interface UserTableRow {
  id: number;
  name: string;
  email: string;
  role: string; // Role utama (Admin, Pusdatin, DLH)
  jenis_dlh?: string; // Jenis DLH (DLH Provinsi, DLH Kab-Kota)
  status: 'aktif' | 'pending';
  province?: string | null;
  regency?: string | null;
}

interface UserTableProps {
  users: UserTableRow[];
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
  showLocation?: boolean;
  showDlhSpecificColumns?: boolean;
  isSubmitting?: boolean; // <-- 1. TAMBAHKAN PROP INI
}

export default function UserTable({
  users,
  onApprove,
  onReject,
  showLocation = false,
  showDlhSpecificColumns = false,
  isSubmitting = false, // <-- 2. AMBIL PROP DI SINI (default false)
}: UserTableProps) {

  // ... (Semua fungsi helper Anda TIDAK BERUBAH) ...
  const getDisplayRole = (user: UserTableRow): string => {
    if (user.role === 'DLH' && user.jenis_dlh) {
      return user.jenis_dlh; // 'DLH Provinsi' atau 'DLH Kab-Kota'
    }
    return user.role; // 'Admin', 'Pusdatin', dll
  };
  const isDlhProvinsi = (user: UserTableRow): boolean => {
    return user.role === 'DLH' && user.jenis_dlh === 'DLH Provinsi';
  };
  const shouldShowRegencyColumn = showLocation && (!showDlhSpecificColumns || users.some(u => !isDlhProvinsi(u)));
  const getRoleTheme = (role: string) => {
    switch(role.toLowerCase()) {
      case 'dlh': return {
        headerBg: 'bg-blue-200',
        rowBg: 'bg-blue-50',
        textColor: 'text-blue-600'
      };
      case 'pusdatin': return {
        headerBg: 'bg-green-200',
        rowBg: 'bg-green-50',
        textColor: 'text-green-600'
      };
      case 'admin': return {
        headerBg: 'bg-red-200',
        rowBg: 'bg-red-50',
        textColor: 'text-red-600'
      };
      default: return {
        headerBg: 'bg-gray-200',
        rowBg: 'bg-gray-50', 
        textColor: 'text-gray-600'
      };
    }
  };

  return (
    <div>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            
            {/* ... (thead TIDAK BERUBAH) ... */}
            <thead className={getRoleTheme(users[0]?.role || 'dlh').headerBg}>
              <tr>
                <th className="py-3 px-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Nama</th>
                <th className="py-3 px-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Email</th>
                <th className="py-3 px-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Role</th>
                {showLocation && (
                  <>
                    <th className="py-3 px-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Provinsi</th>
                    {shouldShowRegencyColumn && (
                      <th className="py-3 px-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Kab/Kota</th>
                    )}
                  </>
                )}
                <th className="py-3 px-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Status</th>
                {(onApprove && onReject) && (
                  <th className="py-3 px-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Aksi</th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {users.map((user) => {
                const theme = getRoleTheme(user.role);
                return (
                  <tr key={user.id} className="hover:bg-gray-100">
                    
                    {/* ... (td Nama, Email, Role, Lokasi, Status TIDAK BERUBAH) ... */}
                    <td className={`${theme.rowBg} py-4 px-4 text-sm text-gray-800 font-medium`}>
                      {user.name}
                    </td>
                    <td className={`${theme.rowBg} py-4 px-4 text-sm text-gray-700`}>
                      {user.email}
                    </td>
                    <td className={`${theme.rowBg} py-4 px-4 text-sm font-medium`}>
                      <span className={theme.textColor}>
                        {getDisplayRole(user)}
                      </span>
                    </td>
                    {showLocation && (
                      <>
                        <td className={`${theme.rowBg} py-4 px-4 text-sm text-gray-700`}>
                          {user.province ?? '-'}
                        </td>
                        {!isDlhProvinsi(user) && shouldShowRegencyColumn && (
                          <td className={`${theme.rowBg} py-4 px-4 text-sm text-gray-700`}>
                            {user.regency ?? '-'}
                          </td>
                        )}
                      </>
                    )}
                    <td className={`${theme.rowBg} py-4 px-4 text-sm`}>
                      <span
                        className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${
                          user.status === 'aktif'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {user.status === 'aktif' ? 'Aktif' : 'Pending'}
                      </span>
                    </td>

                    {(onApprove && onReject) && (
                      <td className={`${theme.rowBg} py-4 px-4 text-sm`}>
                        <div className="flex space-x-4">
                          
                          {/* 3. MODIFIKASI TOMBOL TERIMA */}
                          <button
                            onClick={() => onApprove(user.id)}
                            disabled={isSubmitting} // <-- TAMBAHKAN INI
                            className="text-green-600 hover:text-green-900 flex items-center gap-2 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed" // <-- TAMBAHKAN 'disabled:' STYLING
                            title="Terima User"
                          >
                            <FaCheck className="text-base" />
                            <span className="text-sm">Terima</span>
                          </button>
                          
                          {/* 4. MODIFIKASI TOMBOL TOLAK */}
                          <button
                            onClick={() => onReject(user.id)}
                            disabled={isSubmitting} // <-- TAMBAHKAN INI
                            className="text-red-600 hover:text-red-900 flex items-center gap-2 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed" // <-- TAMBAHKAN 'disabled:' STYLING
                            title="Tolak User"
                          >
                            <FaTimes className="text-base" />
                            <span className="text-sm">Tolak</span>
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}