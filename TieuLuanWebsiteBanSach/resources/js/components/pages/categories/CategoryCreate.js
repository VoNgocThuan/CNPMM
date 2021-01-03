import Axios from "axios";
import React from "react";
import { Card, Button, Badge, Spinner, Form, ListGroup } from 'react-bootstrap';
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../../../constants";
import { getCategoryList, storeNewCategory } from "../../../services/CategoryService";
class CategoryCreate extends React.Component {

  state = {
    isloading: false,
    name: "",
    description: "",
    status: "",
    errors: {},
  };

  componentDidMount() {
  };

  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitForm = async (e) => {
    e.preventDefault();
    const { history } = this.props;
    this.setState({ isloading: true })
    const postBody = {
      name: this.state.name,
      description: this.state.description,
      status: this.state.status,
    };
    const response = await storeNewCategory(postBody);
    if (response.success) {
      this.setState({
        name: "",
        description: "",
        status: "",
        isloading: false,
      });
      history.push(`${PUBLIC_URL}categories`);
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
        <div className="container">
          <div className="header-part mt-4">
            <div className="float-left">
              <h2>Thể loại sách mới</h2>
            </div>
            <div className="float-right">
              <Link to={`${PUBLIC_URL}categories`} className="btn btn-info">Xem tất cả thể loại sách</Link>
            </div>
            <div className="clearfix"></div>
          </div>
          <Card>
            <Card.Body>
              <Form onSubmit={this.submitForm}>
                <Form.Group controlId="name">
                  <Form.Label>Tên thể loại sách: </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập tên"
                    value={this.state.name}
                    name="name"
                    onChange={(e) => this.changeInput(e)}
                  />
                </Form.Group>
                {this.state.errors && this.state.errors.name && (
                  <p className="text-danger">{this.state.errors.name[0]}</p>
                )}
                <Form.Group controlId="description">
                  <Form.Label>Mô tả</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập mô tả"
                    as="textarea"
                    rows="5"
                    value={this.state.description}
                    name="description"
                    onChange={(e) => this.changeInput(e)}
                  />
                </Form.Group>
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
                      Lưu
                    </Button>
                  )
                }
              </Form>
            </Card.Body>
          </Card>
        </div>
      </>
    );
  }
}

export default withRouter(CategoryCreate);

