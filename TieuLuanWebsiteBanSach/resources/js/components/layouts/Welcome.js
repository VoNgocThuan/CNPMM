import React, {Component} from 'react';
class Welcome extends Component {
  render() {
    return (
        <div className="welcome">
            <img className="logoB" src="/images/banner3-1.jpg" alt=""/>
            <h2 className="animate__animated animate__backInDown">Chào bạn
                đến với <span>EREADERS</span></h2>
            <h4>NHỮNG ẤN PHẨM SÁCH HAY NHẤT</h4>
            <p>Sách là kho tàng tri thức đồ sộ nhất được các thế hệ đúc kết lại qua nhiều giai đoạn lịch sử, nhiều
                nền
                văn hóa khác nhau. Được lưu truyền đến tận ngày nay </p>
            <img className="imgWelcome" src="/images/banner3-2.jpg" alt=""/>
        </div>        
    );
    }
}

export default Welcome;
