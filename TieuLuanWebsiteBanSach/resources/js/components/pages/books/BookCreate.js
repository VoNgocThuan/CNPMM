import React from "react";
import { Card, Button, Spinner, Form } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import { storeNewBook } from "../../../services/BookService";
class BookCreate extends React.Component {
  constructor() {
    super();
    this.state = {
      isloading: false,
      name: "",
      author: "",
      description: "",
      originalPrice: "",
      price: "",
      quantity: "0",
      ratings: "",
      status: "0",
      new: "",
      bestsale: "",
      toprating: "",
      image1: "",
      image2: "",
      image3: "",
      errors: {},
    };
    this.onChangeQuantityStatus = this.onChangeQuantityStatus.bind(this);
  }

  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onChangeQuantityStatus = (e) => {
    let quantity = e.target.value;
    this.setState({
      [e.target.name]: quantity
    });
    if (quantity == 0) {
      this.setState({
        status: "0"
      });
    } else if(quantity > 0) {
      this.setState({
        status: "1"
      });
    } else {
      this.setState({
        status: "2"
      });
    }
  }

  submitForm = async (e) => {
    e.preventDefault();
    const { history } = this.props;
    this.setState({ isloading: true })
    const postBody = {
      name: this.state.name,
      author: this.state.author,
      description: this.state.description,
      originalPrice: this.state.originalPrice,
      price: this.state.price,
      quantity: this.state.quantity,
      ratings: this.state.ratings,
      status: this.state.status,
      new: this.state.new,
      bestsale: this.state.bestsale,
      toprating: this.state.toprating,
      image1: this.state.image1,
      image2: this.state.image2,
      image3: this.state.image3,
      category_id: this.props.category_id,
    };
    const response = await storeNewBook(postBody);
    if (response.success) {
      this.setState({
        name: "",
        author: "",
        description: "",
        originalPrice: "",
        price: "",
        quantity: "",
        ratings: "",
        status: "",
        new: "",
        bestsale: "",
        toprating: "",
        image1: "",
        image2: "",
        image3: "",
        isloading: false,
      });
      this.props.onCompleteBookCreate(response.data);
    } else {
      this.setState({
        errors: response.errors,
        isloading: false,
      });
    }
  };

  render() {
    return (
      <>
        <Card>
          <Card.Body>
            <h2>Sách mới</h2>
            <Form onSubmit={this.submitForm}>
              <div className="row">
                <div className="col-6">
                  <Form.Group controlId="name">
                    <Form.Label>Tên sách</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập tên sách"
                      value={this.state.name}
                      name="name"
                      onChange={(e) => this.changeInput(e)}
                    />
                  </Form.Group>
                  {this.state.errors && this.state.errors.name && (
                    <p className="text-danger">{this.state.errors.name[0]}</p>
                  )}
                </div>
                <div className="col-6">
                  <Form.Group controlId="description">
                    <Form.Label>Mô tả sách</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập mô tả sách"
                      as="textarea"
                      rows="3"
                      value={this.state.description}
                      name="description"
                      onChange={(e) => this.changeInput(e)}
                    />
                  </Form.Group>
                  {this.state.errors && this.state.errors.description && (
                    <p className="text-danger">{this.state.errors.description[0]}</p>
                  )}
                </div>
              </div>

              <div className="row">
                <div className="col-4">
                  <Form.Group controlId="originalPrice">
                    <Form.Label>Giá tiền gốc sách</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Nhập giá tiền gốc sách"
                      value={this.state.originalPrice}
                      name="originalPrice"
                      onChange={(e) => this.changeInput(e)}
                    />
                  </Form.Group>
                  {this.state.errors && this.state.errors.originalPrice && (
                    <p className="text-danger">{this.state.errors.originalPrice[0]}</p>
                  )}
                </div>
                <div className="col-4">
                  <Form.Group controlId="price">
                    <Form.Label>Giá tiền sách</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Nhập giá tiền sách"
                      value={this.state.price}
                      name="price"
                      onChange={(e) => this.changeInput(e)}
                    />
                  </Form.Group>
                  {this.state.errors && this.state.errors.price && (
                    <p className="text-danger">{this.state.errors.price[0]}</p>
                  )}
                </div>
                <div className="col-4">
                  <Form.Group>
                    <Form.Label>Số lượng</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Nhập số lượng sách trong kho"
                      value={this.state.quantity}
                      name="quantity"
                      onChange={this.onChangeQuantityStatus}
                    />
                  </Form.Group>
                  {this.state.errors && this.state.errors.quantity && (
                    <p className="text-danger">{this.state.errors.quantity[0]}</p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <Form.Group controlId="status">
                    <Form.Label>Tình trạng</Form.Label>
                    <Form.Control as="select"
                      value={this.state.status}
                      name="status"
                      //onChange={(e) => this.changeInput(e)}
                      onChange={this.onChangeQuantityStatus}
                    >
                      <option>Chọn</option>
                      <option value="0">Hết hàng</option>
                      <option value="1">Hiện có</option>
                      <option value="2">Ngừng bán</option>
                    </Form.Control>
                  </Form.Group>
                  {this.state.errors && this.state.errors.status && (
                  <p className="text-danger">{this.state.errors.status[0]}</p>
                )}
                </div>                
                <div className="col-4">
                  <Form.Group controlId="ratings">
                    <Form.Label>Ratings</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Nhập số sao sách"
                      value={this.state.ratings}
                      name="ratings"
                      onChange={(e) => this.changeInput(e)}
                    />
                  </Form.Group>
                  {this.state.errors && this.state.errors.ratings && (
                    <p className="text-danger">{this.state.errors.ratings[0]}</p>
                  )}
                </div>
                <div className="col-4">
                  <Form.Group controlId="author">
                    <Form.Label>Tác giả</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập tên tác giả"
                      value={this.state.author}
                      name="author"
                      onChange={(e) => this.changeInput(e)}
                    />
                  </Form.Group>
                  {this.state.errors && this.state.errors.author && (
                    <p className="text-danger">{this.state.errors.author[0]}</p>
                  )}
                </div>

              </div>
              <div className="row">
                <div className="col-4">
                  <Form.Group controlId="image1">
                    <Form.Label>Hình sách 1</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Link hình ảnh"
                      value={this.state.image1}
                      name="image1"
                      onChange={(e) => this.changeInput(e)}
                    />
                  </Form.Group>
                  {this.state.errors && this.state.errors.image1 && (
                    <p className="text-danger">{this.state.errors.image1[0]}</p>
                  )}
                </div>
                <div className="col-4">
                  <Form.Group controlId="image2">
                    <Form.Label>Hình sách 2</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Link hình ảnh"
                      value={this.state.image2}
                      name="image2"
                      onChange={(e) => this.changeInput(e)}
                    />
                  </Form.Group>
                  {this.state.errors && this.state.errors.image2 && (
                    <p className="text-danger">{this.state.errors.image2[0]}</p>
                  )}
                </div>
                <div className="col-4">
                  <Form.Group controlId="image3">
                    <Form.Label>Hình sách 3</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Link hình ảnh"
                      value={this.state.image3}
                      name="image3"
                      onChange={(e) => this.changeInput(e)}
                    />
                  </Form.Group>
                  {this.state.errors && this.state.errors.image3 && (
                    <p className="text-danger">{this.state.errors.image3[0]}</p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <Form.Group controlId="new">
                    <Form.Label>Sách mới</Form.Label>
                    <Form.Control as="select"
                      value={this.state.new}
                      name="new"
                      onChange={(e) => this.changeInput(e)}
                    >
                      <option>Chọn</option>
                      <option value="1">Đúng</option>
                      <option value="0">Sai</option>
                    </Form.Control>
                  </Form.Group>
                  {this.state.errors && this.state.errors.new && (
                    <p className="text-danger">{this.state.errors.new[0]}</p>
                  )}
                </div>
                <div className="col-4">
                  <Form.Group controlId="bestsale">
                    <Form.Label>Sách bán chạy</Form.Label>
                    <Form.Control as="select"
                      value={this.state.bestsale}
                      name="bestsale"
                      onChange={(e) => this.changeInput(e)}
                    >
                      <option>Chọn</option>
                      <option value="1">Đúng</option>
                      <option value="0">Sai</option>
                    </Form.Control>
                  </Form.Group>
                  {this.state.errors && this.state.errors.bestsale && (
                    <p className="text-danger">{this.state.errors.bestsale[0]}</p>
                  )}
                </div>
                <div className="col-4">
                  <Form.Group controlId="toprating">
                    <Form.Label>Sách top đánh giá</Form.Label>
                    <Form.Control as="select"
                      value={this.state.toprating}
                      name="toprating"
                      onChange={(e) => this.changeInput(e)}
                    >
                      <option>Chọn</option>
                      <option value="1">Đúng</option>
                      <option value="0">Sai</option>
                    </Form.Control>
                  </Form.Group>
                  {this.state.errors && this.state.errors.toprating && (
                    <p className="text-danger">{this.state.errors.toprating[0]}</p>
                  )}
                </div>
              </div>
              {this.state.errors && this.state.errors.description && (
                <p className="text-danger">{this.state.errors.description[0]}</p>
              )}
              {
                this.state.isloading && (
                  <Button variant="primary" type="button" disabled>
                    <Spinner animation="border" role="status">
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                    Saving...
                  </Button>
                )
              }
              {
                !this.state.isloading && (
                  <Button variant="primary" type="submit">
                    Tạo mới
                  </Button>
                )
              }
            </Form>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default withRouter(BookCreate);

