import React from "react";
import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Row, Col, FormGroup, FormLabel, FormControl, Form, Button } from "react-bootstrap";
import AddressForm from "./AddressForm";
import Axios from "axios";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withRouter } from "react-router-dom";
var randomstring = require("randomstring");
const FieldGroup = ({ id, label, validationState = null, ...props }) => (
    <FormGroup controlId={id} validationState={validationState}>
        <FormLabel>{label}</FormLabel>
        <FormControl {...props} />
        <FormControl.Feedback />
    </FormGroup>
);
const s = "success";
class CheckoutInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartlist: [],
            order_id: '',
            totalCart: '',
            finished: false,
            stepIndex: 0,
            cus_id: '',
            name: '',
            nameValidation: null,
            email: '',
            emailValidation: null,
            note: '',
            noteValidation: null,
            city: '',
            province: '',
            wards: '',
            address: '',
            feeship: '',
            phone: '',
            paymentMethod: '',
            coupon: '',
            coupon_id: '',
            coupon_condition: '',
            coupon_time: '',
            coupon_number: '',
            couponError: undefined,
            couponMessage: undefined,
            random: '',
            tongTien: '',
            customer: {},
            isCusLoggedIn: false,
            loadedAddress: 0,
            isLoading: false,
            url_one_pay: '',
            totalCart: '',
        };
        this.handleOrderCode = this.handleOrderCode.bind(this);
    }
    componentDidMount() {
        this.getTotalCart();
        this.getCartDetails();
        const getLoginCustomerData = localStorage.getItem("loginCustomerData");
        if (getLoginCustomerData != null) {
            const customerdata = JSON.parse(getLoginCustomerData);
            if (customerdata.access_token !== null) {
                this.setState({
                    cus_id: customerdata.customer.id,
                    name: customerdata.customer.name,
                    email: customerdata.customer.email,
                    nameValidation: s,
                    emailValidation: s,
                });
            }
            else {
                console.log("Khách hàng chưa đăng nhập!");
            }
        }
    }
    deleteAllCart = async () => {
        Axios.delete('http://127.0.0.1:8000/clear')
            .then((res) => {
                this.getTotalQuantity();
                this.getCartDetails();
                this.getTotalCart();
            });
    }
    getCartDetails = () => {
        Axios.get('http://127.0.0.1:8000/cart').then((res) => {
            this.setState({
                cartlist: res.data,
            });
            console.log("cartlist", this.state.cartlist)
        });
    };
    getOrderItem = () => {
        Axios.get('http://127.0.0.1:8000/cartContent').then((res) => {

        });
    };
    getTotalCart = () => {
        Axios.get('http://127.0.0.1:8000/totalCart').then((res) => {
            this.setState({
                totalCart: res.data,
            });
        });
    }
    finalPriceOrder = () => {
        const totalAmount = this.state.totalCart;
        if (this.state.coupon_condition === 1) {
            this.setState({ tongTien: (totalAmount * ((100 - this.state.coupon_number) / 100)) + this.state.loadedAddress.feeship }, () => {
                console.log("tongTien", this.state.tongTien)
            });
        }
        else {
            this.setState({ tongTien: totalAmount - this.state.coupon_number + this.state.loadedAddress.feeship }, () => {
                console.log("tongTien", this.state.tongTien)
            });
        }
    }
    handleOrderCode() {
        var x = randomstring.generate(7);
        this.setState({ random: x });
    }
    handleNext = async (address) => {
        const { stepIndex } = this.state;

        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        });
        if (stepIndex === 1) {
            this.setState(() => ({ loadedAddress: address }));
        }
        else if (stepIndex >= 2) {
            // process the order
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
                    address: this.state.address,
                    phone: this.state.phone,
                    status: 0,
                    vpc_Amount: this.state.tongTien * 100,
                    totalPrice: this.state.tongTien,
                    coupon_code: this.state.coupon,
                    coupon_number: this.state.coupon_number,
                    feeship: this.state.loadedAddress.feeship,
                    paymentMethod: this.state.paymentMethod,
                    order_code: this.state.random,
                    prevTotalPrice: this.state.totalCart
                };
                const response = Axios.post("http://127.0.0.1:8000/api/order/store", postBody)
                    .then((res) => {
                        //this.getOrderItem();
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
                            address: this.state.address,
                            phone: this.state.phone,
                            feeship: this.state.loadedAddress.feeship,
                            total: this.state.tongTien,
                            order_code: this.state.random,
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
                    address: this.state.address,
                    phone: this.state.phone,
                    status: 0,
                    vpc_Amount: this.state.tongTien * 100,
                    paymentMethod: this.state.paymentMethod,
                    order_code: this.state.random,
                    coupon_code: this.state.coupon,
                    coupon_number: this.state.coupon_number,
                    feeship: this.state.loadedAddress.feeship,
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
                            address: this.state.address,
                            phone: this.state.phone,
                            feeship: this.state.loadedAddress.feeship,
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
        }
    };
    handlePrev = () => {
        const { stepIndex } = this.state;
        if (stepIndex > 0) {
            this.setState({ stepIndex: stepIndex - 1 });
        }
    };
    onNameChange = (e) => {
        let name = e.target.value;
        let nameValidation = "success";
        if (name.trim().length === 0) {
            nameValidation = "error";
        }
        if (name.length <= 45) {
            this.setState(() => ({ name, nameValidation }));
        }
    };
    static emailValidation = (email) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
    onEmailChange = (e) => {
        let email = e.target.value;
        let emailValidation = "error";
        if (CheckoutInformation.emailValidation(email.trim())) {
            emailValidation = "success";
        }

        if (email.length <= 45) {
            this.setState(() => ({ email, emailValidation }));
        }
        console.log("email", this.state.email)
    };
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
    onPaymentMethodChange = (e) => {
        this.setState({
            paymentMethod: e.target.value
        });
        console.log("paymentMethod", this.state.paymentMethod)
    };
    couponChange = (e) => {
        const coupon = e.target.value.trim();
        if (coupon.length < 25) {
            this.setState(() => ({
                coupon
            }));
        }
    };
    onInputCityChange = city => {
        this.setState({
            city: city
        });
    };
    onInputProvinceChange = province => {
        this.setState({
            province: province
        });
    };
    onInputWardsChange = wards => {
        this.setState({
            wards: wards
        });
    };
    onInputAddressChange = address => {
        this.setState({
            address: address
        });
    };
    onInputPhoneChange = phone => {
        this.setState({
            phone: phone
        });
    };
    onInputFeeShipChange = feeship => {
        this.setState({
            feeship: feeship
        });
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

    renderStepActions(step) {
        const { stepIndex } = this.state;

        return (
            <>
                <div style={{ margin: '12px 0' }}>
                    <RaisedButton
                        label={stepIndex === 2 ? 'Hoàn thành' : 'Tiếp tục'}
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        primary={true}
                        onClick={this.handleNext}
                        style={{ marginRight: 12 }}
                    />
                    {step > 0 && (
                        <FlatButton
                            label="Quay lại"
                            disabled={stepIndex === 0}
                            disableTouchRipple={true}
                            disableFocusRipple={true}
                            onClick={this.handlePrev}
                        />
                    )}
                </div>
            </>
        );
    }
    render() {
        const { stepIndex } = this.state;
        const totalAmount = this.state.totalCart;
        return (
            <div>
                <MuiThemeProvider>
                    <Stepper activeStep={stepIndex} orientation="vertical">
                        <Step>
                            <StepLabel>Thông tin người mua</StepLabel>
                            <StepContent>
                                <Row>
                                    <Col lg={12} md={12}>
                                        <form>
                                            <FieldGroup
                                                id="formControlsText"
                                                type="text"
                                                label="Họ và tên"
                                                validationState={this.state.nameValidation}
                                                placeholder="Điền họ và tên"
                                                value={this.state.name}
                                                onChange={this.onNameChange}
                                            />
                                            <FieldGroup
                                                id="formControlsEmail"
                                                type="email"
                                                label="Địa chỉ Email"
                                                validationState={this.state.emailValidation}
                                                placeholder="Điền địa chỉ email"
                                                value={this.state.email}
                                                onChange={this.onEmailChange}
                                            />
                                            <FieldGroup
                                                id="formControlsNote"
                                                type="text"
                                                label="Lời nhắn"
                                                as="textarea"
                                                rows="3"
                                                validationState={this.state.noteValidation}
                                                placeholder="Lưu ý cho Người bán..."
                                                value={this.state.note}
                                                onChange={this.onNoteChange}
                                            />
                                            
                                        </form>
                                    </Col>
                                </Row>
                                {this.state.nameValidation === "success" && this.state.emailValidation === "success" && this.renderStepActions(0)}
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>Địa chỉ nhận hàng</StepLabel>
                            <StepContent>
                                <Row>
                                    <Col lg={12} md={12}>
                                        <AddressForm
                                            Cus_ID={this.state.cus_id}
                                            AddressOneChange={this.onInputAddressChange}
                                            CityOneChange={this.onInputCityChange}
                                            ProvinceOneChange={this.onInputProvinceChange}
                                            WardsOneChange={this.onInputWardsChange}
                                            PhoneOneChange={this.onInputPhoneChange}
                                            FeeShipOneChange={this.onInputFeeShipChange}
                                            loadedAddress={this.state.loadedAddress}
                                            handleNext={this.handleNext}
                                            handlePrev={this.handlePrev}
                                        />
                                    </Col>
                                </Row>
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>Chọn phương thức thanh toán</StepLabel>
                            <StepContent>
                                <Row>
                                    <Col lg={12} md={12}>
                                        <Form onSubmit={this.onCouponFormSubmit}>
                                            <FormGroup controlId={"promo-code-text"}>
                                                <FormLabel>Mã giảm giá</FormLabel>
                                                <FormControl
                                                    type="text"
                                                    placeholder="Nhập mã giảm giá (Nếu có)"
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

                                            <Form.Group>
                                                <Form.Label>Chọn phương thức thanh toán</Form.Label>
                                                <Form.Control as="select"
                                                    value={this.state.paymentMethod}
                                                    name="paymentMethod"
                                                    id="paymentMethod"
                                                    onChange={this.onPaymentMethodChange}
                                                    onClick={this.handleOrderCode.bind(this)}
                                                >
                                                    <option>----- Chọn -----</option>
                                                    <option value="1">Thanh toán OnePay</option>
                                                    <option value="0">Thanh toán khi nhận hàng</option>

                                                </Form.Control>
                                                <FormControl.Feedback />
                                            </Form.Group>
                                        </Form>

                                        <FormGroup>
                                            {this.state.coupon_condition === 1 && (
                                                <>
                                                    <p>Mã giảm giá: -{this.state.coupon_number}%</p>
                                                    <p>Phí vận chuyển: {this.state.loadedAddress.feeship}đ</p>
                                                    <p>Thành tiền: {((totalAmount * ((100 - this.state.coupon_number) / 100)) + this.state.loadedAddress.feeship)}đ</p>
                                                </>
                                            )}
                                            {this.state.coupon_condition === 0 && (
                                                <>
                                                    <p>Mã giảm giá: -{this.state.coupon_number}đ</p>
                                                    <p>Phí vận chuyển: {this.state.loadedAddress.feeship}đ</p>
                                                    <p>Thành tiền: {(totalAmount - this.state.coupon_number + this.state.loadedAddress.feeship)}đ</p>
                                                </>
                                            )}
                                            {this.state.coupon_condition !== 0 && this.state.coupon_condition !== 1 && (
                                                <>
                                                    <p>Phí vận chuyển: {this.state.loadedAddress.feeship}đ</p>
                                                    <p>Thành tiền: {(totalAmount + this.state.loadedAddress.feeship)}đ</p>
                                                </>
                                            )}
                                            <hr />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                {this.renderStepActions(2)}
                            </StepContent>
                        </Step>
                    </Stepper>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default withRouter(CheckoutInformation);