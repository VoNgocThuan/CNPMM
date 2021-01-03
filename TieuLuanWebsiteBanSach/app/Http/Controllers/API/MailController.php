<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use Mail;
use Cart;
use App\Models\Feeship;

class MailController extends Controller
{
    public function send_mail(Request $request){
         //send mail
                $to_name = "Đơn hàng Shop Bán Sách";
                $to_email = $request->email;//send to this email
                $full_name = $request->full_name;
                $feeship_city = Feeship::where('fee_matp',$request->city)->first();
                $feeship_province = Feeship::where('fee_maqh',$request->province)->first();
                $feeship_wards = Feeship::where('fee_xaid',$request->wards)->first();
                $address = $request->address;
                $feeship = $request->feeship;
                $total = $request->total;
                $ordercode = $request->order_code;
                $data = array(
                    "name" => "Shop Bán Sách",
                    "body" => '----- THÔNG TIN ĐƠN HÀNG -----',
                    "ordercode" => $ordercode,
                    "full_name" => $full_name,
                    "city" => $feeship_city->city->name_city,
                    "province" => $feeship_province->province->name_quanhuyen,
                    "wards" => $feeship_wards->wards->name_xaphuong,
                    "address" => $address,
                    "feeship" => $feeship,
                    "total" => $total,
                    
                ); //body of mail.blade.php
                
                Mail::send('send_mail',$data,function($message) 
                use (
                    $to_name,
                    $to_email,
                    $ordercode,
                    $full_name,
                    $feeship_city,
                    $feeship_province,
                    $feeship_wards,
                    $address,
                    $feeship,
                    $total)
                {
                    $message->to($to_email)->subject('ĐƠN HÀNG SHOP BÁN SÁCH');//send this mail with subject
                    $message->from($to_email,$to_name);//send from this mail
                });
                //--send mail

    }
}
