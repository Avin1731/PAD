<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SlhdLaporan extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    // Tambahkan field baru ke fillable
    protected $fillable = [
        'user_id',
        'provinsi',
        'kabkota', 
        'pembagian_daerah',
        'tipologi',
        'buku_1',
        'buku_2',
        'tabel_utama'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}