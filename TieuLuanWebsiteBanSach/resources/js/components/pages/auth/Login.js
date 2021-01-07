import React from "react";
import { Card, Button, Spinner, Form, Alert } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../../../constants";
import { loginUser } from "../../../services/AuthService";

class Login extends React.Component {
  state = {
    isLoading: false,
    email: "",
    password: "",
    errors: {},
    errorMessage: "",
    validated: false,
  };

  componentDidMount() { }

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

    const postBody = {
      email: this.state.email,
      password: this.state.password,
    };
    if (form.checkValidity() !== false) {
      e.preventDefault();
      this.setState({ isLoading: true });
      const response = await loginUser(postBody);
      console.log("response register", response);
      if (response.success) {
        this.setState({
          email: "",
          password: "",
          isLoading: false,
          errors: {},
          errorMessage: "",
        });
        localStorage.setItem("loginData", JSON.stringify(response));
        window.location.href = 'http://127.0.0.1:8000/shopbansach/categories';
      } else {
        console.log("response.errors", response.errors);
        this.setState({
          errors: response.errors,
          isLoading: false,
          errorMessage: response.message,
        });
        localStorage.setItem("loginData", null);
      }
    }
  };

  render() {
    return (
      <>
        <div className="header-part mt-4">
          <div className="text-center">
            <h2>Đăng nhập</h2>
          </div>
          <div className="clearfix"></div>
        </div>

        <Form
          noValidate
          validated={this.state.validated}
          onSubmit={this.submitForm}
        >
          <div className="row justify-content-center">
            <div className="col-8">
              <Card>
                <Card.Body>
                  {this.state.errorMessage.length > 0 && (
                    <Alert
                      variant="danger"
                      onClose={() => this.setState({ errorMessage: "" })}
                      dismissible
                    >
                      {this.state.errorMessage}
                    </Alert>
                  )}

                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      placeholder="Nhập địa chỉ Email"
                      value={this.state.email}
                      name="email"
                      onChange={(e) => this.changeInput(e)}
                    />
                    {this.state.errors && this.state.errors.email && (
                      <p className="text-danger">
                        {this.state.errors.email[0]}
                      </p>
                    )}
                  </Form.Group>

                  <Form.Group controlId="password">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      placeholder="Nhập mật khẩu"
                      value={this.state.password}
                      name="password"
                      onChange={(e) => this.changeInput(e)}
                      minLength={6}
                    />
                    {this.state.errors && this.state.errors.password && (
                      <p className="text-danger">
                        {this.state.errors.password[0]}
                      </p>
                    )}
                  </Form.Group>

                  <div className="row mt-4 mb-2">
                    <div className="col-md-6 col-12">
                      {!this.state.isLoading && (
                        <Button variant="success" type="submit" block>
                          Đăng nhập
                        </Button>
                      )}
                    </div>
                    <div className="col-md-6 col-12">
                      {!this.state.isLoading && (
                        <Link to={`${PUBLIC_URL}register`}>
                          <Button variant="info" type="submit" block>
                            Đăng ký tài khoản
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Form>
      </>
    );
  }
}

export default withRouter(Login);
