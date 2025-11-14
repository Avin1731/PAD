<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminController extends Controller
{
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

        return response()->json($users);
    }

    public function getUsersPending(): JsonResponse
    {
        $users = User::where('status', 'pending')->where('role_id', 3)->with(['role', 'jenisDlh', 'province', 'regency'])->get();

        return response()->json($users);
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