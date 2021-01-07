<?php

use Illuminate\Support\Facades\Route;
use App\Models\OrderDetails;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Home
Route::get('/shopbansach', function(){
    return view('layouts.app');
});

//Search
Route::get('/shopbansach/search-page', function(){
    return view('layouts.app');
});

//Mail
Route::post('/send-mail','API\MailController@send_mail');

//Category
Route::get('/shopbansach/categories', function(){
    return view('layouts.app');
});
Route::get('/shopbansach/categories/create', function(){
    return view('layouts.app');
});
Route::get('/shopbansach/categoryproducts/{id}', function(){
    return view('layouts.app');
});
Route::get('/shopbansach/categories/view/{id}', function(){
    return view('layouts.app');
});

//Admin
Route::get('/shopbansach/login', function(){
    return view('layouts.app');
});
Route::get('/shopbansach/register', function(){
    return view('layouts.app');
});

//OrderManagement
Route::get('/shopbansach/order', function(){
    return view('layouts.app');
});
Route::get('/shopbansach/cus-order', function(){
    return view('layouts.app');
});
Route::get('/shopbansach/order/view/{order_code}', function(){
    return view('layouts.app');
});

//Staff
Route::get('/shopbansach/login-staff', function(){
    return view('layouts.app');
});
Route::get('/shopbansach/register-staff', function(){
    return view('layouts.app');
});

//Customer
Route::get('/shopbansach/login-checkout', function(){
    return view('layouts.app');
});
Route::get('/shopbansach/register-checkout', function(){
    return view('layouts.app');
});
Route::get('/shopbansach/account-info', function(){
    return view('layouts.app');
});
Route::get('/shopbansach/change-default-address', function(){
    return view('layouts.app');
});
Route::get('/shopbansach/customer-purchase', function(){
    return view('layouts.app');
});
Route::get('/shopbansach/product-purchase', function(){
    return view('layouts.app');
});
Route::get('/shopbansach/detail-order', function(){
    return view('layouts.app');
});
Route::get('/shopbansach/order-detail-customer/{order_code}', function(){
    return view('layouts.app');
});


//Checkout
Route::get('/shopbansach/checkout', function(){
    return view('layouts.app');
});
Route::get('/shopbansach/changeinfocheckout', function(){
    return view('layouts.app');
});
Route::get('/shopbansach/pagesuccessful', function(){
    return view('layouts.app');
});
Route::get('/shopbansach/noitem', function(){
    return view('layouts.app');
});
Route::get('/shopbansach/onepay', 'API\OrdersController@callbackOnePay');


//News
Route::get('/shopbansach/news', function(){
    return view('layouts.app');
});

//About
Route::get('/shopbansach/about', function(){
    return view('layouts.app');
});

//Book
Route::get('/shopbansach/books/view/{id}', function(){
    return view('layouts.app');
});
Route::get('/shopbansach/books/update/{id}', function(){
    return view('layouts.app');
});

//Delivery
Route::get('/shopbansach/delivery', function(){
    return view('layouts.app');
});

//Coupon
Route::get('/shopbansach/coupon', function(){
    return view('layouts.app');
});
Route::get('/shopbansach/coupon/create', function(){
    return view('layouts.app');
});
Route::get('/shopbansach/coupon/update/{id}', function(){
    return view('layouts.app');
});

// Shopping Cart
Route::post('add', 'cartController@add');
Route::delete('xoa-san-pham/{id}', 'cartController@xoasanpham');
Route::get('cart', function(){
    return Cart::getContent();
});
Route::post('cartContent', function(Request $request){
    $items = \Cart::getContent();
    foreach($items as $row) {
        $order_details =new OrderDetails();
        $order_details->product_id= $row->id;
        $order_details->order_code= $request->order_code;
        $order_details->product_name= $row->name;
        $order_details->product_quantity_available= $row->attributes->quantityAvailable;
        $order_details->product_sales_quantity= $row->quantity;
        $product_price = $row->quantity * $row->price;
        $order_details->product_price= $product_price;
        $order_details->product_image= $row->attributes->image;
        $order_details->save();
    }
    return $items;
});
Route::get('totalCart', function(){
    $total = Cart::getTotal();
    return $total;
});
Route::get('totalQuantity', function(){
    $cartTotalQuantity = Cart::getTotalQuantity();
    return $cartTotalQuantity;
});
Route::put('tang-so-luong/{id}', 'cartController@tangsoluong');
Route::put('giam-so-luong/{id}', 'cartController@giamsoluong');
Route::delete('clear', function(){
    $clear = Cart::clear();
    if($clear){
        return Cart::getContent();
    }
});

Auth::routes();
Route::get('/home', 'HomeController@index')->name('home');
