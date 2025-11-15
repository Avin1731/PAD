<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use App\Models\JenisDlh;
use App\Models\Province;
use App\Models\Regency;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Ambil ID Role & Jenis
        $adminRole = Role::where('name', 'Admin')->first();
        $pusdatinRole = Role::where('name', 'Pusdatin')->first();
        $dlhRole = Role::where('name', 'DLH')->first();

        $dlhProvinsi = JenisDlh::where('name', 'DLH Provinsi')->first();
        $dlhKabKota = JenisDlh::where('name', 'DLH Kab-Kota')->first();

        // Ambil semua provinsi dan kabupaten/kota untuk dipilih secara acak
        $provinces = Province::all();
        $regencies = Regency::all();

        // Password default
        $defaultPassword = Hash::make('password');

        // --- BUAT 100 ADMIN ---
        for ($i = 1; $i <= 100; $i++) {
            User::create([
                'name' => "Admin {$i}",
                'email' => "admin{$i}@sipelita.com",
                'nomor_telepon' => '08123456' . str_pad($i + 100, 4, '0', STR_PAD_LEFT), // Contoh: 081234560101
                'password' => $defaultPassword,
                'role_id' => $adminRole->id,
                'status' => 'aktif',
            ]);
        }

        // --- BUAT 100 PUSDATIN ---
        for ($i = 1; $i <= 100; $i++) {
            User::create([
                'name' => "Pusdatin {$i}",
                'email' => "pusdatin{$i}@sipelita.com",
                'nomor_telepon' => '08123456' . str_pad($i + 200, 4, '0', STR_PAD_LEFT), // Contoh: 081234560201
                'password' => $defaultPassword,
                'role_id' => $pusdatinRole->id,
                'status' => 'aktif',
            ]);
        }

        // --- BUAT 100 DLH PROVINSI ---
        for ($i = 1; $i <= 100; $i++) {
            $randomProvince = $provinces->random();

            User::create([
                'name' => "DLH Provinsi {$randomProvince->name} {$i}",
                'email' => "dlh.prov.{$i}.{$randomProvince->id}@sipelita.com",
                'nomor_telepon' => '08123456' . str_pad($i + 300, 4, '0', STR_PAD_LEFT), // Contoh: 081234560301
                'password' => $defaultPassword,
                'role_id' => $dlhRole->id,
                'jenis_dlh_id' => $dlhProvinsi->id,
                'province_id' => $randomProvince->id,
                'regency_id' => null,
                'pesisir' => collect(['Ya', 'Tidak'])->random(), // Acak pesisir
                'status' => 'aktif',
            ]);
        }

        // --- BUAT 100 DLH KAB/KOTA ---
        for ($i = 1; $i <= 100; $i++) {
            $randomRegency = $regencies->random();

            User::create([
                'name' => "DLH Kab/Kota {$randomRegency->name} {$i}",
                'email' => "dlh.kabkota.{$i}.{$randomRegency->id}@sipelita.com",
                'nomor_telepon' => '08123456' . str_pad($i + 400, 4, '0', STR_PAD_LEFT), // Contoh: 081234560401
                'password' => $defaultPassword,
                'role_id' => $dlhRole->id,
                'jenis_dlh_id' => $dlhKabKota->id,
                'province_id' => $randomRegency->province_id, // Ambil province_id dari regency
                'regency_id' => $randomRegency->id,
                'pesisir' => collect(['Ya', 'Tidak'])->random(), // Acak pesisir
                'status' => 'aktif',
            ]);
        }
    }
}