import React from "react";
import { FormGroup, FormLabel, FormControl, Form } from "react-bootstrap";
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Axios from "axios";

class AddressForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            address1: '',
            city: '',
            province: '',
            wards: '',
            phone: '',
            feeship: '',
            stateName: '',
            phoneValidation: null,
            noteValidation: null,
            cityValidation: null,
            provinceValidation: null,
            wardsValidation: null,
            addressValidation: null,
            feeshipValidation: null,
        };
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleNextAddress = this.handleNextAddress.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleProvinceChange = this.handleProvinceChange.bind(this);
        this.handleWardsChange = this.handleWardsChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleFeeShipChange = this.handleFeeShipChange.bind(this);
    }

    componentDidMount() {
        this.getCityDetails();
        
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
        // $('.calculate_delivery').on("click", function () {
        //     var matp = $('.city').val();
        //     var maqh = $('.province').val();
        //     var xaid = $('.wards').val();
        //     var _token = $('input[name="_token"]').val();
        //     if (matp == '' && maqh == '' && xaid == '') {
        //         alert('Làm ơn chọn để tính phí vận chuyển');
        //     } else {
        //         $.ajax({
        //             url: '/api/calculate-fee',
        //             method: 'POST',
        //             data: { matp: matp, maqh: maqh, xaid: xaid, _token: _token },
        //             success: function () {
        //                 location.reload();
        //             }
        //         });
        //     }
        // });
    }

    getCityDetails = () => {
        Axios.get('http://127.0.0.1:8000/api/delivery').then((res) => {
            this.setState({
                cities: res.data,
            });
        });
    };

    getAddressDetails = () => {
        Axios.get(`http://127.0.0.1:8000/api/auth/getCustomer/${this.state.cus_id}`).then((res) => {
            this.setState({
                city: res.data.data.city,
                province: res.data.data.province,
                wards: res.data.data.wards,
                address: res.data.data.address,
                phone: res.data.data.phone,
            });
        });
    };

    handleStateChange = (e) => {
        let stateName = e.target.value;
        this.setState(() => ({ stateName }));
    };

    handlePhoneChange = (e) => {
        let phone = e.target.value.trim();
        let phoneValidation = null;
        if (phone.length < 10) {
            phoneValidation = "error"
        }
        else {
            phoneValidation = "success"
        }

        if (phone.length <= 10) {
            this.setState(() => ({ phone, phoneValidation }));
        }
        this.props.PhoneOneChange(phone);
    };

    handleNextAddress = () => {
        const { address1, city, province, wards, stateName: state, phone, feeship } = this.state;
        const address = {
            address1,
            city,
            province,
            wards,
            state,
            phone,
            feeship,
        };
        this.props.handleNext(address);
    };

    handleCityChange = (e) => {
        let cityValidation = "success";
        let city = e.target.value;
        this.setState(() => ({
            city,
            cityValidation
        }));
        this.props.CityOneChange(city);
    };

    handleProvinceChange = (e) => {
        let provinceValidation = "success";
        let province = e.target.value;
        this.setState(() => ({
            province,
            provinceValidation
        }));
        this.props.ProvinceOneChange(province);
    };

    handleWardsChange = (e) => {
        let wardsValidation = "success";
        let wards = e.target.value;
        this.setState(() => ({
            wards,
            wardsValidation
        }));
        this.props.WardsOneChange(wards);
    };

    handleAddressChange = (e) => {
        let addressValidation = "success";
        let address1 = e.target.value;
        this.setState(() => ({
            address1,
            addressValidation
        }));
        this.props.AddressOneChange(address1);
    };

    handleFeeShipChange = (e) => {
        let feeshipValidation = "success";
        let feeship = e.target.value;
        this.setState(() => ({
            feeship,
            feeshipValidation
        }));
        this.props.FeeShipOneChange(feeship);
    };

    calculateFeeShip = () => {
        const postBody = {
            city: this.state.city,
            province: this.state.province,
            wards: this.state.wards,
        };
        Axios.post('/api/calculate-fee', postBody)
            .then((res) => {
                this.setState({
                    feeship: res.data
                });
            })
            .catch((error) => {
                console.log(error.res);
            });
    }
    render() {
        return (
            <form onSubmit={this.calculateFeeShip}>
                <fieldset disabled={this.state.editDisabled}>
                    <Form.Group
                        controlId="formBasicprovince"
                        validationState={this.state.cityValidation}
                    >
                        <Form.Label>Chọn tỉnh/thành phố</Form.Label>
                        <Form.Control as="select"
                            value={this.state.city}
                            name="city"
                            id="city"
                            onChange={(e) => this.handleCityChange(e)}
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
                            onClick={this.calculateFeeShip}
                            className="wards"
                        >
                            <option>Chọn xã phường</option>
                        </Form.Control>
                        <FormControl.Feedback />
                    </Form.Group>

                    <FormGroup
                        controlId="formBasicAddress"
                        validationState={this.state.addressValidation}
                    >
                        <FormLabel>Số nhà và Tên đường</FormLabel>
                        <FormControl
                            type="text"
                            value={this.state.address1}
                            placeholder="Điền số nhà, tên đường"
                            onChange={this.handleAddressChange}
                        />
                        <FormControl.Feedback />
                    </FormGroup>

                    <FormGroup
                        controlId="formBasicZip"
                        validationState={this.state.phoneValidation}
                    >
                        <FormLabel>Số điện thoại</FormLabel>
                        <FormControl
                            type="number"
                            value={this.state.phone}
                            placeholder="Điền số điện thoại"
                            onChange={this.handlePhoneChange}
                        />
                        <FormControl.Feedback />
                    </FormGroup>
                </fieldset>
                <div style={{ margin: '12px 0' }}>
                    <FlatButton
                        label="Quay lại"
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onClick={this.props.handlePrev}
                    />
                    <RaisedButton
                        label={'Tiếp tục'}
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        primary={true}
                        onClick={this.handleNextAddress}
                        style={{ marginRight: 12 }}
                    />

                </div>
            </form>
        )
    }
}
export default AddressForm;