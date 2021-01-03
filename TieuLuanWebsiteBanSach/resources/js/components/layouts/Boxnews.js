import React, { Component } from 'react';
import Slider from "react-slick";
class Boxnews extends Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
      }
      next() {
        this.slider.slickNext();
      }
      previous() {
        this.slider.slickPrev();
      }
    render() {
        const slick_banner = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3,
            responsive: [
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
          };
        return (
            <div className="boxnews">
                    <div className="container">
                        <div className="boxtitle">
                            <hr/>
                            <div className="title">TIN TỨC <span>MỚI NHẤT</span></div>
                        </div>
                        <div className="listNews">
                            <div className="for_slick_slider multiple-items-news">
                                <Slider ref={c => (this.slider = c)} {...slick_banner}>
                                    <div className="items">
                                        <div className="itemNews">
                                            <div className="imgNews">
                                                <img src="https://znews-photo.zadn.vn/w660/Uploaded/mdf_fedrei/2020_12_19/thien_1_1_.jpg" alt=""/>
                                            </div>
                                            <p className="date">
                                                25 tháng 12, 2020
                                            </p>
                                            <h2>Thiền có khó không?</h2>
                                            <p>Cuốn sách "Thiền thật ra không khó" là kinh nghiệm được đúc kết sau 30 năm hành thiền và chiêm nghiệm của tác giả Trần Luân Tín.</p>
                                        </div>
                                    </div>
                                    <div className="items">
                                        <div className="itemNews">
                                            <div className="imgNews">
                                                <img src="https://znews-photo.zadn.vn/w660/Uploaded/dqmblcvo/2020_12_16/A1.jpg" alt=""/>
                                            </div>
                                            <p className="date">
                                                25 tháng 11, 2020
                                            </p>
                                            <h2>Những ca khúc chống xâm lăng</h2>
                                            <p>Những ca từ, điệu nhạc mang âm hưởng cách mạng đã nuôi dưỡng lòng yêu nước, đồng thời như lời hiệu triệu thúc giục người người hăng hái cầm vũ khí chiến đấu.</p>
                                        </div>
                                    </div>
                                    <div className="items">
                                        <div className="itemNews">
                                            <div className="imgNews">
                                                <img src="https://znews-photo.zadn.vn/w660/Uploaded/oplukaa/2020_06_04/NKTC_1.jpg" alt=""/>
                                            </div>
                                            <p className="date">
                                                24 tháng 12, 2020
                                            </p>
                                            <h2>Những trang nhật ký của người lính trong chiến tranh</h2>
                                            <p>Qua những trang nhật ký sinh động, cụ thể từng ngày, tháng, bạn đọc có thể hình dung cuộc sống, chiến đấu ở chiến trường trong thời kỳ kháng chiến chống Mỹ.</p>
                                        </div>
                                    </div>
                                    <div className="items">
                                        <div className="itemNews">
                                            <div className="imgNews">
                                                <img src="https://znews-photo.zadn.vn/w660/Uploaded/oplukaa/2020_12_20/Anh_Lao_Dong_Onl.jpg" alt=""/>
                                            </div>
                                            <p className="date">
                                                21 tháng 11, 2020
                                            </p>
                                            <h2>Hai tác giả đoạt giải thưởng Văn học sông Mekong 2020</h2>
                                            <p>Nhà thơ Trần Nhuận Minh với "Qua sóng Trường Giang", tác giả Trần Ngọc Phú với tác phẩm "Từ biên giới Tây Nam đến đất Chùa Tháp" được vinh danh tại giải thưởng Văn học sông Mekong.</p>
                                        </div>
                                    </div>
                                    <div className="items">
                                        <div className="itemNews">
                                            <div className="imgNews">
                                                <img src="https://znews-photo.zadn.vn/w860/Uploaded/ofh_cgkztmzt/2020_12_14/Xa_ngoai_kia_noi_loai_tom_hat.jpg" alt=""/>
                                            </div>
                                            <p className="date">
                                                25 tháng 12, 2020
                                            </p>
                                            <h2>Những tiểu thuyết đầu tay trở thành hiện tượng xuất bản</h2>
                                            <p>Một số nhà văn luôn tìm cách lẩn tránh khi ai đó nói về tác phẩm đầu tay của mình. Một số cây bút khác lại gặt hái thành công vang dội từ sáng tác đầu tiên.</p>
                                        </div>
                                    </div>
                                    <div className="items">
                                        <div className="itemNews">
                                            <div className="imgNews">
                                                <img src="https://znews-photo.zadn.vn/w860/Uploaded/znanug/2020_08_21/IMG_3653_scaled.jpg" alt=""/>
                                            </div>
                                            <p className="date">
                                                25 tháng 9, 2020
                                            </p>
                                            <h2>3 cuốn sách kinh doanh được Bill Gates yêu thích</h2>
                                            <p>“Cá voi tỷ đô”, "Chuyến đi của cả cuộc đời" và "Những cuộc phiêu lưu trong kinh doanh" hấp dẫn Bill Gates. Ông đánh giá những cuốn sách này "hay một cách vượt sức tưởng tượng"</p>
                                        </div>
                                    </div>
                                </Slider>
                            </div>
                            <div className="arrow-prev" onClick={this.previous}>
                            </div>
                            <div className="arrow-next" onClick={this.next}>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Boxnews;
