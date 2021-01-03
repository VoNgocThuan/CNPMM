<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Cart;
use App\Models\Book;
use App\Models\OrderDetails;

class cartController extends Controller
{
    public function add(Request $res) {
        $qty = $res->qty;
        $id = $res->id;
        $data = Book::find($id);
        $add = Cart::add([
            'id' => $id,
            'name' => $data->name,
            'price' => $data->price,
            'quantity' => $qty,
            'attributes' => array(
                'quantityAvailable' => $data->quantity,
                'image' => $data->image1
            )
        ]);
        if($add)
        {
            return "Thêm thành công vào giỏ hàng";
        }
    }

    public function tangsoluong($id) {
        $tangsoluong = Cart::update($id, [
            'quantity' => 1,
        ]);
        if($tangsoluong){
            return "Tăng số lượng thành công";
        }
    }

    public function giamsoluong($id) {
        $giamsoluong = Cart::update($id, [
            'quantity' => -1,
        ]);
        if($giamsoluong){
            return "Giảm số lượng thành công";
        }
    }

    public function xoasanpham($id) {
        $delete = Cart::remove($id);
        if($delete){
            return "Xóa thành công";
        }
    }

}
