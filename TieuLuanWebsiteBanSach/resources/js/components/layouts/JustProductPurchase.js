import Axios from 'axios';
import React, { Component } from 'react';

class JustProductPurchase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: [],
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
    render() {
        return (
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
        );
    }
}

export default JustProductPurchase;