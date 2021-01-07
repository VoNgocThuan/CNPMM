import Axios from "axios";
import React, { Component } from "react";
import Product from "./Product";
class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            booklist: [],
            listState: "1",
            currentPage: 1,
            productPerPage: 8
        };
        this.changeSlide = this.changeSlide.bind(this);
    }
    changeSlide(value) {
        this.setState({
            listState: value,
            currentPage: 1
        });
        console.log(value);
    }
    componentDidMount() {
        this.changeSlide("1");
    }
    componentWillMount() {
        Axios.get("http://127.0.0.1:8000/api/books").then(res => {
            this.setState({ booklist: res.data.data });
        });
    }
    buyItem = value => {
        this.props.temp = value;
    };
    chosePage = event => {
        this.setState({
            currentPage: Number(event.target.id)
        });
    };

    render() {
        var namesButton = [
            {
                id: 1,
                keyid: "1",
                name: "Mới"
            },
            {
                id: 2,
                keyid: "2",
                name: "Bán Chạy"
            },
            {
                id: 3,
                keyid: "3",
                name: "Top Đánh Giá"
            }
        ];
        var buttonNames = namesButton.map((btnName, index) => {
            return (
                <button
                    key={index}
                    className={
                        this.state.listState === btnName.keyid
                            ? "btnCategory active"
                            : "btnCategory"
                    }
                    onClick={() => {
                        this.changeSlide(btnName.keyid);
                    }}
                >
                    {btnName.name}
                </button>
            );
        });
        var tempProducts =
            this.state.listState === "1"
                ? this.state.booklist.filter(el => el.new === 1)
                : (this.state.listState === "2"
                ? this.state.booklist.filter(el => el.bestsale === 1)
                : this.state.booklist.filter(el => el.toprating === 1));
        console.log(tempProducts);
        const currentPage = this.state.currentPage; //trang hiện tại
        const productPerPage = this.state.productPerPage; //sản phẩm mỗi trang
        const indexOfLastNews = currentPage * productPerPage; //index(vị trí) sản phẩm cuối cùng của trang hiện tại trong mảng dữ liệu productsList
        const indexOfFirstNews = indexOfLastNews - productPerPage; //index(vị trí) sản phẩm đầu tiên của trang hiện tại trong mảng dữ liệu productsList
        const currentTodos = tempProducts.slice(
            indexOfFirstNews,
            indexOfLastNews
        ); //*cắt* dữ liệu ban đầu, lấy ra 1 mảng dữ liệu mới cho trang hiện tại
        var filteredProducts = currentTodos.map(product => (
            <Product
                key={product.bookId}
                bookId={product.bookId}
                img={product.image1}
                name={product.name}
                author={product.author}
                originalPrice={product.originalPrice}
                price={product.price}
                quantity={product.quantity}
                temp={value => {
                    this.buyItem(value);
                }}
            ></Product>
        ));
        const pageNumbers = [];
        for (
            let i = 1;
            i <= Math.ceil(tempProducts.length / productPerPage);
            i++
        ) {
            pageNumbers.push(i);
        }
        return (
            <div className="sanpham">
                <div className="container">
                    <div className="title">
                        SẢN PHẨM <span>CỦA CHÚNG TÔI</span>
                    </div>
                    <div className="boxCategory">{buttonNames}</div>
                    <div className="listProducts">
                        <div className="row">{filteredProducts}</div>
                        <div className="d-flex justify-content-center">
                            <div className="pagination-custom">
                                <ul id="page-numbers">
                                    {pageNumbers.map(number => {
                                        if (this.state.currentPage === number) {
                                            return (
                                                <li
                                                    key={number}
                                                    id={number}
                                                    className="active"
                                                >
                                                    {number}
                                                </li>
                                            );
                                        } else {
                                            return (
                                                <li
                                                    key={number}
                                                    id={number}
                                                    onClick={this.chosePage}
                                                >
                                                    {number}
                                                </li>
                                            );
                                        }
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Products;
