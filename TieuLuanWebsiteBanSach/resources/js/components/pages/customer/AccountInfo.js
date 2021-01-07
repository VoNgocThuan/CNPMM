import Axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AccountInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cus_id: '',
            customer: {},
            name: '',
            email: '',
            cus_address: '',
            cus_city: '',
            cus_province: '',
            cus_wards: '',
            phone: '',
            phoneValidation: null,
            name: '',
            nameValidation: null,
            email: '',
            emailValidation: null,
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
    componentDidMount() {
        this.getCustomerDetail();
        this.getCustomerAdress();
    }
    getCustomerDetail = () => {
        Axios.get(`/api/auth/getCustomer/${this.state.cus_id}`).then((res) => {
            this.setState({
                customer: res.data.data,
                name: res.data.data.name,
                email: res.data.data.email,
                cus_address: res.data.data.address,
                phone: res.data.data.phone,
            });
            console.log("customer",this.state.customer)
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
    onEmailChange = (e) => {
        let email = e.target.value;
        let emailValidation = "success";
        if (email.trim().length === 0) {
            emailValidation = "error";
        }
        if (email.length <= 45) {
            this.setState(() => ({ email, emailValidation }));
        }
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
    handleUpdateCusInfo = () => {
        const cusData = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            city: this.state.customer.city,
            province: this.state.customer.province,
            wards: this.state.customer.wards,
            address: this.state.customer.address
        }
        const response = Axios.put(`/api/auth/update-customer-info/${this.state.cus_id}`, cusData)
            .then((res) => {
                alert("Cập nhật thành công!");
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
            <form onSubmit={this.handleUpdateCusInfo}>
            <div className="h25IfI container mt-4" role="main">
                <div className="my-account-section">
                    <div className="my-account-section__header">
                        <div className="my-account-section__header-left">
                            <div className="my-account-section__header-title">Hồ sơ của tôi</div>
                            <div className="my-account-section__header-subtitle">Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
                        </div>
                    </div>
                    <div className="my-account-profile">
                        <div className="my-account-profile__left">
                            <div className="input-with-label">
                                <div className="input-with-label__wrapper">
                                    <div className="input-with-label__label">
                                        <label>Tên</label>
                                    </div>
                                    <div className="input-with-label__content">
                                        <div className="input-with-validator-wrapper">
                                            <div className="input-with-validator">
                                                <input 
                                                    type="text" 
                                                    placeholder="" 
                                                    value={this.state.name} 
                                                    onChange={this.onNameChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="input-with-label">
                                <div className="input-with-label__wrapper">
                                    <div className="input-with-label__label">
                                        <label>Email</label>
                                    </div>
                                    <div className="input-with-label__content">
                                        <div className="input-with-validator-wrapper">
                                            <div className="input-with-validator">
                                                <input 
                                                    type="text" 
                                                    placeholder="" 
                                                    value={this.state.email} 
                                                    onChange={this.onEmailChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="input-with-label">
                                <div className="input-with-label__wrapper">
                                    <div className="input-with-label__label">
                                        <label>Số điện thoại</label>
                                    </div>
                                    <div className="input-with-label__content">
                                        <div className="input-with-validator-wrapper">
                                            <div className="input-with-validator">
                                                <input 
                                                    type="number" 
                                                    placeholder="" 
                                                    value={this.state.phone} 
                                                    onChange={this.handlePhoneChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="input-with-label">
                                <div className="input-with-label__wrapper">
                                    <div className="input-with-label__label">
                                        <label>Địa chỉ giao hàng mặc định</label>
                                    </div>
                                    <div className="input-with-label__content">
                                        <div className="my-account__inline-container">
                                            <div className="my-account__input-text">
                                                {this.state.cus_address}, {this.state.cus_wards}, {this.state.cus_province}, {this.state.cus_city}
                                            </div>
                                            <Link 
                                                className="my-account__no-background-button my-account-profile__change-button ml-3"
                                                to="/shopbansach/change-default-address"
                                            >
                                                Thay đổi
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="my-account-page__submit">
                                <button type="submit" className="btn btn-primary btn--m btn--inline" aria-disabled="false">Lưu</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </form>
        );
    }
}

export default AccountInfo;