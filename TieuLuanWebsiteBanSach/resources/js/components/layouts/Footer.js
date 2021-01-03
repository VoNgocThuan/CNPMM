import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="container">
                    <div className="mainFooter">
                        <div className="boxlogoFooter">
                            <div className="imgfooter">
                                <img src="/images/logo1.png" alt=""/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-sm-5 col-md-5 col-lg-3 ">
                                <h3>Về chúng tôi</h3>
                                <p>Giới thiệu về chúng tôi</p>
                                <p>Tuyển dụng</p>
                                <p>Chính sách bảo mật</p>
                                <p>Điểu khoản sử dụng</p>
                            </div>
                            <div className="col-xs-12 col-sm-7 col-md-7 col-lg-3">
                                <h3>Hỗ trợ khách hàng</h3>
                                <p className="support pt-0">Hotline miễn phí</p>
                                <p className="support">CSKH: 0934 08 44 26 (8h-22h)</p>
                                <p className="support">Mua Hàng: 0934 08 44 26 (8h-22h)
                                    (Tất cả các ngày trong tuần)
                                </p>
                            </div>
                            <div className="col-xs-12 col-sm-5 col-md-5 col-lg-3">
                                <h3>Đơn vị vận chuyển</h3>
                                <div className="imgTransport">
                                    <img src="/images/imgAhaMove.png" alt=""/>
                                </div>
                                <div className="imgTransport">
                                    <img src="/images/imgGrabExpress.png" alt=""/>
                                </div>
                                <div className="imgTransport">
                                    <img src="/images/imgViettelPost.png" alt=""/>
                                </div>
                            </div>
                            <div id="fb" className="col-xs-12 col-sm-7 col-md-7 col-lg-3">
                                <div className="fb-page" data-href="https://www.facebook.com/facebook/" data-tabs="messages"
                                    data-width="300" data-height="350" data-small-header="false"
                                    data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true">
                                    <blockquote cite="https://www.facebook.com/facebook/" className="fb-xfbml-parse-ignore">
                                        <a href="https://www.facebook.com/facebook/">Facebook</a></blockquote>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="copyRight">
                        <p>Copyright © 2020 <b>EREADER</b> - Made by ThanhNhu </p>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
