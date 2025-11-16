<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Regency extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    // ✅ TAMBAH INI - Kolom yang bisa diisi
    protected $fillable = ['id', 'name', 'province_id'];

    // ✅ TAMBAH INI - Relasi ke Province
    public function province()
    {
        return $this->belongsTo(Province::class, 'province_id', 'id');
    }

    // ✅ OPSIONAL - Relasi ke User (jika perlu)
    public function users()
    {
        return $this->hasMany(User::class, 'regency_id', 'id');
    }
}