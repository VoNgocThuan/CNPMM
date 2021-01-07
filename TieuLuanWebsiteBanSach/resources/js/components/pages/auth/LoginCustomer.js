import React from "react";
import { Card, Button, Spinner, Form, Alert } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../../../constants";
import { loginCustomer } from "../../../services/CustomerAuthService";

class LoginCheckout extends React.Component {
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

    const { history } = this.props;

    const postBody = {
      email: this.state.email,
      password: this.state.password,
    };
    if (form.checkValidity() !== false) {
      e.preventDefault();
      this.setState({ isLoading: true });
      const response = await loginCustomer(postBody);
      console.log("response register", response);
      if (response.success) {
        this.setState({
          email: "",
          password: "",
          isLoading: false,
          errors: {},
          errorMessage: "",
        });
        localStorage.setItem("loginCustomerData", JSON.stringify(response));
        window.location.href = "http://127.0.0.1:8000/shopbansach";
      } else {
        console.log("response.errors", response.errors);
        this.setState({
          errors: response.errors,
          isLoading: false,
          errorMessage: response.message,
        });
        localStorage.setItem("loginCustomerData", null);
      }
    }
  };

  render() {
    return (
      <div className="login-form">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="img-login">
                  <img src="https://cdn0.iconfinder.com/data/icons/ordergan-mobile-activity/1440/Icon_illustration_E-commerce_Desktop_Login-512.png"></img>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="header-part">
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
                          <Form.Label>Địa chỉ Email</Form.Label>
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

                        {this.state.isLoading && (
                          <Button variant="success" type="button" disabled block>
                            <Spinner animation="border" role="status">
                              <span className="sr-only">Đang tải...</span>
                            </Spinner>{" "}
                            Đăng nhập...
                          </Button>
                        )}
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
                                  <Link to={`${PUBLIC_URL}register-checkout`}>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginCheckout);
