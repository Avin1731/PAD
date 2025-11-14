<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\WilayahController;
use App\Http\Controllers\Api\PusdatinDashboardController;
use App\Http\Controllers\Api\PortalController;
use App\Http\Controllers\Api\PusdatinDeadlineController;
use App\Http\Controllers\Api\AdminController; // <-- Tambahkan

// --- BUKA PEMBUNGKUS (Middleware Sesi) ---
Route::middleware([
    \Illuminate\Session\Middleware\StartSession::class,
    \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
])->group(function () {
// --- BATAS PEMBUKA ---

    // Endpoint publik
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/jenis-dlh', [AuthController::class, 'getJenisDlh']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/provinces', [WilayahController::class, 'getProvinces']);
    Route::get('/regencies/all', [WilayahController::class, 'getAllRegencies']);
    Route::get('/regencies/{province_id}', [WilayahController::class, 'getRegencies']);

    // Endpoint yang dilindungi
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/user', [AuthController::class, 'user']);

        // Dashboard Pusdatin
        Route::get('/pusdatin-dashboard', [PusdatinDashboardController::class, 'getDashboardData']);
        Route::get('/portal-informasi', [PortalController::class, 'getPortalData']);

        // Deadline Pusdatin
        Route::get('/deadlines/penerimaan', [PusdatinDeadlineController::class, 'getPenerimaan']);
        Route::get('/deadlines/penilaian', [PusdatinDeadlineController::class, 'getPenilaian']);
        Route::get('/deadlines/all', [PusdatinDeadlineController::class, 'getAll']);
        Route::apiResource('deadlines', PusdatinDeadlineController::class)->only(['index', 'show', 'store', 'update', 'destroy']);

        // --- ENDPOINT ADMIN ---
        Route::prefix('admin')->group(function () {
            Route::get('/dashboard', [AdminController::class, 'getDashboardStats']);
            Route::get('/users/aktif', [AdminController::class, 'getUsersAktif']);
            Route::get('/users/pending', [AdminController::class, 'getUsersPending']);
            Route::post('/users/{id}/approve', [AdminController::class, 'approveUser']);
            Route::delete('/users/{id}/reject', [AdminController::class, 'rejectUser']);
            Route::get('/logs', [AdminController::class, 'getLogs']);
            Route::post('/pusdatin', [AdminController::class, 'createPusdatin']);
            Route::delete('/pusdatin/{id}', [AdminController::class, 'deletePusdatin']);
        });
        // --- END ADMIN ---
    });

}); // <-- Batas grup middleware