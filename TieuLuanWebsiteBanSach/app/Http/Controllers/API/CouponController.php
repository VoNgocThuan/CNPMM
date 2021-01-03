<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\repositories\CouponRepository;
use Illuminate\Http\Request;
use App\Models\Coupon;

class CouponController extends Controller
{
    public $couponRepository;

    public function __construct(CouponRepository $couponRepository) {
        $this->couponRepository = $couponRepository;
    }

    public function index()
    {
		$coupons = Coupon::orderBy('coupon_id','desc')->paginate(5);
        return $coupons;
    }

    public function show($coupon_id)
    {
        $coupons = $this->couponRepository->findById($coupon_id);
        if(is_null($coupons))
        {
            return response()->json([
                'success' => false,
                'message' => 'Coupon Details',
                'data'    => null
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => 'Coupon Details',
            'data'    => $coupons
        ]);
    }

    public function store(Request $request)
    {
        $formData = $request->all();
        $validator = \Validator::make($formData, [
            'coupon_name' => 'required',
            'coupon_time' => 'required',
            'coupon_number' => 'required',
            'coupon_condition' => 'required',
            'coupon_code' => 'required',
        ], [
            'coupon_name.required' => 'Please give coupon name',
            'coupon_time.required' => 'Please give coupon time',
            'coupon_condition.required' => 'Please give coupon condition',
            'coupon_number.required' => 'Please give coupon number',
            'coupon_code.required' => 'Please give coupon code',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }

        $coupons = $this->couponRepository->create($request);
        return response()->json([
            'success' => true,
            'message' => 'Coupon Stored',
            'data'    => $coupons
        ]);
    }

    public function update(Request $request, $coupon_id)
    {
        $coupons = $this->couponRepository->findById($coupon_id);
        if (is_null($coupons)) {
            return response()->json([
                'success' => false,
                'message' => 'Coupon Not found',
                'data' => null,
            ]);
        }

        $formData = $request->all();
        $validator = \Validator::make($formData, [
            'coupon_name' => 'required',
            'coupon_time' => 'required',
            'coupon_number' => 'required',
            'coupon_condition' => 'required',
            'coupon_code' => 'required',
        ], [
            'coupon_name.required' => 'Please give coupon name',
            'coupon_time.required' => 'Please give coupon time',
            'coupon_condition.required' => 'Please give coupon condition',
            'coupon_number.required' => 'Please give coupon number',
            'coupon_code.required' => 'Please give coupon code',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }

        $coupons = $this->couponRepository->edit($request, $coupon_id);
        return response()->json([
            'success' => true,
            'message' => 'Coupon Updated',
            'data'    => $coupons
        ]);
    }

    public function destroy($coupon_id)
    {
        $coupons = $this->couponRepository->findById($coupon_id);
        if (is_null($coupons)) {
            return response()->json([
                'success' => false,
                'message' => 'Coupon Not found',
                'data' => null,
            ]);
        }

        $coupons = $this->couponRepository->delete($coupon_id);
        return response()->json([
            'success' => true,
            'message' => 'Coupon Deleted',
            'data'    => $coupons
        ]);
    }
}
