<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use App\Models\JenisDlh;
use App\Models\Province;
use App\Models\Regency;
use Illuminate\Support\Str;

class PendingUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ambil ID dari Role dan Jenis DLH
        $dlhRole = Role::where('name', 'DLH')->first();
        $provinsiDlh = JenisDlh::where('name', 'DLH Provinsi')->first();
        $kabKotaDlh = JenisDlh::where('name', 'DLH Kab-Kota')->first();

        // Ambil provinsi dan regency untuk data acak
        $provinces = Province::all();
        $regencies = Regency::all();

        if (!$dlhRole || !$provinsiDlh || !$kabKotaDlh) {
            $this->command->error('Pastikan Role "DLH" dan Jenis DLH sudah ada. Jalankan seeder yang relevan terlebih dahulu.');
            return;
        }

        // --- BUAT 35 PENGGUNA PENDING (DLH PROVINSI) ---
        $provinces->random(35)->each(function ($province) use ($dlhRole, $provinsiDlh) {
            User::factory()
                ->pending() // Gunakan state pending()
                ->create([
                    'name' => 'Pending Prov ' . $province->name,
                    'email' => 'pending.prov.' . Str::slug($province->name) . '@sipelita.com',
                    'role_id' => $dlhRole->id,
                    'jenis_dlh_id' => $provinsiDlh->id,
                    'province_id' => $province->id,
                    'regency_id' => null,
                ]);
        });


        // --- BUAT 45 PENGGUNA PENDING (DLH KAB/KOTA) ---
        $regencies->random(45)->each(function ($regency) use ($dlhRole, $kabKotaDlh) {
            User::factory()
                ->pending() // Gunakan state pending()
                ->create([
                    'name' => 'Pending Kab ' . $regency->name,
                    'email' => 'pending.kab.' . Str::slug($regency->name) . '@sipelita.com',
                    'role_id' => $dlhRole->id,
                    'jenis_dlh_id' => $kabKotaDlh->id,
                    'province_id' => $regency->province_id,
                    'regency_id' => $regency->id,
                ]);
        });
    }
}