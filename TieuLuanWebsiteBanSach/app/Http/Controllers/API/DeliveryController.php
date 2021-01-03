<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Customer;
use App\Models\City;
use App\Models\Province;
use App\Models\Wards;
use App\Models\Feeship;
use Session;
session_start();

class DeliveryController extends Controller
{
    public function delivery(Request $request){

    	$city = City::orderby('matp','ASC')->get();

    	return $city;
	}
	public function update_delivery(Request $request){
		$data = $request->all();
		$fee_ship = Feeship::find($data['feeship_id']);
		$fee_value = rtrim($data['fee_value'],'.');
		$fee_ship->fee_feeship = $fee_value;
		$fee_ship->save();
	}
    public function select_delivery(Request $request){
    	$data = $request->all();
    	if($data['action']){
    		$output = '';
    		if($data['action']=="city"){
    			$select_province = Province::where('matp',$data['ma_id'])->orderby('maqh','ASC')->get();
    				$output.='<option>Chọn quận huyện</option>';
    			foreach($select_province as $key => $province){
    				$output.='<option value="'.$province->maqh.'">'.$province->name_quanhuyen.'</option>';
    			}

    		}else{

    			$select_wards = Wards::where('maqh',$data['ma_id'])->orderby('xaid','ASC')->get();
    			$output.='<option>Chọn xã phường</option>';
    			foreach($select_wards as $key => $ward){
    				$output.='<option value="'.$ward->xaid.'">'.$ward->name_xaphuong.'</option>';
    			}
    		}
    		echo $output;
    	}
	}

	public function insert_delivery(Request $request){
		$data = $request->all();
		$fee_ship = new Feeship();
		$fee_ship->fee_matp = $data['city'];
		$fee_ship->fee_maqh = $data['province'];
		$fee_ship->fee_xaid = $data['wards'];
		$fee_ship->fee_feeship = $data['fee_ship'];
		$fee_ship->save();
	}

	public function select_feeship(){
		$feeship = Feeship::orderby('fee_id','DESC')->get();
		$output = '';
		$output .= '<div class="table-responsive">  
			<table class="table table-bordered">
				<thread> 
					<tr>
						<th>Tên thành phố</th>
						<th>Tên quận huyện</th> 
						<th>Tên xã phường</th>
						<th>Phí vận chuyển</th>
					</tr>  
				</thread>
				<tbody>
				';

				foreach($feeship as $key => $fee){

				$output.='
					<tr>
						<td>'.$fee->city->name_city.'</td>
						<td>'.$fee->province->name_quanhuyen.'</td>
						<td>'.$fee->wards->name_xaphuong.'</td>
						<td contenteditable data-feeship_id="'.$fee->fee_id.'" class="fee_feeship_edit">'.number_format($fee->fee_feeship,0,',','.').'</td>
					</tr>
					';
				}

				$output.='		
				</tbody>
				</table></div>
				';

				echo $output;
	}
	public function index()
    {
        $fee_ship = Feeship::paginate(4);
        return $fee_ship;
	}
	public function customer_feeship($cus_id){
		$customer = Customer::where('id', $cus_id)->first();
		$city_cus = $customer->city;
		$province_cus = $customer->province;
		$wards_cus = $customer->wards;
		$cus_feeship = Feeship::where('fee_matp',$city_cus)->where('fee_maqh',$province_cus)->where('fee_xaid',$wards_cus)->first();

		return response()->json([
            'success' => true,
            'message' => 'Customer Details City',
            'cus_feeship'    => $cus_feeship->fee_feeship
        ]);
	}
	public function calculate_fee(Request $request){
        $data = $request->all();
        if($data['city']){
            $feeship = Feeship::where('fee_matp',$data['city'])->where('fee_maqh',$data['province'])->where('fee_xaid',$data['wards'])->get();
            if($feeship){
                $count_feeship = $feeship->count();
                if($count_feeship>0){
                     foreach($feeship as $key => $fee){
                        Session::put('fee',$fee->fee_feeship);
                        Session::save();
                    }
                }else{ 
                    Session::put('fee',25000);
                    Session::save();
                }
            }
		}
		return $fee->fee_feeship;
		//echo Session::get('fee');
    }
}
