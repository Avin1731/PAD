'use client';

import { useState } from 'react';
import InnerNav from '@/components/InnerNav';
import ProgressCard from '@/components/ProgressCard';
import { FaFileExcel, FaCloudUploadAlt, FaTrophy } from 'react-icons/fa';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';

// --- Dummy Data untuk Mockup ---

const progressData = [
  { stage: 'Tahap 1 (SLHD)', progress: 100, detail: '38/38 Provinsi', isCompleted: true },
  { stage: 'Tahap 2 (Penghargaan)', progress: 100, detail: '38/38 Provinsi', isCompleted: true },
  { stage: 'Tahap 3 (Validasi 1)', progress: 75, detail: '20/38 Provinsi', isCompleted: false },
  { stage: 'Tahap 4 (Validasi 2)', progress: 75, detail: '20/38 Provinsi', isCompleted: false },
  { stage: 'Tahap 5 (Wawancara)', progress: 75, detail: '20/38 Provinsi', isCompleted: false },
];

const slhdData = [
  { id: 1, name: 'Kabupaten Sleman', buku1: true, buku2: true, tabel: true },
  { id: 2, name: 'Kabupaten Bantul', buku1: true, buku2: true, tabel: true },
  { id: 3, name: 'Kabupaten Gunung Kidul', buku1: true, buku2: true, tabel: true },
];

const penghargaanData = [
  { id: 1, name: 'DLH Kabupaten Sleman', adipura: 87, adiwiyata: 86, proklim: 86, proper: 86, kalpataru: 86, total: 86.5 },
  { id: 2, name: 'DLH Kabupaten Bantul', adipura: 83, adiwiyata: 81, proklim: 81, proper: 81, kalpataru: 81, total: 82 },
  { id: 3, name: 'DLH Kab Gunung Kidul', adipura: 79, adiwiyata: 88, proklim: 88, proper: 88, kalpataru: 88, total: 86 },
];

const validasi1Data = [
  { id: 1, name: 'DLH Kabupaten Sleman', iklh: 87, penghargaan: 76, total: 86.5, status: 'Lolos' },
  { id: 2, name: 'DLH Kabupaten Bantul', iklh: 83, penghargaan: 86, total: 82, status: 'Lolos' },
  { id: 3, name: 'DLH Kab Gunung Kidul', iklh: 79, penghargaan: 85, total: 86, status: 'Lolos' },
];

const validasi2Data = [
  { id: 1, name: 'Kabupaten Sleman', wtp: true, hukum: true },
  { id: 2, name: 'Kabupaten Bantul', wtp: true, hukum: true },
  { id: 3, name: 'Kabupaten Gunung Kidul', wtp: true, hukum: true },
];

const peringkatData = [
  { rank: 1, name: 'Kabupaten Sleman', jenis: 'Kabupaten Besar', nilai: 95.2, kenaikan: '+5.1', status: 'Top 5' },
  { rank: 2, name: 'Kota Yogyakarta', jenis: 'Kabupaten Besar', nilai: 92.8, kenaikan: '+3.5', status: 'Top 5' },
  { rank: 3, name: 'Kabupaten Kulon Progo', jenis: 'Kabupaten Besar', nilai: 91.5, kenaikan: '+2.7', status: 'Top 5' },
  { rank: 4, name: 'Kabupaten Bantul', jenis: 'Kabupaten Besar', nilai: 90.5, kenaikan: '+1.9', status: 'Top 5' },
  { rank: 5, name: 'Kabupaten Gunung Kidul', jenis: 'Kabupaten Besar', nilai: 88.7, kenaikan: '+1.5', status: 'Top 5' },
];

export default function PenilaianKabKotaPage() {
  const [activeTab, setActiveTab] = useState('slhd');

  const tabs = [
    { label: 'Penilaian SLHD', value: 'slhd' },
    { label: 'Penilaian Penghargaan', value: 'penghargaan' },
    { label: 'Validasi 1', value: 'validasi1' },
    { label: 'Validasi 2', value: 'validasi2' },
    { label: 'Penetapan Peringkat', value: 'peringkat' },
    { label: 'Wawancara', value: 'wawancara' },
  ];

  return (
    <div className="space-y-8">
      {/* Header & Breadcrumb */}
      <div>
        <div className="flex items-center text-sm text-green-600 mb-2">
          <span className="cursor-pointer hover:underline">Penilaian</span>
          <span className="mx-2">&gt;</span>
          <span className="font-semibold">Penilaian Kab/Kota</span>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900">Penilaian Nirwasita Tantra Kab/Kota</h1>
        <p className="text-gray-500 mt-1">Atur Penilaian Nilai Nirwasita Tantra dari Dokumen-Dokumen Kab/Kota.</p>
      </div>

      {/* Progress Cards Section */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4">Ringkasan Progres</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {progressData.map((item, index) => (
            <ProgressCard
              key={index}
              stage={item.stage}
              progress={item.progress}
              detail={item.detail}
              isCompleted={item.isCompleted}
            />
          ))}
        </div>
      </div>

      {/* Detail Penilaian Section */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4">Detail Penilaian</h2>
        
        {/* Inner Navigation */}
        <InnerNav 
          tabs={tabs} 
          activeTab={activeTab} 
          onChange={setActiveTab} 
          activeColor="green"
          className="mb-6"
        />

        {/* Filters (Common for most tabs) */}
        {activeTab !== 'wawancara' && activeTab !== 'peringkat' && (
          <div className="flex gap-4 mb-6 items-end">
            <div className="w-64">
              <label className="block text-xs font-semibold text-gray-500 mb-1">Provinsi</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Pilih Provinsi</option>
                <option>Jawa Tengah</option>
                <option>DI Yogyakarta</option>
              </select>
            </div>
            {activeTab !== 'validasi1' && activeTab !== 'validasi2' && (
                 <button className="bg-green-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors h-[38px]">
                 Filter
               </button>
            )}
            {/* Specific Filter for Validasi screens if needed, but based on image, just Province is shown mostly */}
            {(activeTab === 'validasi1' || activeTab === 'validasi2') && (
                 <button className="bg-green-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors h-[38px]">
                 Filter
               </button>
            )}
          </div>
        )}

        {/* --- TAB CONTENT SWITCHER --- */}

        {/* 1. TAB PENILAIAN SLHD */}
        {activeTab === 'slhd' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Download Template Card */}
              <div className="border border-gray-200 rounded-xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-green-600">
                    <FaFileExcel className="text-xl" />
                    <h3 className="font-semibold text-gray-800">Unduh Template Excel</h3>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">Silahkan unduh template excel, isi nilai, dan unggah kembali ke sistem.</p>
                </div>
                <button className="w-full bg-green-600 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-green-700">
                  <FaFileExcel /> Unduh Template Excel Penilaian SLHD
                </button>
              </div>
              {/* Upload File Card */}
              <div className="border border-gray-200 rounded-xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-green-600">
                    <FaCloudUploadAlt className="text-xl" />
                    <h3 className="font-semibold text-gray-800">Upload File Excel</h3>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">Pastikan file yang diunggah sudah sesuai dengan template yang disediakan.</p>
                </div>
                <button className="w-full bg-green-100 text-green-700 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-green-200">
                  <FaCloudUploadAlt /> Upload File Excel Hasil Penilaian SLHD
                </button>
              </div>
            </div>

            {/* Table SLHD */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="font-bold text-gray-800">Kelayakan Administrasi Dokumen</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-green-50">
                    <tr>
                      <th className="py-3 px-6 text-left text-xs font-bold text-gray-700 uppercase">Nama DLH</th>
                      <th className="py-3 px-6 text-left text-xs font-bold text-gray-700 uppercase">Aksi</th>
                      <th className="py-3 px-6 text-center text-xs font-bold text-gray-700 uppercase">Buku I</th>
                      <th className="py-3 px-6 text-center text-xs font-bold text-gray-700 uppercase">Buku II</th>
                      <th className="py-3 px-6 text-center text-xs font-bold text-gray-700 uppercase">Tabel Utama</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {slhdData.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="py-4 px-6 text-sm font-medium text-gray-800">{item.name}</td>
                        <td className="py-4 px-6 text-sm">
                          <button className="text-green-600 hover:underline text-xs font-medium">Lihat Dokumen</button>
                        </td>
                        <td className="py-4 px-6 text-center text-green-600 text-xl"><MdCheckBox /></td>
                        <td className="py-4 px-6 text-center text-green-600 text-xl"><MdCheckBox /></td>
                        <td className="py-4 px-6 text-center text-green-600 text-xl"><MdCheckBoxOutlineBlank className="text-gray-300" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. TAB PENILAIAN PENGHARGAAN */}
        {activeTab === 'penghargaan' && (
          <div className="space-y-6 animate-fade-in">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* Cards sama seperti SLHD tapi teks beda */}
               <div className="border border-gray-200 rounded-xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-green-600">
                    <FaFileExcel className="text-xl" />
                    <h3 className="font-semibold text-gray-800">Unduh Template Excel</h3>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">Silahkan unduh template excel, isi nilai, dan unggah kembali ke sistem.</p>
                </div>
                <button className="w-full bg-green-600 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-green-700">
                  <FaFileExcel /> Unduh Template Excel Penilaian Penghargaan
                </button>
              </div>
              <div className="border border-gray-200 rounded-xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-green-600">
                    <FaCloudUploadAlt className="text-xl" />
                    <h3 className="font-semibold text-gray-800">Upload File Excel</h3>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">Pastikan file yang diunggah sudah sesuai dengan template yang disediakan.</p>
                </div>
                <button className="w-full bg-green-100 text-green-700 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-green-200">
                  <FaCloudUploadAlt /> Upload File Excel Hasil Penilaian Penghargaan
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-bold text-gray-800">Hasil Penilaian</h3>
                <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700">Finalisasi</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-green-50">
                    <tr>
                      <th className="py-3 px-6 text-left text-xs font-bold text-gray-700 uppercase">Nama DLH</th>
                      <th className="py-3 px-6 text-center text-xs font-bold text-gray-700 uppercase">Adipura</th>
                      <th className="py-3 px-6 text-center text-xs font-bold text-gray-700 uppercase">Adiwiyata</th>
                      <th className="py-3 px-6 text-center text-xs font-bold text-gray-700 uppercase">Proklim</th>
                      <th className="py-3 px-6 text-center text-xs font-bold text-gray-700 uppercase">Proper</th>
                      <th className="py-3 px-6 text-center text-xs font-bold text-gray-700 uppercase">Kalpataru</th>
                      <th className="py-3 px-6 text-center text-xs font-bold text-green-700 uppercase">Nilai Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {penghargaanData.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 text-xs">
                        <td className="py-4 px-6 font-medium text-gray-800">{item.name}</td>
                        <td className="py-4 px-6 text-center text-gray-600">{item.adipura}</td>
                        <td className="py-4 px-6 text-center text-gray-600">{item.adiwiyata}</td>
                        <td className="py-4 px-6 text-center text-gray-600">{item.proklim}</td>
                        <td className="py-4 px-6 text-center text-gray-600">{item.proper}</td>
                        <td className="py-4 px-6 text-center text-gray-600">{item.kalpataru}</td>
                        <td className="py-4 px-6 text-center font-bold text-green-600">{item.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 3. TAB VALIDASI 1 */}
        {activeTab === 'validasi1' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-bold text-gray-800">Validasi 1</h3>
                <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700">Finalisasi</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-green-50">
                    <tr>
                      <th className="py-3 px-6 text-left text-xs font-bold text-gray-700 uppercase">Nama DLH</th>
                      <th className="py-3 px-6 text-center text-xs font-bold text-gray-700 uppercase">Nilai IKLH</th>
                      <th className="py-3 px-6 text-center text-xs font-bold text-gray-700 uppercase">Nilai Penghargaan</th>
                      <th className="py-3 px-6 text-center text-xs font-bold text-gray-700 uppercase">Nilai Total</th>
                      <th className="py-3 px-6 text-center text-xs font-bold text-gray-700 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {validasi1Data.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="py-4 px-6 text-sm font-medium text-gray-800">{item.name}</td>
                        <td className="py-4 px-6 text-center text-sm text-gray-600">{item.iklh}</td>
                        <td className="py-4 px-6 text-center text-sm text-gray-600">{item.penghargaan}</td>
                        <td className="py-4 px-6 text-center text-sm font-bold text-green-600">{item.total}</td>
                        <td className="py-4 px-6 text-center">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 4. TAB VALIDASI 2 */}
        {activeTab === 'validasi2' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                 <h3 className="font-bold text-gray-800">Validasi 2</h3>
                 <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700">Finalisasi</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-green-50">
                    <tr>
                      <th className="py-3 px-6 text-left text-xs font-bold text-gray-700 uppercase">Nama DLH</th>
                      <th className="py-3 px-6 text-center text-xs font-bold text-gray-700 uppercase">Dokumen WTP</th>
                      <th className="py-3 px-6 text-center text-xs font-bold text-gray-700 uppercase">Tidak tersangkut kasus hukum</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {validasi2Data.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="py-4 px-6 text-sm font-medium text-gray-800">{item.name}</td>
                        <td className="py-4 px-6 text-center text-green-600 text-xl">
                          <div className="flex justify-center"><MdCheckBox className="cursor-pointer" /></div>
                        </td>
                        <td className="py-4 px-6 text-center text-green-600 text-xl">
                           <div className="flex justify-center"><MdCheckBox className="cursor-pointer" /></div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

         {/* 5. TAB PENETAPAN PERINGKAT */}
         {activeTab === 'peringkat' && (
          <div className="space-y-6 animate-fade-in">
            {/* Filter khusus Peringkat */}
            <div className="flex gap-4 mb-6">
               <div className="w-1/3">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Pembagian Daerah</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option>Pilih Jenis DLH</option>
                    <option>Kabupaten Besar</option>
                    <option>Kabupaten Sedang</option>
                  </select>
               </div>
               <div className="w-1/3">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Jenis Peringkat</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option>Pilih Jenis Peringkat</option>
                    <option>Top 5</option>
                    <option>Top 10</option>
                  </select>
               </div>
               <div className="flex items-end">
                  <button className="bg-green-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-green-700 h-[38px]">Filter</button>
               </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="font-bold text-gray-800">Tabel Peringkat</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white border-b border-gray-200">
                    <tr>
                      <th className="py-3 px-6 text-left text-xs font-bold text-gray-500 uppercase">Rank</th>
                      <th className="py-3 px-6 text-left text-xs font-bold text-gray-500 uppercase">Nama Daerah</th>
                      <th className="py-3 px-6 text-left text-xs font-bold text-gray-500 uppercase">Jenis DLH</th>
                      <th className="py-3 px-6 text-center text-xs font-bold text-gray-500 uppercase">Nilai NT</th>
                      <th className="py-3 px-6 text-center text-xs font-bold text-gray-500 uppercase">Kenaikan NT</th>
                      <th className="py-3 px-6 text-center text-xs font-bold text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {peringkatData.map((item) => (
                      <tr key={item.rank} className="hover:bg-gray-50">
                        <td className="py-4 px-6 text-sm font-bold text-gray-800 flex items-center gap-2">
                           {item.rank <= 3 && <FaTrophy className="text-yellow-500" />}
                           {item.rank}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-800">
                           {item.rank === 1 ? <span className="text-green-600">{item.name}</span> : item.name}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-600">{item.jenis}</td>
                        <td className="py-4 px-6 text-center text-sm text-gray-600">{item.nilai}</td>
                        <td className="py-4 px-6 text-center text-sm text-gray-600">{item.kenaikan}</td>
                        <td className="py-4 px-6 text-center">
                           <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                              {item.status}
                           </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 6. TAB WAWANCARA */}
        {activeTab === 'wawancara' && (
          <div className="space-y-6 animate-fade-in">
            
            <div className="flex gap-4 mb-6">
               <div className="w-1/3">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Provinsi</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option>Pilih Provinsi</option>
                  </select>
               </div>
               <div className="w-1/3">
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Kab/Kota</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option>Pilih Kab/Kota</option>
                  </select>
               </div>
               <div className="flex items-end">
                  <button className="bg-green-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-green-700 h-[38px]">Filter</button>
               </div>
            </div>

            <h3 className="font-bold text-gray-800 mb-4">Penilaian Wawancara & Perhitungan Nirwasita Tantra Final</h3>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
               <div className="grid grid-cols-12 gap-6 bg-green-50 p-3 rounded-t-md border-b border-green-100">
                  <div className="col-span-4 text-xs font-bold text-gray-600 uppercase">Komponen</div>
                  <div className="col-span-2 text-xs font-bold text-gray-600 uppercase">Bobot</div>
                  <div className="col-span-4 text-xs font-bold text-gray-600 uppercase">Skor (0-100)</div>
                  <div className="col-span-2 text-xs font-bold text-gray-600 uppercase text-right">Skor Akhir</div>
               </div>
               {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="grid grid-cols-12 gap-6 p-4 border-b border-gray-100 items-center">
                     <div className="col-span-4 text-sm font-medium text-gray-800">Komponen Wawancara {i}</div>
                     <div className="col-span-2 text-sm text-green-500 font-medium">25%</div>
                     <div className="col-span-4">
                        <div className="relative">
                           <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-green-500 focus:border-green-500" placeholder="0" />
                           <span className="absolute right-3 top-2 text-gray-400 text-xs">/100</span>
                        </div>
                     </div>
                     <div className="col-span-2 text-right text-sm text-green-500 font-medium">0.0</div>
                  </div>
               ))}
               <div className="flex justify-end items-center p-4">
                  <span className="font-bold text-sm text-gray-700 mr-4">Total Skor Akhir Wawancara:</span>
                  <span className="text-xl font-bold text-green-600">0.0</span>
               </div>
            </div>

            {/* Ringkasan Nilai Akhir Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
               <h3 className="font-bold text-gray-800 mb-6">Ringkasan Nilai Akhir</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <div className="grid grid-cols-3 text-sm">
                        <span className="text-gray-500">Nama Daerah</span>
                        <span className="col-span-2 font-medium text-gray-800">Kabupaten Sleman</span>
                     </div>
                     <div className="grid grid-cols-3 text-sm">
                        <span className="text-gray-500">Jenis DLH</span>
                        <span className="col-span-2 font-medium text-gray-800">Kabupaten Besar</span>
                     </div>
                     <div className="grid grid-cols-3 text-sm">
                        <span className="text-gray-500">Tahun Penilaian</span>
                        <span className="col-span-2 font-medium text-gray-800">2025</span>
                     </div>
                  </div>
                  <div className="flex justify-center items-center">
                     <div className="bg-green-50 rounded-xl p-6 text-center w-full max-w-xs border border-green-100">
                        <div className="text-xs text-gray-500 mb-1">Nilai NT Final</div>
                        <div className="text-4xl font-extrabold text-green-600 mb-2">87.5</div>
                        <div className="bg-green-200 text-green-800 text-xs font-bold px-3 py-1 rounded-full inline-block">LULUS</div>
                     </div>
                  </div>
               </div>

               <div className="mt-8">
                  <h4 className="text-sm font-bold text-gray-800 mb-3">Rincian Skor per Tahap</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     <div className="bg-gray-100 rounded-lg p-4 text-center">
                        <div className="text-xs text-gray-500 mb-1">Penilaian SLHD</div>
                        <div className="text-lg font-bold text-gray-800">85</div>
                     </div>
                     <div className="bg-gray-100 rounded-lg p-4 text-center">
                        <div className="text-xs text-gray-500 mb-1">Penilaian Penghargaan</div>
                        <div className="text-lg font-bold text-gray-800">87</div>
                     </div>
                     <div className="bg-gray-100 rounded-lg p-4 text-center">
                        <div className="text-xs text-gray-500 mb-1">Validasi 1</div>
                        <div className="text-lg font-bold text-gray-800">Valid</div>
                     </div>
                     <div className="bg-gray-100 rounded-lg p-4 text-center">
                        <div className="text-xs text-gray-500 mb-1">Wawancara</div>
                        <div className="text-lg font-bold text-gray-800">92</div>
                     </div>
                  </div>
               </div>
               
               <div className="mt-6 flex justify-end">
                  <button className="bg-green-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-green-700">Finalisasi Nilai Akhir</button>
               </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}