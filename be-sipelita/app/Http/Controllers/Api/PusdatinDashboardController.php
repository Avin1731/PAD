<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PusdatinDashboardController extends Controller
{
    /**
     * Sediakan data dummy untuk dashboard Pusdatin.
     */
    public function getDashboardData()
    {
        // Simulasikan delay network
        sleep(1); 

        $dashboardData = [
            'stats' => [
                ['title' => "Jumlah DLH Provinsi Terdaftar", 'value' => "38/12"],
                ['title' => "Jumlah DLH Kab/Kota Terdaftar", 'value' => "514/112"],
                ['title' => "Dokumen Menunggu Verifikasi", 'value' => 35],
                ['title' => "Total Pengajuan Valid", 'value' => 85],
                ['title' => "Rata-rata Nasional", 'value' => "78.5"]
            ],
            'progressStages' => [
                ['stage' => "Penilaian SLHD", 'progress' => 100, 'detail' => "4/4 Dokumen", 'isCompleted' => true],
                ['stage' => "Penilaian Penghargaan", 'progress' => 100, 'detail' => "5/5 Penghargaan", 'isCompleted' => true],
                ['stage' => "Validasi 1", 'progress' => 75, 'detail' => "3/4 Dokumen", 'isCompleted' => false],
                ['stage' => "Validasi 2", 'progress' => 75, 'detail' => "4/5 Nilai", 'isCompleted' => false],
                ['stage' => "Wawancara", 'progress' => 75, 'detail' => "3/4 Nilai", 'isCompleted' => false],

            ],
            'notifications' => [
                'announcement' => "Penilaian tahap akan segera dimulai. Mohon periksa detailnya.",
                'notification' => "DLH Kab Sleman baru saja mengirimkan Data"
            ],
            'recentActivities' => [
                ['id' => 1, 'name' => 'DLH Kab Sleman', 'status' => 'Menunggu Verifikasi', 'date' => '08-10-2025'],
                ['id' => 2, 'name' => 'DLH Kab Bantul', 'status' => 'Valid', 'date' => '08-10-2025'],
                ['id' => 3, 'name' => 'DLH Kab Kulon Progo', 'status' => 'Valid', 'date' => '08-10-2025'],
                ['id' => 4, 'name' => 'DLH Kab Gunung Kidul', 'status' => 'Valid', 'date' => '08-10-2025'],
                ['id' => 5, 'name' => 'DLH Kota Yogyakarta', 'status' => 'Valid', 'date' => '08-10-2025'],
                ['id' => 6, 'name' => 'DLH Prov. DIY', 'status' => 'Menunggu Verifikasi', 'date' => '07-10-2025'],
            ]
        ];

        return response()->json($dashboardData);
    }
}