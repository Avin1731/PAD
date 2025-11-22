<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\WilayahController;
use App\Http\Controllers\Api\PusdatinDashboardController;
use App\Http\Controllers\Api\PortalController;
use App\Http\Controllers\Api\PusdatinDeadlineController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\LogController;
use App\Http\Controllers\Api\PusdatinPenerimaanController;

Route::middleware([
    \Illuminate\Session\Middleware\StartSession::class,
    \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
])->group(function () {

    // ==================== PUBLIC ROUTES ====================
    Route::prefix('auth')->group(function () {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });

    Route::prefix('wilayah')->group(function () {
        Route::get('/provinces', [WilayahController::class, 'getProvinces']);
        Route::get('/regencies/all', [WilayahController::class, 'getAllRegencies']);
        Route::get('/regencies/{province_id}', [WilayahController::class, 'getRegencies']);
    });

    Route::get('/jenis-dlh', [AuthController::class, 'getJenisDlh']);

    // ==================== PENERIMAAN ROUTES (PUBLIC) ====================
    Route::prefix('penerimaan')->group(function () {
        // Kabupaten/Kota
        Route::get('/kab-kota/slhd', [PusdatinPenerimaanController::class, 'getSlhdKabKota']);
        Route::get('/kab-kota/iklh', [PusdatinPenerimaanController::class, 'getIklhKabKota']);
        Route::get('/kab-kota/slhd/{id}', [PusdatinPenerimaanController::class, 'getSlhdDetail']);
        Route::get('/kab-kota/iklh/{id}', [PusdatinPenerimaanController::class, 'getIklhDetail']);
        Route::post('/kab-kota/iklh/{id}/verify', [PusdatinPenerimaanController::class, 'verifyIklh']);

        // Provinsi (untuk future development)
        Route::get('/provinsi/slhd', [PusdatinPenerimaanController::class, 'getSlhdProvinsi']);
        Route::get('/provinsi/iklh', [PusdatinPenerimaanController::class, 'getIklhProvinsi']);
    });

    // ==================== PROTECTED ROUTES (AUTH REQUIRED) ====================
    Route::middleware('auth:sanctum')->group(function () {
        
        // User Management
        Route::get('/user', [AuthController::class, 'user']);

        // Logs
        Route::post('/logs', [LogController::class, 'store']);

        // Dashboard
        Route::get('/pusdatin-dashboard', [PusdatinDashboardController::class, 'getDashboardData']);
        Route::get('/portal-informasi', [PortalController::class, 'getPortalData']);

        // Deadlines
        Route::prefix('deadlines')->group(function () {
            Route::get('/penerimaan', [PusdatinDeadlineController::class, 'getPenerimaan']);
            Route::get('/penilaian', [PusdatinDeadlineController::class, 'getPenilaian']);
            Route::get('/all', [PusdatinDeadlineController::class, 'getAll']);
        });
        Route::apiResource('deadlines', PusdatinDeadlineController::class);

        // ==================== ADMIN ROUTES ====================
        Route::prefix('admin')->group(function () {
            Route::get('/dashboard', [AdminController::class, 'getDashboardStats']);
            
            // User Management
            Route::get('/users/aktif', [AdminController::class, 'getUsersAktif']);
            Route::get('/users/pending', [AdminController::class, 'getUsersPending']);
            Route::post('/users/{id}/approve', [AdminController::class, 'approveUser']);
            Route::delete('/users/{id}/reject', [AdminController::class, 'rejectUser']);
            
            // Logs
            Route::get('/logs', [AdminController::class, 'getLogs']);
            
            // Pusdatin Management
            Route::post('/pusdatin', [AdminController::class, 'createPusdatin']);
            Route::delete('/pusdatin/{id}', [AdminController::class, 'deletePusdatin']);
        });
    });

});