<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Deadline; // Pastikan path model Anda benar
use Illuminate\Support\Facades\DB;

class DeadlineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Kosongkan tabel terlebih dahulu untuk menghindari duplikat saat seeding ulang
        DB::table('deadlines')->truncate();

        Deadline::create([
            'jenis_deadline' => 'Penilaian SLHD',
            'tanggal_mulai' => '2025-12-09',
            'tanggal_akhir' => '2025-12-20',
        ]);

        Deadline::create([
            'jenis_deadline' => 'Penilaian Penghargaan',
            'tanggal_mulai' => '2025-01-03',
            'tanggal_akhir' => '2025-01-11',
        ]);
        
        Deadline::create([
            'jenis_deadline' => 'Validasi 1',
            'tanggal_mulai' => '2025-01-23',
            'tanggal_akhir' => '2025-01-27',
        ]);
        
        Deadline::create([
            'jenis_deadline' => 'Validasi 2',
            'tanggal_mulai' => '2025-02-04',
            'tanggal_akhir' => '2025-02-12',
        ]);
        
        Deadline::create([
            'jenis_deadline' => 'Dokumen SLHD', // Menggunakan nama dari halaman sebelumnya
            'tanggal_mulai' => '2025-02-04',
            'tanggal_akhir' => '2025-02-12',
        ]);
        
        Deadline::create([
            'jenis_deadline' => 'Nilai IKLH', // Menggunakan nama dari halaman sebelumnya
            'tanggal_mulai' => '2025-02-04',
            'tanggal_akhir' => '2025-02-12',
        ]);
    }
}