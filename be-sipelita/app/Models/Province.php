<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    // ✅ TAMBAH INI
    protected $fillable = ['id', 'name'];

    // ✅ TAMBAH INI - Relasi ke Regency
    public function regencies()
    {
        return $this->hasMany(Regency::class, 'province_id', 'id');
    }

    // ✅ OPSIONAL - Relasi ke User
    public function users()
    {
        return $this->hasMany(User::class, 'province_id', 'id');
    }
}