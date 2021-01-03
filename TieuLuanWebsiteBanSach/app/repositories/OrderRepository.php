<?php

namespace App\repositories;
use App\interfaces\OrderInterface;
use App\Models\Order;
use App\Models\OrderDetails;
use Illuminate\Http\Request;
use Cart;
use Session;
use DB;

class OrderRepository implements OrderInterface{

    public function findById($id){
        $orders = Order::find($id);
        return $orders;
    }
    public function getAll(){
        $orders = Order::get();
        return $orders;
    }
    public function create(Request $request){
        $orders = new Order();
        $orders->customer_id=$request->customer_id;
        $orders->name=$request->name;
        $orders->order_code=$request->order_code;
        $orders->email=$request->email;
        $orders->note=$request->note;
        $orders->city=$request->city;
        $orders->province=$request->province;
        $orders->wards=$request->wards;
        $orders->address=$request->address;
        $orders->phone=$request->phone;
        $orders->paymentMethod=$request->paymentMethod;
        $orders->prevTotalPrice=$request->prevTotalPrice;
        $orders->coupon_code=$request->coupon_code;
        $orders->coupon_number=$request->coupon_number;
        $orders->feeship=$request->feeship;
        $orders->totalPrice=$request->totalPrice;
        $orders->status=$request->status;
        $orders->save();
        
        return $orders;
    }
    public function edit(Request $request, $id){
        $orders = $this->findById($id);
        $orders->customer_id=$request->customer_id;
        $orders->name=$request->name;
        $orders->order_code=$request->order_code;
        $orders->email=$request->email;
        $orders->note=$request->note;
        $orders->city=$request->city;
        $orders->province=$request->province;
        $orders->wards=$request->wards;
        $orders->address=$request->address;
        $orders->phone=$request->phone;
        $orders->paymentMethod=$request->paymentMethod;
        $orders->prevTotalPrice=$request->prevTotalPrice;
        $orders->coupon_code=$request->coupon_code;
        $orders->coupon_number=$request->coupon_number;
        $orders->feeship=$request->feeship;
        $orders->totalPrice=$request->totalPrice;
        $orders->status=$request->status;
        $orders->save();
        return $orders;
    }
    public function delete($id){
        $orders = $this->findById($id);
        $orders->orders()->delete();
        $orders->delete();
        return $orders;
    }
}
