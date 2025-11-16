<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Province;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    // Helper function untuk ambil province dari regency_id
    private function getProvinceFromRegency($regencyId)
    {
        if (!$regencyId) return null;
        
        $provinceId = explode('.', $regencyId)[0] ?? null;
        if ($provinceId) {
            $province = Province::find($provinceId);
            return $province->name ?? null;
        }
        
        return null;
    }

    public function getDashboardStats(): JsonResponse
    {
        $totalUsersAktif = User::where('status', 'aktif')->count();
        $totalUsersPending = User::where('status', 'pending')->count();

        // Misalnya, kita hanya hitung DLH yang pending
        $dlhPending = User::where('status', 'pending')->where('role_id', 3)->count();

        return response()->json([
            'total_users_aktif' => $totalUsersAktif,
            'total_users_pending' => $dlhPending,
        ]);
    }

    public function getUsersAktif(Request $request): JsonResponse
    {
        $role = $request->query('role');
        $jenisDlh = $request->query('jenis_dlh');

        $query = User::where('status', 'aktif');

        if ($role) {
            $query->where('role_id', $role);
        }

        if ($jenisDlh) {
            $query->where('jenis_dlh_id', $jenisDlh);
        }

        $users = $query->with(['role', 'jenisDlh', 'province', 'regency'])->get();

        // Format response untuk include nama provinsi & kabupaten
        $formattedUsers = $users->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'jenis_dlh' => $user->jenisDlh,
                'province_id' => $user->province_id,
                'regency_id' => $user->regency_id,
                'province_name' => $user->province->name ?? $this->getProvinceFromRegency($user->regency_id), // FIXED
                'regency_name' => $user->regency->name ?? null,
                'status' => $user->status,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
            ];
        });

        return response()->json($formattedUsers);
    }

    public function getUsersPending(): JsonResponse
    {
        $users = User::where('status', 'pending')
            ->where('role_id', 3)
            ->with(['role', 'jenisDlh', 'province', 'regency'])
            ->get();

        // Format response untuk include nama provinsi & kabupaten
        $formattedUsers = $users->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'jenis_dlh' => $user->jenisDlh,
                'province_id' => $user->province_id,
                'regency_id' => $user->regency_id,
                'province_name' => $user->province->name ?? $this->getProvinceFromRegency($user->regency_id), // FIXED
                'regency_name' => $user->regency->name ?? null,
                'status' => $user->status,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
            ];
        });

        return response()->json($formattedUsers);
    }

    public function approveUser($id): JsonResponse
    {
        $user = User::findOrFail($id);
        $user->update(['status' => 'aktif']);

        return response()->json(['message' => 'User disetujui']);
    }

    public function rejectUser($id): JsonResponse
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'User ditolak dan dihapus']);
    }

    public function getLogs(): JsonResponse
    {
        // Untuk sekarang, kembalikan dummy data
        $logs = [
            [
                'id' => 1,
                'user' => 'DLH Jawa Barat',
                'action' => 'upload dokumen SLHD.',
                'timestamp' => '09:00',
                'role' => 'dlh'
            ],
            [
                'id' => 2,
                'user' => 'Pusdatin A',
                'action' => 'atur deadline penerimaan.',
                'timestamp' => '08:30',
                'role' => 'pusdatin'
            ],
            [
                'id' => 3,
                'user' => 'Admin Satu',
                'action' => 'approve DLH Kabupaten Bogor.',
                'timestamp' => '08:00',
                'role' => 'admin'
            ],
        ];

        return response()->json($logs);
    }

    public function createPusdatin(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role_id' => 2, // Pusdatin
            'status' => 'aktif',
        ]);

        return response()->json($user, 201);
    }

    public function deletePusdatin($id): JsonResponse
    {
        $user = User::findOrFail($id);
        if ($user->role_id !== 2) { // Bukan pusdatin
            return response()->json(['message' => 'Hanya akun Pusdatin yang bisa dihapus.'], 400);
        }

        $user->delete();

        return response()->json(['message' => 'Akun Pusdatin dihapus']);
    }
}