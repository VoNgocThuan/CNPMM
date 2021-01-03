import Axios from 'axios';
import React, { Component } from 'react';
import ProductPurchase from '../../layouts/ProductPurchase';

class CustomerPurchase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: [],
            customerOrderList: [],
            cus_id: '',
            listState: '1',
        }
        this.changeSlide = this.changeSlide.bind(this)
    };
    changeSlide(value) {
        this.setState({
            listState: { value }
        })
        console.log(value);
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
        
            Axios.get(`/api/get-ordercode-cus-order/${this.state.cus_id}`)
            .then(res => {
                this.setState({
                    customerOrderList: res.data.order_details_cus,
                    orderList: res.data.order,
                });
            });
        this.changeSlide('1')
    }
    buyItem = (value) => {
        this.props.temp = value;
    }
    render() {
        var namesButton = [
            {
                id: 1,
                keyid: '1',
                name: 'Tất cả'
            },
            {
                id: 2,
                keyid: '2',
                name: 'Chờ xác nhận'
            },
            {
                id: 3,
                keyid: '3',
                name: 'Chờ lấy hàng'
            },
            {
                id: 4,
                keyid: '4',
                name: 'Đang giao'
            },
            {
                id: 5,
                keyid: '5',
                name: 'Đã giao'
            },
            {
                id: 6,
                keyid: '6',
                name: 'Đã hủy'
            },
        ]
        var buttonNames = namesButton.map((btnName, index) => {
            return <button key={index} className={this.state.listState.value === btnName.keyid ? 'btnCategory active' : 'btnCategory'} onClick={() => { this.changeSlide(btnName.keyid) }}>{btnName.name}</button>
        });
        var listProducts = this.state.customerOrderList.map((product, index) => {
            if (this.state.listState.value === '1') {
                if (product.status === 0 || product.status === 1 || product.status === 2 ||
                    product.status === 3 || product.status === 4 || product.status === 5) {
                    return <ProductPurchase
                        key={index}
                        proPurchaseID={product.product_id}
                        order_code={product.order_code}
                        order_status={product.status}
                        img={product.product_image}
                        name={product.product_name}
                        price={product.product_price}
                        quantity={product.product_sales_quantity}
                        totalPrice={product.totalPrice}
                        temp={(value) => { this.buyItem(value) }}>
                    </ProductPurchase>
                }
            }
            else if (this.state.listState.value === '2') {
                if (product.status === 0) {
                    return <ProductPurchase
                        key={index}
                        proPurchaseID={product.product_id}
                        order_code={product.order_code}
                        order_status={product.status}
                        img={product.product_image}
                        name={product.product_name}
                        price={product.product_price}
                        quantity={product.product_sales_quantity}
                        totalPrice={product.totalPrice}
                        temp={(value) => { this.buyItem(value) }}>
                    </ProductPurchase>
                }
            }
            else if (this.state.listState.value === '3') {
                if (product.status === 1) {
                    return <ProductPurchase
                        key={index}
                        proPurchaseID={product.product_id}
                        order_code={product.order_code}
                        order_status={product.status}
                        img={product.product_image}
                        name={product.product_name}
                        price={product.product_price}
                        quantity={product.product_sales_quantity}
                        totalPrice={product.totalPrice}
                        temp={(value) => { this.buyItem(value) }}>
                    </ProductPurchase>
                }
            }
            else if (this.state.listState.value === '4') {
                if (product.status === 2) {
                    return <ProductPurchase
                        key={index}
                        proPurchaseID={product.product_id}
                        order_code={product.order_code}
                        order_status={product.status}
                        img={product.product_image}
                        name={product.product_name}
                        price={product.product_price}
                        quantity={product.product_sales_quantity}
                        totalPrice={product.totalPrice}
                        temp={(value) => { this.buyItem(value) }}>
                    </ProductPurchase>
                }
            }
            else if (this.state.listState.value === '5') {
                if (product.status === 3) {
                    return <ProductPurchase
                        key={index}
                        proPurchaseID={product.product_id}
                        order_code={product.order_code}
                        order_status={product.status}
                        img={product.product_image}
                        name={product.product_name}
                        price={product.product_price}
                        quantity={product.product_sales_quantity}
                        totalPrice={product.totalPrice}
                        temp={(value) => { this.buyItem(value) }}>
                    </ProductPurchase>
                }
            }
            else {
                if (product.status === 4) {
                    return <ProductPurchase
                        key={index}
                        proPurchaseID={product.product_id}
                        order_code={product.order_code}
                        order_status={product.status}
                        img={product.product_image}
                        name={product.product_name}
                        price={product.product_price}
                        quantity={product.product_sales_quantity}
                        totalPrice={product.totalPrice}
                        temp={(value) => { this.buyItem(value) }}>
                    </ProductPurchase>
                }
            }
        })
        return (
            <div className="sanpham">
                <div className="container">
                    <div className="title">ĐƠN HÀNG <span>CỦA BẠN</span></div>
                    <div className="boxCategory">
                        {buttonNames}
                    </div>
                    <div className="listProducts">
                        <div className="row d-block">
                            {listProducts}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CustomerPurchase;