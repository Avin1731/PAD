<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Tambah field ke slhd_laporans dengan pengecekan
        Schema::table('slhd_laporans', function (Blueprint $table) {
            if (!Schema::hasColumn('slhd_laporans', 'provinsi')) {
                $table->string('provinsi')->after('user_id');
            }
            if (!Schema::hasColumn('slhd_laporans', 'kabkota')) {
                $table->string('kabkota')->after('provinsi');
            }
            if (!Schema::hasColumn('slhd_laporans', 'pembagian_daerah')) {
                $table->enum('pembagian_daerah', [
                    'Kabupaten Kecil', 'Kabupaten Sedang', 'Kabupaten Besar', 
                    'Kota Kecil', 'Kota Sedang', 'Kota Besar'
                ])->after('kabkota');
            }
            if (!Schema::hasColumn('slhd_laporans', 'tipologi')) {
                $table->enum('tipologi', ['Daratan', 'Pesisir'])->after('pembagian_daerah');
            }
        });

        // Tambah field ke iklh_laporans dengan pengecekan
        Schema::table('iklh_laporans', function (Blueprint $table) {
            if (!Schema::hasColumn('iklh_laporans', 'provinsi')) {
                $table->string('provinsi')->after('user_id');
            }
            if (!Schema::hasColumn('iklh_laporans', 'kabkota')) {
                $table->string('kabkota')->after('provinsi');
            }
            if (!Schema::hasColumn('iklh_laporans', 'jenis_dlh')) {
                $table->enum('jenis_dlh', [
                    'Kabupaten Kecil', 'Kabupaten Sedang', 'Kabupaten Besar', 
                    'Kota Kecil', 'Kota Sedang', 'Kota Besar'
                ])->after('kabkota');
            }
            if (!Schema::hasColumn('iklh_laporans', 'tipologi')) {
                $table->enum('tipologi', ['Daratan', 'Pesisir'])->after('jenis_dlh');
            }
        });
    }

    public function down(): void
    {
        // Optional: Hapus kolom jika diperlukan
        Schema::table('slhd_laporans', function (Blueprint $table) {
            $table->dropColumn(['provinsi', 'kabkota', 'pembagian_daerah', 'tipologi']);
        });

        Schema::table('iklh_laporans', function (Blueprint $table) {
            $table->dropColumn(['provinsi', 'kabkota', 'jenis_dlh', 'tipologi']);
        });
    }
};