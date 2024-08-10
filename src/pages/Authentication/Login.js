import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Label } from "reactstrap";
//redux
import { useSelector, useDispatch } from "react-redux";
import { withRouter, Link, useLocation } from "react-router-dom";
import Icon from "react-icons-kit";
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

//Social Media Imports
import { GoogleLogin } from "react-google-login";
// import TwitterLogin from "react-twitter-auth"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

// actions
import { loginUser, socialLogin } from "../../store/actions";

import { adminLogin } from 'services/services'

// import images
import profile from "assets/images/profile-img.png";
import logo from "assets/images/short-logo.png";

//Import config
import { facebook, google } from "../../config";

import axios from 'axios';
import { useHistory } from 'react-router'
import "../../assets/css/style.css";
import { fireToast } from '../../common/toaster';

const Login = props => {

  //meta title
  document.title = "Users";

  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const dispatch = useDispatch();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const history = useHistory();
  const [loader, setLoader] = useState(false);
  const [icon, setIcon] = useState(eyeOff);
  const [type, setType] = useState('password');

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text')
    } else {
      setIcon(eyeOff)
      setType('password')
    }
  }

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "admin@admin.com" || '',
      password: "admin@123" || '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: async (values) => {
      try {
        const resp = await adminLogin(values);
        if (resp.status == 200) {
          console.log(resp, "success login ");
          localStorage.setItem("authUser", JSON.stringify(resp?.data));
          history.push("/view");
        }
      } catch (error) {
        fireToast('error', error?.response?.data?.error)
      }
      // dispatch(loginUser(values, props.history));
      //dispatch(loginUser(values, props.history));
      // adminLogin(values);
    }
  });

  // const adminLogin = (values) => {

  //   axios.post('https://universe-eye-apis.block-brew.com/api/admin/login',
  //     values
  //   )
  //     .then(function (response) {
  //       console.log(response, 'response >>>>>>>>>>>>>>>')

  //       if (response.data.data.role == 'admin') {

  //         localStorage.setItem("webStatus", "no");
  //         localStorage.setItem("authUser", JSON.stringify({ 'uid': response.data.data.id, 'role': response.data.data.role, 'email': response.data.data.email, 'accessToken': response.data.data.token, 'type': response.data.data.type, 'firstName': response.data.data.firstName ?? response.data.data.name }));
  //         history.push('/admin/dashboard');

  //       } else {

  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Oops...',
  //           text: "User not valid for login.",
  //         })
  //       }

  //     })
  //     .catch(function (error) {
  //       console.log(error, 'eeeee');
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Oops...',
  //         text: error.response.data.message,
  //       })
  //     });
  // }

  const { error } = useSelector(state => ({
    error: state.Login.error,
  }));

  const signIn = (res, type) => {
    if (type === "google" && res) {
      const postData = {
        name: res.profileObj.name,
        email: res.profileObj.email,
        token: res.tokenObj.access_token,
        idToken: res.tokenId,
      };
      dispatch(socialLogin(postData, props.history, type));
    } else if (type === "facebook" && res) {
      const postData = {
        name: res.name,
        email: res.email,
        token: res.accessToken,
        idToken: res.tokenId,
      };
      dispatch(socialLogin(postData, props.history, type));
    }
  };

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          {/* <i className="bx bx-home h2" /> */}
        </Link>
      </div>
      <div className="account-pages pt-sm-5 login-box-center">

        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-soft" style={{ background: '#181920' }}>
                  <Row>
                    <Col xs={7}>
                      <div className=" p-4 pe-1">
                        <h5 className="text-white">Welcome Back !</h5>
                        <p className="text-white">Sign in to continue.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  {/* <div>
                    <Link to="/" className="auth-logo-light">
                      <div className="avatar-md profile-user-wid mb-4 bg-soft" style={{ height: '4.5rem', width: '5.5rem' }}>
                        <span className="avatar-title rounded border" style={{ background: '#22242e' }}>
                          <img
                            src={logo}
                            height="50"
                            className="mt-2"
                          />
                        </span>
                      </div>
                    </Link>
                  </div> */}
                  <div className="p-2 mt-4">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      {error ? <Alert color="danger">{error}</Alert> : null}

                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email ? true : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <div className="pass-eye position-relative">
                          <Input
                            name="password"
                            value={validation.values.password || ""}
                            type={type}
                            placeholder="Enter Password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            invalid={
                              validation.touched.password && validation.errors.password ? true : false
                            }
                          />
                          <span className="position-absolute" onClick={handleToggle} style={{top:"8px", right:"8px"}}>
                            <Icon className="mr-10" icon={icon} size={18} />
                          </span>
                        </div>
                        {validation.touched.password && validation.errors.password ? (
                          <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customControlInline"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                          style={{ background: '#22242e', border: '#181920' }}
                        >
                          Log In
                        </button>
                      </div>

                      {/* <div className="mt-4 text-center">
                        <h5 className="font-size-14 mb-3">Sign in with</h5>

                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <FacebookLogin
                              appId={facebook.APP_ID}
                              autoLoad={false}
                              callback={facebookResponse}
                              render={renderProps => (
                                <Link
                                  to="#"
                                  className="social-list-item bg-primary text-white border-primary"
                                  onClick={renderProps.onClick}
                                >
                                  <i className="mdi mdi-facebook" />
                                </Link>
                              )}
                            />
                          </li>
                          <li className="list-inline-item">
                           <TwitterLogin
                             loginUrl={
                               "http://localhost:4000/api/v1/auth/twitter"
                             }
                             onSuccess={this.twitterResponse}
                             onFailure={this.onFailure}
                             requestTokenUrl={
                               "http://localhost:4000/api/v1/auth/twitter/revers"
                             }
                             showIcon={false}
                             tag={"div"}
                           >
                             <a
                               href=""
                               className="social-list-item bg-info text-white border-info"
                             >
                               <i className="mdi mdi-twitter"/>
                             </a>
                           </TwitterLogin>
                          </li>
                          <li className="list-inline-item">
                            <GoogleLogin
                              clientId={google.CLIENT_ID}
                              render={renderProps => (
                                <Link
                                  to="#"
                                  className="social-list-item bg-danger text-white border-danger"
                                  onClick={renderProps.onClick}
                                >
                                  <i className="mdi mdi-google" />
                                </Link>
                              )}
                              onSuccess={googleResponse}
                              onFailure={() => { }}
                            />
                          </li>
                        </ul>
                      </div> */}

                      <div className="mt-4 text-center">
                        <Link to="/forgot-password" className="text-muted d-none">
                          <i className="mdi mdi-lock me-1" />
                          Forgot your password?
                        </Link>

                        <p className="">

                        </p>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                {/* <p>
                  Don&#39;t have an account ?{" "}
                  <Link to="/register" className="fw-medium text-primary">
                    {" "}
                    Signup now{" "}
                  </Link>{" "}
                </p> */}
                <p className="text-white d-none">
                  © {new Date().getFullYear()} . {" "}
                  Design & Developed by Block Tech Brew
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};
