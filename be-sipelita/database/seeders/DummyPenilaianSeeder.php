<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\SlhdLaporan;
use App\Models\IklhLaporan;
use Illuminate\Support\Facades\DB;

class DummyPenilaianSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Bersihkan data lama untuk mencegah duplikasi saat re-seed
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        SlhdLaporan::truncate();
        IklhLaporan::truncate();
        // Opsional: Hapus user dummy jika ingin bersih total, tapi hati-hati jika ada user admin
        // User::where('email', 'like', 'dlh.%')->delete(); 
        DB::statement('SET FOREIGN_KEY_CHECKS=1');

        // 2. Definisi Data Dummy yang Lebih Banyak dan Bervariasi
        $kabupatenData = [
            // --- DIY (Existing) ---
            [
                'email' => 'dlh.sleman@example.com',
                'name' => 'DLH Kabupaten Sleman',
                'kabkota' => 'Kabupaten Sleman',
                'provinsi' => 'DI Yogyakarta',
                'jenis_dlh' => 'Kabupaten Besar',
                'tipologi' => 'Daratan',
                'slhd_files' => ['buku_1' => 'Buku1_Sleman.pdf', 'buku_2' => 'Buku2_Sleman.pdf', 'tabel' => 'Tabel_Sleman.xlsx'],
                'iklh_scores' => ['ika' => 87.5, 'iku' => 86.0, 'ikl' => 85.5, 'ik_pesisir' => 0, 'ik_kehati' => 88.0, 'total' => 87.0],
                'status_validasi' => false // Diubah jadi false
            ],
            [
                'email' => 'dlh.bantul@example.com',
                'name' => 'DLH Kabupaten Bantul',
                'kabkota' => 'Kabupaten Bantul',
                'provinsi' => 'DI Yogyakarta',
                'jenis_dlh' => 'Kabupaten Besar',
                'tipologi' => 'Pesisir',
                'slhd_files' => ['buku_1' => 'Buku1_Bantul.pdf', 'buku_2' => 'Buku2_Bantul.pdf', 'tabel' => 'Tabel_Bantul.xlsx'],
                'iklh_scores' => ['ika' => 83.0, 'iku' => 82.5, 'ikl' => 81.0, 'ik_pesisir' => 85.0, 'ik_kehati' => 84.0, 'total' => 83.5],
                'status_validasi' => false // Diubah jadi false
            ],
            [
                'email' => 'dlh.gunungkidul@example.com',
                'name' => 'DLH Kabupaten Gunung Kidul',
                'kabkota' => 'Kabupaten Gunung Kidul',
                'provinsi' => 'DI Yogyakarta',
                'jenis_dlh' => 'Kabupaten Besar',
                'tipologi' => 'Pesisir',
                'slhd_files' => ['buku_1' => 'Buku1_GK.pdf', 'buku_2' => 'Buku2_GK.pdf', 'tabel' => 'Tabel_GK.xlsx'],
                'iklh_scores' => ['ika' => 79.0, 'iku' => 80.0, 'ikl' => 78.5, 'ik_pesisir' => 82.0, 'ik_kehati' => 81.0, 'total' => 80.1],
                'status_validasi' => false // Diubah jadi false
            ],

            // --- JAWA TENGAH ---
            [
                'email' => 'dlh.semarang@example.com',
                'name' => 'DLH Kota Semarang',
                'kabkota' => 'Kota Semarang',
                'provinsi' => 'Jawa Tengah',
                'jenis_dlh' => 'Kota Besar',
                'tipologi' => 'Pesisir',
                'slhd_files' => ['buku_1' => 'Buku1_Semarang.pdf', 'buku_2' => 'Buku2_Semarang.pdf', 'tabel' => 'Tabel_Semarang.xlsx'],
                'iklh_scores' => ['ika' => 85.0, 'iku' => 78.0, 'ikl' => 76.5, 'ik_pesisir' => 88.0, 'ik_kehati' => 79.0, 'total' => 81.3],
                'status_validasi' => false // Diubah jadi false
            ],
            [
                'email' => 'dlh.banyumas@example.com',
                'name' => 'DLH Kabupaten Banyumas',
                'kabkota' => 'Kabupaten Banyumas',
                'provinsi' => 'Jawa Tengah',
                'jenis_dlh' => 'Kabupaten Besar',
                'tipologi' => 'Daratan',
                'slhd_files' => ['buku_1' => 'Buku1_Banyumas.pdf', 'buku_2' => null, 'tabel' => 'Tabel_Banyumas.xlsx'], // Contoh Buku 2 belum ada
                'iklh_scores' => ['ika' => 81.0, 'iku' => 84.0, 'ikl' => 80.0, 'ik_pesisir' => 0, 'ik_kehati' => 82.0, 'total' => 81.7],
                'status_validasi' => false // Belum valid
            ],
            [
                'email' => 'dlh.surakarta@example.com',
                'name' => 'DLH Kota Surakarta',
                'kabkota' => 'Kota Surakarta',
                'provinsi' => 'Jawa Tengah',
                'jenis_dlh' => 'Kota Sedang',
                'tipologi' => 'Daratan',
                'slhd_files' => ['buku_1' => 'Buku1_Solo.pdf', 'buku_2' => 'Buku2_Solo.pdf', 'tabel' => 'Tabel_Solo.xlsx'],
                'iklh_scores' => ['ika' => 88.0, 'iku' => 75.0, 'ikl' => 79.0, 'ik_pesisir' => 0, 'ik_kehati' => 70.0, 'total' => 78.0],
                'status_validasi' => false // Diubah jadi false
            ],

            // --- JAWA TIMUR ---
            [
                'email' => 'dlh.surabaya@example.com',
                'name' => 'DLH Kota Surabaya',
                'kabkota' => 'Kota Surabaya',
                'provinsi' => 'Jawa Timur',
                'jenis_dlh' => 'Kota Besar',
                'tipologi' => 'Pesisir',
                'slhd_files' => ['buku_1' => 'Buku1_Sby.pdf', 'buku_2' => 'Buku2_Sby.pdf', 'tabel' => 'Tabel_Sby.xlsx'],
                'iklh_scores' => ['ika' => 90.0, 'iku' => 88.0, 'ikl' => 85.0, 'ik_pesisir' => 91.0, 'ik_kehati' => 89.0, 'total' => 88.6],
                'status_validasi' => false // Diubah jadi false
            ],
            [
                'email' => 'dlh.malang@example.com',
                'name' => 'DLH Kota Malang',
                'kabkota' => 'Kota Malang',
                'provinsi' => 'Jawa Timur',
                'jenis_dlh' => 'Kota Besar',
                'tipologi' => 'Daratan',
                'slhd_files' => ['buku_1' => 'Buku1_Malang.pdf', 'buku_2' => 'Buku2_Malang.pdf', 'tabel' => null],
                'iklh_scores' => ['ika' => 84.0, 'iku' => 82.0, 'ikl' => 80.0, 'ik_pesisir' => 0, 'ik_kehati' => 83.0, 'total' => 82.2],
                'status_validasi' => false
            ],

            // --- JAWA BARAT ---
            [
                'email' => 'dlh.bogor@example.com',
                'name' => 'DLH Kabupaten Bogor',
                'kabkota' => 'Kabupaten Bogor',
                'provinsi' => 'Jawa Barat',
                'jenis_dlh' => 'Kabupaten Besar',
                'tipologi' => 'Daratan',
                'slhd_files' => ['buku_1' => 'Buku1_Bogor.pdf', 'buku_2' => 'Buku2_Bogor.pdf', 'tabel' => 'Tabel_Bogor.xlsx'],
                'iklh_scores' => ['ika' => 78.0, 'iku' => 76.0, 'ikl' => 75.0, 'ik_pesisir' => 0, 'ik_kehati' => 80.0, 'total' => 77.2],
                'status_validasi' => false // Diubah jadi false
            ],
            [
                'email' => 'dlh.bandung@example.com',
                'name' => 'DLH Kota Bandung',
                'kabkota' => 'Kota Bandung',
                'provinsi' => 'Jawa Barat',
                'jenis_dlh' => 'Kota Besar',
                'tipologi' => 'Daratan',
                'slhd_files' => ['buku_1' => 'Buku1_Bdg.pdf', 'buku_2' => 'Buku2_Bdg.pdf', 'tabel' => 'Tabel_Bdg.xlsx'],
                'iklh_scores' => ['ika' => 82.0, 'iku' => 80.0, 'ikl' => 78.0, 'ik_pesisir' => 0, 'ik_kehati' => 75.0, 'total' => 78.7],
                'status_validasi' => false // Diubah jadi false
            ],

            // --- LUAR JAWA (Kalimantan, Bali, Sulawesi, Sumatera) ---
            [
                'email' => 'dlh.balikpapan@example.com',
                'name' => 'DLH Kota Balikpapan',
                'kabkota' => 'Kota Balikpapan',
                'provinsi' => 'Kalimantan Timur',
                'jenis_dlh' => 'Kota Sedang',
                'tipologi' => 'Pesisir',
                'slhd_files' => ['buku_1' => 'Buku1_Bpp.pdf', 'buku_2' => 'Buku2_Bpp.pdf', 'tabel' => 'Tabel_Bpp.xlsx'],
                'iklh_scores' => ['ika' => 89.0, 'iku' => 85.0, 'ikl' => 88.0, 'ik_pesisir' => 90.0, 'ik_kehati' => 92.0, 'total' => 88.8],
                'status_validasi' => false // Diubah jadi false
            ],
            [
                'email' => 'dlh.denpasar@example.com',
                'name' => 'DLH Kota Denpasar',
                'kabkota' => 'Kota Denpasar',
                'provinsi' => 'Bali',
                'jenis_dlh' => 'Kota Sedang',
                'tipologi' => 'Pesisir',
                'slhd_files' => ['buku_1' => 'Buku1_Dps.pdf', 'buku_2' => 'Buku2_Dps.pdf', 'tabel' => 'Tabel_Dps.xlsx'],
                'iklh_scores' => ['ika' => 91.0, 'iku' => 89.0, 'ikl' => 90.0, 'ik_pesisir' => 93.0, 'ik_kehati' => 88.0, 'total' => 90.2],
                'status_validasi' => false // Diubah jadi false
            ],
            [
                'email' => 'dlh.makassar@example.com',
                'name' => 'DLH Kota Makassar',
                'kabkota' => 'Kota Makassar',
                'provinsi' => 'Sulawesi Selatan',
                'jenis_dlh' => 'Kota Besar',
                'tipologi' => 'Pesisir',
                'slhd_files' => ['buku_1' => 'Buku1_Mks.pdf', 'buku_2' => 'Buku2_Mks.pdf', 'tabel' => 'Tabel_Mks.xlsx'],
                'iklh_scores' => ['ika' => 80.0, 'iku' => 78.0, 'ikl' => 79.0, 'ik_pesisir' => 85.0, 'ik_kehati' => 77.0, 'total' => 79.8],
                'status_validasi' => false // Diubah jadi false
            ],
            [
                'email' => 'dlh.medan@example.com',
                'name' => 'DLH Kota Medan',
                'kabkota' => 'Kota Medan',
                'provinsi' => 'Sumatera Utara',
                'jenis_dlh' => 'Kota Besar',
                'tipologi' => 'Daratan',
                'slhd_files' => ['buku_1' => 'Buku1_Medan.pdf', 'buku_2' => 'Buku2_Medan.pdf', 'tabel' => 'Tabel_Medan.xlsx'],
                'iklh_scores' => ['ika' => 77.0, 'iku' => 75.0, 'ikl' => 74.0, 'ik_pesisir' => 0, 'ik_kehati' => 76.0, 'total' => 75.5],
                'status_validasi' => false
            ],
        ];

        // 3. Loop dan Insert Data
        foreach ($kabupatenData as $data) {
            // a. Pastikan User Ada (Create jika belum ada)
            $user = User::firstOrCreate(
                ['email' => $data['email']],
                [
                    'name' => $data['name'],
                    'password' => bcrypt('password'), // Default password
                    'role_id' => 2, // Asumsi ID 2 adalah DLH Kab/Kota
                    // Field lain yang wajib di tabel users (sesuaikan dengan migrasi Anda)
                    // 'nip' => '123456789', 
                    // 'instansi' => 'DLH',
                ]
            );

            // b. Seed Data SLHD Laporan
            SlhdLaporan::create([
                'user_id' => $user->id,
                'provinsi' => $data['provinsi'],
                'kabkota' => $data['kabkota'],
                'pembagian_daerah' => $data['jenis_dlh'],
                'tipologi' => $data['tipologi'],
                'buku_1' => $data['slhd_files']['buku_1'],
                'buku_2' => $data['slhd_files']['buku_2'],
                'tabel_utama' => $data['slhd_files']['tabel'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // c. Seed Data IKLH Laporan (Nilai)
            IklhLaporan::create([
                'user_id' => $user->id,
                'provinsi' => $data['provinsi'],
                'kabkota' => $data['kabkota'],
                'jenis_dlh' => $data['jenis_dlh'],
                'tipologi' => $data['tipologi'],
                'ika' => $data['iklh_scores']['ika'],
                'iku' => $data['iklh_scores']['iku'],
                'ikl' => $data['iklh_scores']['ikl'],
                'ik_pesisir' => $data['iklh_scores']['ik_pesisir'],
                'ik_kehati' => $data['iklh_scores']['ik_kehati'],
                'total_iklh' => $data['iklh_scores']['total'],
                'verifikasi' => $data['status_validasi'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $this->command->info('Data Dummy Penilaian Lengkap (14 Daerah) berhasil di-generate!');
    }
}