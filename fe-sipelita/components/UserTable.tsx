'use client';

import { FaCheck, FaTimes } from 'react-icons/fa';

// Tipe data khusus untuk TABEL (tidak bentrok dengan AuthContext)
export interface UserTableRow {
  id: number;
  name: string;
  email: string;
  role: string;
  jenis_dlh?: string;
  status: 'aktif' | 'pending';
  province?: string | null;
  regency?: string | null;
}

interface UserTableProps {
  users: UserTableRow[];
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
  showLocation?: boolean;
}

export default function UserTable({
  users,
  onApprove,
  onReject,
  showLocation = false,
}: UserTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>

            {showLocation && (
              <>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provinsi</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kab/Kota</th>
              </>
            )}

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>

            {(onApprove && onReject) && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            )}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>

              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.role}
                {user.jenis_dlh && (
                  <span className="ml-1 text-xs font-normal text-gray-500">
                    ({user.jenis_dlh})
                  </span>
                )}
              </td>

              {showLocation && (
                <>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {user.province ?? '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {user.regency ?? '-'}
                  </td>
                </>
              )}

              <td className="px-6 py-4 whitespace-nowrap">
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
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onApprove(user.id)}
                      className="text-green-600 hover:text-green-900"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => onReject(user.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
