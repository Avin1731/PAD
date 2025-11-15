<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {

            if (!Schema::hasColumn('users', 'nomor_telepon')) {
                $table->string('nomor_telepon')->nullable()->after('password');
            }

            if (!Schema::hasColumn('users', 'pesisir')) {
                $table->string('pesisir')->nullable()->after('nomor_telepon');
            }

            if (!Schema::hasColumn('users', 'status')) {
                $table->enum('status', ['aktif', 'pending'])->default('pending')->after('pesisir');
            }

            if (!Schema::hasColumn('users', 'role_id')) {
                $table->unsignedBigInteger('role_id')->nullable()->after('status');
            }

            if (!Schema::hasColumn('users', 'jenis_dlh_id')) {
                $table->unsignedBigInteger('jenis_dlh_id')->nullable()->after('role_id');
            }

            if (!Schema::hasColumn('users', 'province_id')) {
                $table->string('province_id')->nullable()->after('jenis_dlh_id');
            }

            if (!Schema::hasColumn('users', 'regency_id')) {
                $table->string('regency_id')->nullable()->after('province_id');
            }

            // Foreign Keys (cek tabelnya dulu)
            if (Schema::hasTable('roles')) {
                $table->foreign('role_id')->references('id')->on('roles')->cascadeOnDelete();
            }

            if (Schema::hasTable('jenis_dlhs')) {
                $table->foreign('jenis_dlh_id')->references('id')->on('jenis_dlhs')->cascadeOnDelete();
            }

            if (Schema::hasTable('provinces')) {
                $table->foreign('province_id')->references('id')->on('provinces')->nullOnDelete();
            }

            if (Schema::hasTable('regencies')) {
                $table->foreign('regency_id')->references('id')->on('regencies')->nullOnDelete();
            }

        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $cols = [
                'nomor_telepon',
                'pesisir',
                'status',
                'role_id',
                'jenis_dlh_id',
                'province_id',
                'regency_id'
            ];

            foreach ($cols as $c) {
                if (Schema::hasColumn('users', $c)) {
                    $table->dropColumn($c);
                }
            }
        });
    }
};
