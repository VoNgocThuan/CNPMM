import React from "react";
import { Container, Col, Row, Button, FormGroup, FormLabel, FormControl, Form, Dropdown } from "react-bootstrap";
import CheckoutItem from "./CheckoutItem";
import Axios from "axios";
import NoCheckoutItems from './NoCheckoutItems';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from "react-router-dom";
import { PUBLIC_URL } from "../../../constants";
import PaymentDetail from "../../layouts/PaymentDetail";
var randomstring = require("randomstring");
class ShowCheckout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: {},
            cartlist: [],
            name: '',
            email: '',
            note: '',
            noteValidation: null,
            totalCart: '',
            toggleChangeInfo: false,
            isLoading: false,
            paymentMethod: '',
            city: '',
            province: '',
            wards: '',
            phone: '',
            cus_id: '',
            cus_city: '',
            cus_province: '',
            cus_wards: '',
            cus_address: '',
            cus_feeship: '',
            coupon: '',
            coupon_id: '',
            coupon_condition: '',
            coupon_time: '',
            coupon_number: '',
            couponError: undefined,
            couponMessage: undefined,
            random: '',
            tongTien: '',
            url_one_pay: '',
        };
        this.handleOrderCode = this.handleOrderCode.bind(this);
    }
    getTotalCart = () => {
        Axios.get('http://127.0.0.1:8000/totalCart').then((res) => {
            this.setState({
                totalCart: res.data,
            });
            console.log(this.state.totalCart);
        });
    }
    getCustomerDetail = () => {
        Axios.get(`/api/auth/getCustomer/${this.state.cus_id}`).then((res) => {
            this.setState({
                customer: res.data.data,
                name: res.data.data.name,
                email: res.data.data.email,
                cus_address: res.data.data.address,
                city: res.data.data.city,
                province: res.data.data.province,
                wards: res.data.data.wards,
                phone: res.data.data.phone,
            });
        });
    }
    getCustomerAdress = () => {
        Axios.get(`/api/auth/view-address-cus/${this.state.cus_id}`).then((res) => {
            this.setState({
                cus_city: res.data.city,
                cus_province: res.data.province,
                cus_wards: res.data.wards,
            });
        });
    }
    getCustomerFeeShip = () => {
        Axios.get(`/api/customer-feeship/${this.state.cus_id}`).then((res) => {
            this.setState({
                cus_feeship: res.data.cus_feeship,
            });
        });
    }
    getCartDetails = () => {
        Axios.get('http://127.0.0.1:8000/cart').then((res) => {
            this.setState({
                cartlist: res.data,
            });
        });
    };
    deleteAllCart = async () => {
        Axios.delete('http://127.0.0.1:8000/clear')
            .then((res) => {
                this.getTotalQuantity();
                this.getCartDetails();
                this.getTotalCart();
            });
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
    componentDidMount() {
        this.getTotalCart();
        this.getCustomerDetail();
        this.getCustomerAdress();
        this.getCustomerFeeShip();
        this.getCartDetails();
    }
    handleOrderCode() {
        var x = randomstring.generate(7);
        this.setState({ random: x });
    }
    onNoteChange = (e) => {
        let note = e.target.value;
        let noteValidation = "success";
        if (note.trim().length === 0) {
            noteValidation = "error";
        }
        if (note.length <= 45) {
            this.setState(() => ({ note, noteValidation }));
        }
    };
    finalPriceOrder = () => {
        const totalAmount = this.state.totalCart;
        if (this.state.coupon_condition === 1) {
            this.setState({ tongTien: (totalAmount * ((100 - this.state.coupon_number) / 100)) + Number(this.state.cus_feeship) }, () => {
                console.log("tongTien", this.state.tongTien)
            });
        }
        else {
            this.setState({ tongTien: totalAmount - this.state.coupon_number + Number(this.state.cus_feeship) }, () => {
                console.log("tongTien", this.state.tongTien)
            });
        }
    }
    handleMuaHang = async () => {
        this.setState(() => ({ isLoading: true }));
        await this.finalPriceOrder();

        if (this.state.paymentMethod === '1') {
            const postBody = {
                customer_id: this.state.cus_id,
                name: this.state.name,
                email: this.state.email,
                note: this.state.note,
                city: this.state.city,
                province: this.state.province,
                wards: this.state.wards,
                address: this.state.cus_address,
                phone: this.state.phone,
                status: 0,
                vpc_Amount: this.state.tongTien * 100,
                totalPrice: this.state.tongTien,
                coupon_code: this.state.coupon,
                coupon_number: this.state.coupon_number,
                feeship: this.state.cus_feeship,
                paymentMethod: this.state.paymentMethod,
                order_code: this.state.random,
                prevTotalPrice: this.state.totalCart
            };
            const response = Axios.post("http://127.0.0.1:8000/api/order/store", postBody)
                .then((res) => {
                    const cartItemData = {
                        order_code: this.state.random,
                    };
                    Axios.post('http://127.0.0.1:8000/cartContent', cartItemData)
                        .then((res) => {

                        });
                    const emailData = {
                        email: this.state.email,
                        full_name: this.state.name,
                        city: this.state.city,
                        province: this.state.province,
                        wards: this.state.wards,
                        address: this.state.cus_address,
                        phone: this.state.phone,
                        feeship: this.state.cus_feeship,
                        total: this.state.tongTien,
                        order_code: this.state.random
                    }
                    Axios.post('http://127.0.0.1:8000/send-mail', emailData);
                    window.location.href = res.data.url_one_pay;
                    this.deleteAllCart();
                })
                .catch((error) => {
                    console.log(error.res);
                });
            if (response.success) {
                this.setState({
                    cus_id: "",
                    name: "",
                    email: "",
                    note: "",
                    city: "",
                    province: "",
                    wards: "",
                    address: "",
                    phone: "",
                    paymentMethod: "",
                    random: "",
                    isLoading: false,
                });
            } else {
                this.setState({
                    errors: response.errors,
                    isLoading: false,
                });
            }
        }
        else if (this.state.paymentMethod === '0') {
            const postBody = {
                customer_id: this.state.cus_id,
                name: this.state.name,
                email: this.state.email,
                note: this.state.note,
                city: this.state.city,
                province: this.state.province,
                wards: this.state.wards,
                address: this.state.cus_address,
                phone: this.state.phone,
                status: 0,
                vpc_Amount: this.state.tongTien * 100,
                paymentMethod: this.state.paymentMethod,
                order_code: this.state.random,
                coupon_code: this.state.coupon,
                coupon_number: this.state.coupon_number,
                feeship: this.state.cus_feeship,
                totalPrice: this.state.tongTien,
                prevTotalPrice: this.state.totalCart
            };
            const response = Axios.post("http://127.0.0.1:8000/api/order/storeCOD", postBody)
                .then((res) => {
                    const cartItemData = {
                        order_code: this.state.random,
                    };
                    Axios.post('http://127.0.0.1:8000/cartContent', cartItemData)
                        .then((res) => {

                        });
                    const emailData = {
                        email: this.state.email,
                        full_name: this.state.name,
                        city: this.state.city,
                        province: this.state.province,
                        wards: this.state.wards,
                        address: this.state.cus_address,
                        phone: this.state.phone,
                        feeship: this.state.cus_feeship,
                        total: this.state.tongTien
                    }
                    Axios.post('http://127.0.0.1:8000/send-mail', emailData);
                    window.location.href = 'http://127.0.0.1:8000/shopbansach/pagesuccessful';
                    this.deleteAllCart();
                })
                .catch((error) => {
                    console.log(error.res);
                });
            if (response.success) {
                this.setState({
                    cus_id: "",
                    name: "",
                    email: "",
                    note: "",
                    city: "",
                    province: "",
                    wards: "",
                    address: "",
                    phone: "",
                    paymentMethod: "",
                    random: "",
                    isLoading: false,
                });
            } else {
                this.setState({
                    errors: response.errors,
                    isLoading: false,
                });
            }
        }
    };
    onCouponFormSubmit = (e) => {
        e.preventDefault();
        const couponData = {
            coupon: this.state.coupon
        };
        Axios.post('/api/check-coupon', couponData)
            .then((response) => {
                const response_data = response.data.data;
                const response_success = response.data.success;
                if (response_success == true) {
                    this.setState(() => ({
                        couponError: false,
                        couponMessage: "Áp dụng thành công mã giảm giá!",
                        coupon: response_data.coupon_code,
                        coupon_id: response_data.coupon_id,
                        coupon_condition: response_data.coupon_condition,
                        coupon_time: response_data.coupon_time,
                        coupon_number: response_data.coupon_number
                    }));
                }
                else {
                    this.setState(() => ({
                        couponError: true,
                        couponMessage: "Mã khuyến mãi không đúng!",
                        coupon: null,
                        coupon_condition: null,
                        coupon_time: null,
                        coupon_number: null
                    }))
                }
            })
    };
    onPaymentMethodChange = (e) => {
        this.setState({
            paymentMethod: e.target.value
        });
    };
    couponChange = (e) => {
        const coupon = e.target.value.trim();
        if (coupon.length < 25) {
            this.setState(() => ({
                coupon
            }));
        }
    };
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <Container className={"minimum-height"}>
                        <div className="checkout-address-selection">
                            <div className="shopee-border-delivery">
                            </div>
                            <div className="checkout-address-selection__container">
                                <div className="checkout-address-selection__section-header">
                                    <div className="checkout-address-selection__section-header-text">
                                        <svg height="16" viewBox="0 0 12 16" width="12" className="shopee-svg-icon icon-location-marker">
                                            <path d="M6 3.2c1.506 0 2.727 1.195 2.727 2.667 0 1.473-1.22 2.666-2.727 2.666S3.273 7.34 3.273 5.867C3.273 4.395 4.493 3.2 6 3.2zM0 6c0-3.315 2.686-6 6-6s6 2.685 6 6c0 2.498-1.964 5.742-6 9.933C1.613 11.743 0 8.498 0 6z" fill-rule="evenodd">
                                            </path>
                                        </svg> Địa chỉ nhận hàng
                                    </div>
                                </div>
                                <div className="checkout-address-selection__selected-address-summary">
                                    <div className="checkout-address-row">
                                        <div className="checkout-address-row__user-detail">
                                            {this.state.customer.name} {this.state.customer.phone}
                                        </div>
                                        <div className="checkout-address-row__address-summary">
                                            {this.state.cus_address}, {this.state.cus_wards}, {this.state.cus_province}, {this.state.cus_city}
                                        </div>
                                        <div className="checkout-address-row__default-label">
                                            Mặc định
                                        </div>
                                        <Dropdown className="ml-5">
                                            <Dropdown.Toggle variant="outline-info" id="dropdown-basic" style={{ fontSize: 0.875 + 'rem' }}>
                                                THAY ĐỔI
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href={`${PUBLIC_URL}change-default-address`}>Thiết lập địa chỉ</Dropdown.Item>
                                                <Dropdown.Item href={`${PUBLIC_URL}changeinfocheckout`}>Thay đổi thông tin giao hàng</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Row className="mt-4">
                            <Col lg={12} md={12}>
                                {this.state.totalCart > 0 ? <CheckoutItem /> : <NoCheckoutItems />}
                            </Col>
                        </Row>
                        <Row>
                            <div className="_3-_Zjn _2_zYUw">
                                <div className="buyer-remark">
                                    <span>Lời nhắn:</span>
                                    <div className="_3gunFW _2IIXql">
                                        <div className="voN2GT _2UzycI">
                                            <input className="_3uWB5R"
                                                type="text"
                                                placeholder="Lưu ý cho Người bán..."
                                                value={this.state.note}
                                                onChange={this.onNoteChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Row>
                        <Row>
                            <Col lg={12} md={12}>
                                <Form onSubmit={this.onCouponFormSubmit}>
                                    <FormGroup controlId={"promo-code-text"}>
                                        <FormLabel>Mã giảm giá</FormLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="Nhập mã giảm giá"
                                            max={45}
                                            name="coupon"
                                            className={"fifty-width"}
                                            value={this.state.coupon}
                                            onChange={this.couponChange}
                                        />
                                        {this.state.couponError ?
                                            <p className={"error-message"}>
                                                {this.state.couponMessage}
                                            </p> :
                                            <p className={"promo-successfully-applied"}>
                                                {this.state.couponMessage}
                                            </p>
                                        }
                                        <Button
                                            bsStyle={"primary"}
                                            type={"submit"}
                                            className="star-rating-div btn-sm check_coupon"
                                            name="check_coupon"
                                        >
                                            Áp dụng
                                        </Button>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} md={12}>
                                <Form.Group>
                                    <Form.Label>Chọn phương thức thanh toán</Form.Label>
                                    <Form.Control as="select"
                                        value={this.state.paymentMethod}
                                        name="paymentMethod"
                                        id="paymentMethod"
                                        size="20"
                                        onChange={this.onPaymentMethodChange}
                                        onClick={this.handleOrderCode.bind(this)}
                                    >
                                        <option>----- Chọn -----</option>
                                        <option value="1">Thanh toán OnePay</option>
                                        <option value="0">Thanh toán khi nhận hàng</option>

                                    </Form.Control>
                                    <FormControl.Feedback />
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className="OR36Xx">
                            <PaymentDetail
                                coupon_condition={this.state.coupon_condition}
                                totalCart={this.state.totalCart}
                                coupon_number={this.state.coupon_number}
                                cus_feeship={this.state.cus_feeship}
                            />

                            <div className="_3S63c5 _1WpGLP">
                                <RaisedButton
                                    label={'Đặt hàng'}
                                    primary={true}
                                    onClick={this.handleMuaHang}
                                    style={{ marginRight: 12 }}
                                    className="page-checkout stardust-button _22Ktrb"
                                />
                            </div>

                        </div>
                    </Container>
                </MuiThemeProvider>
            </div>


        );
    }
}

export default ShowCheckout;