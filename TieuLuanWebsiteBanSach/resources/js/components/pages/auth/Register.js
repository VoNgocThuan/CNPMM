import React from "react";
import { Card, Button, Badge, Spinner, Form, ListGroup } from 'react-bootstrap';
import { Link, withRouter } from "react-router-dom";
import { registerUser } from "../../../services/AuthService";
class Register extends React.Component {

  state = {
    isloading: false,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    errors: {},

    validated: false,
  };

  componentDidMount() {
  };

  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitForm = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    this.setState({
      validated: true,
    });

    const { history } = this.props;

    const postBody = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
    };
    if (form.checkValidity() !== false) {
      e.preventDefault();
      this.setState({ isLoading: true });
      const response = await registerUser(postBody);
      console.log("response register", response);
      if (response.success) {
        this.setState({
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
          isLoading: false,
          errors: {},
        });
        localStorage.setItem("loginData", JSON.stringify(response));
        history.push(`${PUBLIC_URL}login`);
      } else {
        console.log("response.errors", response.errors);
        this.setState({
          errors: response.errors,
          isLoading: false,
        });
        localStorage.setItem("loginData", null);
      }
    }
  };

  render() {
    return (
      <>
        <div className="header-part mt-4">
          <div className="float-left">
            <h2>Đăng ký tài khoản Quản lý</h2>
          </div>
          <div className="clearfix"></div>
        </div>
        <Card>
          <Card.Body>
            <Form noValidate
              validated={this.state.validated}
              onSubmit={this.submitForm}
            >
              <div className="row">
                <div className="col-6">
                  <Form.Group controlId="name">
                    <Form.Label>Tên người dùng: </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Nhập tên"
                      value={this.state.name}
                      name="name"
                      onChange={(e) => this.changeInput(e)}
                    />
                    {this.state.errors && this.state.errors.name && (
                      <p className="text-danger">{this.state.errors.name[0]}</p>
                    )}
                    <Form.Control.Feedback type="invalid">
                      Bạn chưa nhập tên người dùng.
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="col-6">
                  <Form.Group controlId="email">
                    <Form.Label>Địa chỉ Email: </Form.Label>
                    <Form.Control
                      required
                      type="email"
                      placeholder="Nhập địa chỉ email"
                      value={this.state.email}
                      name="email"
                      onChange={(e) => this.changeInput(e)}
                    />
                    {this.state.errors && this.state.errors.email && (
                      <p className="text-danger">{this.state.errors.email[0]}</p>
                    )}
                    <Form.Control.Feedback type="invalid">
                      Địa chỉ Email chưa hợp lệ.
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <Form.Group controlId="password">
                    <Form.Label>Mật khẩu: </Form.Label>
                    <Form.Control
                      required
                      type="password"
                      placeholder="Nhập mật khẩu"
                      value={this.state.password}
                      name="password"
                      onChange={(e) => this.changeInput(e)}
                      minLength={8}
                    />
                    {this.state.errors && this.state.errors.password && (
                      <p className="text-danger">{this.state.errors.password[0]}</p>
                    )}
                    <Form.Control.Feedback type="invalid">
                      Bạn chưa nhập mật khẩu.
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="col-6">
                  <Form.Group controlId="password_confirmation">
                    <Form.Label>Xác nhận mật khẩu: </Form.Label>
                    <Form.Control
                      required
                      type="password"
                      placeholder="Nhập lại mật khẩu"
                      value={this.state.password_confirmation}
                      name="password_confirmation"
                      onChange={(e) => this.changeInput(e)}
                      minLength={8}
                    />
                    {this.state.errors && this.state.errors.password_confirmation && (
                      <p className="text-danger">{this.state.errors.password_confirmation[0]}</p>
                    )}
                    <Form.Control.Feedback type="invalid">
                      Bạn chưa nhập xác nhận mật khẩu.
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </div>

              {
                this.state.isloading && (
                  <Button variant="success" type="button" disabled>
                    <Spinner animation="border" role="status">
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                    Đăng ký...
                  </Button>
                )
              }
              {
                !this.state.isloading && (
                  <Button variant="success" type="submit">
                    Đăng ký
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

export default withRouter(Register);

