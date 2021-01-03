<?php

namespace App\repositories;
use App\interfaces\AuthInterface;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Customer;

class CustomerRepository implements AuthInterface{

    public function checkIfAuthenticated(Request $request)
    {
        if (Auth::guard('customer')->attempt(['email' => $request->email, 'password' => $request->password])) {
            return true;
        }
        return false;
    }

    public function findById($id){
        $customer = Customer::find($id);
        return $customer;
    }

    public function edit(Request $request, $id){
        $customer = $this->findById($id);
        $customer->name=$request->name;
        $customer->email=$request->email;
        $customer->city=$request->city;
        $customer->province=$request->province;
        $customer->wards=$request->wards;
        $customer->address=$request->address;
        $customer->phone=$request->phone;
        $customer->save();
        return $customer;
    }

    public function registerUser(Request $request)
    {
        $customer = new Customer();
        $customer->name = $request->name;
        $customer->email = $request->email;
        $customer->password = Hash::make($request->password);
        $customer->city = $request->city;
        $customer->province = $request->province;
        $customer->wards = $request->wards;
        $customer->address = $request->address;
        $customer->phone = $request->phone;
        $customer->save();
        return $customer;
    }

    public function findUserByEmailAddress($email)
    {
        $customer = Customer::where('email', $email)->first();
        return $customer;
    }
}
