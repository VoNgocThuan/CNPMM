import React, { Component } from 'react';

class Policy extends Component {
    render() {
        return (
            <div className="camket">
                    <div className="container">
                        <div className="title">CAM KẾT <span>KHÁCH HÀNG</span></div>
                        <div className="boxcamket">
                            <button className="accordion">CAM KẾT SÁCH THẬT</button>
                            <div className="panel">
                                <p>EREADER chúng tôi cam kết tất cả những tác phẩm đến tay của khách hàng 100% là sách
                                    thật.
                                    EREADER nhập trực tiếp sản phẩm từ nhà xuất bản và không qua bên thứ ba. <br/>Chúng
                                    tôi
                                    sẵn
                                    sàng chịu trách nhiệm pháp lý với những sản phẩm mà mình đưa ra thị trường. </p>
                            </div>
                            <button className="accordion">ĐÓNG GÓI VÀ VẬN CHUYỂN TRONG 2 NGÀY</button>
                            <div className="panel">
                                <p>Quy trình đóng gói hiện đại, nhanh chóng, đẹp mắt và được giao cho khách hàng với tốc
                                    độ
                                    nhanh nhất. Có dịch vụ giao hàng trong 2 giờ đối với khách hàng nội thành.</p>
                            </div>
                            <button className="accordion">BẢO HÀNH MỘT ĐỔI MỘT VỚI SẢN PHẨM LỖI</button>
                            <div className="panel">
                                <p>Với những sản phẩm bị lỗi, sau khi khách hàng nhận hàng có thể liên hệ bộ phận hỗ trợ
                                    của
                                    chúng tôi để được đổi trả hoàn toàn miễn phí. <br/>Hotline hỗ trợ: 1900 876 678</p>
                            </div>
                            <button className="accordion">DỊCH VỤ TẶNG QUÀ CHO NGƯỜI THÂN</button>
                            <div className="panel">
                                <p>EREADER hỗ trợ khách hàng có nhu cầu mua sách làm quà tặng cho bạn bè và người thân.
                                    Sách
                                    được gói cẩn thận và vận chuyển đúng thời gian khách hàng yêu cầu. Dịch vụ có tính
                                    thêm
                                    tiền đóng gói sản phẩm theo yêu cầu.</p>
                            </div>
                            <button className="accordion">BỌC BÌA THEO YÊU CẦU</button>
                            <div className="panel">
                                <p>EREADER vừa ra mắt thêm dịch vụ bọc bìa cho sách. Bạn từng lo lắng vì sách bị hư,
                                    rách
                                    bìa sau một thời gian ngắn sử dụng? Bây giờ bạn đã yên tâm vì đã có EREADER giúp
                                    bạn.
                                    Giá cả hợp lý và còn được giảm giá khi mua theo combo.</p>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

export default Policy;
