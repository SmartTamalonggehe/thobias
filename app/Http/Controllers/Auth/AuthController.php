<?php

namespace App\Http\Controllers\Auth;

use App\Http\Resources\CrudResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController
{
    protected function spartaValidation($request, $id = "")
    {
        $required = "";
        if ($id == "") {
            $required = "required";
        }
        $rules = [
            'email' => 'required|unique:users,email,' . $id,
        ];

        $messages = [
            'email.required' => 'Email harus diisi.',
            'email.unique' => 'Email sudah terdaftar.',
        ];
        $validator = Validator::make($request, $rules, $messages);

        if ($validator->fails()) {
            $message = [
                'judul' => 'Gagal',
                'type' => 'error',
                'message' => $validator->errors()->first(),
            ];
            return response()->json($message, 400);
        }
    }


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

        // check email and password
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'status' => false,
                'message' => 'Kombinasi email dan password salah',
            ], 401);
        }

        // Mengambil email
        $user = User::where('email', $request['email'])->firstOrFail();
        // membuat token
        $role = $user->role;
        // Membuat token
        // token
        $token = $user->createToken('smartspartacus');
        // add expires_at to token
        $token->token->expires_at = now()->addMonths(10);
        $token->token->save();

        return response()->json([
            'status' => true,
            'role' => $role,
            'token' => $token->accessToken,
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
        $token = $user->createToken('smartspartacus');
        // add expires_at to token
        $token->token->expires_at = now()->addMonths(10);
        $token->token->save();

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

        // Validasi kedaluwarsa dari tabel oauth_access_tokens
        $token = $user->token();
        if ($token->expires_at < now()) {
            // $token->delete();
            return response()->json([
                'status' => false,
                'message' => 'Token telah kedaluwarsa silahkan login kembali',
            ], 401);
        }
        return response()->json([
            'status' => true,
            'expires_at' => $token->expires_at,
            'now' => now(),
            'role' => $user->role,
            'user' => [
                'id' => $user->id,
                'email' => $user->email,
                'name' => $user->name
            ]
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

    function update($id, Request $request)
    {
        $data_req = $request->all();
        // return $data_req;
        $validate = $this->spartaValidation($data_req, $id);
        if ($validate) {
            return $validate;
        }
        $user = User::find($id);
        $user->update([
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'show_password' => $request->password,
        ]);
        return new CrudResource('success', 'Data Berhasil Diubah', $user);
    }
}
