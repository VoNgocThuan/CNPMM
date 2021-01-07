import Axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PUBLIC_URL } from "../../constants";
import { connect } from 'react-redux'
import * as actions from './../actions/index'

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qty: 1,
            id: '',
            totalCart: '',
            totalQuantity: '',
            cartlist: [],
            setcartlist: [],
            booklist: [],
        }
        this.qty = this.qty.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    componentDidMount() {
        this.getCartDetails();
        this.getTotalCart();
        this.getTotalQuantity();
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log("qty", this.state.qty)
        if (this.props.quantity >= this.state.qty) {
            Axios.post('http://127.0.0.1:8000/add', {
                qty: this.state.qty,
                id: this.state.id
            })
                .then(res => {
                    this.setState({
                        cartlist: res.data,
                    });
                    this.getTotalQuantity();
                    this.getCartDetails();
                    this.getTotalCart();
                    this.props.temp(this.state.cartlist);
                });
            this.props.onAddProduct(this.state.totalQuantity, this.state.cartlist, this.state.totalCart);
        }
        else {
            alert("Số lượng tối đa được phép mua: " + 
            this.props.quantity + 
            ", quý khách vui lòng liên hệ email: vongocthuan1808@gmail.com hoặc hotline 0843339738 để được tư vấn và hỗ trợ tốt nhất.");
        }
    };
    qty(id, e) {
        console.log("id", id)
        this.setState({ qty: e.target.value, id: id });
    }
    getTotalCart = () => {
        Axios.get('http://127.0.0.1:8000/totalCart').then((res) => {
            this.setState({
                totalCart: res.data,
            });
            this.props.onAddProduct(this.state.totalQuantity, this.state.cartlist, this.state.totalCart);
        });

    }
    getTotalQuantity = () => {
        Axios.get('http://127.0.0.1:8000/totalQuantity').then((res) => {
            this.setState({
                totalQuantity: res.data,
            });
            this.props.onAddProduct(this.state.totalQuantity, this.state.cartlist, this.state.totalCart);
        });
    }
    getCartDetails = () => {
        this.props.onAddProduct(this.state.totalQuantity, this.state.cartlist, this.state.totalCart);
        Axios.get('http://127.0.0.1:8000/cart').then((res) => {
            this.setState({
                cartlist: res.data,
            });
        });
    };
    handlePlusMinus(type) {
        this.setState(prevState => {
            return { qty: type == 'add' ? prevState.qty + 1 : prevState.qty - 1 }
        });
    }

    render() {
        return (
            <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                <form onSubmit={this.handleSubmit}>
                    <div className="itemProduct">
                        <Link to={`${PUBLIC_URL}books/view/${this.props.bookId}`}>
                            <div className="boxImgProduct">
                                <div className="box20">
                                    <img src={this.props.img} alt="" />
                                    <div className="box-content">
                                        <a href="#" data-name="Book Story 01" data-price="17" className="add-to-cart">
                                            <h3 className="title">MUA NGAY</h3>
                                        </a>
                                    </div>
                                    <ul className="icon">
                                        <li><a href="#"><i className="fas fa-cart-plus"></i></a></li>
                                        <li><a href="#"><i className="fas fa-link"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </Link>
                        <div className="boxContentProduct" key={this.props.bookId}>
                            <div className="nameProduct">{this.props.name}</div>
                            <p className="nameAuthor">Tác giả: {this.props.author}</p>
                            <div className="detail">
                                <h4 className="price">
                                    <span>{this.props.originalPrice}đ</span> - {this.props.price}đ
                                </h4>
                            </div>

                            {this.props.quantity === 0 && (
                                <>
                                    <div className="detail mt-3">
                                        <h4 className="price text-center">
                                            HẾT HÀNG
                                        </h4>
                                    </div>
                                </>
                            )}

                            {this.props.quantity > 0 && (
                                <>
                                    <div className="boxQty input-group">
                                        Số lượng:
                                        <button
                                            className="minus-item btn btn-primary input-group-addon ml-3"
                                            onClick={this.handlePlusMinus.bind(this, 'sub')}
                                            value='Dec'
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            className="item-count form-control text-center"
                                            value={this.state.qty}
                                            onChange={(e) => this.qty(this.props.bookId, e)} />
                                        <button
                                            className="plus-item btn btn-primary input-group-addon"
                                            onClick={this.handlePlusMinus.bind(this, 'add')}
                                            value='Inc'
                                        >
                                            +
                                        </button>
                                    </div>
                                </>
                            )}

                            <div className="boxBtnProduct">
                                {this.props.quantity > 0 && (
                                    <>
                                        <button
                                            type="submit"
                                            className="btnAddProduct"
                                            value={this.state.qty}
                                            onClick={(e) => this.qty(this.props.bookId, e)}
                                        >
                                            MUA
                                        </button>
                                    </>
                                )}

                                {this.props.quantity === 0 && (
                                    <>
                                        <button
                                            className="btnAddProduct"
                                            disabled
                                        >
                                            MUA
                                        </button>
                                    </>
                                )}

                                <Link to={`${PUBLIC_URL}books/view/${this.props.bookId}`}>
                                    <button type="submit" className="btnAddProduct">CHI TIẾT</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {

    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddProduct: (total, cartlist, totalCart) => {
            dispatch(actions.addProduct(total, cartlist, totalCart));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Product);