import React, {Component} from 'react';
import Slider from "react-slick";
class Author extends Component {
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
        <div className="tacgia">
            <div className="container">
                <div className="title">TÁC GIẢ <span>NỔI TIẾNG</span></div>
                <div className="for_slick_slider multiple-items-tacgia">
                    <Slider {...slick_banner}>
                    <div className="items">
                        <div className="boxTacgia">
                            <div className="box2">
                                <img src="http://bestjquery.com/tutorial/hover-effect/demo193/images/img-2.jpg"/>
                                <div className="box-content">
                                    <div className="inner-content">
                                        <h3 className="title">Oscar Wilde (Ireland)</h3>
                                        <span className="post">Author</span>
                                        <ul className="icon">
                                            <li><a href="#"><i className="fas fa-book"></i></a></li>
                                            <li><a href="#"><i className="fas fa-link"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <p className="name">Oscar Wilde (Ireland)</p>
                        </div>
                    </div>
                    <div className="items">
                        <div className="boxTacgia">
                            <div className="box2">
                                <img src="http://bestjquery.com/tutorial/hover-effect/demo193/images/img-1.jpg"/>
                                <div className="box-content">
                                    <div className="inner-content">
                                        <h3 className="title">Oscar Wilde (Ireland)</h3>
                                        <span className="post">Author</span>
                                        <ul className="icon">
                                            <li><a href="#"><i className="fas fa-book"></i></a></li>
                                            <li><a href="#"><i className="fas fa-link"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <p className="name">Oscar Wilde (Ireland)</p>
                        </div>
                    </div>
                    <div className="items">
                        <div className="boxTacgia">
                            <div className="box2">
                                <img src="http://bestjquery.com/tutorial/hover-effect/demo193/images/img-3.jpg"/>
                                <div className="box-content">
                                    <div className="inner-content">
                                        <h3 className="title">Oscar Wilde (Ireland)</h3>
                                        <span className="post">Author</span>
                                        <ul className="icon">
                                            <li><a href="#"><i className="fas fa-book"></i></a></li>
                                            <li><a href="#"><i className="fas fa-link"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <p className="name">Oscar Wilde (Ireland)</p>
                        </div>
                    </div>
                    <div className="items">
                        <div className="boxTacgia">
                            <div className="box2">
                                <img src="http://bestjquery.com/tutorial/hover-effect/demo193/images/img-2.jpg"/>
                                <div className="box-content">
                                    <div className="inner-content">
                                        <h3 className="title">Oscar Wilde (Ireland)</h3>
                                        <span className="post">Author</span>
                                        <ul className="icon">
                                            <li><a href="#"><i className="fas fa-book"></i></a></li>
                                            <li><a href="#"><i className="fas fa-link"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <p className="name">Oscar Wilde (Ireland)</p>
                        </div>
                    </div>
                    <div className="items">
                        <div className="boxTacgia">
                            <div className="box2">
                                <img src="http://bestjquery.com/tutorial/hover-effect/demo193/images/img-1.jpg"/>
                                <div className="box-content">
                                    <div className="inner-content">
                                        <h3 className="title">Oscar Wilde (Ireland)</h3>
                                        <span className="post">Author</span>
                                        <ul className="icon">
                                            <li><a href="#"><i className="fas fa-book"></i></a></li>
                                            <li><a href="#"><i className="fas fa-link"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <p className="name">Oscar Wilde (Ireland)</p>
                        </div>
                    </div>
                    <div className="items">
                        <div className="boxTacgia">
                            <div className="box2">
                                <img src="http://bestjquery.com/tutorial/hover-effect/demo193/images/img-3.jpg"/>
                                <div className="box-content">
                                    <div className="inner-content">
                                        <h3 className="title">Oscar Wilde (Ireland)</h3>
                                        <span className="post">Author</span>
                                        <ul className="icon">
                                            <li><a href="#"><i className="fas fa-book"></i></a></li>
                                            <li><a href="#"><i className="fas fa-link"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <p className="name">Oscar Wilde (Ireland)</p>
                        </div>
                    </div>
                    </Slider>
                </div>
            </div>
        </div>
    );
    }
}

export default Author;