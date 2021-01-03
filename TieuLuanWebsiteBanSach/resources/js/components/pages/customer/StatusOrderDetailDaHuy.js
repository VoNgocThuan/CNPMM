import React, { Component } from 'react';


class StatusOrderDetailDaHuy extends Component {
    state = {

    }
    render() {
        return (
            <div className="stepper">
                <div className="stepper__step stepper__step--finish">
                    <div className="stepper__step-icon stepper__step-icon--finish">
                        <svg enable-background="new 0 0 32 32" viewBox="0 0 32 32" x="0" y="0" className="shopee-svg-icon icon-order-order">
                            <g>
                                <path d="m5 3.4v23.7c0 .4.3.7.7.7.2 0 .3 0 .3-.2.5-.4 1-.5 1.7-.5.9 0 1.7.4 2.2 1.1.2.2.3.4.5.4s.3-.2.5-.4c.5-.7 1.4-1.1 2.2-1.1s1.7.4 2.2 1.1c.2.2.3.4.5.4s.3-.2.5-.4c.5-.7 1.4-1.1 2.2-1.1.9 0 1.7.4 2.2 1.1.2.2.3.4.5.4s.3-.2.5-.4c.5-.7 1.4-1.1 2.2-1.1.7 0 1.2.2 1.7.5.2.2.3.2.3.2.3 0 .7-.4.7-.7v-23.7z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"></path>
                                <g>
                                    <line fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" x1="10" x2="22" y1="11.5" y2="11.5"></line>
                                    <line fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" x1="10" x2="22" y1="18.5" y2="18.5"></line>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div className="stepper__step-text">
                        Đơn hàng đã đặt
                    </div>
                </div>
                <div className="stepper__step stepper__step--finish">
                    <div className="stepper__step-icon stepper__step-icon--finish">
                        <svg enable-background="new 0 0 32 32" viewBox="0 0 32 32" x="0" y="0" className="shopee-svg-icon icon-order-problem">
                            <g>
                                <g>
                                    <path d="m5 3.4v23.7c0 .4.3.7.7.7.2 0 .3 0 .3-.2.5-.4 1-.5 1.7-.5.9 0 1.7.4 2.2 1.1.2.2.3.4.5.4s.3-.2.5-.4c.5-.7 1.4-1.1 2.2-1.1s1.7.4 2.2 1.1c.2.2.3.4.5.4s.3-.2.5-.4c.5-.7 1.4-1.1 2.2-1.1.9 0 1.7.4 2.2 1.1.2.2.3.4.5.4s.3-.2.5-.4c.5-.7 1.4-1.1 2.2-1.1.7 0 1.2.2 1.7.5.2.2.3.2.3.2.3 0 .7-.4.7-.7v-23.7z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3"></path>
                                </g>
                                <line fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" x1="16" x2="16" y1="9" y2="15"></line>
                                <circle cx="16" cy="20.5" r="2" stroke="none"></circle>
                            </g>
                        </svg>
                    </div>
                    <div className="stepper__step-text">
                        Đơn hàng đã bị hủy
                    </div>
                </div>
                <div className="stepper__line">
                    <div className="stepper__line-background" style={{background: 'rgb(' + 224 + ',' + 224 + ',' + 224 + ')'}}></div>
                    <div className="stepper__line-foreground" style={{width: 'calc((100% - 140px) * 1)', background: 'rgb(' + 45 + ',' + 194 + ',' + 88 + ')'}}>
                    </div>
                </div>
            </div>
        );
    }
}

export default StatusOrderDetailDaHuy;