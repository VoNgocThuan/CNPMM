import Axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PUBLIC_URL } from "../../constants";
import { connect } from 'react-redux'
import * as actions from './../actions/index'
class SearchProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qty:0,
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
        Axios.post('http://127.0.0.1:8000/add', {
            qty: this.state.qty,
            id: this.state.id
        })
            .then(res => {
                console.log(res.data);
                this.setState({
                    cartlist: res.data,
                });
                this.getTotalQuantity();
                this.getCartDetails();
                this.getTotalCart();
                this.props.temp(this.state.cartlist);
                localStorage.setItem("CartData", JSON.stringify(res));
            });
            this.props.onAddProduct(this.state.totalQuantity, this.state.cartlist, this.state.totalCart);
    };
    qty(id, e) {
        console.log(id);
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
                            <div className="boxStar"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i> <span className="priceProduct">{this.props.price}đ</span></div>
                            <div className="boxQty">
                                Số lượng thêm vào giỏ: <input type="number"
                                    min="1"
                                    max="200"
                                    onChange={(e) => this.qty(this.props.bookId, e)} />
                            </div>
                            <div className="boxBtnProduct">
                                <button type="submit" className="btnAddProduct">MUA</button>
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
const mapStateToProps = state =>{
    return {

    }
}
const mapDispatchToProps = (dispatch, props) =>{
    return {
        onAddProduct : (total,cartlist,totalCart) =>{
            dispatch(actions.addProduct(total,cartlist,totalCart));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SearchProduct);