import Axios from "axios";
import React from "react";
import { Card, Button, Badge, Spinner, Form, ListGroup } from 'react-bootstrap';
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../../../constants";
import { getCategoryList, updateCategory } from "../../../services/CategoryService";
class CategoryEdit extends React.Component {

  state = {
    isloading: false,
    id: this.props.category.id,
    name: this.props.category.name,
    description: this.props.category.description,
    status: this.props.category.status,
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
    const response = await updateCategory(this.state.id, postBody);
    if (response.success) {
      this.setState({
        name: "",
        description: "",
        status: "",
        isloading: false,
      });
      this.props.onCompleteCategoryEdit();
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
            <Form onSubmit={this.submitForm}>
              <div className="row mb-2">
                <div className="col-6">
                  <Form.Group controlId="name">
                    <Form.Label>Tên thể loại sách </Form.Label>
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
                </div>
                <div className="col-6">
                  <Form.Group controlId="description">
                    <Form.Label>Mô tả thể loại sách </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập mô tả"
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
      </>
    );
  }
}

export default withRouter(CategoryEdit);

