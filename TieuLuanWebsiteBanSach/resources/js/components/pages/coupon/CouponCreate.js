import React, { Component } from 'react';
import Axios from 'axios';
import SuccessAlert from '../../layouts/SuccessAlert';
import ErrorAlert from '../../layouts/ErrorAlert';
import { Link } from 'react-router-dom';
import { PUBLIC_URL } from '../../../constants';
import { Row } from 'react-bootstrap';
export default class CouponCreate extends Component {

    constructor() {
        super();
        this.onChangeCouponName = this.onChangeCouponName.bind(this);
        this.onChangeCouponTime = this.onChangeCouponTime.bind(this);
        this.onChangeCouponNumber = this.onChangeCouponNumber.bind(this);
        this.onChangeCouponCode = this.onChangeCouponCode.bind(this);
        this.onChangeCouponCondition = this.onChangeCouponCondition.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            coupon_name: '',
            coupon_time: '',
            coupon_number: '',
            coupon_condition: '',
            coupon_code: '',
            alert_message: ''
        }
    }
    onChangeCouponName(e) {
        this.setState({
            coupon_name: e.target.value
        });
    }
    onChangeCouponTime(e) {
        this.setState({
            coupon_time: e.target.value
        });
    }
    onChangeCouponNumber(e) {
        this.setState({
            coupon_number: e.target.value
        });
    }
    onChangeCouponCode(e) {
        this.setState({
            coupon_code: e.target.value
        });
    }
    onChangeCouponCondition(e) {
        this.setState({
            coupon_condition: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const coupon = {
            coupon_name: this.state.coupon_name,
            coupon_time: this.state.coupon_time,
            coupon_number: this.state.coupon_number,
            coupon_code: this.state.coupon_code,
            coupon_condition: this.state.coupon_condition,
        }

        const response = Axios.post('http://127.0.0.1:8000/api/coupons', coupon)
            .then(res => {
                this.setState({ alert_message: "success" })
            }).catch(error => {
                this.setState({ alert_message: "error" });
            })
        if (response.success) {
            this.setState({
                coupon_name: "",
                coupon_time: "",
                coupon_number: "",
                coupon_condition: "",
                coupon_code: "",
            });
        } else {
            this.setState({
                errors: response.errors,
            });
        }
    }
    render() {
        return (
            <div>
                <hr />
                <div className="container">
                    <Row>
                        <div className="col-4">
                            <h2>Thêm Mã giảm giá</h2>
                        </div>
                        <div className="col-8">
                            <Link to={`${PUBLIC_URL}coupon`} className="btn btn-info">Xem danh sách mã giảm giá</Link>
                        </div>
                    </Row>
                    {this.state.alert_message == "success" ? <SuccessAlert message={"Thêm thành công mã giảm giá!"} /> : null}
                    {this.state.alert_message == "error" ? <ErrorAlert message={"Lỗi xảy ra trong lúc thêm!"} /> : null}
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="coupon_name">Tên mã giảm giá</label>
                            <input type="text" className="form-control"
                                id="coupon_name"
                                name="coupon_name"
                                value={this.state.coupon_name}
                                onChange={this.onChangeCouponName}
                                placeholder="Nhập tên mã giảm giá" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="coupon_code">Mã giảm giá</label>
                            <input type="text" className="form-control"
                                id="coupon_code"
                                name="coupon_code"
                                value={this.state.coupon_code}
                                onChange={this.onChangeCouponCode}
                                placeholder="Nhập mã giảm giá" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="coupon_time">Số lần sử dụng</label>
                            <input type="number" className="form-control"
                                id="coupon_time"
                                name="coupon_time"
                                value={this.state.coupon_time}
                                onChange={this.onChangeCouponTime}
                                placeholder="Nhập số lần sử dụng" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="coupon_condition">Tính năng mã giảm giá</label>
                            <select
                                id="coupon_condition"
                                name="coupon_condition"
                                value={this.state.coupon_condition}
                                onChange={this.onChangeCouponCondition}
                                className="form-control">
                                <option>Chọn tính năng mã giảm giá</option>
                                <option value="1">Giảm theo phần trăm</option>
                                <option value="0">Giảm theo số tiền</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="coupon_number">Số phần trăm / Số tiền giảm</label>
                            <input type="number" className="form-control"
                                id="coupon_number"
                                name="coupon_number"
                                value={this.state.coupon_number}
                                onChange={this.onChangeCouponNumber}
                                placeholder="Nhập số phần trăm / số tiền giảm" />
                        </div>
                        <button type="submit" className="btn btn-primary">Thêm mã giảm giá</button>
                    </form>
                </div>
            </div>
        );
    }
}



