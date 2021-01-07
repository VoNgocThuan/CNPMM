<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Categories
Route::apiResource('categories', 'API\CategoriesController');

//Books
Route::apiResource('books', 'API\BooksController');

//Coupon
Route::apiResource('coupons', 'API\CouponController');
Route::post('/check-coupon','API\OrdersController@check_coupon');

//Order
Route::get('order', 'API\OrdersController@index');
Route::get('order/{id}', 'API\OrdersController@show');
Route::post('order/store', 'API\OrdersController@store');
Route::post('order/storeCOD', 'API\OrdersController@storeCOD');
Route::put('order/edit/{id}', 'API\OrdersController@update');
Route::delete('order/delete/{order_code}', 'API\OrdersController@destroy');

//OrderManagement
Route::get('/manage-order','API\OrderManagementController@manage_order');
Route::get('/view-address-from-order/{order_code}','API\OrderManagementController@view_address_from_order');
Route::get('/get-ordercode-cus-order/{cus_id}','API\OrderManagementController@get_ordercode_cus');
Route::get('/customer-order/{cus_id}','API\OrderManagementController@list_order_cus');
Route::get('/view-order/{order_code}','API\OrderManagementController@view_order');
Route::get('/get-order-id/{order_code}','API\OrderManagementController@get_order_id');
Route::get('/view-coupon-order/{coupon_code}','API\OrderManagementController@view_coupon_order');
Route::post('/update-order-qty','API\OrderManagementController@update_order_qty');

//Delivery
Route::get('delivery', 'API\DeliveryController@delivery');
Route::get('customer-feeship/{id}', 'API\DeliveryController@customer_feeship');
Route::get('feeship', 'API\DeliveryController@index');
Route::post('/calculate-fee','API\DeliveryController@calculate_fee');
Route::post('/update-delivery','API\DeliveryController@update_delivery');
Route::post('/select-feeship','API\DeliveryController@select_feeship');
Route::post('/select-delivery','API\DeliveryController@select_delivery');
Route::post('/insert-delivery','API\DeliveryController@insert_delivery');

//Admin
Route::get('auth/create-token', 'API\Auth\AuthAPIController@createToken');
Route::post('auth/login', 'API\Auth\AuthAPIController@login');
Route::post('auth/register', 'API\Auth\AuthAPIController@register');

//Customer
Route::get('auth/create-token-checkout', 'API\Auth\CustomerAPIController@createToken');
Route::post('auth/login-checkout', 'API\Auth\CustomerAPIController@login');
Route::post('auth/register-checkout', 'API\Auth\CustomerAPIController@register');
Route::put('auth/update-customer-info/{id}', 'API\Auth\CustomerAPIController@update');
Route::get('auth/getCustomer/{id}', 'API\Auth\CustomerAPIController@show');
Route::get('auth/view-address-cus/{id}', 'API\Auth\CustomerAPIController@view_address_cus');
Route::post('/tim-kiem','API\Auth\CustomerAPIController@search');

//Staff
Route::get('auth/create-token-staff', 'API\Auth\StaffAPIController@createToken');
Route::post('auth/login-staff', 'API\Auth\StaffAPIController@login');
Route::post('auth/register-staff', 'API\Auth\StaffAPIController@register');
