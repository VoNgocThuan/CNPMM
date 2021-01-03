import React, { Component } from 'react';
import Process from '../../layouts/Process';
import BoxContact from '../news/BoxContact';
import AboutUs from './AboutUs';
import Welcome from '../../layouts/Welcome';
import { connect } from "react-redux";
class About extends Component {
    render() {
        console.log("test state: ",this.props.searchBook.search)
        return (
            <div>
                <Welcome></Welcome>
                <AboutUs></AboutUs>
                <BoxContact></BoxContact>
                <Process></Process>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        searchBook: state.searchBook
    };
};
export default connect(mapStateToProps, null)(About);
