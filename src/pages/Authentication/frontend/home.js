import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row, Container, Badge, CardTitle, Label, Button, Form, Input, InputGroup, FormFeedback } from "reactstrap";


//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";
import '../../../assets/scss/style.css'

const Dashboard = props => {

  //meta title
  document.title = "Change Password | FINTEX";

  
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
                  <CardTitle className="h5 mb-4">  Hi </CardTitle>

                  
                  
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
