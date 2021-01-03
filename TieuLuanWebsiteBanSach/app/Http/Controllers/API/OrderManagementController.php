<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderDetails;
use App\Models\Customer;
use App\Models\Book;
use App\Models\Coupon;
use App\repositories\OrderRepository;
use Illuminate\Support\Facades\DB;

class OrderManagementController extends Controller
{
	public function view_order($order_code){
		$order_details = OrderDetails::with('book')->where('order_code',$order_code)->get();
		$order = Order::where('order_code',$order_code)->get();

		foreach($order as $key => $ord){
			$customer_id = $ord->customer_id;
			$order_status = $ord->order_status;
		}
		$customer = Customer::where('id',$customer_id)->first();
        
        return response()->json([
            'success' => true,
            'message' => 'Order View',
            'order' => $order,
            'customer' => $customer,
			'order_details' => $order_details,
        ]);
	}
	public function view_coupon_order($coupon_code){
		$coupon_detail = Coupon::where('coupon_code', $coupon_code)->get();
        
        return response()->json([
            'success' => true,
            'message' => 'Order View',
            'order-coupon_detail' => $coupon_detail,
        ]);
	}
	public function get_order_id($order_code){
		$order_id = Order::where('order_code', $order_code)->get();
        
        return response()->json([
            'success' => true,
            'message' => 'Order View',
            'order_id' => $order_id,
        ]);
	}
	public function list_order_cus($cus_id){
		$order = Order::where('customer_id',$cus_id)->get();
		foreach($order as $key => $ord){
			$customer_id = $ord->customer_id;
			//$order_details_cus = OrderDetails::where('order_code',$ord->order_code)->get();
		}
		$customer = Customer::where('id',$customer_id)->first();

		return response()->json([
            'success' => true,
            'message' => 'Customer Order View',
            'order' => $order,
			'customer' => $customer,
        ]);
	}
	public function get_ordercode_cus($cus_id){
		$order = Order::where('customer_id',$cus_id)->get();
		
		$order_details_cus = DB::table('orders')
			->where('customer_id', '=', $cus_id)
            ->join('order_details', 'orders.order_code', '=', 'order_details.order_code')
			->select('order_details.order_code', 
					 'orders.status',
					 'orders.totalPrice',
					 'order_details.product_id', 
					 'order_details.product_name',
					 'order_details.product_price',
					 'order_details.product_sales_quantity',
					 'order_details.product_image')
            ->get();

		
		return response()->json([
            'success' => true,
			'message' => 'Customer Order View',
			'order' => $order,
            'order_details_cus' => $order_details_cus,
        ]);
	}
    public function manage_order(){
    	$orderManagement = Order::orderby('created_at','DESC')->paginate(5);
    	return $orderManagement;
	}
	public function update_order_qty(Request $request){
		//update order
		$data = $request->all();
		$order = Order::find($data['order_id']);
		$order->status = $data['order_status'];
		$order->save();
		if($order->status == 3){
			foreach($data['order_product_id'] as $key => $product_id){
				
				$book = Book::find($product_id);
				$product_quantity = $book->quantity;
				$product_sold = $book->sold;
				foreach($data['quantity'] as $key2 => $qty){
						if($key==$key2){
								$pro_remain = $product_quantity - $qty;
								$book->quantity = $pro_remain;
								$book->sold = $product_sold + $qty;
								$book->save();
						}
				}
			}
		}else if($order->status == 4 || $order->status == 5){
			foreach($data['order_product_id'] as $key => $product_id){
				
				$book = Book::find($product_id);
				$product_quantity = $book->quantity;
				$product_sold = $book->sold;
				foreach($data['quantity'] as $key2 => $qty){
						if($key==$key2){
								$pro_remain = $product_quantity + $qty;
								$book->quantity = $pro_remain;
								$book->sold = $product_sold - $qty;
								$book->save();
						}
				}
			}
		}
	}
}
