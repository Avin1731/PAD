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
        // Hapus data existing untuk menghindari duplikasi
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        SlhdLaporan::truncate();
        IklhLaporan::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1');

        // Ambil user pertama sebagai contoh
        $user = User::first();
        if (!$user) {
            // Jika tidak ada user, buat dummy user
            $user = User::create([
                'name' => 'Admin DLH',
                'email' => 'admin@dlh.go.id',
                'password' => bcrypt('password'),
            ]);
        }

        // Data SLHD - Sample data untuk berbagai provinsi dan kabupaten/kota
        $slhdData = [
            // Jawa Barat
            [
                'user_id' => $user->id,
                'provinsi' => 'Jawa Barat',
                'kabkota' => 'Kota Bandung',
                'pembagian_daerah' => 'Kabupaten/Kota Besar',
                'tipologi' => 'Daratan',
                'buku_1' => 'SLHD_Bandung_Buku1_2024.pdf',
                'buku_2' => 'SLHD_Bandung_Buku2_2024.pdf',
                'tabel_utama' => 'SLHD_Bandung_Tabel_2024.xlsx',
            ],
            [
                'user_id' => $user->id,
                'provinsi' => 'Jawa Barat',
                'kabkota' => 'Kota Bogor',
                'pembagian_daerah' => 'Kabupaten/Kota Sedang',
                'tipologi' => 'Daratan',
                'buku_1' => 'SLHD_Bogor_Buku1_2024.pdf',
                'buku_2' => null,
                'tabel_utama' => 'SLHD_Bogor_Tabel_2024.xlsx',
            ],
            [
                'user_id' => $user->id,
                'provinsi' => 'Jawa Barat',
                'kabkota' => 'Kabupaten Bandung',
                'pembagian_daerah' => 'Kabupaten/Kota Besar',
                'tipologi' => 'Daratan',
                'buku_1' => 'SLHD_KabBandung_Buku1_2024.pdf',
                'buku_2' => 'SLHD_KabBandung_Buku2_2024.pdf',
                'tabel_utama' => null,
            ],

            // Jawa Tengah
            [
                'user_id' => $user->id,
                'provinsi' => 'Jawa Tengah',
                'kabkota' => 'Kota Semarang',
                'pembagian_daerah' => 'Kabupaten/Kota Besar',
                'tipologi' => 'Pesisir',
                'buku_1' => 'SLHD_Semarang_Buku1_2024.pdf',
                'buku_2' => 'SLHD_Semarang_Buku2_2024.pdf',
                'tabel_utama' => 'SLHD_Semarang_Tabel_2024.xlsx',
            ],
            [
                'user_id' => $user->id,
                'provinsi' => 'Jawa Tengah',
                'kabkota' => 'Kota Surakarta',
                'pembagian_daerah' => 'Kabupaten/Kota Sedang',
                'tipologi' => 'Daratan',
                'buku_1' => 'SLHD_Surakarta_Buku1_2024.pdf',
                'buku_2' => null,
                'tabel_utama' => 'SLHD_Surakarta_Tabel_2024.xlsx',
            ],
            [
                'user_id' => $user->id,
                'provinsi' => 'Jawa Tengah',
                'kabkota' => 'Kabupaten Banyumas',
                'pembagian_daerah' => 'Kabupaten/Kota Sedang',
                'tipologi' => 'Daratan',
                'buku_1' => null,
                'buku_2' => 'SLHD_Banyumas_Buku2_2024.pdf',
                'tabel_utama' => 'SLHD_Banyumas_Tabel_2024.xlsx',
            ],

            // Jawa Timur
            [
                'user_id' => $user->id,
                'provinsi' => 'Jawa Timur',
                'kabkota' => 'Kota Surabaya',
                'pembagian_daerah' => 'Kabupaten/Kota Besar',
                'tipologi' => 'Pesisir',
                'buku_1' => 'SLHD_Surabaya_Buku1_2024.pdf',
                'buku_2' => 'SLHD_Surabaya_Buku2_2024.pdf',
                'tabel_utama' => 'SLHD_Surabaya_Tabel_2024.xlsx',
            ],
            [
                'user_id' => $user->id,
                'provinsi' => 'Jawa Timur',
                'kabkota' => 'Kota Malang',
                'pembagian_daerah' => 'Kabupaten/Kota Sedang',
                'tipologi' => 'Daratan',
                'buku_1' => 'SLHD_Malang_Buku1_2024.pdf',
                'buku_2' => null,
                'tabel_utama' => null,
            ],
            [
                'user_id' => $user->id,
                'provinsi' => 'Jawa Timur',
                'kabkota' => 'Kabupaten Jember',
                'pembagian_daerah' => 'Kabupaten/Kota Besar',
                'tipologi' => 'Daratan',
                'buku_1' => null,
                'buku_2' => null,
                'tabel_utama' => 'SLHD_Jember_Tabel_2024.xlsx',
            ],

            // Bali
            [
                'user_id' => $user->id,
                'provinsi' => 'Bali',
                'kabkota' => 'Kota Denpasar',
                'pembagian_daerah' => 'Kabupaten/Kota Kecil',
                'tipologi' => 'Pesisir',
                'buku_1' => 'SLHD_Denpasar_Buku1_2024.pdf',
                'buku_2' => 'SLHD_Denpasar_Buku2_2024.pdf',
                'tabel_utama' => 'SLHD_Denpasar_Tabel_2024.xlsx',
            ],

            // Sumatera Utara
            [
                'user_id' => $user->id,
                'provinsi' => 'Sumatera Utara',
                'kabkota' => 'Kota Medan',
                'pembagian_daerah' => 'Kabupaten/Kota Besar',
                'tipologi' => 'Pesisir',
                'buku_1' => 'SLHD_Medan_Buku1_2024.pdf',
                'buku_2' => null,
                'tabel_utama' => 'SLHD_Medan_Tabel_2024.xlsx',
            ],
        ];

        // Data IKLH - Sample data dengan berbagai nilai dan status verifikasi
        $iklhData = [
            // Jawa Barat - Nilai tinggi, terverifikasi
            [
                'user_id' => $user->id,
                'provinsi' => 'Jawa Barat',
                'kabkota' => 'Kota Bandung',
                'jenis_dlh' => 'Kabupaten/Kota Besar',
                'tipologi' => 'Daratan',
                'ika' => 85.50,
                'iku' => 78.20,
                'ikl' => 82.10,
                'ik_pesisir' => 0,
                'ik_kehati' => 88.30,
                'total_iklh' => 83.25,
                'verifikasi' => false,
            ],
            [
                'user_id' => $user->id,
                'provinsi' => 'Jawa Barat',
                'kabkota' => 'Kota Bogor',
                'jenis_dlh' => 'Kabupaten/Kota Sedang',
                'tipologi' => 'Daratan',
                'ika' => 82.10,
                'iku' => 75.80, // Nilai rendah (<60)
                'ikl' => 79.40,
                'ik_pesisir' => 0,
                'ik_kehati' => 81.60,
                'total_iklh' => 79.48,
                'verifikasi' => false,
            ],

            // Jawa Tengah - Nilai sedang
            [
                'user_id' => $user->id,
                'provinsi' => 'Jawa Tengah',
                'kabkota' => 'Kota Semarang',
                'jenis_dlh' => 'Kabupaten/Kota Besar',
                'tipologi' => 'Pesisir',
                'ika' => 78.50,
                'iku' => 72.30,
                'ikl' => 75.80,
                'ik_pesisir' => 80.20,
                'ik_kehati' => 77.60, // Nilai rendah (<70)
                'total_iklh' => 76.88,
                'verifikasi' => false,
            ],
            [
                'user_id' => $user->id,
                'provinsi' => 'Jawa Tengah',
                'kabkota' => 'Kota Surakarta',
                'jenis_dlh' => 'Kabupaten/Kota Sedang',
                'tipologi' => 'Daratan',
                'ika' => 80.20,
                'iku' => 76.50,
                'ikl' => 78.90,
                'ik_pesisir' => 0,
                'ik_kehati' => 82.10,
                'total_iklh' => 79.43,
                'verifikasi' => false,
            ],

            // Jawa Timur - Nilai bervariasi
            [
                'user_id' => $user->id,
                'provinsi' => 'Jawa Timur',
                'kabkota' => 'Kota Surabaya',
                'jenis_dlh' => 'Kabupaten/Kota Besar',
                'tipologi' => 'Pesisir',
                'ika' => 83.70,
                'iku' => 79.40,
                'ikl' => 81.20,
                'ik_pesisir' => 84.50,
                'ik_kehati' => 85.80,
                'total_iklh' => 82.92,
                'verifikasi' => false,
            ],
            [
                'user_id' => $user->id,
                'provinsi' => 'Jawa Timur',
                'kabkota' => 'Kota Malang',
                'jenis_dlh' => 'Kabupaten/Kota Sedang',
                'tipologi' => 'Daratan',
                'ika' => 76.80,
                'iku' => 71.20,
                'ikl' => 74.50,
                'ik_pesisir' => 0,
                'ik_kehati' => 78.90,
                'total_iklh' => 75.35,
                'verifikasi' => false,
            ],

            // Bali - Nilai tinggi
            [
                'user_id' => $user->id,
                'provinsi' => 'Bali',
                'kabkota' => 'Kota Denpasar',
                'jenis_dlh' => 'Kabupaten/Kota Kecil',
                'tipologi' => 'Pesisir',
                'ika' => 87.20,
                'iku' => 83.50,
                'ikl' => 85.10,
                'ik_pesisir' => 86.80,
                'ik_kehati' => 89.20,
                'total_iklh' => 86.36,
                'verifikasi' => false,
            ],

            // Sumatera Utara
            [
                'user_id' => $user->id,
                'provinsi' => 'Sumatera Utara',
                'kabkota' => 'Kota Medan',
                'jenis_dlh' => 'Kabupaten/Kota Besar',
                'tipologi' => 'Pesisir',
                'ika' => 79.80,
                'iku' => 74.60,
                'ikl' => 77.20,
                'ik_pesisir' => 81.40,
                'ik_kehati' => 80.10,
                'total_iklh' => 78.62,
                'verifikasi' => false,
            ],

            // Data tambahan untuk testing filter
            [
                'user_id' => $user->id,
                'provinsi' => 'Jawa Barat',
                'kabkota' => 'Kabupaten Bandung',
                'jenis_dlh' => 'Kabupaten/Kota Besar',
                'tipologi' => 'Daratan',
                'ika' => 81.50,
                'iku' => 77.80,
                'ikl' => 79.90,
                'ik_pesisir' => 0,
                'ik_kehati' => 83.40,
                'total_iklh' => 80.65,
                'verifikasi' => false,
            ],
            [
                'user_id' => $user->id,
                'provinsi' => 'Jawa Tengah',
                'kabkota' => 'Kabupaten Banyumas',
                'jenis_dlh' => 'Kabupaten/Kota Sedang',
                'tipologi' => 'Daratan',
                'ika' => 75.60,
                'iku' => 69.80,
                'ikl' => 72.40,
                'ik_pesisir' => 0,
                'ik_kehati' => 76.20, // Nilai rendah (<70)
                'total_iklh' => 73.50,
                'verifikasi' => false,
            ],
        ];

        // Insert data SLHD
        foreach ($slhdData as $data) {
            SlhdLaporan::create($data);
        }

        // Insert data IKLH
        foreach ($iklhData as $data) {
            IklhLaporan::create($data);
        }

        $this->command->info('Data Penerimaan SLHD dan IKLH berhasil di-generate!');
        $this->command->info('Total SLHD: ' . count($slhdData) . ' records');
        $this->command->info('Total IKLH: ' . count($iklhData) . ' records');
    }
}