import Axios from 'axios';
import React, { Component } from 'react';
import Product from './Product';
import { connect } from "react-redux";
import * as actions from "./../actions/index";
import SearchProduct from './SearchProduct';

class SearchProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keywords_submit: '',
            booklist: [],
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
    componentDidMount(){
        this.searchBook();
        
        this.changeSlide('1')
    }
    searchBook = () => {
        const searchData = {
            keywords_submit: this.props.searchBook.search
        }
        const response = Axios.post('http://127.0.0.1:8000/api/tim-kiem', searchData)
            .then(res => {
                this.setState({ 
                    booklist: res.data, 
                    keywords_submit: this.props.searchBook.search
                });
            });
        if(response.success){
            this.setState({
                keywords_submit: '',
            });
        } else {
            this.setState({
                errors: response.errors,
            });
        }
    }
    componentWillMount() {
        
    }
    buyItem=(value)=>{
        this.props.temp=value;
    }
    render() {
        var namesButton = [
            {
                id: 1,
                keyid: '1',
                name: 'Mới'
            },
            {
                id: 2,
                keyid: '2',
                name: 'Bán Chạy'
            },
            {
                id: 3,
                keyid: '3',
                name: 'Top Đánh Giá'
            }
        ]
        var buttonNames = namesButton.map((btnName, index) => {
            return <button key={index} className={this.state.listState.value === btnName.keyid ? 'btnCategory active' : 'btnCategory'} onClick={() => { this.changeSlide(btnName.keyid) }}>{btnName.name}</button>
        });
        var listProducts = this.state.booklist.map((product, index) => {
            if (this.state.listState.value === '1') {
                if (product.new) {
                    return <SearchProduct key={index} bookId={product.bookId} img={product.image1} name={product.name} author={product.author} price={product.price} temp={(value)=>{this.buyItem(value)}}></SearchProduct>
                }
            }
            else if (this.state.listState.value === '2') {
                if (product.bestsale) {
                    return <SearchProduct key={index} bookId={product.bookId} img={product.image1} name={product.name} author={product.author} price={product.price} temp={(value)=>{this.buyItem(value)}}></SearchProduct>
                }
            }
            else {
                if (product.toprating) {
                    return <SearchProduct key={index} bookId={product.bookId} img={product.image1} name={product.name} author={product.author} price={product.price} temp={(value)=>{this.buyItem(value)}}></SearchProduct>
                }
            }
        })
        return (
            <div className="sanpham">
                <div className="container">
                    <div className="title">SẢN PHẨM <span>CỦA CHÚNG TÔI</span></div>
                    <div className="boxCategory">
                        {buttonNames}
                    </div>
                    <div className="listProducts">
                        <div className="row">
                            {listProducts}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        searchBook: state.searchBook
    };
};

export default connect(mapStateToProps, null)(SearchProducts);