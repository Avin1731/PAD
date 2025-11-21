<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // HAPUS SEMUA ISI BAWAAN DAN GANTI DENGAN INI:
        $this->call([
            RoleSeeder::class,
            JenisDlhSeeder::class,
            ProvinceSeeder::class,
            RegencySeeder::class,
            FixRegenciesAndUsersProvinceIdSeeder::class,
            UserSeeder::class,
            PendingUserSeeder::class,
            DeadlineSeeder::class,
            LogSeeder::class,
            PenerimaanDataSeeder::class,
        ]);
    }
}