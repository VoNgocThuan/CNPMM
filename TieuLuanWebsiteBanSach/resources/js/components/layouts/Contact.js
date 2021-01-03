import React, { Component } from 'react';

class Contact extends Component {
    render() {
        return (
            <div className="lienhe">
                    <div className="imgMo"></div>
                    <div className="boxContentLienHe">
                        <h3>ĐĂNG KÝ ĐỂ NHẬN THÔNG TIN SỚM NHẤT</h3>
                        <input type="text" placeholder="Họ và tên"/>
                        <input type="text" placeholder="Email"/>
                        <button>ĐĂNG KÝ</button>
                    </div>
            </div>
        );
    }
}

export default Contact;
