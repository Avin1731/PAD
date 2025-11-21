<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SlhdLaporan;
use App\Models\IklhLaporan;
use Illuminate\Http\Request;

class PusdatinPenerimaanController extends Controller
{
    public function getSlhdKabKota(Request $request)
    {
        try {
            // Query yang lebih sederhana - langsung ambil data tanpa relationship kompleks
            $data = SlhdLaporan::select([
                'id',
                'provinsi', 
                'kabkota',
                'pembagian_daerah',
                'tipologi', 
                'buku_1',
                'buku_2',
                'tabel_utama'
            ])->get();

            return response()->json($data);

        } catch (\Exception $e) {
            \Log::error('Error getSlhdKabKota: ' . $e->getMessage());
            return response()->json([
                'error' => 'Internal Server Error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function getIklhKabKota(Request $request)
    {
        try {
            // Query yang lebih sederhana
            $data = IklhLaporan::select([
                'id',
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
            ])->get();

            return response()->json($data);

        } catch (\Exception $e) {
            \Log::error('Error getIklhKabKota: ' . $e->getMessage());
            return response()->json([
                'error' => 'Internal Server Error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}