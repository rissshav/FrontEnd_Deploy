import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row, Container, Badge, CardTitle, Label, Button, Form, Input, InputGroup, FormFeedback } from "reactstrap";


import { alerShow } from '../commonFunction'
import axios from "axios"
import * as Yup from "yup";
import { useFormik } from "formik";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";
import '../../assets/scss/style.css'
import { changePassword } from "services/services";
import { fireToast } from "common/toaster";

const Dashboard = props => {

  //meta title
  document.title = "Change Password";

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [formValues, setFormValues] = useState({ oldPassword: '', newPassword: '', confirm_password: '' })

  const changeValues = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }

  // Form validation 
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      oldPassword: formValues.oldPassword,
      newPassword: formValues.newPassword,
      confirm_password: formValues.confirm_password,
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Please Enter Your Old Password"),
      newPassword: Yup.string().required("Please Enter Your Password"),
      confirm_password: Yup.string().required("Please Enter Your Confirm Password").oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    }),
    onSubmit: (values) => {
      console.log(values, 'form data >>>>>>>>>>>>>>')
      submitChangePasswordRequest(values);
      // saveVendorInformation(values)
    }
  });
  const obj = JSON.parse(localStorage.getItem("authUser"))
  const submitChangePasswordRequest = async (data) => {
    try{
      let collectionData = { 'oldPassword': data.oldPassword, 'newPassword': data.newPassword }
      console.log(collectionData,"collection data")
      const response= await changePassword(collectionData)
      if(response?.status == 200){
        fireToast("success",response.message)
      }
    }
    catch(error){
      fireToast("error",error?.response?.data?.error)
    }


    // axios.post('https://metagiro-apis.block-brew.com/api/admin/changePassword',
    
    //   collectionData,
    //   {
    //     headers: { Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Mzc5Zjg0OGZjZWNiNGY3YjkxYzBlYiIsImlhdCI6MTY4MTcyNDAwMCwiZXhwIjoxNjgxODEwNDAwfQ.e137FR1H2630k9jL349H36FGUHKec_Qo4JbXFrNK2Q8" },
    //   }
    // )
    //   .then(function (response) {
    //     alerShow('Success', response.data.message, 'success');
    //   })
    //   .catch(function (error) {
    //     alerShow('Error', error.response.data.message, 'error');
    //   });
  }

  return (
    <React.Fragment>
      <div className="page-content margin-custom">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Dashboard")}
            breadcrumbItem={props.t("Change Password")}
          />

          <Row>
            <Col xl="12">
              <Card>
                <CardBody>
                  <CardTitle className="h5 mb-4">  </CardTitle>

                  <Form className="needs-validation create-vendor"
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                  >
                    <Row>
                      <Col md={12}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-password-Input">Old Password</Label>
                          <Input
                            type="password"
                            name="oldPassword"
                            className="form-control"
                            id="formrow-password-Input"
                            placeholder="Enter Your Password"
                            onBlur={validation.handleBlur} onChange={changeValues}
                          />
                          {validation.touched.oldPassword && validation.errors.oldPassword ? (
                            <FormFeedback type="invalid">{validation.errors.oldPassword}</FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-password-Input">New Password</Label>
                          <Input
                            type="password"
                            name="newPassword"
                            className="form-control"
                            id="formrow-password-Input"
                            placeholder="Enter Your Password"
                            onBlur={validation.handleBlur} onChange={changeValues}
                          />
                          {validation.touched.newPassword && validation.errors.newPassword ? (
                            <FormFeedback type="invalid">{validation.errors.newPassword}</FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-password-Input">Confirm Password</Label>
                          <Input
                            type="password"
                            name="confirm_password"
                            className="form-control"
                            id="formrow-password-Input"
                            placeholder="Enter Your Password"
                            onBlur={validation.handleBlur} onChange={changeValues}
                          />
                          {validation.touched.confirm_password && validation.errors.confirm_password ? (
                            <FormFeedback type="invalid">{validation.errors.confirm_password}</FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row>

                    <div>
                      <button type="submit" className="btn btn-primary w-md mt-3">
                        Submit
                      </button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>

        </Container>
      </div>

    </React.Fragment>
  );
};


Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Dashboard);
