import Axios from 'axios';
import React, { Component } from 'react';
import Product from './../../layouts/Product';

class CategoryProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            booklist: [],
            categoryList: [],
            qty: 1,
            img: '',
            id: '',
        }
    };
    
    async componentDidMount(){
        let bookID = this.props.match.params.id;
        var result = await this.getListBooks(bookID);
        this.setState({
            booklist: result
        })
        this.getListCategory();
    }
    componentWillMount() {

    }
    
    async componentWillReceiveProps(nextProps) {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            let bookID = nextProps.match.params.id;
            var result = await this.getListBooks(bookID);
            this.setState({
                booklist: result
            })
        }
    }

    getListBooks = async (id) => {
        var result = await Axios.get(`http://127.0.0.1:8000/api/categories/${id}`);
        return result.data.data.books;
    }

    buyItem=(value)=>{
        this.props.temp=value;
    }
    getListCategory = () => {
        this.setState({ isloading: true });
        Axios.get(`http://127.0.0.1:8000/api/categories/`
        ).then((res) => {
            this.setState({
                categoryList: res.data.data,
                isloading: false,
            });
        });
    }
    render() {
        var categoryName = this.state.categoryList.map((category, index) => {
            if(category.id == this.props.match.params.id){
                return  category.name
            }
        })
        console.log(categoryName)
        var listProducts = this.state.booklist.map((product, index) => {
            return <Product key={index} bookId={product.bookId} img={product.image1} name={product.name} author={product.author} originalPrice={product.originalPrice} price={product.price} temp={(value)=>{this.buyItem(value)}}></Product>
        })
        return (
            <div>
                <div className="bannerTopSanPham">
                    <img src="/images/slider0.webp" alt=""/>
                    <div class="contentBanner">
                        <p>MỪNG KHAI GIẢNG</p>
                        <h3>GIẢM NGAY <span>20%</span></h3>
                        <h4>CHO HỌC SINH SINH VIÊN</h4>
                    </div>
                </div>            
                <div className="sanpham">
                    <div className="container">
                        <div className="title">SẢN PHẨM THỂ LOẠI <span>{categoryName}</span></div>
                        <div className="listProducts">
                            <div className="row">
                                {listProducts}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CategoryProducts;