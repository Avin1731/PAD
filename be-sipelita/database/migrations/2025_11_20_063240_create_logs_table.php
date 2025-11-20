<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('logs', function (Blueprint $table) {
            $table->id();
            // Menghubungkan log dengan user yang login
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('action'); // Contoh: "Menyetujui Akun"
            $table->string('target')->nullable(); // Contoh: "DLH Jawa Barat"
            $table->text('description')->nullable(); // Detail tambahan
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('logs');
    }
};