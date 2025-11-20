<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class LogResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        // Logika untuk menentukan jenis DLH (provinsi/kabkota)
        $jenisDlhSlug = null;
        if ($this->user->jenisDlh) {
            $namaJenis = strtolower($this->user->jenisDlh->name);
            if (str_contains($namaJenis, 'provinsi')) {
                $jenisDlhSlug = 'provinsi';
            } elseif (str_contains($namaJenis, 'kab') || str_contains($namaJenis, 'kota')) {
                $jenisDlhSlug = 'kabkota';
            }
        }

        return [
            'id' => $this->id,
            'user' => $this->user->name,
            // Pastikan role dikirim lowercase (admin, pusdatin, dlh)
            'role' => strtolower($this->user->role->name ?? '-'),
            'action' => $this->action,
            'target' => $this->target, // Ini yang akan muncul di bawah aksi
            // Mengubah timestamp menjadi format "2 menit yang lalu"
            // Pastikan Anda sudah set 'locale' => 'id' di config/app.php agar bahasa Indonesia
            'time' => Carbon::parse($this->created_at)->locale('id')->diffForHumans(),
            
            // Data Spesifik untuk filter di Frontend
            'jenis_dlh' => $jenisDlhSlug,
            'province_name' => $this->user->province->name ?? null,
            'regency_name' => $this->user->regency->name ?? null,
        ];
    }
}