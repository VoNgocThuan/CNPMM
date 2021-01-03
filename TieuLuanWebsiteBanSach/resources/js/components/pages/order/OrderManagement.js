import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import { PUBLIC_URL } from '../../../constants';
import { updateOrderStatus } from '../../../services/OrderService';
export default class OrderManagement extends Component {
    constructor() {
        super()
        this.state = {
            orders: [],
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            alert_message: '',
            isloading: false,
        }
        this.handlePageChange = this.handlePageChange.bind(this);
    }
    componentDidMount() {
        Axios.get('/api/manage-order')
            .then(response => {
                this.setState({
                    orders: response.data.data,
                    //Trong Postman
                    itemsCountPerPage: response.data.per_page,
                    totalItemsCount: response.data.total,
                    activePage: response.data.current_page
                });
            });
    }
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        //this.setState({activePage: pageNumber});
        axios.get('/api/manage-order?page=' + pageNumber)
            .then(response => {
                this.setState({
                    orders: response.data.data,
                    //Trong Postman
                    itemsCountPerPage: response.data.per_page,
                    totalItemsCount: response.data.total,
                    activePage: response.data.current_page
                });
            });
    }
    onDelete(order_code) {
        Axios.delete('/api/order/delete/' + order_code)
            .then(response => {

                var orders = this.state.orders;

                for (var i = 0; i < orders.length; i++) {
                    if (orders[i].order_code == order_code) {
                        orders.splice(i, 1);
                        this.setState({ orders: orders });
                    }
                }
                this.setState({ alert_message: "success" })
            }).catch(error => {
                this.setState({ alert_message: "error" });
            })

    }

    toggleCompleteStatus = async (item) => {
        if (item.status === 0) {
            item.status = 1;
        } else if (item.status === 1) {
            item.status = 2;
        } else if (item.status === 2) {
            item.status = 3;
        } else if (item.status === 3) {
            item.status = 4;
        } else if (item.status === 4) {
            item.status = 5;
        }
        await updateOrderStatus(item.id, item);
        Axios.get('/api/manage-order')
            .then(response => {
                this.setState({
                    orders: response.data.data,
                    //Trong Postman
                    itemsCountPerPage: response.data.per_page,
                    totalItemsCount: response.data.total,
                    activePage: response.data.current_page
                });
            });
    };

    render() {
        return (
            <div>
                <hr />
                <div className="header-part">
                    <div className="float-left">
                        <h2>Danh sách đơn hàng</h2>
                    </div>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Mã đơn hàng</th>
                            <th scope="col">Tên khách hàng</th>
                            <th scope="col">Email</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Thời gian đặt hàng</th>
                            <th scope="col">Tình trạng</th>
                            <th scope="col">Tổng tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.orders.map(order => {
                                return (
                                    <tr key={order.id}>
                                        <td>{order.order_code}</td>
                                        <td>{order.name}</td>
                                        <td>{order.email}</td>
                                        <td>{order.phone}</td>
                                        <td>{order.created_at}</td>
                                        <td>
                                            {order.status === 0 && (
                                                <>
                                                    Chờ xác nhận
                                                </>
                                            )}
                                            {order.status === 1 && (
                                                <>
                                                    Chờ lấy hàng
                                                </>
                                            )}
                                            {order.status === 2 && (
                                                <>
                                                    Đang giao
                                                </>
                                            )}
                                            {order.status === 3 && (
                                                <>
                                                    Đã giao
                                                </>
                                            )}
                                            {order.status === 4 && (
                                                <>
                                                    Đã hủy
                                                </>
                                            )}
                                            {order.status === 5 && (
                                                <>
                                                    Trả hàng
                                                </>
                                            )}
                                        </td>
                                        <td>{order.totalPrice}</td>
                                        <td>
                                            <Link to={`${PUBLIC_URL}order/view/${order.order_code}`} className="btn btn-outline-primary mr-2">
                                                Chi tiết
                                            </Link>
                                            {order.status === 0 && (
                                                <>
                                                    <button
                                                        className="btn btn-outline-warning mr-2"
                                                        onClick={() => this.toggleCompleteStatus(order)}
                                                    >
                                                        Chờ xác nhận
                                                    </button>
                                                </>
                                            )}
                                            {order.status === 1 && (
                                                <>
                                                    <button
                                                        className="btn btn-outline-info mr-2"
                                                        onClick={() => this.toggleCompleteStatus(order)}
                                                    >
                                                        Chờ lấy hàng
                                                    </button>
                                                </>
                                            )}
                                            {order.status === 2 && (
                                                <>
                                                    <button
                                                        className="btn btn-outline-secondary mr-2"
                                                        onClick={() => this.toggleCompleteStatus(order)}
                                                    >
                                                        Đang giao
                                                    </button>
                                                </>
                                            )}
                                            {order.status === 3 && (
                                                <>
                                                    <button
                                                        className="btn btn-outline-success mr-2"
                                                        onClick={() => this.toggleCompleteStatus(order)}
                                                    >
                                                        Đã giao
                                                    </button>
                                                </>
                                            )}
                                            {order.status === 4 && (
                                                <>
                                                    <button
                                                        className="btn btn-outline-danger mr-2"
                                                        onClick={() => this.toggleCompleteStatus(order)}
                                                    >
                                                        Đã hủy
                                                    </button>
                                                </>
                                            )}
                                            {order.status === 5 && (
                                                <>
                                                    <button
                                                        className="btn btn-outline-dark mr-2"
                                                        onClick={() => this.toggleCompleteStatus(order)}
                                                    >
                                                        Trả hàng
                                                    </button>
                                                </>
                                            )}

                                            <a onClick={this.onDelete.bind(this, order.order_code)} className="btn btn-outline-danger mt-1">Xóa</a>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div className="d-flex justify-content-center">
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemsCountPerPage}
                        totalItemsCount={this.state.totalItemsCount}
                        pageRangeDisplayed={this.state.pageRangeDisplayed}
                        onChange={this.handlePageChange}
                        itemClass='page-item'
                        linkClass='page-link'
                    />
                </div>
            </div>
        );
    }

}



