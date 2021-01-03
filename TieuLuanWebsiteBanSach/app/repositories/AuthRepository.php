<?php

namespace App\repositories;
use App\interfaces\AuthInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthRepository implements AuthInterface{

    public function checkIfAuthenticated(Request $request)
    {
        if (Auth::guard('web')->attempt(['email' => $request->email, 'password' => $request->password])) {
            return true;
        }
        return false;
    }

    public function findById($id){}

    public function registerUser(Request $request)
    {
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();
        return $user;
    }

    public function findUserByEmailAddress($email)
    {
        $user = User::where('email', $email)->first();
        return $user;
    }
}
