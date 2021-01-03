import React, {Component} from 'react';
class MiniBanner extends Component {
  render() {
    return (
        <div className="quangcao2 d-none d-sm-block">
            <div className="container">
                <div className="boxquangcao2">
                    <img src="/images/banner3-6.jpg" alt=""/>
                    <div className="title">
                        QUÀ TẶNG <span>TUYỆT VỜI</span>
                    </div>
                    <p>Cho gia đình và bạn bè</p>
                    <button className="btnMuaNgay">MUA NGAY</button>
                </div>
            </div>
        </div>
    );
    }
}

export default MiniBanner;