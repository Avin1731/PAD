<?php
// app/Models/User.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    // --- PERBAIKAN 1: TAMBAHKAN BLOK INI ---
    /**
     * The relationships that should always be loaded.
     * Ini "memaksa" Eloquent untuk selalu menyertakan data relasi (Eager Loading).
     * Ini akan memperbaiki error 'Cannot read properties of undefined (reading 'name')'.
     *
     * @var array
     */
    protected $with = ['role', 'jenisDlh', 'province', 'regency'];
    // --- AKHIR PERBAIKAN 1 ---

    /**
     * The attributes that are mass assignable.
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'nomor_telepon',
        'password',
        'role_id',
        'jenis_dlh_id',
        'province_id',
        'regency_id',
        'pesisir',
        'status', // <-- PERBAIKAN 2: TAMBAHKAN 'status'
    ];

    /**
     * The attributes that should be hidden for serialization.
     * @var array<int, string>
     */
    protected $hidden = [ 'password', 'remember_token' ];

    /**
     * Get the attributes that should be cast.
     * @var array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | RELASI (Kode Anda di sini sudah benar)
    |--------------------------------------------------------------------------
    */
    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class, 'role_id', 'id');
    }

    public function jenisDlh(): BelongsTo
    {
        return $this->belongsTo(JenisDlh::class, 'jenis_dlh_id', 'id');
    }

    public function province(): BelongsTo
    {
        return $this->belongsTo(Province::class, 'province_id', 'id');
    }

    public function regency(): BelongsTo
    {
        return $this->belongsTo(Regency::class, 'regency_id', 'id');
    }
}