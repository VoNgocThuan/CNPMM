import React, { Component } from 'react';
import Banner from '../layouts/Banner';
import Welcome from '../layouts/Welcome';
import SliderSpecialProduct from '../layouts/SliderSpecialProduct';
import Products from '../layouts/Products';
import MiniBanner from '../layouts/MiniBanner';
import Author from '../layouts/Author';
import Ranking from '../layouts/Ranking';
import Policy from '../layouts/Policy';
import Contact from '../layouts/Contact';
import Boxnews from '../layouts/Boxnews';
import Commitment from '../layouts/Commitment';
import Process from '../layouts/Process';
import $ from 'jquery';

class Home extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    window.onscroll = function () {
      scrollFunction();
    };

    var mybutton = document.getElementById("toTop");
    var menutop = document.querySelector('#menu');
    var banner = document.querySelector('.boxbanner');
    var origOffsetY = banner.offsetTop;

    function scrollFunction() {
      // Ẩn back to top
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
      //Hiện menu sticky
      if (window.scrollY >= origOffsetY) {
        menutop.classList.add('sticky')
      } else {
        menutop.classList.remove('sticky');
      }
    }
  }
  buyItem = (value) => {
    this.props.temp = value;
  }
  render() {
    return (
      <div>
        <Banner></Banner>
        <Welcome></Welcome>
        <SliderSpecialProduct></SliderSpecialProduct>
        <Products temp={(value) => { this.buyItem(value) }}></Products>
        <MiniBanner></MiniBanner>
        <Author></Author>
        <Ranking></Ranking>
        <Policy></Policy>
        <Contact></Contact>
        <Boxnews></Boxnews>
        <Process></Process>
        <Commitment></Commitment>
      </div>
    );
  }
}

export default Home;
