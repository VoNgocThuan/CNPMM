import React, { Component } from 'react';

class Process extends Component {
    render() {
        return (
            <div className="process">
                    <div className="container">
                        <hr/>
                        <h2 className="title">QUY TRÌNH TIẾP NHẬN VÀ GIAO HÀNG</h2>
                        <p className="introduce">Khi khách hàng tiến hành đặt đơn hàng. Đội ngũ của chúng tôi sẽ tiến hành tiếp nhận đơn hàng, xác nhận và tiến hành vận chuyển giao hàng cho khách hàng một cách nhanh nhất. Dưới đây là quy trình của chúng tôi: </p>
                        <div className="timeline">
                            <ul>
                                <li>
                                    <div className="itemTimeline">
                                        <div className="row titleItemTimeline">
                                            <img className="col-lg-3 col-md-3 col-3" src="/images/iconProcess01.png" alt=""/>
                                            <h3 className="col-lg-9 col-md-9 col-9">TIẾP NHẬN ĐƠN HÀNG</h3>
                                        </div>
                                        <p>Bước đầu tiên sau khi khách hàng thực hiện đơn hàng đó là tiếp nhận đơn. Tất cả đơn hàng sẽ được tiếp nhận và chuyển thông tin đến với bộ phận xác nhận.</p>
                                        <img className="imgLine" src="/images/imgTimeline01.png" alt=""/>
                                    </div>
                                </li>
                                <li>
                                    <div className="itemTimeline">
                                        <div className="row titleItemTimeline">
                                            <h3 className="col-lg-9 col-md-9 col-9">XÁC NHẬN ĐƠN HÀNG</h3>
                                            <img className="col-lg-3 col-md-3 col-3" src="/images/iconProcess02.png" alt=""/>
                                        </div>
                                        <p>Sau khi tiếp nhận, chúng tôi sẽ tiến hành xác nhận lại giao dịch. Hệ thống tự động gửi thông tin đơn hàng đến email cá nhân của khách hàng và nhân viên sẽ gọi điện để xác nhận lại với khách hàng.</p>
                                        <img className="imgLine" src="/images/imgTimeline02.png" alt=""/>
                                    </div>
                                </li>
                                <li>
                                    <div className="itemTimeline">
                                        <div className="row titleItemTimeline">
                                            <img className="col-lg-3 col-md-3 col-3" src="/images/iconProcess03.png" alt=""/>
                                            <h3 className="col-lg-9 col-md-9 col-9">ĐÓNG GÓI HÀNG</h3>
                                        </div>
                                        <p>Khi đơn hàng được xác nhận, hóa đơn sẽ được chuyển đến bộ phận kho để tiến hành lấy hàng và đóng gói. Hàng hóa sẽ được đóng gói cẩn thận và đẹp nhất để có thể đến tay khách hàng một cách hoàn hảo nhất.</p>
                                        <img className="imgLine" src="/images/imgTimeline03.png" alt=""/>
                                    </div>
                                </li>
                                <li>
                                    <div className="itemTimeline">
                                        <div className="row titleItemTimeline">
                                            <h3 className="col-lg-9 col-md-9 col-9">BÀN GIAO VẬN CHUYỂN</h3>
                                            <img className="col-lg-3 col-md-3 col-3" src="/images/iconProcess04.png" alt=""/>
                                        </div>
                                        <p>Hàng hóa sau khi đóng gói sẽ được bàn giao cho đơn vị vận chuyển thứ 3 để tiền hành giao sản phẩm đến cho khách hàng.</p>
                                        <img className="imgLine" src="/images/imgTimeline04.png" alt=""/>
                                    </div>
                                </li>
                                <li>
                                    <div className="itemTimeline">
                                        <div className="row titleItemTimeline">
                                            <img className="col-lg-3 col-md-3 col-3" src="/images/iconProcess05.png" alt=""/>
                                            <h3 className="col-lg-9 col-md-9 col-9">GIAO HÀNG</h3>
                                        </div>
                                        <p>Sau khi bàn giao, đơn hàng sẽ được đơn vị vận chuyển chuyên nghiệp tiến hành giao đến cho khách hàng trong thời gian nhanh nhất có thể.</p>
                                        <img className="imgLine" src="/images/imgTimeline05.png" alt=""/>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
            </div>
        );
    }
}

export default Process;
