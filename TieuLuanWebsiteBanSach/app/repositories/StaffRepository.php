<?php

namespace App\repositories;
use App\interfaces\StaffAuthInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Staff;

class StaffRepository implements StaffAuthInterface{

    public function checkIfStaffAuthenticated(Request $request)
    {
        if (Auth::guard('staff')->attempt(['email' => $request->email, 'password' => $request->password])) {
            return true;
        }
        return false;
    }

    public function registerUser(Request $request)
    {
        $staff = new Staff();
        $staff->name = $request->name;
        $staff->email = $request->email;
        $staff->password = Hash::make($request->password);
        $staff->save();
        return $staff;
    }

    public function findUserByEmailAddress($email)
    {
        $staff = Staff::where('email', $email)->first();
        return $staff;
    }
}
