<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class FixRegenciesAndUsersProvinceIdSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Tambah kolom province_id jika belum ada
        if (!Schema::hasColumn('regencies', 'province_id')) {
            DB::statement('ALTER TABLE regencies ADD COLUMN province_id VARCHAR(255) NULL AFTER name');
        }

        // 2. Update province_id di regencies
        DB::table('regencies')
            ->whereNull('province_id')
            ->update([
                'province_id' => DB::raw('SUBSTRING(id, 1, 2)')
            ]);

        // 3. Update province_id di users untuk DLH Kab/Kota
        DB::table('users')
            ->where('role_id', 3)
            ->where('jenis_dlh_id', 2)
            ->whereNull('province_id')
            ->update([
                'province_id' => DB::raw('SUBSTRING(regency_id, 1, 2)')
            ]);

        $this->command->info('✅ Province ID berhasil di-update untuk regencies dan users!');
    }
}