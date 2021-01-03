import Axios from "axios";
import Table from "react-bootstrap/Table";
import React, { Component } from "react";
import { Alert, Button, Nav, Row } from "react-bootstrap";
import { PUBLIC_URL } from "../../constants";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./../actions/index";

const CustomLink = ({ lable, to, activeOnlyOnExact }) => {
    return (
        <Route
            path={to}
            exact={activeOnlyOnExact}
            children={({ match }) => {
                var active = match ? "hvr-float-shadow" : "";
                return (
                    <li>
                        <Link
                            className={active}
                            to={to}
                            exact={activeOnlyOnExact}
                        >
                            {lable}
                        </Link>
                    </li>
                );
            }}
        />
    );
};

var trangChu = [
    {
        lable: "Trang Chủ",
        to: "/shopbansach",
        exact: false
    },
]

var quanly = [
    {
        lable: "Mã giảm giá",
        to: "/shopbansach/coupon",
        exact: false
    }
]

var nhanvien = [
    {
        lable: "Thể loại sách",
        to: "/shopbansach/categories",
        exact: false
    },
    {
        lable: "Phí vận chuyển",
        to: "/shopbansach/delivery",
        exact: false
    },
    {
        lable: "Đơn hàng",
        to: "/shopbansach/order",
        exact: false
    },
]

var itemsMenu = [
    {
        lable: "Tin Tức",
        to: "/shopbansach/news",
        exact: false
    },
    {
        lable: "Giới Thiệu",
        to: "/shopbansach/about",
        exact: false
    },
    {
        lable: "Liên Hệ",
        to: "/shopbansach/contact",
        exact: false
    }
];

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartlist: [],
            idBookCart: "",
            totalCart: 0,
            totalQuantity: 0,
            category: '',
            categoryList: [],
            keywords_submit: "",
        };
        this.cartlist = [];
        this.totalQuantity = 0;
        this.totalCart = 0;
        this.handleCart = this.handleCart.bind(this);
    }

    componentDidMount() {
        this.getTotalQuantity();
        this.getCartDetails();
        this.getTotalCart();
        this.getListCategory();
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
    handleCart(e) {
        e.preventDefault();
        this.getTotalQuantity();
        this.getCartDetails();
        this.getTotalCart();
    }
    onSearch = (e) => {
        e.preventDefault();

        this.props.onSearch(this.state.keywords_submit);
    }
    handleSearchChange = (e) => {
        let keywords_submit = e.target.value;
        this.setState(() => ({
            keywords_submit,
        }));
    };
    getCartDetails = async () => {
        await Axios.get("http://127.0.0.1:8000/cart").then(res => {
            this.setState({
                cartlist: res.data
            });
            this.cartlist = res.data;
            console.log(res.data);
        });
    };
    getTotalCart = async () => {
        await Axios.get("http://127.0.0.1:8000/totalCart").then(res => {
            this.setState({
                totalCart: res.data
            });
            this.totalCart = res.data;
            console.log(res.data);
        });
    };
    getTotalQuantity = async () => {
        await Axios.get("http://127.0.0.1:8000/totalQuantity").then(res => {
            this.setState({
                totalQuantity: res.data
            });
            this.totalQuantity = res.data;
            console.log(res.data);
        });
    };
    tangSoLuongSach = async id => {
        await Axios.put(`http://127.0.0.1:8000/tang-so-luong/${id}`).then(
            res => {
                console.log("Tăng:", this.state.totalQuantity);
            }
        );
        await this.getTotalQuantity();
        await this.getCartDetails();
        await this.getTotalCart();
        console.log(this.cartlist);
        this.props.onAddNewProduct(
            this.totalQuantity,
            this.cartlist,
            this.totalCart
        );
        this.props.onSearch('aaa');
    };
    giamSoLuongSach = async id => {
        Axios.put(`http://127.0.0.1:8000/giam-so-luong/${id}`).then(res => {
        });
        await this.getTotalQuantity();
        await this.getCartDetails();
        await this.getTotalCart();
        console.log(this.cartlist);
        this.props.onAddNewProduct(
            this.totalQuantity,
            this.cartlist,
            this.totalCart
        );
    };
    deleteCart = async id => {
        await Axios.delete(`http://127.0.0.1:8000/xoa-san-pham/${id}`).then(res => {
        });
        await this.getTotalQuantity();
        await this.getCartDetails();
        await this.getTotalCart();
        console.log(this.cartlist);
        this.props.onAddNewProduct(
            this.totalQuantity,
            this.cartlist,
            this.totalCart
        );
    };
    deleteAllCart = async () => {
        await Axios.delete("http://127.0.0.1:8000/clear").then(res => {
        });
        await this.getTotalQuantity();
        await this.getCartDetails();
        await this.getTotalCart();
        console.log(this.cartlist);
        this.props.onAddNewProduct(
            this.totalQuantity,
            this.cartlist,
            this.totalCart
        );
    };
    updateCart = () => {
        this.setState({
            cartlist: this.props.products.cartlist,
            totalCart: this.props.products.totalCart,
            totalQuantity: this.props.products.total
        });
    };

    render() {
        const logout = () => {
            localStorage.removeItem("loginData");
            window.location.href = PUBLIC_URL + "login";
        };
        const logoutStaff = () => {
            localStorage.removeItem("loginStaffData");
            window.location.href = PUBLIC_URL + "login-staff";
        };
        const logoutCus = () => {
            localStorage.removeItem("loginCustomerData");
            window.location.href = PUBLIC_URL + "login-checkout";
        };

        const getLoginData = localStorage.getItem("loginData");
        const getLoginStaffData = localStorage.getItem("loginStaffData");
        const getLoginCustomerData = localStorage.getItem("loginCustomerData");
        
        var listCategory = this.state.categoryList.map((category, index) => {
            return <li>
                <Link key={index} to={`${PUBLIC_URL}categoryproducts/${category.id}`}>{category.name}</Link>
            </li>

        })
        return (
            <header id="menu">
                <div
                    id="top-menu"
                    className="d-md-none d-sm-none d-none d-lg-block"
                >
                    <div className="container">
                        <div className="content-top-menu">
                            <div className="box-icon-top title-welcome">

                                {!this.props.authData.isLoggedIn && !this.props.authStaffData.isStaffLoggedIn && !this.props.authCusData.isCusLoggedIn && (
                                    <>
                                        <Row>
                                            <Link to={`${PUBLIC_URL}login-checkout`}>
                                                <Nav.Item className="text-dark mr-1">Đăng nhập |</Nav.Item>
                                            </Link>
                                            <Link to={`${PUBLIC_URL}register-checkout`}>
                                                <Nav.Item className="text-dark ml-1 "> Đăng ký</Nav.Item>
                                            </Link>
                                        </Row>
                                    </>
                                )}
                                {this.props.authData.isLoggedIn && (
                                    <>
                                        <Row>
                                            <Nav.Link>Chào mừng Quản lý {this.props.authData.user.name} đã đến với thế giới sách</Nav.Link>
                                            <Nav.Link onClick={() => logout()}>
                                                <Nav.Item className="text-dark ml-2 ">Đăng xuất</Nav.Item>
                                            </Nav.Link>
                                        </Row>
                                    </>
                                )}
                                {this.props.authStaffData.isStaffLoggedIn && (
                                    <>
                                        <Row>
                                            <Nav.Link>Chào mừng Nhân viên {this.props.authStaffData.staff.name} đã đến với thế giới sách</Nav.Link>
                                            <Nav.Link onClick={() => logoutStaff()}>
                                                <Nav.Item className="text-dark ml-2 ">Đăng xuất</Nav.Item>
                                            </Nav.Link>
                                        </Row>
                                    </>
                                )}
                                {this.props.authCusData.isCusLoggedIn && (
                                    <>
                                        <Row>
                                            <li class="main-sub">
                                                <Nav.Link>{this.props.authCusData.customer.name}</Nav.Link>
                                                <ul class="sub-menu">
                                                    <li><Link to={`${PUBLIC_URL}account-info`}>Tài khoản của tôi</Link></li>
                                                    <li><Link to={`${PUBLIC_URL}customer-purchase`}>Đơn hàng</Link></li>
                                                    <li><Link onClick={() => logoutCus()}>
                                                            Đăng xuất
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
                                        </Row>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="box-logo-search">
                        <img
                            className="imgLogoTop"
                            src="/images/logo1.png"
                            alt=""
                        />
                        <div className="box-search-cart">
                            <div className="form-search">
                                <form className="search-box d-none d-sm-none d-lg-block" onSubmit={this.onSearch}>
                                    <input
                                        className="input-search"
                                        value={this.state.keywords_submit}
                                        type="text"
                                        placeholder="Tìm kiếm..."
                                        onChange={this.handleSearchChange}
                                    />
                                    <button
                                        type="submit"
                                        className="btn-search"
                                        onClick={this.onSearch}
                                    >
                                        <Link to="/shopbansach/search-page">
                                            <i className="fas fa-search"></i>
                                        </Link>
                                    </button>
                                </form>
                            </div>
                            <a
                                href="#"
                                data-toggle="modal"
                                data-target="#cart"
                                onClick={this.updateCart}
                                className="cart"
                            >
                                <div className="box-cart">
                                    <i class="fas fa-shopping-cart"></i>
                                    <span className="count">
                                        ({this.props.products.total})
                                    </span>
                                    <p>Sản phẩm</p>
                                </div>
                            </a>
                        </div>
                        <div class="menumobi d-lg-none d-md-block">
                            {" "}
                            <a href="#my-menu" id="open" class="icon-menu">
                                ☰
                            </a>
                        </div>
                    </div>
                </div>
                {/* Modal */}
                <form onSubmit={this.handleCart}>
                    <div
                        className="modal fade"
                        id="cart"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5
                                        className="modal-title"
                                        id="exampleModalLabel"
                                    >
                                        Giỏ hàng
                                    </h5>
                                    <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        {" "}
                                        <span aria-hidden="true">
                                            &times;
                                        </span>{" "}
                                    </button>
                                </div>
                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>Tên sản phẩm</th>
                                            <th>Giá</th>
                                            <th>Số lượng</th>
                                        </tr>
                                    </thead>
                                    {Object.keys(this.state.cartlist).map(
                                        (item, i) => (
                                            <tbody>
                                                <tr key={i}>
                                                    <td>
                                                        {
                                                            this.state.cartlist[
                                                                item
                                                            ].name
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            this.state.cartlist[
                                                                item
                                                            ].price
                                                        }
                                                        đ
                                                    </td>
                                                    <td>
                                                        <div
                                                            className="input-group"
                                                            style={{
                                                                width:
                                                                    130 + "px"
                                                            }}
                                                        >
                                                            <button
                                                                className="minus-item input-group-addon btn btn-primary"
                                                                onClick={() =>
                                                                    this.giamSoLuongSach(
                                                                        this
                                                                            .state
                                                                            .cartlist[
                                                                            item
                                                                        ].id
                                                                    )
                                                                }
                                                            >
                                                                -
                                                            </button>
                                                            <input
                                                                type="number"
                                                                className="item-count form-control"
                                                                disabled
                                                                value={
                                                                    this.state
                                                                        .cartlist[
                                                                        item
                                                                    ].quantity
                                                                }
                                                            />
                                                            <button
                                                                className="plus-item btn btn-primary input-group-addon"
                                                                onClick={() =>
                                                                    this.tangSoLuongSach(
                                                                        this
                                                                            .state
                                                                            .cartlist[
                                                                            item
                                                                        ].id
                                                                    )
                                                                }
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <Button
                                                            onClick={() =>
                                                                this.deleteCart(
                                                                    this.state
                                                                        .cartlist[
                                                                        item
                                                                    ].id
                                                                )
                                                            }
                                                            className="btn btn-danger"
                                                        >
                                                            Xóa
                                                        </Button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        )
                                    )}
                                </Table>
                                {this.props.products.cartlist && this.props.products.cartlist.length === 0 && (
                                    <Alert variant={"warning"}>
                                        Không có sản phẩm nào trong giỏ
                                    </Alert>
                                )}
                                <div>
                                    Tổng tiền: {this.props.products.totalCart}{" "}
                                    VNĐ
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-info"
                                        data-dismiss="modal"
                                    >
                                        Tiếp tục mua hàng
                                    </button>
                                    <button
                                        onClick={() => this.deleteAllCart()}
                                        type="button"
                                        className="btn btn-secondary"
                                    >
                                        Xóa hết
                                    </button>
                                    {this.props.products.cartlist && this.props.products.cartlist.length !==
                                        0 && (
                                            <>
                                                {getLoginCustomerData === null && (
                                                    <>
                                                        <Link
                                                            to={`${PUBLIC_URL}login-checkout`}
                                                        >
                                                            <Button>
                                                                Thanh toán
                                                        </Button>
                                                        </Link>
                                                    </>
                                                )}
                                                {getLoginCustomerData !== null && (
                                                    <>
                                                        <Link
                                                            to={`${PUBLIC_URL}checkout`}
                                                        >
                                                            <Button>
                                                                Thanh toán
                                                        </Button>
                                                        </Link>
                                                    </>
                                                )}
                                            </>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="mainmenu d-none d-lg-block">
                    <div className="container-fluid">
                        <ul>
                            {this.showMenu(trangChu)}
                            <li class="main-sub">
                                <a href="">
                                    Thể loại <i class="fas fa-chevron-down"></i>
                                </a>
                                <ul class="sub-menu">
                                    {listCategory}
                                </ul>
                            </li>
                            {getLoginData !== null && (
                                <>
                                    {this.showMenu(quanly)}
                                    {this.showMenu(nhanvien)}
                                </>
                            )}
                            {getLoginStaffData !== null && (
                                <>
                                    {this.showMenu(nhanvien)}
                                </>
                            )}
                            {this.showMenu(itemsMenu)}
                        </ul>
                    </div>
                </div>
            </header>
        );
    }
    showMenu = itemsMenu => {
        var result = null;
        if (itemsMenu.length > 0) {
            result = itemsMenu.map((itemMenu, index) => {
                return (
                    <CustomLink
                        lable={itemMenu.lable}
                        to={itemMenu.to}
                        activeOnlyOnExact={itemMenu.exact}
                    />
                );
            });
        }
        return result;
    };
}

const mapStateToProps = state => {
    return {
        products: state.products,
    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddNewProduct: (total, cartlist, totalCart) => {
            dispatch(actions.addProduct(total, cartlist, totalCart));
        },
        onSearch: (text) => {
            dispatch(actions.searchBook(text));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
