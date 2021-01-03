// import React from 'react';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './layouts/Header';
import Footer from './layouts/Footer';
// Pages
import Home from './pages/Home';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import CategoryList from './pages/categories/CategoryList';
import CategoryCreate from './pages/categories/CategoryCreate';
import CategoryView from './pages/categories/CategoryView';
import CategoryProducts from './pages/categories/CategoryProducts';
import { PUBLIC_URL } from "../constants";
import BookEdit from './pages/books/BookEdit';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import { checkIfAuthenticated } from '../services/AuthService';
import AuthenticatedRoutes from './AuthenticatedRoutes';
import LoginCheckout from './pages/auth/LoginCustomer';
import RegisterCheckout from './pages/auth/RegisterCustomer';
import { checkCusIfAuthenticated } from '../services/CustomerAuthService';
import { checkCartItem } from '../services/CartService';
import CheckoutItem from './pages/checkout/CheckoutItem';
import CheckoutInformation from './pages/checkout/CheckoutInformation';
import ShowCheckout from './pages/checkout/ShowCheckout';
import NoCheckoutItems from './pages/checkout/NoCheckoutItems';
import Detail from './pages/books/Detail';
import News from './pages/news/News';
import {createStore} from 'redux'
import { Provider } from 'react-redux'
import myReducer from './reducers/index'
import { reduce } from 'lodash';
import { MapsLocalShipping } from 'material-ui/svg-icons';
import AddDelivery from './pages/delivery/AddDelivery';
import PageSuccessful from './pages/checkout/PageSuccessful';
import CustomerPurchase from './pages/customer/CustomerPurchase';
import OrderManagement from './pages/order/OrderManagement';
import OrderView from './pages/order/OrderView';
import ChangeInfoCheckout from './pages/checkout/ChangeInfoCheckout';
import CouponList from './pages/coupon/CouponList';
import CouponCreate from './pages/coupon/CouponCreate';
import CouponEdit from './pages/coupon/CouponEdit';
import RegisterStaff from './pages/auth/RegisterStaff';
import LoginStaff from './pages/auth/LoginStaff';
import { checkIfStaffAuthenticated } from '../services/StaffAuthService';
import OrderDetail from './pages/customer/OrderDetail';
import SearchPage from './pages/SearchPage';
import AccountInfo from './pages/customer/AccountInfo';
import ChangeDefaultAddress from './pages/customer/ChangeDefaultAddress';
const store = createStore(myReducer)
class App extends Component {
    state = {
        user: {},
        staff: {},
        customer: {},
        isLoggedIn: false,
        isStaffLoggedIn: false,
        isCusLoggedIn: false,
        cart:[],
    };
    buyItem=(value)=>{
        this.state.cart=value;
    }
    componentDidMount() {
        console.log("cart",this.state.cart);
        // Accordion 
        var acc = document.getElementsByClassName("accordion");
        var i;
        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
            });
        }

        if (checkIfAuthenticated()) {
            this.setState({
                user: checkIfAuthenticated(),
                isLoggedIn: true,
            });
        }
        if (checkIfStaffAuthenticated()) {
            this.setState({
                staff: checkIfStaffAuthenticated(),
                isStaffLoggedIn: true,
            });
        }
        if (checkCusIfAuthenticated()) {
            this.setState({
                customer: checkCusIfAuthenticated(),
                isCusLoggedIn: true,
            });
        }
        if (checkCartItem()) {
            this.setState({
                cart: checkCartItem(),
            });
        }
    }
    render() {
        return (
            <div className="boxApp">
                <Router>
                    <Header id="top"
                        authData={this.state}
                        authStaffData={this.state}
                        authCusData={this.state}
                        cart={this.state.cart}
                    />
                    <div>
                        <div>
                            <Switch>
                                {/* Book */}
                                <Route path={`${PUBLIC_URL}books/view/:id`}
                                    exact={true}
                                    component={Detail}
                                />
                                <Route path={`${PUBLIC_URL}books/update/:id`}
                                    exact={true}
                                    component={BookEdit}
                                />

                                {/* Search Page */}
                                <Route path={`${PUBLIC_URL}search-page`}
                                    exact={true}
                                    component={SearchPage}
                                />

                                {/* Category */}
                                <Route path={`${PUBLIC_URL}categories/view/:id`}
                                    exact={true}
                                    authed={this.state.isLoggedIn}
                                    component={CategoryView}
                                />
                                <Route path={`${PUBLIC_URL}categories/create`}
                                    exact={true}
                                    authed={this.state.isLoggedIn}
                                    component={CategoryCreate}
                                />
                                <Route path={`${PUBLIC_URL}categories`}
                                    exact={true}
                                    authed={this.state.isLoggedIn}
                                    component={CategoryList}
                                />
                                <Route path={`${PUBLIC_URL}categoryproducts/:id`}
                                    exact={true}
                                    authed={this.state.isLoggedIn}
                                    component={CategoryProducts}
                                />

                                {/* Admin Account */}
                                <Route path={`${PUBLIC_URL}register`}
                                    exact={true}
                                    component={Register}
                                />
                                <Route path={`${PUBLIC_URL}login`}
                                    exact={true}
                                    component={Login}
                                />

                                {/* Staff Account */}
                                <Route path={`${PUBLIC_URL}register-staff`}
                                    exact={true}
                                    component={RegisterStaff}
                                />
                                <Route path={`${PUBLIC_URL}login-staff`}
                                    exact={true}
                                    component={LoginStaff}
                                />

                                {/* Customer */}
                                <Route path={`${PUBLIC_URL}register-checkout`}
                                    exact={true}
                                    component={RegisterCheckout}
                                />
                                <Route path={`${PUBLIC_URL}login-checkout`}
                                    exact={true}
                                    component={LoginCheckout}
                                />
                                <Route path={`${PUBLIC_URL}account-info`}
                                    exact={true}
                                    component={AccountInfo}
                                />
                                <Route path={`${PUBLIC_URL}change-default-address`}
                                    exact={true}
                                    component={ChangeDefaultAddress}
                                />
                                <Route path={`${PUBLIC_URL}customer-purchase`}
                                    exact={true}
                                    component={CustomerPurchase}
                                />
                                <Route path={`${PUBLIC_URL}order-detail-customer/:order_code`}
                                    exact={true}
                                    component={OrderDetail}
                                />

                                {/* Checkout */}
                                <Route path={`${PUBLIC_URL}checkoutitem`}
                                    exact={true}
                                    component={CheckoutItem}
                                />
                                <Route path={`${PUBLIC_URL}checkoutinformation`}
                                    exact={true}
                                    component={CheckoutInformation}
                                />
                                <Route path={`${PUBLIC_URL}noitem`}
                                    exact={true}
                                    component={NoCheckoutItems}
                                />
                                <Route path={`${PUBLIC_URL}pagesuccessful`}
                                    exact={true}
                                    component={PageSuccessful}
                                />
                                <Route path={`${PUBLIC_URL}checkout`}
                                    exact={true}
                                    component={ShowCheckout}
                                />
                                <Route path={`${PUBLIC_URL}changeinfocheckout`}
                                    exact={true}
                                    component={ChangeInfoCheckout}
                                />

                                {/* News */}
                                <Route path={`${PUBLIC_URL}news`}
                                    exact={true}
                                    component={News}
                                />

                                {/* About */}
                                <Route path={`${PUBLIC_URL}about`}
                                    exact={true}
                                    component={About}
                                />

                                {/* Contact */}
                                <Route path={`${PUBLIC_URL}contact`}
                                    exact={true}
                                    component={Contact}
                                />

                                {/* Delivery */}
                                <Route path={`${PUBLIC_URL}delivery`}
                                    exact={true}
                                    component={AddDelivery}
                                />

                                {/* Coupon */}
                                <Route path={`${PUBLIC_URL}coupon`}
                                    exact={true}
                                    component={CouponList}
                                />
                                <Route path={`${PUBLIC_URL}coupon/create`}
                                    exact={true}
                                    component={CouponCreate}
                                />
                                <Route path={`${PUBLIC_URL}coupon/update/:id`}
                                    exact={true}
                                    component={CouponEdit}
                                />

                                {/* OrderManagement */}
                                <Route path={`${PUBLIC_URL}order`}
                                    exact={true}
                                    component={OrderManagement}
                                />
                                <Route path={`${PUBLIC_URL}order/view/:order_code`}
                                    exact={true}
                                    component={OrderView}
                                />

                                {/* Home */}
                                <Route path={`${PUBLIC_URL}`}
                                    exact={true}
                                    component={Home}
                                />
                            </Switch>
                            <Footer></Footer>
                        </div>
                    </div>
                </Router>
                <a href="#top">
                    <div id="toTop" className="back-to-top"><i className="fas fa-angle-double-up"></i></div>
                </a>
            </div>

        );
    }
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('app'));
}
