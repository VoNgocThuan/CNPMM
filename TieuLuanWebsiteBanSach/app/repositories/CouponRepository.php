<?php

namespace App\repositories;
use App\interfaces\CrudInterface;
use App\Models\Coupon;
use Illuminate\Http\Request;

class CouponRepository implements CrudInterface{
    public function getAll(){
        $coupons = Coupon::orderBy('coupon_id','desc')->get();
        return $coupons;
    }
    public function findById($coupon_id){
        $coupons = Coupon::find($coupon_id);
        return $coupons;
    }
    public function create(Request $request){
        $coupons = new Coupon();
        $coupons->coupon_name=$request->coupon_name;
        $coupons->coupon_time=$request->coupon_time;
        $coupons->coupon_number=$request->coupon_number;
        $coupons->coupon_condition=$request->coupon_condition;
        $coupons->coupon_code=$request->coupon_code;
        $coupons->save();
        return $coupons;
    }
    public function edit(Request $request, $coupon_id){
        $coupons = $this->findById($coupon_id);
        $coupons->coupon_name=$request->coupon_name;
        $coupons->coupon_time=$request->coupon_time;
        $coupons->coupon_number=$request->coupon_number;
        $coupons->coupon_condition=$request->coupon_condition;
        $coupons->coupon_code=$request->coupon_code;
        $coupons->save();
        return $coupons;
    }
    public function delete($coupon_id){
        $coupons = $this->findById($coupon_id);
        $coupons->delete();
        return $coupons;
    }
}
