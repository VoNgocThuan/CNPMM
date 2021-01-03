import React, { Component } from 'react';
import Author from '../../layouts/Author';
import Boxnews from '../../layouts/Boxnews';
import BoxContact from './BoxContact';
import NewsBox from './NewsBox';

class News extends Component {
    render() {
        return (
            <div>
                <NewsBox></NewsBox>
                <Boxnews></Boxnews>
                <Author></Author>
                <BoxContact></BoxContact>
            </div>
        );
    }
}

export default News;
