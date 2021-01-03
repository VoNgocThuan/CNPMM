<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderDetails extends Model
{
    public $timestamps = false; //set time to false
    protected $fillable = [
    	'order_code', 'product_id', 'product_name','product_price','product_sales_quantity','product_image'
    ];
    protected $primaryKey = 'order_details_id';
 	protected $table = 'order_details';

 	public function book(){
 		return $this->belongsTo('App\Models\Book','bookId');
	}

	public function order(){
		return $this->belongsTo('App\Models\Order','id');
   }
}
