import React, {Component} from 'react';
import Slider from "react-slick";
class Banner extends Component {
  render() {
    const slick_banner = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
    return (
        <div className="boxbanner">
            <Slider {...slick_banner}>
                <div className="items">
                    <div className="bannerTop">
                        <img src="/images/slider3-1.jpg" alt=""/>
                        <p >Sản phẩm mới
                            2020</p>
                        <h3 ><span>49% GIẢM
                                GIÁ</span> CHO BỘ<br/>SÁCH DALIO</h3>
                        <button className="btnXanh">MUA NGAY</button>
                    </div>
                </div>
                <div className="items">
                    <div className="bannerTop">
                        <img src="/images/slider3-2.jpg" alt=""/>
                        <p >Sản phẩm mới
                            2020</p>
                        <h3 ><span>19% GIẢM
                                GIÁ</span> SÁCH<br/> THIẾT KÊ</h3>
                        <button className="btnXanh">MUA NGAY</button>
                    </div>
                </div>
                <div className="items">
                    <div className="bannerTop">
                        <img src="/images/slider3-3.jpg" alt=""/>
                        <p >Sản phẩm mới
                            2020</p>
                        <h3 ><span>50% GIẢM
                                GIÁ</span> SÁCH<br/> TRẺ EM</h3>
                        <button className="btnXanh">MUA NGAY</button>
                    </div>
                </div>
            </Slider>
        </div>
    );
    }
}

export default Banner;