import React, { Component } from 'react';

class Ranking extends Component {
    constructor(props){
        super(props);
        this.state={
            rankActive:'1',
        }
        this.changeActive = this.changeActive.bind(this)
    };
    changeActive=(value)=>{
        this.setState({
            rankActive: {value}
        })
        console.log("value",value)
        console.log("state",this.state.rankActive.value)
    }
    componentDidMount(){
        this.changeActive('1')
    }
    render() {
        var ranks = [
            {
                id: 1,
                keyid: '1',
                name:"Cá Voi Tỉ Đô",
                img:"/images/top01.jpg",
                author:"Bradley Hope, Tom Wright",
                price:21000,
                description: "Vào năm 2009, cựu sinh viên Trường Kinh doanh Wharton của Đại học Pennsylvania (Mỹ) Jho Low, với dáng vẻ “bầu bĩnh”, hiền lành đã khởi động chuỗi hành vi gian lận lớn chưa từng thấy - biểu tượng cho mối đe dọa lớn tiếp theo đối với hệ thống tài chính toàn cầu. Trong một thập kỷ, Low, với sự trợ giúp của ngân hàng Goldman Sachs (Mỹ) và nhiều nhân vật khác, đã rút ruột hàng tỷ đô la từ Quỹ đầu tư nhà nước Malaysia 1MDB - ngay dưới mũi của các cơ quan giám sát ngành tài chính toàn cầu."
            },
            {
                id: 2,
                keyid: '2',
                name:"Muôn Kiếp Nhân Sinh",
                img:"/images/top02.jpg",
                author:"Bradley Hope, Tom Wright",
                price:21000,
                description: "Vào năm 2009, cựu sinh viên Trường Kinh doanh Wharton của Đại học Pennsylvania (Mỹ) Jho Low, với dáng vẻ “bầu bĩnh”, hiền lành đã khởi động chuỗi hành vi gian lận lớn chưa từng thấy - biểu tượng cho mối đe dọa lớn tiếp theo đối với hệ thống tài chính toàn cầu. Trong một thập kỷ, Low, với sự trợ giúp của ngân hàng Goldman Sachs (Mỹ) và nhiều nhân vật khác, đã rút ruột hàng tỷ đô la từ Quỹ đầu tư nhà nước Malaysia 1MDB - ngay dưới mũi của các cơ quan giám sát ngành tài chính toàn cầu."
            },
            {
                id: 3,
                keyid: '3',
                name:"Hành Trình Về Phương Đông",
                img:"/images/top03.jpg",
                author:"Bradley Hope, Tom Wright",
                price:21000,
                description: "Vào năm 2009, cựu sinh viên Trường Kinh doanh Wharton của Đại học Pennsylvania (Mỹ) Jho Low, với dáng vẻ “bầu bĩnh”, hiền lành đã khởi động chuỗi hành vi gian lận lớn chưa từng thấy - biểu tượng cho mối đe dọa lớn tiếp theo đối với hệ thống tài chính toàn cầu. Trong một thập kỷ, Low, với sự trợ giúp của ngân hàng Goldman Sachs (Mỹ) và nhiều nhân vật khác, đã rút ruột hàng tỷ đô la từ Quỹ đầu tư nhà nước Malaysia 1MDB - ngay dưới mũi của các cơ quan giám sát ngành tài chính toàn cầu."
            }
        ];
        var itemsProduct = ranks.map((rank,index)=>{
            return <div key={index} className={this.state.rankActive.value === rank.keyid ? 'itemTop demo active':'itemTop demo'} alt={rank.name} onClick={()=>{this.changeActive(rank.keyid)}}>
                        <div className="row">
                            <div className="col-lg-1 col-md-1 col-sm-1 col-1">
                                <div className="number">
                                    {rank.id} <br/>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                                <div className="imgTop">
                                    <img src={rank.img} alt={rank.name}/>
                                </div>
                            </div>
                            <div className="col-lg-7 col-md-7 col-sm-7 col-6">
                                <div className="contentTop">
                                    <h3>{rank.name}</h3>
                                    <p>Tác giả: {rank.author}</p>
                                </div>
                            </div>
                        </div>
                    </div>
        })
        var selectProduct = ranks.map((rank,index)=>{
            if(this.state.rankActive.value === rank.keyid){   
                return <div className="mySlides">
                            <div className="boxImgTop">
                                <img src={rank.img}/>
                            </div>
                            <div className="contentPreview">
                                <h3>{rank.name}</h3>
                                <p><b> Tác giả: {rank.author}</b></p>
                                <p><b>Nhà xuất bản: NXB Thế Giới</b></p>
                                <h4 className="price">${rank.price}</h4>
                                <p>
                                    {rank.description}
                                </p>
                                <button className="btnMuaNgay">MUA NGAY</button>
                            </div>
                        </div>    
            }
        })
        return (
            <div>
                <div className="topBXH">
                    <div className="container">
                        <div className="titleBXH">BẢNG XẾP HẠNG</div>
                        <div className="row">
                            <div className="col-lg-6">
                                {itemsProduct}
                            </div>
                            <div className="col-lg-6 sanpham">
                                {selectProduct}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Ranking;
