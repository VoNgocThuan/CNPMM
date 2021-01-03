import React from "react";

class PaymentDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    render() {
        const totalAmount = this.props.totalCart;
        return (
            <>
                {this.props.coupon_condition === 1 && (
                    <>
                        <div class="_38DBn- _1ylw6p _50h4Zy">
                            Tổng tiền hàng
                        </div>
                        <div class="_38DBn- _2wZvga _50h4Zy Nabchf">
                            ₫{this.props.totalCart}
                        </div>
                        <div class="_3Szdqb rIEddD"></div>
                        <div className="_38DBn- _1ylw6p _2ZumAb">
                            Mã giảm giá
                        </div>
                        <div className="_38DBn- _2wZvga _2ZumAb">
                            -{this.props.coupon_number}%
                        </div>
                        <div className="_38DBn- _1ylw6p _39ttyR">
                            Phí vận chuyển
                        </div>
                        <div className="_38DBn- _2wZvga _39ttyR">
                            ₫{this.props.cus_feeship}
                        </div>
                        <div className="_38DBn- _1ylw6p sfPrg9">
                            Tổng thanh toán:
                        </div>
                        <div className="_38DBn- _34fUBg _2wZvga sfPrg9">
                            ₫{(totalAmount * ((100 - this.props.coupon_number) / 100) + Number(this.props.cus_feeship))}
                        </div>
                    </>
                )}
                {this.props.coupon_condition === 0 && (
                    <>
                        <div class="_38DBn- _1ylw6p _50h4Zy">
                            Tổng tiền hàng
                                    </div>
                        <div class="_38DBn- _2wZvga _50h4Zy Nabchf">
                            ₫{this.props.totalCart}
                        </div>
                        <div class="_3Szdqb rIEddD"></div>
                        <div className="_38DBn- _1ylw6p _2ZumAb">
                            Mã giảm giá
                                    </div>
                        <div className="_38DBn- _2wZvga _2ZumAb">
                            -{this.props.coupon_number}đ
                                    </div>
                        <div className="_38DBn- _1ylw6p _39ttyR">
                            Phí vận chuyển
                                    </div>
                        <div className="_38DBn- _2wZvga _39ttyR">
                            ₫{this.props.cus_feeship}
                        </div>
                        <div className="_38DBn- _1ylw6p sfPrg9">
                            Tổng thanh toán:
                                    </div>
                        <div className="_38DBn- _34fUBg _2wZvga sfPrg9">
                            ₫{(totalAmount - this.props.coupon_number + Number(this.props.cus_feeship))}
                        </div>
                    </>
                )}
                {this.props.coupon_condition !== 0 && this.props.coupon_condition !== 1 && (
                    <>
                        <div class="_38DBn- _1ylw6p _50h4Zy">
                            Tổng tiền hàng
                                    </div>
                        <div class="_38DBn- _2wZvga _50h4Zy Nabchf">
                            ₫{this.props.totalCart}
                        </div>
                        <div class="_3Szdqb rIEddD"></div>
                        <div className="_38DBn- _1ylw6p _39ttyR">
                            Phí vận chuyển
                                    </div>
                        <div className="_38DBn- _2wZvga _39ttyR">
                            ₫{this.props.cus_feeship}
                        </div>
                        <div className="_38DBn- _1ylw6p sfPrg9">
                            Tổng thanh toán:
                                    </div>
                        <div className="_38DBn- _34fUBg _2wZvga sfPrg9">
                            ₫{(totalAmount + Number(this.props.cus_feeship))}
                        </div>
                    </>
                )}
            </>
        );
    }
}

export default PaymentDetail;