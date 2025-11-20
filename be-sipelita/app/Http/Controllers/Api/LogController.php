<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Log;

class LogController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'action' => 'required|string',
            'description' => 'nullable|string',
        ]);

        Log::create([
            'user_id' => $request->user()->id, // Otomatis ambil ID user yang sedang login
            'action' => $request->action,
            // Di frontend kita kirim 'description', kita simpan ke 'target' 
            // agar muncul di kolom tabel, dan juga di kolom description DB
            'target' => $request->description, 
            'description' => $request->description,
        ]);

        return response()->json(['message' => 'Log berhasil dicatat'], 201);
    }
}