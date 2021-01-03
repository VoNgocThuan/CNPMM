import React from "react";
import { FormGroup, FormLabel, FormControl, Form } from "react-bootstrap";
import Axios from "axios";
import $ from 'jquery';

class AddDelivery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            city: '',
            province: '',
            wards: '',
            fee_ship: '',
            cityValidation: null,
            provinceValidation: null,
            wardsValidation: null,
            feeShipValidation: null,
            isLoading: false,
        };
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleProvinceChange = this.handleProvinceChange.bind(this);
        this.handleWardsChange = this.handleWardsChange.bind(this);
        this.handleFeeShipChange = this.handleFeeShipChange.bind(this);
    }

    componentDidMount() {
        this.getCityDetails();
        fetch_delivery();

        function fetch_delivery() {
            var _token = $('input[name="_token"]').val();
            $.ajax({
                url: '/api/select-feeship',
                method: 'POST',
                data: { _token: _token },
                success: function (data) {
                    $('#load_delivery').html(data);
                }
            });
        }
        $(document).on('blur', '.fee_feeship_edit', function () {

            var feeship_id = $(this).data('feeship_id');
            var fee_value = $(this).text();
            var _token = $('input[name="_token"]').val();
            // alert(feeship_id);
            // alert(fee_value);
            $.ajax({
                url: '/api/update-delivery',
                method: 'POST',
                data: { feeship_id: feeship_id, fee_value: fee_value, _token: _token },
                success: function (data) {
                    fetch_delivery();
                }
            });

        });
        $('.add_delivery').on("click", function () {
            var city = $('.city').val();
            var province = $('.province').val();
            var wards = $('.wards').val();
            var fee_ship = $('.fee_ship').val();
            var _token = $('input[name="_token"]').val();
            $.ajax({
                url: '/api/insert-delivery',
                method: 'POST',
                data: { city: city, province: province, _token: _token, wards: wards, fee_ship: fee_ship },
                success: function (data) {
                    fetch_delivery();
                }
            });
        });
        $('.choose').on('change', function () {
            var action = $(this).attr('id');
            var ma_id = $(this).val();
            var _token = $('input[name="_token"]').val();
            var result = '';

            if (action == 'city') {
                result = 'province';
            } else {
                result = 'wards';
            }
            $.ajax({
                url: '/api/select-delivery',
                method: 'POST',
                data: { action: action, ma_id: ma_id, _token: _token },
                success: function (data) {
                    $('#' + result).html(data);
                }
            });
        });
    }

    handleCityChange = (e) => {
        let city = e.target.value;
        let cityValidation = "success";
        if (city.trim().length === 0) {
            cityValidation = "error";
        }
        if (city.length <= 45) {
            this.setState(() => ({ city, cityValidation }));
        }
    };

    handleProvinceChange = (e) => {
        let province = e.target.value;
        let provinceValidation = "success";
        if (province.trim().length === 0) {
            provinceValidation = "error";
        }
        this.setState(() => ({ province, provinceValidation }));
    };

    handleWardsChange = (e) => {
        let wards = e.target.value;
        let wardsValidation = "success";
        if (wards.trim().length === 0) {
            wardsValidation = "error";
        }
        this.setState(() => ({ wards, wardsValidation }));
    };

    handleFeeShipChange = (e) => {
        let fee_ship = e.target.value;
        let feeShipValidation = "success";
        if (fee_ship.trim().length === 0) {
            feeShipValidation = "error";
        }
        this.setState(() => ({ fee_ship, feeShipValidation }));
    };

    getCityDetails = () => {
        Axios.get('http://127.0.0.1:8000/api/delivery').then((res) => {
            this.setState({
                cities: res.data,
            });
            console.log(this.state.cities);
        });
    };

    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    submitForm = async (e) => {
        e.preventDefault();
        const { history } = this.props;
        this.setState({ isloading: true })
        const postBody = {
            city: this.state.city,
            province: this.state.province,
            wards: this.state.wards,
            fee_ship: this.state.fee_ship,
        };
        const response = Axios.post("http://127.0.0.1:8000/api/insert-delivery", postBody)
            .then((res) => {
                fetch_delivery();
            })
            .catch((error) => {
                console.log(error.res);
            });
        if (res.success) {
            this.setState({
                city: "",
                province: "",
                wards: "",
                fee_ship: "",
                isLoading: false,
            });
        } else {
            this.setState({
                errors: response.errors,
                isLoading: false,
            });
        }
    };

    render() {
        return (
            <div className="container">
                <form>
                    <h2 className="mt-4">Thêm phí vận chuyển</h2>
                    <Form.Group>
                        <Form.Label>Chọn tỉnh/thành phố</Form.Label>
                        <Form.Control as="select"
                            value={this.state.city}
                            name="city"
                            id="city"
                            onChange={(e) => this.changeInput(e)}
                            className="choose city"
                        >
                            <option>Chọn tỉnh/thành phố</option>
                            {this.state.cities.map((city, index) => (
                                <option key={index} value={city.matp}>{city.name_city}</option>
                            ))}
                        </Form.Control>
                        <FormControl.Feedback />
                    </Form.Group>


                    <Form.Group>
                        <Form.Label>Chọn quận huyện</Form.Label>
                        <Form.Control as="select"
                            value={this.state.province}
                            name="province"
                            id="province"
                            onChange={this.handleProvinceChange}
                            className="choose province"
                        >
                            <option>Chọn quận huyện</option>
                        </Form.Control>
                        <FormControl.Feedback />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Chọn xã phường</Form.Label>
                        <Form.Control as="select"
                            value={this.state.wards}
                            name="wards"
                            id="wards"
                            onChange={this.handleWardsChange}
                            className="wards"
                        >
                            <option>Chọn xã phường</option>
                        </Form.Control>
                        <FormControl.Feedback />
                    </Form.Group>

                    <FormGroup>
                        <FormLabel>Phí vận chuyển</FormLabel>
                        <FormControl
                            type="text"
                            value={this.state.fee_ship}
                            name="fee_ship"
                            className="fee_ship"
                            placeholder="Nhập phí vận chuyển"
                            onChange={this.handleFeeShipChange}
                        />
                        <FormControl.Feedback />
                    </FormGroup>

                    <button
                        type="submit"
                        name="add_delivery"
                        className="btn btn-info add_delivery"
                    >
                        Thêm phí vận chuyển
                </button>
                </form>
                <h2 className="mt-4">Danh sách phí vận chuyển của các tỉnh thành <i style={{fontSize: 12 + "px"}}>(*Click vào số tiền phí vận chuyển để cập nhật giá trị phí vận chuyển)</i></h2>
                <div id="load_delivery">

                </div>
            </div>
        )
    }
}
export default AddDelivery;