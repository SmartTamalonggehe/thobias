<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController
{
    function login(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'email' => 'required|string|email|max:255',
                'password' => 'required',
            ],
            [
                'email.required' => 'Email harus diisi',
                'password.required' => 'Password harus diisi',
                'email.email' => 'Email tidak valid',
                'email.max' => 'Email maksimal 255 karakter',
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first(),
            ], 422);
        }

        // Gunakan guard api untuk attempt
        if (!Auth::guard('api')->attempt($request->only('email', 'password'))) {
            return response()->json([
                'status' => false,
                'message' => 'Kombinasi email dan password salah',
            ], 401);
        }

        // Mengambil email
        $user = User::where('email', $request['email'])->firstOrFail();
        $role = $user->role;

        // Login user ke guard api
        Auth::guard('api')->login($user);

        // Membuat token
        $token = $user->createToken('smartspartacus')->accessToken;

        return response()->json([
            'status' => true,
            'role' => $role,
            'token' => $token,
            'user' => $user
        ]);
    }

    // register
    function register(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required',
            ],
            [
                'name.required' => 'Nama harus diisi',
                'email.required' => 'Email harus diisi',
                'email.email' => 'Email tidak valid',
                'email.max' => 'Email maksimal 255 karakter',
                'email.unique' => 'Email sudah terdaftar',
                'password.required' => 'Password harus diisi',
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first(),
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => 'user'
        ]);

        // token
        $token = $user->createToken('smartspartacus')->accessToken;

        return response()->json([
            'status' => true,
            'role' => 'user',
            'token' => $token,
            'user' => $user
        ]);
    }

    function cekToken(Request $request)
    {
        $user = $request->user();
        return response()->json([
            'status' => true,
            'role' => $user->role
        ]);
    }


    function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'status' => true,
            'message' => 'Logout Berhasil',
        ]);
    }
}
