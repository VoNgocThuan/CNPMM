import React from "react";
import { FormGroup, FormLabel, FormControl, Form } from "react-bootstrap";
import Axios from "axios";
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class ChangeDefaultAddress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            cus_id: '',
            name: '',
            email: '',
            address: '',
            city: '',
            province: '',
            wards: '',
            cityValidation: null,
            provinceValidation: null,
            wardsValidation: null,
            addressValidation: null,
        }
    }

    componentWillMount() {
        const getLoginCustomerData = localStorage.getItem("loginCustomerData");
        if (getLoginCustomerData != null) {
            const customerdata = JSON.parse(getLoginCustomerData);
            if (customerdata.access_token !== null) {
                this.setState({
                    cus_id: customerdata.customer.id,
                });
            }
            else {
                console.log("Khách hàng chưa đăng nhập!");
            }
        }
    }

    getCustomerDetail = () => {
        Axios.get(`/api/auth/getCustomer/${this.state.cus_id}`).then((res) => {
            this.setState({
                customer: res.data.data,
                name: res.data.data.name,
                email: res.data.data.email,
                phone: res.data.data.phone,
            });
        });
    }

    componentDidMount() {
        this.getCityDetails();
        this.getCustomerDetail();
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

    getCityDetails = () => {
        Axios.get('http://127.0.0.1:8000/api/delivery').then((res) => {
            this.setState({
                cities: res.data,
            });
        });
    };

    handleCityChange = (e) => {
        let cityValidation = "success";
        let city = e.target.value;
        this.setState(() => ({
            city,
            cityValidation
        }));
    };

    handleProvinceChange = (e) => {
        let provinceValidation = "success";
        let province = e.target.value;
        this.setState(() => ({
            province,
            provinceValidation
        }));
    };

    handleWardsChange = (e) => {
        let wardsValidation = "success";
        let wards = e.target.value;
        this.setState(() => ({
            wards,
            wardsValidation
        }));
    };

    handleAddressChange = (e) => {
        let addressValidation = "success";
        let address = e.target.value;
        this.setState(() => ({
            address,
            addressValidation
        }));
    };

    handleUpdateAddress = () => {
        const addressData = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            city: this.state.city,
            province: this.state.province,
            wards: this.state.wards,
            address: this.state.address
        }
        const response = Axios.put(`/api/auth/update-customer-info/${this.state.cus_id}`, addressData)
            .then((res) => {
                window.location.href = "/shopbansach/account-info";
            })
            .catch((error) => {
                console.log(error.res);
            });
        if (response.success) {
            this.setState({
                cus_id: "",
                name: "",
                email: "",
                city: "",
                province: "",
                wards: "",
                address: "",
                phone: "",
            });
        } else {
            this.setState({
                errors: response.errors,
            });
        }
    }

    render() {
        return (
            <MuiThemeProvider>
                <form onSubmit={this.handleUpdateAddress}>
                    <div className="container mt-4">
                        <h2>THIẾT LẬP ĐỊA CHỈ MẶC ĐỊNH</h2>
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
                            <FormLabel>Điền địa chỉ nhà</FormLabel>
                            <FormControl
                                type="text"
                                value={this.state.address}
                                placeholder="Điền địa chỉ nhà"
                                onChange={this.handleAddressChange}
                            />
                            <FormControl.Feedback />
                        </FormGroup>

                        <div style={{ margin: '12px 0' }}>
                            <RaisedButton
                                label={'Cập nhật'}
                                disableTouchRipple={true}
                                disableFocusRipple={true}
                                primary={true}
                                type="submit"
                                style={{ marginRight: 12 }}
                            />
                        </div>
                    </div>
                </form>
            </MuiThemeProvider>
        );
    }
}

export default ChangeDefaultAddress;