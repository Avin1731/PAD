// src/components/LastActivityCard.tsx
'use client';

import { FaUserShield, FaUserTie, FaUserCog } from "react-icons/fa";

// Ekspor interface Log agar bisa digunakan di file lain
export interface Log {
  id: number;
  user: string;
  action: string;
  timestamp: string;
  role: 'dlh' | 'pusdatin' | 'admin';
  jenis_dlh?: 'provinsi' | 'kabkota';
  province_name?: string;
  regency_name?: string;
}

interface LastActivityCardProps {
  logs: Log[];
  showDlhSpecificColumns?: boolean;
  theme?: 'slate' | 'blue' | 'green' | 'red';
}

export default function LastActivityCard({ 
  logs, 
  showDlhSpecificColumns = false, 
  theme = 'slate' 
}: LastActivityCardProps) {
  
  // Fungsi untuk mendapatkan warna berdasarkan tema
  const getThemeColors = () => {
    switch (theme) {
      case 'blue':
        return {
          header: 'bg-blue-200',
          row: 'bg-blue-50',
          text: 'text-blue-800'
        };
      case 'green':
        return {
          header: 'bg-green-200',
          row: 'bg-green-50',
          text: 'text-green-800'
        };
      case 'red':
        return {
          header: 'bg-red-200',
          row: 'bg-red-50',
          text: 'text-red-800'
        };
      default: // slate
        return {
          header: 'bg-slate-200',
          row: 'bg-slate-50',
          text: 'text-slate-800'
        };
    }
  };

  const themeColors = getThemeColors();

  return (
    <div>
      {/* Header di Luar Card */}
      <div className="px-6 py-3">
        <h3 className="text-xl font-bold text-gray-800 pl-0 -ml-4">Aktivitas Terakhir</h3>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">

        {/* Tabel */}
        <div className="overflow-x-auto">
          <table className="w-full">

            {/* Header dengan tema dinamis */}
            <thead className={themeColors.header}>
              <tr>
                <th className="py-3 px-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Waktu</th>
                <th className="py-3 px-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">User</th>
                <th className="py-3 px-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Role</th>
                {showDlhSpecificColumns && (
                  <>
                    <th className="py-3 px-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Jenis DLH</th>
                    <th className="py-3 px-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Provinsi</th>
                    <th className="py-3 px-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Kab/Kota</th>
                  </>
                )}
                <th className="py-3 px-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">

                  {/* Row dengan background sesuai tema */}
                  <td className={`${themeColors.row} py-4 px-4 text-sm text-gray-600 w-24`}>[{log.timestamp}]</td>

                  <td className={`${themeColors.row} py-4 px-4 text-sm text-gray-800 font-medium`}>
                    {log.user}
                  </td>

                  {/* Role + Icon */}
                  <td className={`${themeColors.row} py-4 px-4 text-sm font-medium flex items-center gap-2`}>
                    {getRoleIcon(log.role)}
                    <span className={getRoleColor(log.role)}>
                      {log.role.toUpperCase()}
                    </span>
                  </td>

                  {showDlhSpecificColumns && (
                    <>
                      <td className={`${themeColors.row} py-4 px-4 text-sm text-gray-700`}>
                        {log.jenis_dlh === 'provinsi' ? 'Provinsi' : 
                         log.jenis_dlh === 'kabkota' ? 'Kab/Kota' : '-'}
                      </td>
                      <td className={`${themeColors.row} py-4 px-4 text-sm text-gray-700`}>
                        {log.province_name || '-'}
                      </td>
                      <td className={`${themeColors.row} py-4 px-4 text-sm text-gray-700`}>
                        {log.regency_name || '-'}
                      </td>
                    </>
                  )}

                  <td className={`${themeColors.row} py-4 px-4 text-sm text-gray-700`}>
                    {log.action}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}

/* Helper warna role */
function getRoleColor(role: string) {
  switch(role) {
    case 'dlh': return 'text-blue-600';
    case 'pusdatin': return 'text-green-600';
    case 'admin': return 'text-red-600';
    default: return 'text-gray-600';
  }
}

/* Helper icon role */
function getRoleIcon(role: string) {
  switch (role) {
    case 'dlh':
      return <FaUserTie className="text-blue-600 text-base" />;
    case 'pusdatin':
      return <FaUserCog className="text-green-600 text-base" />;
    case 'admin':
      return <FaUserShield className="text-red-600 text-base" />;
    default:
      return null;
  }
}