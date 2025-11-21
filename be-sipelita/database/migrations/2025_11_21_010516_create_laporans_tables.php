<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Tabel SLHD Laporan
        Schema::create('slhd_laporans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            
            // Field Frontend
            $table->string('provinsi');
            $table->string('kabkota');
            
            // UBAH KE STRING: Untuk menghindari error "Data truncated"
            // karena data seeder "Kabupaten/Kota Besar" tidak ada di list enum
            $table->string('pembagian_daerah')->nullable(); 
            $table->string('tipologi')->nullable();
            
            // Field Existing
            $table->string('buku_1')->nullable();
            $table->string('buku_2')->nullable();
            $table->string('tabel_utama')->nullable();
            $table->timestamps();
        });

        // 2. Tabel IKLH Laporan
        Schema::create('iklh_laporans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            
            // Field Frontend
            $table->string('provinsi');
            $table->string('kabkota');
            
            // UBAH KE STRING: Agar fleksibel menerima "Kabupaten/Kota Besar"
            $table->string('jenis_dlh')->nullable(); 
            $table->string('tipologi')->nullable();
            
            // Menggunakan decimal(5,2) lebih aman untuk nilai skor (contoh: 85.50) daripada float
            $table->decimal('ika', 5, 2)->default(0);
            $table->decimal('iku', 5, 2)->default(0);
            $table->decimal('ikl', 5, 2)->default(0);
            $table->decimal('ik_pesisir', 5, 2)->default(0);
            $table->decimal('ik_kehati', 5, 2)->default(0);
            $table->decimal('total_iklh', 5, 2)->default(0);
            
            $table->boolean('verifikasi')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('iklh_laporans');
        Schema::dropIfExists('slhd_laporans');
    }
};