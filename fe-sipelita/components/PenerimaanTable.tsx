'use client';

// --- TIPE DATA (Diekspor agar bisa dipakai di page.tsx) ---
export interface SlhdData {
  id: number;
  provinsi: string;
  kabkota: string;
  pembagian_daerah: string;
  tipologi: string;
  buku_1: string | null;
  buku_2: string | null;
  tabel_utama: string | null;
}

export interface IklhData {
  id: number;
  provinsi: string;
  kabkota: string;
  jenis_dlh: string;
  tipologi: string;
  ika: number;
  iku: number;
  ikl: number;
  ik_pesisir: number;
  ik_kehati: number;
  total_iklh: number;
  verifikasi: boolean | number;
}

export type TableItem = SlhdData | IklhData;

interface PenerimaanTableProps {
  activeTab: 'SLHD' | 'IKLH';
  data: TableItem[];
  onVerify: (item: IklhData) => void;
  isProcessing: boolean;
}

export default function PenerimaanTable({ 
  activeTab, 
  data, 
  onVerify, 
  isProcessing 
}: PenerimaanTableProps) {
  
  // Helper: Cek status verifikasi (boolean/number)
  const checkIsVerified = (val: boolean | number) => {
    return val === true || val === 1;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm w-full">
      <div className="overflow-x-auto"> 
        <table className="w-full">
          <thead className="bg-[#E6F6E6]">
            <tr>
              <th className="py-4 px-4 text-center text-xs font-bold text-gray-800 uppercase tracking-wider">Provinsi</th>
              <th className="py-4 px-4 text-center text-xs font-bold text-gray-800 uppercase tracking-wider">Kabupaten/Kota</th>
              
              {activeTab === 'SLHD' ? (
                <>
                  <th className="py-4 px-4 text-center text-xs font-bold text-gray-800 uppercase tracking-wider">Kategori</th>
                  <th className="py-4 px-4 text-center text-xs font-bold text-gray-800 uppercase tracking-wider">Topologi</th>
                  <th className="py-4 px-4 text-center text-xs font-bold text-gray-800 uppercase tracking-wider">Buku I</th>
                  <th className="py-4 px-4 text-center text-xs font-bold text-gray-800 uppercase tracking-wider">Buku II</th>
                  <th className="py-4 px-4 text-center text-xs font-bold text-gray-800 uppercase tracking-wider">Tabel Utama</th>
                </>
              ) : (
                <>
                  <th className="py-4 px-4 text-center text-xs font-bold text-gray-800 uppercase tracking-wider">Kategori</th>
                  <th className="py-4 px-4 text-center text-xs font-bold text-gray-800 uppercase tracking-wider">Topologi</th>
                  <th className="py-4 px-2 text-center text-xs font-bold text-gray-800 uppercase tracking-wider">IKA</th>
                  <th className="py-4 px-2 text-center text-xs font-bold text-gray-800 uppercase tracking-wider">IKU</th>
                  <th className="py-4 px-2 text-center text-xs font-bold text-gray-800 uppercase tracking-wider">IKL</th>
                  <th className="py-4 px-2 text-center text-xs font-bold text-gray-800 uppercase tracking-wider">IK Pesisir</th>
                  <th className="py-4 px-2 text-center text-xs font-bold text-gray-800 uppercase tracking-wider">IK Kehati</th>
                  <th className="py-4 px-2 text-center text-xs font-bold text-gray-800 uppercase tracking-wider">Total</th>
                  <th className="py-4 px-2 text-center text-xs font-bold text-gray-800 uppercase tracking-wider">Verif</th>
                </>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data.length > 0 ? (
              data.map((item) => {
                let displayCategory = '';
                if ('pembagian_daerah' in item) {
                  displayCategory = item.pembagian_daerah;
                } else {
                  displayCategory = item.jenis_dlh;
                }
                displayCategory = displayCategory.replace('Kabupaten', 'Kab.').replace('Kota', 'Kota');

                return (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-sm text-gray-900 font-medium align-middle text-center">{item.provinsi}</td>
                    <td className="py-4 px-4 text-sm text-gray-900 align-middle text-center">{item.kabkota}</td>

                    {activeTab === 'SLHD' ? (
                      <>
                        <td className="py-4 px-4 text-sm text-gray-700 align-middle text-center">{displayCategory}</td>
                        <td className="py-4 px-4 text-sm text-gray-700 align-middle text-center">{(item as SlhdData).tipologi}</td>
                        
                        <td className="py-4 px-4 text-sm align-middle text-center">
                          {(item as SlhdData).buku_1 ? (
                            <div className="flex justify-center">
                              <a href="#" className="text-[#00A86B] hover:underline font-medium truncate max-w-[100px] block" title={(item as SlhdData).buku_1!}>
                                {(item as SlhdData).buku_1}
                              </a>
                            </div>
                          ) : <span className="text-gray-400 italic text-xs">Belum</span>}
                        </td>
                        
                        <td className="py-4 px-4 text-sm align-middle text-center">
                          {(item as SlhdData).buku_2 ? (
                            <div className="flex justify-center">
                              <a href="#" className="text-[#00A86B] hover:underline font-medium truncate max-w-[100px] block" title={(item as SlhdData).buku_2!}>
                                {(item as SlhdData).buku_2}
                              </a>
                            </div>
                          ) : <span className="text-gray-400 italic text-xs">Belum</span>}
                        </td>
                        
                        <td className="py-4 px-4 text-sm align-middle text-center">
                          {(item as SlhdData).tabel_utama ? (
                            <div className="flex justify-center">
                              <a href="#" className="text-[#00A86B] hover:underline font-medium truncate max-w-[100px] block" title={(item as SlhdData).tabel_utama!}>
                                {(item as SlhdData).tabel_utama}
                              </a>
                            </div>
                          ) : <span className="text-gray-400 italic text-xs">Belum</span>}
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-4 px-4 text-sm text-gray-700 align-middle text-center">{displayCategory}</td>
                        <td className="py-4 px-4 text-sm text-gray-700 align-middle text-center">{(item as IklhData).tipologi}</td>
                        
                        <td className="py-4 px-2 text-sm text-center font-medium text-[#00A86B] align-middle">{(item as IklhData).ika}</td>
                        <td className={`py-4 px-2 text-sm text-center font-medium align-middle ${(item as IklhData).iku < 60 ? 'text-red-500' : 'text-[#00A86B]'}`}>{(item as IklhData).iku}</td>
                        <td className="py-4 px-2 text-sm text-center font-medium text-[#00A86B] align-middle">{(item as IklhData).ikl}</td>
                        <td className="py-4 px-2 text-sm text-center font-medium text-[#00A86B] align-middle">{(item as IklhData).ik_pesisir}</td>
                        <td className={`py-4 px-2 text-sm text-center font-medium ${(item as IklhData).ik_kehati < 70 ? 'text-red-500' : 'text-[#00A86B]'}`}>{(item as IklhData).ik_kehati}</td>
                        
                        <td className="py-4 px-2 text-sm text-center font-bold text-[#00A86B] align-middle text-base">
                          {(item as IklhData).total_iklh}
                        </td>
                        
                        {/* --- ACTION: CHECKLIST VERIFIKASI --- */}
                        <td className="py-4 px-2 text-center align-middle">
                          <div className="flex justify-center">
                            <button
                              onClick={() => onVerify(item as IklhData)}
                              disabled={checkIsVerified((item as IklhData).verifikasi) || isProcessing}
                              className={`w-6 h-6 border-2 rounded flex items-center justify-center transition-all duration-200 
                                ${checkIsVerified((item as IklhData).verifikasi)
                                  ? 'border-[#00A86B] bg-white cursor-default' 
                                  : 'border-gray-300 bg-gray-50 hover:border-[#00A86B] cursor-pointer hover:scale-105'
                                }`}
                              title={checkIsVerified((item as IklhData).verifikasi) ? "Sudah diverifikasi" : "Klik untuk memverifikasi"}
                            >
                              {checkIsVerified((item as IklhData).verifikasi) ? (
                                <div className="w-3.5 h-3.5 bg-[#00A86B] rounded-sm"></div>
                              ) : null}
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={activeTab === 'SLHD' ? 8 : 12} className="py-12 text-center text-gray-500 bg-gray-50">
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-lg font-medium">Tidak ada data ditemukan</p>
                    <p className="text-sm mt-1">Coba ubah filter pencarian Anda.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}