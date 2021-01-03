<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\Staff;
use App\repositories\StaffRepository;

class StaffAPIController extends Controller
{
    public $staffRepository;

    public function __construct(StaffRepository $staffRepository)
    {
        $this->staffRepository = $staffRepository;
    }

    public function createToken()
    {
        $staff = Staff::first();
        $accessToken = $staff->createToken('Token Name')->accessToken;
        return $accessToken;
    }

    public function login(Request $request)
    {
        $formData = $request->all();
        $validator = \Validator::make($formData, [
            'email' => 'required',
            'password' => 'required',
        ], [
            'email.required' => 'Please give your email address',
            'password.required' => 'Please give your password',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }

        if ($this->staffRepository->checkIfStaffAuthenticated($request)) {
            $staff = $this->staffRepository->findUserByEmailAddress($request->email);
            $accessToken = $staff->createToken('authToken')->accessToken;
            return response()->json([
                'success' => true,
                'message' => 'Logged in successully !!',
                'staff' => $staff,
                'access_token' => $accessToken,
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Sorry Invalid Email and Password',
                'errors' => null,
            ]);
        }
    }

    public function register(Request $request)
    {
        $formData = $request->all();
        $validator = \Validator::make($formData, [
            'name' => 'required|min:2|max:30',
            'email' => 'required|email|max:100|unique:users',
            'password' => 'required|confirmed|min:6',
        ], [
            'name.required' => 'Hãy điền tên.',
            'name.min' => 'Tên người dùng phải có 2-30 ký tự.',
            'name.max' => 'Tên người dùng phải có 2-30 ký tự.',
            'email.required' => 'Hãy điền địa chỉ email.',
            'email.max' => 'Địa chỉ email chứa nhiều nhất 100 ký tự.',
            'email.email' => 'Địa chỉ email không hợp lệ.',
            'email.unique' => 'Địa chỉ Email bạn đăng ký đã tồn tại. Hãy đăng ký tài khoản với địa chỉ Email khác.',
            'password.required' => 'Hãy điền mật khẩu.',
            'password.min' => 'Mật khẩu phải có ít nhất 6 ký tự.',
            'password.confirmed' => 'Mật khẩu không trùng khớp.',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }

        $staff = $this->staffRepository->registerUser($request);
        if(!is_null($staff)){
            $staff = $this->staffRepository->findUserByEmailAddress($request->email);
            $accessToken = $staff->createToken('authToken')->accessToken;
            return response()->json([
                'success' => true,
                'message' => 'Đăng ký tài khoản thành công',
                'staff' => $staff,
                'access_token' => $accessToken,
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Đăng ký tài khoản thất bại',
                'errors' => null,
            ]);
        }
    }
}
