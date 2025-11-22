<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SlhdLaporan;
use App\Models\IklhLaporan;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PusdatinPenerimaanController extends Controller
{
    public function getSlhdKabKota(Request $request): JsonResponse
    {
        try {
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

            return response()->json([
                'success' => true,
                'data' => $data,
                'message' => 'Data SLHD kab/kota berhasil diambil'
            ]);

        } catch (\Exception $e) {
            \Log::error('Error getSlhdKabKota: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'error' => 'Internal Server Error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function getIklhKabKota(Request $request): JsonResponse
    {
        try {
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

            return response()->json([
                'success' => true,
                'data' => $data,
                'message' => 'Data IKLH kab/kota berhasil diambil'
            ]);

        } catch (\Exception $e) {
            \Log::error('Error getIklhKabKota: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'error' => 'Internal Server Error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function getSlhdDetail($id): JsonResponse
    {
        try {
            $data = SlhdLaporan::select([
                'id',
                'provinsi', 
                'kabkota',
                'pembagian_daerah',
                'tipologi', 
                'buku_1',
                'buku_2',
                'tabel_utama'
            ])->find($id);

            if (!$data) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data SLHD tidak ditemukan'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $data,
                'message' => 'Data detail SLHD berhasil diambil'
            ]);

        } catch (\Exception $e) {
            \Log::error('Error getSlhdDetail: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'error' => 'Internal Server Error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function getIklhDetail($id): JsonResponse
    {
        try {
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
            ])->find($id);

            if (!$data) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data IKLH tidak ditemukan'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $data,
                'message' => 'Data detail IKLH berhasil diambil'
            ]);

        } catch (\Exception $e) {
            \Log::error('Error getIklhDetail: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'error' => 'Internal Server Error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function verifyIklh($id): JsonResponse
    {
        try {
            $data = IklhLaporan::find($id);

            if (!$data) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data IKLH tidak ditemukan'
                ], 404);
            }

            // Update verifikasi
            $data->update([
                'verifikasi' => true,
                'updated_at' => now()
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Data IKLH berhasil diverifikasi',
                'data' => $data
            ]);

        } catch (\Exception $e) {
            \Log::error('Error verifyIklh: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'error' => 'Internal Server Error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}