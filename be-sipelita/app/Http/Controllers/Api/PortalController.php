<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PortalController extends Controller
{
    /**
     * Sediakan data dummy untuk Portal Informasi.
     */
    public function getPortalData()
    {
        // Simulasikan delay network
        sleep(1); 
        
        $portalData = [
            // --- Data Dummy ---
            [
                "id" => 1,
                "province_id" => "32", // Jabar
                "regency_id" => null,
                "pembagian_daerah" => "Provinsi Besar",
                "tipologi" => "Daratan",
                "status_upload" => ["buku1" => "Sudah", "buku2" => "Sudah", "iklh" => "Sudah", "tabel_utama" => "Belum"],
                "status_dokumen" => ["buku1" => "Diterima", "buku2" => "Ditolak", "iklh" => "Diterima", "tabel_utama" => "N/A"],
                "status_akun" => "Aktif"
            ],
            [
                "id" => 2,
                "province_id" => "32", // Jabar
                "regency_id" => "32.71", // Kota Bogor
                "pembagian_daerah" => "Kabupaten/Kota Kecil",
                "tipologi" => "Daratan",
                "status_upload" => ["buku1" => "Sudah", "buku2" => "Sudah", "iklh" => "Sudah", "tabel_utama" => "Sudah"],
                "status_dokumen" => ["buku1" => "Diterima", "buku2" => "Diterima", "iklh" => "Diterima", "tabel_utama" => "Diterima"],
                "status_akun" => "Aktif"
            ],
            [
                "id" => 3,
                "province_id" => "51", // Bali
                "regency_id" => null,
                "pembagian_daerah" => "Provinsi Sedang",
                "tipologi" => "Pesisir",
                "status_upload" => ["buku1" => "Belum", "buku2" => "Belum", "iklh" => "Belum", "tabel_utama" => "Belum"],
                "status_dokumen" => ["buku1" => "N/A", "buku2" => "N/A", "iklh" => "N/A", "tabel_utama" => "N/A"],
                "status_akun" => "Tidak Aktif"
            ],
            [
                "id" => 4,
                "province_id" => "51", // Bali
                "regency_id" => "51.01", // Jembrana
                "pembagian_daerah" => "Kabupaten/Kota Kecil",
                "tipologi" => "Pesisir",
                "status_upload" => ["buku1" => "Sudah", "buku2" => "Sudah", "iklh" => "Belum", "tabel_utama" => "Belum"],
                "status_dokumen" => ["buku1" => "Diterima", "buku2" => "Diterima", "iklh" => "N/A", "tabel_utama" => "N/A"],
                "status_akun" => "Aktif"
            ],
            [
                "id" => 5,
                "province_id" => "11", // Aceh
                "regency_id" => null,
                "pembagian_daerah" => "Provinsi Besar",
                "tipologi" => "Pesisir",
                "status_upload" => ["buku1" => "Sudah", "buku2" => "Sudah", "iklh" => "Sudah", "tabel_utama" => "Sudah"],
                "status_dokumen" => ["buku1" => "Ditolak", "buku2" => "Ditolak", "iklh" => "Ditolak", "tabel_utama" => "Ditolak"],
                "status_akun" => "Aktif"
            ],
            // ... (Tambahkan data dummy lainnya jika perlu)
        ];

        return response()->json($portalData);
    }
}