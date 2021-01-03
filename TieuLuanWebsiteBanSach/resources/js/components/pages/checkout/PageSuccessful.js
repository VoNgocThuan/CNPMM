import React, { Component } from 'react'

class PageSuccessful extends Component {

    render() {
        return (
            <div className="container">
                <div className="box-success">
                    <i class="far fa-check-circle"></i>
                    <h3>Cảm ơn bạn đã mua sách tại EREADER!</h3>
                    <p>Vui lòng kiểm tra lại email để xem thông tin hóa đơn.</p>
                </div>    
            </div>
        );
    }
}

export default PageSuccessful;