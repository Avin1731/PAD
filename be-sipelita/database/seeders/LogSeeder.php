<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Log;
use App\Models\User;
use App\Models\Role;
use Carbon\Carbon;

class LogSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Ambil User Sample untuk dikaitkan dengan Log
        // Pastikan UserSeeder sudah dijalankan sebelumnya
        $admin = User::whereHas('role', function($q) { $q->where('name', 'Admin'); })->first();
        $pusdatin = User::whereHas('role', function($q) { $q->where('name', 'Pusdatin'); })->first();
        
        // Ambil DLH Provinsi (User dengan role DLH & jenis DLH Provinsi)
        $dlhProv = User::whereHas('role', function($q) { $q->where('name', 'DLH'); })
                        ->whereHas('jenisDlh', function($q) { $q->where('name', 'DLH Provinsi'); })
                        ->first();

        // Ambil DLH Kab/Kota
        $dlhKab = User::whereHas('role', function($q) { $q->where('name', 'DLH'); })
                       ->whereHas('jenisDlh', function($q) { $q->where('name', 'DLH Kab-Kota'); })
                       ->first();

        // Jika database kosong (belum di-seed user), skip agar tidak error
        if (!$admin || !$pusdatin) {
            $this->command->info('User tidak ditemukan. Jalankan UserSeeder terlebih dahulu.');
            return;
        }

        // 2. Buat Data Log Dummy (Sesuai MOCK_LOGS Anda)
        
        // Log 1: Admin menyetujui akun
        Log::create([
            'user_id' => $admin->id,
            'action' => 'Menyetujui akun DLH',
            'target' => 'DLH Provinsi Jawa Barat', // Hardcode nama target untuk contoh
            'description' => 'Persetujuan akun baru',
            'created_at' => Carbon::now()->subMinutes(2), // "2 menit yang lalu"
        ]);

        // Log 2: Pusdatin mengubah deadline
        Log::create([
            'user_id' => $pusdatin->id,
            'action' => 'Mengubah Deadline',
            'target' => 'Dokumen SLHD',
            'description' => 'Perubahan jadwal penerimaan',
            'created_at' => Carbon::now()->subMinutes(10), // "10 menit yang lalu"
        ]);

        // Log 3: Admin membuat akun
        // Kita pakai admin yang sama atau beda jika ada
        Log::create([
            'user_id' => $admin->id,
            'action' => 'Membuat Akun',
            'target' => 'Pusdatin Baru',
            'description' => 'Pembuatan akun staf baru',
            'created_at' => Carbon::now()->subHour(1), // "1 jam yang lalu"
        ]);

        // Log 4: DLH Kab/Kota Upload Dokumen
        if ($dlhKab) {
            Log::create([
                'user_id' => $dlhKab->id,
                'action' => 'Upload Dokumen',
                'target' => 'BAB 1',
                'description' => 'Pengunggahan dokumen laporan',
                'created_at' => Carbon::now()->subHours(3), // "3 jam yang lalu"
            ]);
        }

        // Log 5: DLH Provinsi Login
        if ($dlhProv) {
            Log::create([
                'user_id' => $dlhProv->id,
                'action' => 'Login',
                'target' => '-',
                'description' => 'User masuk ke sistem',
                'created_at' => Carbon::now()->subHours(5), // "5 jam yang lalu"
            ]);
        }
    }
}