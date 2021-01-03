import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import CheckoutInformation from "./CheckoutInformation";
import CheckoutItem from "./CheckoutItem";
import Axios from "axios";
import NoCheckoutItems from './NoCheckoutItems';

class ShowCheckout extends React.Component {
    state = {
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
        this.getTotalCart();
    }
    render() {
        return (
            <Container className={"minimum-height"}>
                <Row>
                    <Col lg={7} md={7}>
                        {this.state.totalCart > 0 ? <CheckoutItem /> : <NoCheckoutItems />}
                    </Col>

                    <Col lg={5} md={5}>
                        {this.state.totalCart > 0 ? <CheckoutInformation /> : ''}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ShowCheckout;