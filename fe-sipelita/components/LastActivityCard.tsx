'use client';

import { FaUserShield, FaUserTie, FaUserCog } from "react-icons/fa";

export interface Log {
  id: number;
  user: string;
  action: string;
  timestamp: string;
  role: 'dlh' | 'pusdatin' | 'admin';
}

interface LastActivityCardProps {
  logs: Log[];
}

export default function LastActivityCard({ logs }: LastActivityCardProps) {
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

            {/* Header dengan MERAH */}
            <thead className="bg-red-200">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Waktu</th>
                <th className="py-3 px-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">User</th>
                <th className="py-3 px-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Role</th>
                <th className="py-3 px-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">

                  {/* Row dengan background merah muda */}
                  <td className="bg-red-50 py-4 px-4 text-sm text-gray-600 w-24">[{log.timestamp}]</td>

                  <td className="bg-red-50 py-4 px-4 text-sm text-gray-800 font-medium">
                    {log.user}
                  </td>

                  {/* Role + Icon */}
                  <td className="bg-red-50 py-4 px-4 text-sm font-medium flex items-center gap-2">
                    {getRoleIcon(log.role)}
                    <span className={getRoleColor(log.role)}>
                      {log.role.toUpperCase()}
                    </span>
                  </td>

                  <td className="bg-red-50 py-4 px-4 text-sm text-gray-700">
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
