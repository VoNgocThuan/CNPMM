import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
class NoCheckoutItems extends React.Component {
    render() { 
        return ( 
            <div>
                <Card>
                    <Card.Header>
                        <Card.Title>Your cart is empty</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <h4>There are no items to checkout</h4>
                        <p>Browse our wide range of collections or search for your product to get started</p>
                        <Link to={"/shopbansach"}>Continue Shopping</Link>
                    </Card.Body>
                </Card>
            </div>
         );
    }
}
 
export default NoCheckoutItems;
