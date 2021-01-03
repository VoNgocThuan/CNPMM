import React, { Component } from 'react';

class AddressContact extends Component {
    render() {
        return (
            <>
                <div className="itemContact">
                    <h4>ĐỊA CHỈ</h4>
                    <p><i className="fas fa-map-marker-alt"></i> 137 Nguyễn Chí Thanh, Quận 5, TP HCM</p>
                    <hr />
                </div>
                <div className="itemContact">
                    <h4>ĐIỆN THOẠI</h4>
                    <p><i className="fas fa-phone-alt"></i> (+089) 19918989</p>
                    <hr />
                </div>
                <div className="itemContact">
                    <h4>EMAIL</h4>
                    <p><i className="fas fa-envelope"></i> support@domain.com</p>
                    <hr />
                </div>
                <div className="itemContact">
                    <h4>GIỜ HOẠT ĐỘNG</h4>
                    <p><i className="far fa-clock"></i> 24/7</p>
                    <hr />
                </div>
                <div className="itemSocialContact">
                    <h4>THEO DÕI TẠI</h4>
                    <p><a href="#"><i className="fab fa-facebook"></i></a> &nbsp;<a href="#"><i className="fab fa-instagram"></i></a> &nbsp;<a href="#"><i className="fab fa-twitter"></i></a></p>
                </div>
            </>
        );
    }
}

export default AddressContact;
