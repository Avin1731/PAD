<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Deadline; // Pastikan model ini ada
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;

class PusdatinDeadlineController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $deadlines = Deadline::all();
        return response()->json($deadlines);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'jenis_deadline' => 'required|string|max:255',
            'tanggal_mulai' => 'required|date',
            'tanggal_akhir' => 'required|date|after_or_equal:tanggal_mulai',
        ]);

        $deadline = Deadline::create($request->only(['jenis_deadline', 'tanggal_mulai', 'tanggal_akhir']));

        return response()->json($deadline, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id): JsonResponse
    {
        $deadline = Deadline::findOrFail($id);
        return response()->json($deadline);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'tanggal_mulai' => 'sometimes|date',
            'tanggal_akhir' => 'sometimes|date|after_or_equal:tanggal_mulai',
            'jenis_deadline' => 'sometimes|string|max:255', // Izinkan update jenis jika diperlukan
        ]);

        $deadline = Deadline::findOrFail($id);
        $deadline->update($request->only(['jenis_deadline', 'tanggal_mulai', 'tanggal_akhir']));

        return response()->json($deadline);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id): JsonResponse
    {
        $deadline = Deadline::findOrFail($id);
        $deadline->delete();

        return response()->json(['message' => 'Deadline berhasil dihapus']);
    }

    // --- ENDPOINTS CUSTOM (SUDAH DIPERBAIKI) ---
    public function getPenerimaan(): JsonResponse
    {
        // Mengambil jenis deadline yang relevan untuk halaman Penerimaan Data
        $jenisPenerimaan = ['Dokumen SLHD', 'Nilai IKLH'];
        $deadlines = Deadline::whereIn('jenis_deadline', $jenisPenerimaan)->get();
        return response()->json($deadlines);
    }

    public function getPenilaian(): JsonResponse
    {
        // Mengambil jenis deadline yang relevan untuk halaman Penilaian Data
        $jenisPenilaian = [
            'Penilaian SLHD',
            'Penilaian Penghargaan',
            'Validasi 1',
            'Validasi 2'
        ];
        $deadlines = Deadline::whereIn('jenis_deadline', $jenisPenilaian)->get();
        return response()->json($deadlines);
    }

    public function getAll(): JsonResponse
    {
        $deadlines = Deadline::all()->map(function ($deadline) {
            $now = now()->startOfDay(); 
            $endDate = Carbon::parse($deadline->tanggal_akhir)->startOfDay();

            // --- SOLUSI: BALIK URUTAN PERHITUNGAN ---
            // Hitung selisih dari (Hari Ini) ke (Tanggal Akhir)
            $diffInDays = $now->diffInDays($endDate, false);

            if ($now->gt($endDate)) {
                $sisaWaktu = 'Berakhir';
                $status = 'Berakhir';
            } elseif ($now->eq($endDate)) {
                $sisaWaktu = 'Hari ini';
                $status = 'Aktif';
            } else {
                // Sekarang $diffInDays akan selalu positif
                $sisaWaktu = $diffInDays . ' hari';
                $status = 'Aktif';
            }

            return [
                'id' => $deadline->id,
                'jenis_deadline' => $deadline->jenis_deadline,
                'tanggal_mulai' => Carbon::parse($deadline->tanggal_mulai)->format('d/m/Y'),
                'tanggal_akhir' => Carbon::parse($deadline->tanggal_akhir)->format('d/m/Y'),
                'sisa_waktu' => $sisaWaktu,
                'status' => $status,
            ];
        });

        return response()->json($deadlines);
    }
}