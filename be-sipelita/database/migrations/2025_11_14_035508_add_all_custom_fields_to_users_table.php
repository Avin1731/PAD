<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Tambahkan semua kolom kustom
            $table->string('nomor_telepon')->nullable()->after('password');
            $table->string('pesisir')->nullable()->after('nomor_telepon');
            $table->enum('status', ['aktif', 'pending'])->default('pending')->after('pesisir');
            
            // Tambahkan semua kolom relasi
            $table->unsignedBigInteger('role_id')->nullable()->after('status');
            $table->unsignedBigInteger('jenis_dlh_id')->nullable()->after('role_id');
            $table->string('province_id')->nullable()->after('jenis_dlh_id');
            $table->string('regency_id')->nullable()->after('province_id');

            // Tambahkan FOREIGN KEY (Ini berjalan terakhir, jadi tabel 'roles', 'provinces', dll. SUDAH ADA)
            $table->foreign('role_id')->references('id')->on('roles');
            $table->foreign('jenis_dlh_id')->references('id')->on('jenis_dlhs');
            $table->foreign('province_id')->references('id')->on('provinces');
            $table->foreign('regency_id')->references('id')->on('regencies');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Hapus foreign key DULU (urutan penting)
            $table->dropForeign(['role_id']);
            $table->dropForeign(['jenis_dlh_id']);
            $table->dropForeign(['province_id']);
            $table->dropForeign(['regency_id']);

            // Hapus kolom
            $table->dropColumn([
                'nomor_telepon', 
                'pesisir', 
                'status',
                'role_id', 
                'jenis_dlh_id', 
                'province_id', 
                'regency_id'
            ]);
        });
    }
};