import Axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PUBLIC_URL } from '../../constants';
import { updateOrderStatus } from '../../services/OrderService';

class ProductPurchase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: [],
            orders: [],
            customerOrderList: [],
            cus_id: '',
        }
    };
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
        Axios.get(`/api/get-ordercode-cus-order/${this.state.cus_id}`)
            .then(res => {
                this.setState({
                    customerOrderList: res.data.order_details,
                    orderList: res.data.order,
                });
            });
    }
    onCancelStatuOrder = async (item) => {
        item.status = 4;
        await updateOrderStatus(item.id, item);
        Axios.get('/api/manage-order')
            .then(response => {
                this.setState({
                    orders: response.data.data,
                });
            });
    };
    qty(id) {
        console.log(id);
        this.setState({ id: id });
    }
    render() {
        return (
            <div className="purchase-list-page__checkout-card-wrapper">
                <div className="order-card__container">
                    <div className="order-card__content-wrapper">
                        <div className="order-card__content">
                            <div className="order-content__container">
                                <div className="order-content__header">
                                    <div className="order-content__header__seller">
                                        <div className="shopee-avatar">
                                            <div className="shopee-avatar__placeholder">
                                                <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="shopee-svg-icon icon-headshot">
                                                    <g>
                                                        <circle cx="7.5" cy="4.5" fill="none" r="3.8" stroke-miterlimit="10"></circle>
                                                        <path d="m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="none" stroke-linecap="round" stroke-miterlimit="10"></path>
                                                    </g>
                                                </svg>
                                            </div>
                                            <img className="shopee-avatar__img" src="/images/thumblogo.png" />
                                        </div>
                                        <span className="order-content__header__seller__name">
                                            Mã đơn hàng: {this.props.order_code}
                                        </span>
                                    </div>
                                    <div className="order-content__header__flex-placeholder">
                                    </div>
                                    <div className="order-content-status">
                                        {this.props.order_status === 0 && (
                                            <>
                                                Chờ xác nhận
                                            </>
                                        )}
                                        {this.props.order_status === 1 && (
                                            <>
                                                Chờ lấy hàng
                                            </>
                                        )}
                                        {this.props.order_status === 2 && (
                                            <>
                                                Đang giao
                                            </>
                                        )}
                                        {this.props.order_status === 3 && (
                                            <>
                                                Đã giao
                                            </>
                                        )}
                                        {this.props.order_status === 4 && (
                                            <>
                                                Đã hủy
                                            </>
                                        )}
                                        {this.props.order_status === 5 && (
                                            <>
                                                Trả hàng
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="order-content__item-list">
                                    <a className="order-content__item-wrapper">
                                        <div className="order-content__item order-content__item--last">
                                            <div className="order-content__item__col order-content__item__detail">
                                                <div className="order-content__item__product">
                                                    <div className="order-content__item__image">
                                                        <div className="shopee-image__wrapper">
                                                            <div className="shopee-image__place-holder">
                                                                <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" className="shopee-svg-icon icon-loading-image">
                                                                    <g>
                                                                        <rect fill="none" height="8" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" width="10" x="1" y="4.5"></rect>
                                                                        <line fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="1" x2="11" y1="6.5" y2="6.5"></line>
                                                                        <rect fill="none" height="3" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" width="3" x="11" y="6.5"></rect>
                                                                        <line fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="1" x2="11" y1="14.5" y2="14.5"></line><line fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="6" x2="6" y1=".5" y2="3"></line>
                                                                        <line fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="3.5" x2="3.5" y1="1" y2="3"></line><line fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="8.5" x2="8.5" y1="1" y2="3"></line>
                                                                    </g>
                                                                </svg>
                                                            </div>
                                                            <div className="shopee-image__content">
                                                                <div className="shopee-image__content--blur">
                                                                    <img className="shopee-image__content--blur" src={this.props.img} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="order-content__item__detail-content">
                                                        <div className="order-content__item__name">
                                                            {this.props.name}
                                                        </div>
                                                        <div className="order-content__item__quantity">
                                                            x {this.props.quantity}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="order-content__item__price order-content__item__col order-content__item__col--small order-content__item__col--last">
                                                <div className="order-content__item__price-text">
                                                    <div className="">
                                                        ₫{this.props.price}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="shopee-border-bottom-dotted-circle__container">
                            <div className="shopee-border-bottom-dotted-circle__circle shopee-border-bottom-dotted-circle__circle--left">
                            </div>
                            <div className="shopee-border-bottom-dotted-circle__circle shopee-border-bottom-dotted-circle__circle--right">
                            </div></div></div><div className="order-card__buttons-container">
                        <div className="purchase-card-buttons__wrapper">
                            <div className="purchase-card-buttons__total-payment">
                                <div className="shopee-guarantee-icon purchase-card-buttons__shopee-guarantee-icon">
                                </div><span className="purchase-card-buttons__label-price">
                                    Tổng số tiền:
                                      </span>
                                <span className="purchase-card-buttons__total-price">
                                    ₫{this.props.totalPrice}
                                </span>
                            </div>
                            <div className="purchase-card-buttons__container">
                                <div className="purchase-card-buttons__show-button-wrapper">
                                    <Link className="shopee-button-outline shopee-button-outline--fill shopee-button-outline--primary "
                                        to={`${PUBLIC_URL}order-detail-customer/${this.props.order_code}`}
                                    >
                                        Xem chi tiết đơn hàng
                                        </Link>
                                </div>
                                <div className="purchase-card-buttons__show-button-wrapper">
                                    <Link className="shopee-button-outline shopee-button-outline--fill shopee-button-outline--primary "
                                        to={`${PUBLIC_URL}books/view/${this.props.proPurchaseID}`}
                                    >
                                        Mua lần nữa
                                        </Link>
                                </div>
                                <div className="purchase-card-buttons__show-button-wrapper">
                                    <button
                                        className="btn btn-danger shopee-button-outline--fill"
                                        onClick={() => this.qty(this.props.proPurchaseID)}
                                    >
                                        Hủy đơn hàng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductPurchase;