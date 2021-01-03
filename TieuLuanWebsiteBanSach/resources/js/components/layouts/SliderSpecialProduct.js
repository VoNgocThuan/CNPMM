import React, {Component} from 'react';
import Slider from "react-slick";
class SliderSpecialProduct extends Component {
  render() {
    const slick_banner = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
      };
    return (
        <div className="quangcao">
            <div className="for_slick_slider multiple-items-quangcao">
            <Slider {...slick_banner}>
                <div className="items">
                    <div className="box21">
                        <img src="/images/Banner01.png" alt=""/>
                        <div className="box-content">
                            <h4 className="title">ƯU ĐÃI LỚN</h4>
                            <p className="description">Các tựa sách về du lịch đang được giảm 45%, còn chần chừ gì mà
                                không mua ngay.</p>
                            <a className="read-more" href="#">Mua Ngay</a>
                        </div>
                    </div>
                </div>
                <div className="items">
                    <div className="box21">
                        <img src="/images/Banner02.png" alt=""/>
                        <div className="box-content">
                            <h4 className="title">ƯU ĐÃI LỚN</h4>
                            <p className="description">Các tựa sách về nấu ăn đang được giảm 60%, còn chần chừ gì mà
                                không mua ngay.</p>
                            <a className="read-more" href="#">Mua Ngay</a>
                        </div>
                    </div>
                </div>
                <div className="items">
                    <div className="box21">
                        <img src="/images/Banner03.png" alt=""/>
                        <div className="box-content">
                            <h4 className="title">ƯU ĐÃI LỚN</h4>
                            <p className="description">Các tựa sách về thiết kế đang được giảm 50%, còn chần chừ gì mà
                                không mua ngay.</p>
                            <a className="read-more" href="#">Mua Ngay</a>
                        </div>
                    </div>
                </div>
                <div className="items">
                    <div className="box21">
                        <img src="/images/Banner01.png" alt=""/>
                        <div className="box-content">
                            <h4 className="title">ƯU ĐÃI LỚN</h4>
                            <p className="description">Các tựa sách về du lịch đang được giảm 45%, còn chần chừ gì mà
                                không mua ngay.</p>
                            <a className="read-more" href="#">Mua Ngay</a>
                        </div>
                    </div>
                </div>
                <div className="items">
                    <div className="box21">
                        <img src="/images/Banner02.png" alt=""/>
                        <div className="box-content">
                            <h4 className="title">ƯU ĐÃI LỚN</h4>
                            <p className="description">Các tựa sách về nấu ăn đang được giảm 60%, còn chần chừ gì mà
                                không mua ngay.</p>
                            <a className="read-more" href="#">Mua Ngay</a>
                        </div>
                    </div>
                </div>
                <div className="items">
                    <div className="box21">
                        <img src="/images/Banner03.png" alt=""/>
                        <div className="box-content">
                            <h4 className="title">ƯU ĐÃI LỚN</h4>
                            <p className="description">Các tựa sách về thiết kế đang được giảm 50%, còn chần chừ gì mà
                                không mua ngay.</p>
                            <a className="read-more" href="#">Mua Ngay</a>
                        </div>
                    </div>
                </div>
                </Slider>
            </div>
        </div>        
    );
    }
}

export default SliderSpecialProduct;
