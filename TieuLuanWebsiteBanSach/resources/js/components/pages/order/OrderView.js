import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { PUBLIC_URL } from '../../../constants';
import { Row, Form, Button } from "react-bootstrap";
import $ from 'jquery';

export default class OrderView extends Component {
    constructor() {
        super()
        this.state = {
            order: {},
            order_id: '',
            orderPrice: '',
            order_status: '',
            order_details: [],
            alert_message: '',
        }
    }
    componentDidMount() {
        Axios.get(`/api/view-order/${this.props.match.params.order_code}`)
            .then(response => {
                this.setState({
                    order: response.data.order,
                    order_details: response.data.order_details,
                    order_id: response.data.order[0].id,
                    order_status: response.data.order[0].status
                });
            });
        $('.order_details').on("change", function () {
            var order_status = $(this).val();
            var order_id = $(this).children(":selected").attr("id");
            var _token = $('input[name="_token"]').val();


            //lay ra so luong
            var quantity = [];
            $("input[name='product_sales_quantity']").each(function () {
                quantity.push($(this).val());
            });
            //lay ra product id
            var order_product_id = [];
            $("input[name='order_product_id']").each(function () {
                order_product_id.push($(this).val());
            });
            $.ajax({
                url: '/api/update-order-qty',
                method: 'POST',
                data: { _token: _token, order_status: order_status, order_id: order_id, quantity: quantity, order_product_id: order_product_id },
                success: function (data) {
                    alert('Thay đổi tình trạng đơn hàng thành công');
                    //location.reload();
                }
            });
        });
    }
    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    render() {
        return (
            <div className="container">
                <hr />
                <h2>THÔNG TIN GIAO HÀNG</h2>
                <table className="table table-hover mt-2">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tỉnh/Thành phố</th>
                            <th scope="col">Quận/Huyện</th>
                            <th scope="col">Xã/Phường</th>
                            <th scope="col">Lời nhắn</th>
                            <th scope="col">Hình thức thanh toán</th>
                            <th scope="col">Mã giảm giá</th>
                            <th scope="col">Phí vận chuyển</th>
                        </tr>
                    </thead>
                    {Object.keys(this.state.order).map(
                        (item, i) => (
                            <tbody>
                                <tr key={i}>
                                    <td>
                                        {
                                            this.state.order[
                                                item
                                            ].id
                                        }
                                    </td>
                                    <td>
                                        {
                                            this.state.order[
                                                item
                                            ].city
                                        }
                                    </td>
                                    <td>
                                        {
                                            this.state.order[
                                                item
                                            ].province
                                        }
                                    </td>
                                    <td>
                                        {
                                            this.state.order[
                                                item
                                            ].wards
                                        }
                                    </td>
                                    <td>
                                        {
                                            this.state.order[
                                                item
                                            ].note
                                        }
                                    </td>
                                    <td>
                                        {this.state.order[item].paymentMethod === 1 && (
                                            <>
                                                Thanh toán trả trước
                                            </>
                                        )}
                                        {this.state.order[item].paymentMethod === 0 && (
                                            <>
                                                Thanh toán COD
                                            </>
                                        )}
                                    </td>
                                    <td>
                                        {
                                            this.state.order[
                                                item
                                            ].coupon_code
                                        }
                                    </td>
                                    <td>
                                        {
                                            this.state.order[
                                                item
                                            ].feeship
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        )
                    )}
                </table>
                <h2 className="mt-5">THÔNG TIN SÁCH ĐƯỢC BÁN</h2>
                <table className="table table-hover mt-2">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID sách</th>
                            <th scope="col">Tên sách</th>
                            <th scope="col">Tổng giá sách</th>
                            <th scope="col">Số lượng hàng trong kho</th>
                            <th scope="col">Số lượng mua</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.order_details.map(item => {
                                return (
                                    <tr key={item.order_details_id}>
                                        <th scope="row">{item.order_details_id}</th>
                                        <td>
                                            <input type="hidden" name="order_product_id" className="order_product_id" value={item.product_id} />
                                            {item.product_id}
                                        </td>
                                        <td>{item.product_name}</td>
                                        <td>{item.product_price}</td>
                                        <td>{item.product_quantity_available} quyển sách</td>
                                        <td>
                                            <input type="hidden" value={item.product_sales_quantity} name="product_sales_quantity" />
                                            {item.product_sales_quantity} quyển sách
                                        </td>
                                    </tr>
                                )
                            })

                        }
                    </tbody>
                </table>
                <hr />
                <Form>
                    <Row>
                        <div className="col-4">
                            <Link to={`${PUBLIC_URL}order`} className="btn btn-primary mb-5">
                                Danh sách đơn hàng
                        </Link>
                        </div>
                        <div className="col-8">
                            <Form.Group>
                                <Form.Label><strong>Tình trạng đơn hàng</strong> <i style={{fontSize: 12 + "px"}}>(*Click chọn tình trạng đơn hàng để cập nhật)</i></Form.Label>
                                <Form.Control as="select"
                                    value={this.state.order_status}
                                    name="order_status"
                                    className="order_details"
                                    onChange={(e) => this.changeInput(e)}
                                >
                                    <option>----- Chọn tình trạng -----</option>
                                    <option id={this.state.order_id} value="0">Chờ xác nhận</option>
                                    <option id={this.state.order_id} value="1">Chờ lấy hàng</option>
                                    <option id={this.state.order_id} value="2">Đang giao</option>
                                    <option id={this.state.order_id} value="3">Đã giao</option>
                                    <option id={this.state.order_id} value="4">Đã hủy</option>
                                    <option id={this.state.order_id} value="5">Trả hàng</option>
                                </Form.Control>
                            </Form.Group>
                        </div>
                    </Row>
                </Form>
            </div>
        );
    }

}



