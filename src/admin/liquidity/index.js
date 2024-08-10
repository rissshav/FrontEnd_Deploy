import PropTypes, { element, func } from "prop-types"
import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
    Card,
    CardBody,
    Col,
    Row,
    Container,
    Badge,
    CardTitle,
    FormGroup,
    Input,
    InputGroup,
} from "reactstrap"
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "../../assets/scss/style.css"
// import { Modal, Form, Button } from "react-bootstrap"
import { useFormik } from "formik"
import * as Yup from "yup"

import "flatpickr/dist/themes/material_blue.css"

import { withTranslation } from "react-i18next"

import { JobWidgetCharts } from '../JobCharts';
import icon1 from "../../assets/images/eth.png";
import icon2 from "../../assets/images/tit.png";

const Transaction = props => {
    const graph1 = [{
        name: "Job View",
        data: [36, 21, 65, 22, 35, 50, 87, 98],
    }];
    const graph2 = [{
        name: "Job View",
        data: [36, 21, 65, 22, 35, 50, 60, 70],
    }];
    const graph3 = [{
        name: "Job View",
        data: [36, 21, 65, 22, 20, 10, 15, 12],
    }];

    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container-fluid">

                    <Row>
                        <Col Col lg={4}>
                            <Card className="mini-stats-wid">
                                <CardBody>
                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-muted fw-medium"> 07 Days Deals </p>
                                            <h4 className="mb-0">30</h4>
                                        </div>

                                        <div className="flex-shrink-0 align-self-center">
                                            <JobWidgetCharts dataColors='["--bs-success", "--bs-transparent"]' series={graph1} dir="ltr" />
                                        </div>
                                    </div>
                                </CardBody>
                                <div className="card-body border-top py-3">
                                    <p className="mb-0"> <span className={"badge badge-soft-success me-2"}>
                                        <i className="bx bx-trending-up align-bottom me-1"></i> 33.3%</span>
                                        Increase 07 Days Deals</p>
                                </div>
                            </Card>
                        </Col>
                        <Col Col lg={4}>
                            <Card className="mini-stats-wid">
                                <CardBody>
                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-muted fw-medium"> 30 Days Deals </p>
                                            <h4 className="mb-0">49</h4>
                                        </div>

                                        <div className="flex-shrink-0 align-self-center">
                                            <JobWidgetCharts dataColors='["--bs-success", "--bs-transparent"]' series={graph2} dir="ltr" />
                                        </div>
                                    </div>
                                </CardBody>
                                <div className="card-body border-top py-3">
                                    <p className="mb-0"> <span className={"badge badge-soft-success me-2"}>
                                        <i className="bx bx-trending-up align-bottom me-1"></i> 43.3%</span>
                                        Increase 30 Days Deals</p>
                                </div>
                            </Card>
                        </Col>
                        <Col Col lg={4}>
                            <Card className="mini-stats-wid">
                                <CardBody>
                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-muted fw-medium"> 90 Days Deals </p>
                                            <h4 className="mb-0">55</h4>
                                        </div>

                                        <div className="flex-shrink-0 align-self-center">
                                            <JobWidgetCharts dataColors='["--bs-danger", "--bs-transparent"]' series={graph3} dir="ltr" />
                                        </div>
                                    </div>
                                </CardBody>
                                <div className="card-body border-top py-3">
                                    <p className="mb-0"> <span className={"badge badge-soft-danger me-2"}>
                                        <i className="bx bx-trending-down align-bottom me-1"></i> 20%</span>
                                        Decrease 90 Days Deals</p>
                                </div>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg="12">
                            <Card>
                                <CardBody className="border-bottom py-2">
                                    <div className="d-flex align-items-center">
                                        <h5 className="mb-0 card-title flex-grow-1">
                                            Deals / Bond
                                        </h5>

                                        <div className="search-box me-xxl-2 my-3 my-xxl-0 d-inline-block">
                                            <div
                                                className="position-relative"
                                                style={{ marginTop: "10px" }}
                                            >
                                                <label htmlFor="search-bar-0" className="search-label">
                                                    <span id="search-bar-0-label" className="sr-only">
                                                        Search this table
                                                    </span>
                                                    <input
                                                        id="search-bar-0"
                                                        type="text"
                                                        className="form-control"
                                                        placeholder={`Search Name...`}
                                                    />
                                                </label>
                                                <i className="bx bx-search-alt search-icon"></i>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                                <CardBody>
                                    <Table
                                        id="tech-companies-1"
                                        className="table table-striped table-bordered"
                                    >
                                        <Tbody>
                                            <Tr>
                                                <td>
                                                    <div className="avatar-group">
                                                        <React.Fragment>
                                                            <div className="avatar-group-item">
                                                                <img src={icon1} alt="" className="rounded-circle avatar-xs" />
                                                            </div>
                                                            <div className="avatar-group-item">
                                                                <img src={icon2} alt="" className="rounded-circle avatar-xs" />
                                                            </div>
                                                        </React.Fragment>
                                                    </div>
                                                </td>
                                                <td>
                                                    <h5 className="text-truncate text-dark font-size-14">Symbol</h5>
                                                    <p className="text-muted mb-0">SGD / USD</p>
                                                </td>
                                                <td>
                                                    <h5 className="text-truncate text-dark font-size-14">Interest</h5>
                                                    <p className="text-muted mb-0">3.2%</p>
                                                </td>
                                                <td>
                                                    <h5 className="text-truncate text-dark font-size-14">Tenor</h5>
                                                    <p className="text-muted mb-0">1 Year</p>
                                                </td>
                                                <td>
                                                    <h5 className="text-truncate text-dark font-size-14">Rating</h5>
                                                    <p className="text-muted mb-0">AA</p>
                                                </td>
                                                <td>
                                                    <h5 className="text-truncate text-dark font-size-14">Expiry</h5>
                                                    <p className="text-muted mb-0">04/12/23</p>
                                                </td>
                                                <td style={{ width: "45px" }}>
                                                    <div className="avatar-sm">
                                                        <Link to="/admin/deals/view">
                                                            <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-24">
                                                                <i className="mdi mdi-eye" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </Tr>
                                            <Tr>
                                                <td>
                                                    <div className="avatar-group">
                                                        <React.Fragment>
                                                            <div className="avatar-group-item">
                                                                <img src={icon1} alt="" className="rounded-circle avatar-xs" />
                                                            </div>
                                                            <div className="avatar-group-item">
                                                                <img src={icon2} alt="" className="rounded-circle avatar-xs" />
                                                            </div>
                                                        </React.Fragment>
                                                    </div>
                                                </td>
                                                <td>
                                                    <h5 className="text-truncate text-dark font-size-14">Symbol</h5>
                                                    <p className="text-muted mb-0">SGD / USD</p>
                                                </td>
                                                <td>
                                                    <h5 className="text-truncate text-dark font-size-14">Interest</h5>
                                                    <p className="text-muted mb-0">3.2%</p>
                                                </td>
                                                <td>
                                                    <h5 className="text-truncate text-dark font-size-14">Tenor</h5>
                                                    <p className="text-muted mb-0">2 Year</p>
                                                </td>
                                                <td>
                                                    <h5 className="text-truncate text-dark font-size-14">Rating</h5>
                                                    <p className="text-muted mb-0">AB</p>
                                                </td>
                                                <td>
                                                    <h5 className="text-truncate text-dark font-size-14">Expiry</h5>
                                                    <p className="text-muted mb-0">04/12/23</p>
                                                </td>
                                                <td style={{ width: "45px" }}>
                                                    <div className="avatar-sm">
                                                        <Link to="/admin/deals/view">
                                                            <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-24">
                                                                <i className="mdi mdi-eye" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </Tr>
                                            <Tr>
                                                <td>
                                                    <div className="avatar-group">
                                                        <React.Fragment>
                                                            <div className="avatar-group-item">
                                                                <img src={icon1} alt="" className="rounded-circle avatar-xs" />
                                                            </div>
                                                            <div className="avatar-group-item">
                                                                <img src={icon2} alt="" className="rounded-circle avatar-xs" />
                                                            </div>
                                                        </React.Fragment>
                                                    </div>
                                                </td>
                                                <td>
                                                    <h5 className="text-truncate text-dark font-size-14">Symbol</h5>
                                                    <p className="text-muted mb-0">SGD / USD</p>
                                                </td>
                                                <td>
                                                    <h5 className="text-truncate text-dark font-size-14">Interest</h5>
                                                    <p className="text-muted mb-0">5.2%</p>
                                                </td>
                                                <td>
                                                    <h5 className="text-truncate text-dark font-size-14">Tenor</h5>
                                                    <p className="text-muted mb-0">3 Year</p>
                                                </td>
                                                <td>
                                                    <h5 className="text-truncate text-dark font-size-14">Rating</h5>
                                                    <p className="text-muted mb-0">AC</p>
                                                </td>
                                                <td>
                                                    <h5 className="text-truncate text-dark font-size-14">Expiry</h5>
                                                    <p className="text-muted mb-0">04/12/23</p>
                                                </td>
                                                <td style={{ width: "45px" }}>
                                                    <div className="avatar-sm">
                                                        <Link to="/admin/deals/view">
                                                            <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-24">
                                                                <i className="mdi mdi-eye" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </Tr>
                                            <Tr>
                                                <td>
                                                    <div className="avatar-group">
                                                        <React.Fragment>
                                                            <div className="avatar-group-item">
                                                                <img src={icon1} alt="" className="rounded-circle avatar-xs" />
                                                            </div>
                                                            <div className="avatar-group-item">
                                                                <img src={icon2} alt="" className="rounded-circle avatar-xs" />
                                                            </div>
                                                        </React.Fragment>
                                                    </div>
                                                </td>
                                                <td>
                                                    <h5 className="text-truncate text-dark font-size-14">Symbol</h5>
                                                    <p className="text-muted mb-0">SGD / USD</p>
                                                </td>
                                                <td>
                                                    <h5 className="text-truncate text-dark font-size-14">Interest</h5>
                                                    <p className="text-muted mb-0">9.2%</p>
                                                </td>
                                                <td>
                                                    <h5 className="text-truncate text-dark font-size-14">Tenor</h5>
                                                    <p className="text-muted mb-0">2 Year</p>
                                                </td>
                                                <td>
                                                    <h5 className="text-truncate text-dark font-size-14">Rating</h5>
                                                    <p className="text-muted mb-0">AB</p>
                                                </td>
                                                <td>
                                                    <h5 className="text-truncate text-dark font-size-14">Expiry</h5>
                                                    <p className="text-muted mb-0">04/12/23</p>
                                                </td>
                                                <td style={{ width: "45px" }}>
                                                    <div className="avatar-sm">
                                                        <Link to="/admin/deals/view">
                                                            <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-24">
                                                                <i className="mdi mdi-eye" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </Tr>
                                        </Tbody>
                                    </Table>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </React.Fragment>
    )
}

Transaction.propTypes = {
    t: PropTypes.any,
    chartsData: PropTypes.any,
    onGetChartsData: PropTypes.func,
}

export default withTranslation()(Transaction)
