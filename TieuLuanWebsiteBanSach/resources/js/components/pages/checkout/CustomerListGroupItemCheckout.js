import Axios from "axios";
import React from "react";
import { Row, Col, Button, FormControl, Popover, ButtonToolbar, Overlay } from "react-bootstrap";
class CustomerListGroupItemCheckout extends React.Component {
    state = {
        quantity: '',
        name: '',
        image: '',
        cartlist: [],
        totalCart: '',
    }
    getTotalCart = () => {
        Axios.get('http://127.0.0.1:8000/totalCart').then((res) => {
            this.setState({
                totalCart: res.data,
            });
            console.log(this.state.totalCart);
        });
    }
    componentDidMount() {
        Axios.get('http://127.0.0.1:8000/cart').then((res) => {
            this.setState({
                cartlist: res.data,
            });
            console.log(this.state.cartlist);
        });
        this.getTotalCart();
    }
    render() {
        return (
            <li className="list-group-item">
                {Object.keys(this.state.cartlist).map((item, i) => (
                    <>
                        <div key={i}>
                            <div className={"media-body"}>
                                <Row className="mb-2">
                                    <Col lg={2} md={1} sm={12} xs={12}>
                                        <div className={"image-div"}>
                                            <h5>Hình ảnh</h5>
                                            <img className="media-object" src={this.state.cartlist[item].attributes.image} alt="..." width={80} height={80} />
                                        </div>
                                    </Col>
                                    <Col lg={5} md={5} sm={12} xs={12}>
                                        <div className={"title-div"}>
                                            <h5>Tiêu đề</h5>
                                            <h6 className={"media-heading"}>{this.state.cartlist[item].name}</h6>
                                            <div className={"seller-name-div"}>
                                                <span>{this.state.cartlist[item].price}đ</span>
                                            </div>
                                        </div>
                                    </Col>

                                    <Col lg={3} md={4} sm={12} xs={12}>
                                        <div className={"star-rating-div"}>
                                            <h5>Số lượng</h5>
                                            <span>
                                                <FormControl
                                                    disabled
                                                    type="number"
                                                    className={"checkout-quantity"}
                                                    value={this.state.cartlist[item].quantity}
                                                />
                                            </span>
                                        </div>
                                    </Col>

                                    <Col md={2} lg={2} sm={12} xs={12}>
                                        <div className={"checkout-price-div"}>
                                            <h5>Tổng cộng</h5>
                                            <span className={"cart-price"}>
                                                {parseFloat(parseFloat(this.state.cartlist[item].price) * parseInt(this.state.cartlist[item].quantity))}đ
                                            </span>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </>
                ))}
            </li>
        )
    }
}

export default CustomerListGroupItemCheckout;