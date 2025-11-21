<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SlhdLaporanResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $user = $this->user;
        return [
            'id' => $this->id,
            'provinsi' => $user->province->name ?? '-',
            'kabkota' => $user->regency->name ?? '-',
            // Mapping nama jenis DLH agar sesuai label frontend
            'pembagian_daerah' => $user->jenisDlh->name ?? 'Kabupaten Besar', 
            'tipologi' => $user->pesisir === 'Ya' ? 'Pesisir' : 'Daratan',
            'buku_1' => $this->buku_1,
            'buku_2' => $this->buku_2,
            'tabel_utama' => $this->tabel_utama,
        ];
    }
}