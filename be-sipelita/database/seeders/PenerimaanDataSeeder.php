<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SlhdLaporan;
use App\Models\IklhLaporan;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class PenerimaanDataSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Bersihkan data lama
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        SlhdLaporan::truncate();
        IklhLaporan::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1');

        // 2. Definisi Data Dummy Penerimaan yang Bervariasi
        // Fokus: Kelengkapan Dokumen (File ada/null) & Status Awal
        $penerimaanData = [
            // --- KASUS 1: LENGKAP & SEMPURNA (Jawa Barat) ---
            [
                'email' => 'dlh.bandung@example.com',
                'name' => 'DLH Kota Bandung',
                'kabkota' => 'Kota Bandung',
                'provinsi' => 'Jawa Barat',
                'jenis_dlh' => 'Kota Besar',
                'tipologi' => 'Daratan',
                // SLHD: Semua ada
                'slhd_files' => [
                    'buku_1' => 'SLHD_Bdg_Buku1.pdf',
                    'buku_2' => 'SLHD_Bdg_Buku2.pdf',
                    'tabel' => 'SLHD_Bdg_Tabel.xlsx'
                ],
                // IKLH: Nilai sudah diisi (simulasi user sudah input)
                'iklh_data' => [
                    'ika' => 85.50, 'iku' => 78.20, 'ikl' => 82.10, 
                    'ik_pesisir' => 0, 'ik_kehati' => 88.30, 'total' => 83.25,
                    'verifikasi' => false // Diubah jadi false
                ]
            ],

            // --- KASUS 2: KURANG LENGKAP (Jawa Barat) ---
            [
                'email' => 'dlh.bogor@example.com',
                'name' => 'DLH Kota Bogor',
                'kabkota' => 'Kota Bogor',
                'provinsi' => 'Jawa Barat',
                'jenis_dlh' => 'Kota Sedang',
                'tipologi' => 'Daratan',
                // SLHD: Buku 2 Hilang
                'slhd_files' => [
                    'buku_1' => 'SLHD_Bogor_Buku1.pdf',
                    'buku_2' => null, 
                    'tabel' => 'SLHD_Bogor_Tabel.xlsx'
                ],
                // IKLH: Belum diverifikasi
                'iklh_data' => [
                    'ika' => 82.10, 'iku' => 75.80, 'ikl' => 79.40, 
                    'ik_pesisir' => 0, 'ik_kehati' => 81.60, 'total' => 79.48,
                    'verifikasi' => false
                ]
            ],

            // --- KASUS 3: PESISIR & LENGKAP (Jawa Tengah) ---
            [
                'email' => 'dlh.semarang@example.com',
                'name' => 'DLH Kota Semarang',
                'kabkota' => 'Kota Semarang',
                'provinsi' => 'Jawa Tengah',
                'jenis_dlh' => 'Kota Besar',
                'tipologi' => 'Pesisir',
                'slhd_files' => [
                    'buku_1' => 'SLHD_Smg_Buku1.pdf',
                    'buku_2' => 'SLHD_Smg_Buku2.pdf',
                    'tabel' => 'SLHD_Smg_Tabel.xlsx'
                ],
                'iklh_data' => [
                    'ika' => 78.50, 'iku' => 72.30, 'ikl' => 75.80, 
                    'ik_pesisir' => 80.20, 'ik_kehati' => 77.60, 'total' => 76.88,
                    'verifikasi' => false // Diubah jadi false
                ]
            ],

            // --- KASUS 4: BARU DAFTAR / KOSONG (Jawa Timur) ---
            [
                'email' => 'dlh.jember@example.com',
                'name' => 'DLH Kabupaten Jember',
                'kabkota' => 'Kabupaten Jember',
                'provinsi' => 'Jawa Timur',
                'jenis_dlh' => 'Kabupaten Besar',
                'tipologi' => 'Daratan',
                // SLHD: Belum ada sama sekali
                'slhd_files' => [
                    'buku_1' => null,
                    'buku_2' => null,
                    'tabel' => null
                ],
                // IKLH: Masih nol semua
                'iklh_data' => [
                    'ika' => 0, 'iku' => 0, 'ikl' => 0, 
                    'ik_pesisir' => 0, 'ik_kehati' => 0, 'total' => 0,
                    'verifikasi' => false
                ]
            ],

            // --- KASUS 5: PESISIR LUAR JAWA (Bali) ---
            [
                'email' => 'dlh.denpasar@example.com',
                'name' => 'DLH Kota Denpasar',
                'kabkota' => 'Kota Denpasar',
                'provinsi' => 'Bali',
                'jenis_dlh' => 'Kota Sedang',
                'tipologi' => 'Pesisir',
                'slhd_files' => [
                    'buku_1' => 'SLHD_Dps_Buku1.pdf', 
                    'buku_2' => 'SLHD_Dps_Buku2.pdf', 
                    'tabel' => 'SLHD_Dps_Tabel.xlsx'
                ],
                'iklh_data' => [
                    'ika' => 87.20, 'iku' => 83.50, 'ikl' => 85.10, 
                    'ik_pesisir' => 86.80, 'ik_kehati' => 89.20, 'total' => 86.36,
                    'verifikasi' => false // Diubah jadi false
                ]
            ],

            // --- KASUS 6: DARATAN LUAR JAWA (Sumatera Utara) ---
            [
                'email' => 'dlh.medan@example.com',
                'name' => 'DLH Kota Medan',
                'kabkota' => 'Kota Medan',
                'provinsi' => 'Sumatera Utara',
                'jenis_dlh' => 'Kota Besar',
                'tipologi' => 'Daratan', // Anggap daratan untuk variasi, meski dekat laut
                'slhd_files' => [
                    'buku_1' => 'SLHD_Mdn_Buku1.pdf', 
                    'buku_2' => null, // Kurang 1 buku
                    'tabel' => 'SLHD_Mdn_Tabel.xlsx'
                ],
                'iklh_data' => [
                    'ika' => 79.80, 'iku' => 74.60, 'ikl' => 77.20, 
                    'ik_pesisir' => 0, 'ik_kehati' => 80.10, 'total' => 78.62,
                    'verifikasi' => false
                ]
            ],
             // --- KASUS 7: DARATAN KALIMANTAN (Kalimantan Barat) ---
             [
                'email' => 'dlh.pontianak@example.com',
                'name' => 'DLH Kota Pontianak',
                'kabkota' => 'Kota Pontianak',
                'provinsi' => 'Kalimantan Barat',
                'jenis_dlh' => 'Kota Sedang',
                'tipologi' => 'Daratan',
                'slhd_files' => [
                    'buku_1' => 'SLHD_Ptk_Buku1.pdf',
                    'buku_2' => 'SLHD_Ptk_Buku2.pdf',
                    'tabel' => 'SLHD_Ptk_Tabel.xlsx'
                ],
                'iklh_data' => [
                    'ika' => 80.50, 'iku' => 79.20, 'ikl' => 81.10, 
                    'ik_pesisir' => 0, 'ik_kehati' => 85.30, 'total' => 81.52,
                    'verifikasi' => false // Diubah jadi false
                ]
            ],
             // --- KASUS 8: PESISIR SULAWESI (Sulawesi Selatan) ---
             [
                'email' => 'dlh.makassar@example.com',
                'name' => 'DLH Kota Makassar',
                'kabkota' => 'Kota Makassar',
                'provinsi' => 'Sulawesi Selatan',
                'jenis_dlh' => 'Kota Besar',
                'tipologi' => 'Pesisir',
                'slhd_files' => [
                    'buku_1' => 'SLHD_Mks_Buku1.pdf',
                    'buku_2' => null, // Belum lengkap
                    'tabel' => null
                ],
                'iklh_data' => [
                    'ika' => 75.50, 'iku' => 70.20, 'ikl' => 72.10, 
                    'ik_pesisir' => 80.0, 'ik_kehati' => 78.30, 'total' => 75.22,
                    'verifikasi' => false
                ]
            ]
        ];

        // 3. Loop dan Insert ke Database
        foreach ($penerimaanData as $data) {
            // a. Pastikan User Ada
            $user = User::firstOrCreate(
                ['email' => $data['email']],
                [
                    'name' => $data['name'],
                    'password' => bcrypt('password'), // Default password
                    'role_id' => 2, // Sesuaikan ID role DLH Anda
                ]
            );

            // b. Insert ke tabel Penerimaan SLHD (Fokus checklist dokumen)
            SlhdLaporan::create([
                'user_id' => $user->id,
                'provinsi' => $data['provinsi'],
                'kabkota' => $data['kabkota'],
                'pembagian_daerah' => $data['jenis_dlh'],
                'tipologi' => $data['tipologi'],
                // File dokumen (bisa null)
                'buku_1' => $data['slhd_files']['buku_1'],
                'buku_2' => $data['slhd_files']['buku_2'],
                'tabel_utama' => $data['slhd_files']['tabel'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // c. Insert ke tabel Penerimaan IKLH (Fokus nilai awal)
            IklhLaporan::create([
                'user_id' => $user->id,
                'provinsi' => $data['provinsi'],
                'kabkota' => $data['kabkota'],
                'jenis_dlh' => $data['jenis_dlh'], // Pastikan kolom ini ada di migrasi Anda
                'tipologi' => $data['tipologi'],
                // Nilai-nilai
                'ika' => $data['iklh_data']['ika'],
                'iku' => $data['iklh_data']['iku'],
                'ikl' => $data['iklh_data']['ikl'],
                'ik_pesisir' => $data['iklh_data']['ik_pesisir'],
                'ik_kehati' => $data['iklh_data']['ik_kehati'],
                'total_iklh' => $data['iklh_data']['total'],
                'verifikasi' => $data['iklh_data']['verifikasi'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $this->command->info('Data Dummy Penerimaan (Checklist Dokumen) berhasil di-generate!');
    }
}