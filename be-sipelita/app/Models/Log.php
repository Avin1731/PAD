<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'action',
        'target',
        'description',
    ];

    // Relasi ke User agar kita bisa tahu siapa pelakunya (Admin/Pusdatin/DLH)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}