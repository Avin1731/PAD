<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class IklhLaporanResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $user = $this->user;
        return [
            'id' => $this->id,
            'provinsi' => $user->province->name ?? '-',
            'kabkota' => $user->regency->name ?? '-',
            'jenis_dlh' => $user->jenisDlh->name ?? 'Kabupaten Besar',
            'tipologi' => $user->pesisir === 'Ya' ? 'Pesisir' : 'Daratan',
            'ika' => $this->ika,
            'iku' => $this->iku,
            'ikl' => $this->ikl,
            'ik_pesisir' => $this->ik_pesisir,
            'ik_kehati' => $this->ik_kehati,
            'total_iklh' => $this->total_iklh,
            'verifikasi' => (boolean) $this->verifikasi,
        ];
    }
}