import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import SuccessAlert from '../../layouts/SuccessAlert';
import ErrorAlert from '../../layouts/ErrorAlert';
import { PUBLIC_URL } from '../../../constants';
export default class Listing extends Component {
    
    constructor()
    {
        super()
        this.state={
            coupons:[],
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            alert_message: ''
        }
        this.handlePageChange = this.handlePageChange.bind(this);
    }
    componentDidMount()
    {
        Axios.get('http://127.0.0.1:8000/api/coupons')
        .then(response=>{
            this.setState({
                coupons: response.data.data,
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
        Axios.get('http://127.0.0.1:8000/api/coupons?page=' + pageNumber)
            .then(response => {
                this.setState({
                    coupons: response.data.data,
                    //Trong Postman
                    itemsCountPerPage: response.data.per_page,
                    totalItemsCount: response.data.total,
                    activePage: response.data.current_page
                });
            });
    }
    onDelete(coupon_id) {
        Axios.delete('http://127.0.0.1:8000/api/coupons/' + coupon_id)
        .then(response => {
            var coupons = this.state.coupons;
            for (var i = 0; i < coupons.length; i++) {
                if (coupons[i].coupon_id == coupon_id) {
                    coupons.splice(i, 1);
                    this.setState({ coupons: coupons });
                }
            }
            this.setState({ alert_message: "success" })
        }).catch(error => {
            this.setState({ alert_message: "error" });
        })

    }
    render()
    {
        return (
            <div>
                <hr />
                <h2>DANH SÁCH MÃ GIẢM GIÁ</h2>
            {this.state.alert_message == "success" ? <SuccessAlert message={"Xóa thành công mã giảm giá!"} /> : null}
            {this.state.alert_message == "error" ? <ErrorAlert message={"Lỗi xảy ra trong lúc xóa!"} /> : null}

                <table className="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên mã giảm giá</th>
                        <th scope="col">Mã giảm giá</th>
                        <th scope="col">Số lần sử dụng</th>
                        <th scope="col">Tính năng mã giảm giá</th>
                        <th scope="col">Số phần trăm / Số tiền giảm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.coupons.map(coupon =>{
                                return (
                                    <tr key={coupon.coupon_id}>
                                        <th scope="row">{coupon.coupon_id}</th>
                                        <td>{coupon.coupon_name}</td>
                                        <td>{coupon.coupon_code}</td>
                                        <td>{coupon.coupon_time}</td>
                                        <td>{coupon.coupon_condition==1?("Giảm theo phần trăm"):("Giảm theo số tiền")}</td>
                                        <td>
                                            {coupon.coupon_condition==1 && 
                                                (
                                                    <>
                                                        Giảm {coupon.coupon_number}%
                                                    </>
                                                )
                                            }
                                            {coupon.coupon_condition==0 && 
                                                (
                                                    <>
                                                        Giảm {coupon.coupon_number}đ
                                                    </>
                                                )
                                            }
                                        </td>
                                        <td>
                                            <Link to={`${PUBLIC_URL}coupon/create`} className="btn btn-outline-info mr-2">Thêm</Link>
                                            <Link to={`${PUBLIC_URL}coupon/update/${coupon.coupon_id}`} className="btn btn-outline-primary mr-2">Sửa</Link>
                                            <a href="#" onClick={this.onDelete.bind(this, coupon.coupon_id)} className="btn btn-outline-danger">Xóa</a>
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



