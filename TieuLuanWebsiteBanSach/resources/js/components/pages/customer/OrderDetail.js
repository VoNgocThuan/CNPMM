import Axios from 'axios';
import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PUBLIC_URL } from '../../../constants';
import JustProductPurchase from '../../layouts/JustProductPurchase';
import StatusOrderDetailChoLayHang from './StatusOrderDetailChoLayHang';
import StatusOrderDetailChoXacNhan from './StatusOrderDetailChoXacNhan';
import StatusOrderDetailDaGiao from "./StatusOrderDetailDaGiao"
import StatusOrderDetailDangGiao from './StatusOrderDetailDangGiao';

class OrderDetail extends Component {
    constructor() {
        super()
        this.state = {
            order: {},
            order_details: [],
            couponDetail: {},
            status: '',
            name: '',
            phone: '',
            coupon_code: '',
            address: '',
            city: '',
            province: '',
            wards: '',
            paymentMethod: '',
            totalCart: '',
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
        Axios.get(`/api/view-order/${this.props.match.params.order_code}`)
            .then(response => {
                this.setState({
                    order: response.data.order,
                    order_details: response.data.order_details,
                    status: response.data.order[0].status,
                    paymentMethod: response.data.order[0].paymentMethod,
                    coupon_code: response.data.order[0].coupon_code
                });
                console.log("coupon_code", this.state.coupon_code)
            });
    }
    componentDidMount() {
        this.getCustomerAdress();
    }
    getCustomerAdress = () => {
        Axios.get(`/api/auth/view-address-cus/${this.state.cus_id}`).then((res) => {
            this.setState({
                city: res.data.city,
                province: res.data.province,
                wards: res.data.wards,
            });
        });
    }
    render() {
        var listProducts = this.state.order_details.map((product, index) => {
            return <JustProductPurchase
                key={index}
                proPurchaseID={product.product_id}
                order_code={product.order_code}
                img={product.product_image}
                name={product.product_name}
                price={product.product_price}
                quantity={product.product_sales_quantity}
                totalPrice={product.totalPrice}>
            </JustProductPurchase>
        })
        return (
            <Container className="mt-4">
                <div role="main" className="order-detail-page__container">
                    <div className="order-detail-page__purchase-detail-header">
                        <div className="order-detail-header">
                            <div>
                                <div className="order-detail-header__state-container">
                                    {Object.keys(this.state.order).map(
                                        (item, i) => (
                                            <>
                                                {this.state.order[item].status === 0 && (
                                                    <StatusOrderDetailChoXacNhan />
                                                )}
                                                {this.state.order[item].status === 1 && (
                                                    <StatusOrderDetailChoLayHang />
                                                )}
                                                {this.state.order[item].status === 2 && (
                                                    <StatusOrderDetailDangGiao />
                                                )}
                                                {this.state.order[item].status === 3 && (
                                                    <StatusOrderDetailDaGiao />
                                                )}
                                                {this.state.order[item].status === 4 && (
                                                    <StatusOrderDetailDaHuy />
                                                )}
                                            </>
                                        )
                                    )}
                                </div>
                                <div className="shopee-border-bottom-dotted-circle__container">
                                    <div className="shopee-border-bottom-dotted-circle__circle shopee-border-bottom-dotted-circle__circle--left"> </div>
                                    <div className="shopee-border-bottom-dotted-circle__circle shopee-border-bottom-dotted-circle__circle--right"> </div>
                                </div>
                            </div>
                            <div className="order-detail-header__action-container">
                                <div className="order-detail-header__button-wrapper-container between-xs middle-xs order-detail-header__button-wrapper-container--last">
                                    <div className="order-detail-header__text-info-wrapper">
                                        <div className="purchase-text-info-wrapper">
                                            {this.state.status === 0 && (
                                                <>
                                                    <span className="purchase-text-info">
                                                        <span>
                                                            Đơn hàng này đang chờ xác nhận.
                                                        </span>
                                                    </span>
                                                </>
                                            )}
                                            {this.state.status === 1 && (
                                                <>
                                                    <span className="purchase-text-info">
                                                        <span>
                                                            Đơn hàng này đang chờ lấy hàng.
                                                        </span>
                                                    </span>
                                                </>
                                            )}
                                            {this.state.status === 2 && (
                                                <>
                                                    <span className="purchase-text-info">
                                                        <span>
                                                            Đơn hàng này đang được giao.
                                                        </span>
                                                    </span>
                                                </>
                                            )}
                                            {this.state.status === 3 && (
                                                <>
                                                    <span className="purchase-text-info">
                                                        <span>
                                                            Đơn hàng này đã hoàn thành.
                                                        </span>
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order-detail-page__delivery__container-wrapper">
                        <div className="shopee-border-delivery"></div>
                        <div className="order-detail-page__delivery__container">
                            <div className="order-detail-page__delivery__header">
                                <div className="order-detail-page__delivery__header__title">Địa chỉ nhận hàng</div>
                            </div>
                            <div className="order-detail-page__delivery__content">
                                <div className="order-detail-page__delivery__shipping-address__container">
                                    {Object.keys(this.state.order).map(
                                        (item, i) => (
                                            <div className="order-detail-page__delivery__shipping-address" key={i}>
                                                <div className="order-detail-page__delivery__shipping-address__shipping-name">{this.state.order[item].name}</div>
                                                <div className="order-detail-page__delivery__shipping-address__detail"><span>{this.state.order[item].phone}</span>
                                                    <br />{this.state.order[item].address}, {this.state.wards}, {this.state.province}, {this.state.city}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="shopee-border-delivery"></div>
                        <div className="order-detail-page__main-content-wrapper">
                            <div>
                                <div className="_1zdufp">
                                    {listProducts}
                                </div>

                                {Object.keys(this.state.order).map(
                                    (item, i) => (
                                        <div className="payment-detail__container _1R4a4Y" key={i}>
                                            <div className="payment-detail__item">
                                                <div className="payment-detail__item__description">Tổng tiền hàng</div>
                                                <div className="payment-detail__item__value">
                                                    <div className="payment-detail__item__value-text">₫{this.state.order[item].prevTotalPrice}</div>
                                                </div>
                                            </div>
                                            <div className="payment-detail__item">
                                                <div className="payment-detail__item__description">Phí vận chuyển</div>
                                                <div className="payment-detail__item__value">
                                                    <div className="payment-detail__item__value-text">₫{this.state.order[item].feeship}</div>
                                                </div>
                                            </div>
                                            <div className="payment-detail__item">
                                                <div className="payment-detail__item__description">Mã giảm giá
                                                </div>
                                                <div className="payment-detail__item__value">
                                                    {this.state.order[item].coupon_number > 100 && (
                                                        <>
                                                            <div className="payment-detail__item__value-text">-₫{this.state.order[item].coupon_number}</div>
                                                        </>
                                                    )}
                                                    {this.state.order[item].coupon_number <= 100 && (
                                                        <>
                                                            <div className="payment-detail__item__value-text">-{this.state.order[item].coupon_number}%</div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="payment-detail__item payment-detail__item--last">
                                                <div className="payment-detail__item__description">Tổng số tiền</div>
                                                <div className="payment-detail__item__value payment-detail__item__value--highlighted">
                                                    <div className="payment-detail__item__value-text">
                                                        <div>
                                                            <div>₫{this.state.order[item].totalPrice}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                        <div className="shopee-border-bottom-dotted-circle__container">
                            <div className="shopee-border-bottom-dotted-circle__circle shopee-border-bottom-dotted-circle__circle--left"> </div>
                            <div className="shopee-border-bottom-dotted-circle__circle shopee-border-bottom-dotted-circle__circle--right"> </div>
                        </div>
                        <div className="payment-detail__container">
                            <div className="payment-detail__item payment-detail__item--last">
                                <div className="payment-detail__item__description">
                                    <div className="payment-detail__item__description-inner">
                                        <div className="payment-detail__item__icon shopee-guarantee-icon payment-detail__shopee-guarantee-icon"> </div>Phương thức Thanh toán</div>
                                </div>
                                {this.state.paymentMethod === 1 && (
                                    <>
                                        <div className="payment-detail__item__value">
                                            <div className="payment-detail__item__value-text"><span className="payment-detail__payment-method-value">Thanh toán OnePay</span></div>
                                        </div>
                                    </>
                                )}
                                {this.state.paymentMethod === 0 && (
                                    <>
                                        <div className="payment-detail__item__value">
                                            <div className="payment-detail__item__value-text"><span className="payment-detail__payment-method-value">Thanh toán khi nhận hàng</span></div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div>
            </Container>
        );
    }
}

export default OrderDetail;