<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IklhLaporan extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    // Tambahkan field baru ke fillable
    protected $fillable = [
        'user_id',
        'provinsi',
        'kabkota',
        'jenis_dlh',
        'tipologi',
        'ika',
        'iku',
        'ikl',
        'ik_pesisir',
        'ik_kehati',
        'total_iklh',
        'verifikasi'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}