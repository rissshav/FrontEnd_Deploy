import PropTypes, { element, func } from "prop-types"
import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
    Button,
    Card,
    CardBody,
    CardTitle,
    Col,
    Container,
    Form,
    Input,
    Label,
    Row,
} from "reactstrap";

import "flatpickr/dist/themes/material_blue.css"
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { withTranslation } from "react-i18next"


const Transaction = props => {

    const options = [
        { value: "AK", label: "Alaska" },
        { value: "HI", label: "Hawaii" },
        { value: "CA", label: "California" },
        { value: "NV", label: "Nevada" },
        { value: "OR", label: "Oregon" },
        { value: "WA", label: "Washington" },
    ]

    return (
        <React.Fragment>
            <div className="page-content">

                <Row>
                    <Col xs="12">
                        <Card>
                            <CardBody>
                                <CardTitle>Add Bond</CardTitle>
                                <p className="card-title-desc mb-4">
                                    Fill all information below
                                </p>

                                <Form>
                                    <Row>
                                        <Col sm="6">
                                            <Label htmlFor="productname">Bond Name</Label>
                                            <Input
                                                id="productname"
                                                name="productname"
                                                type="text"
                                                className="form-control"
                                                placeholder="Write here..."
                                            />
                                        </Col>
                                        <Col sm="6">
                                            <Label htmlFor="manufacturername"> Bond Symbol </Label>
                                            <Input
                                                id="manufacturername"
                                                name="manufacturername"
                                                type="text"
                                                className="form-control"
                                                placeholder="Write here..."
                                            />
                                        </Col>
                                        <Col sm="6" className="mt-3">
                                            <Label htmlFor="maturity">Maturity</Label>
                                            <Input
                                                id="maturity"
                                                name="maturity"
                                                type="date"
                                                className="form-control"
                                                placeholder="Write here..."
                                            />
                                        </Col>
                                        <Col sm="6" className="mt-3">
                                            <Label htmlFor="payment_token">Payment Token</Label>
                                            <Input
                                                id="payment_token"
                                                name="payment_token"
                                                type="text"
                                                className="form-control"
                                                placeholder="Write here..."
                                            />
                                        </Col>
                                        <Col sm="6" className="mt-3">
                                            <Label htmlFor="colletral_token">Colletral Token</Label>
                                            <Input
                                                id="colletral_token"
                                                name="colletral_token"
                                                type="text"
                                                className="form-control"
                                                placeholder="Write here..."
                                            />
                                        </Col>
                                        <Col sm="6" className="mt-3">
                                            <Label htmlFor="colletral_ratio">Colletral Ratio</Label>
                                            <Input
                                                id="colletral_ratio"
                                                name="colletral_ratio"
                                                type="text"
                                                className="form-control"
                                                placeholder="Write here..."
                                            />
                                        </Col>
                                        <Col sm="6" className="mt-3">
                                            <Label htmlFor="covertible_ration">Covertible Ration</Label>
                                            <Input
                                                id="covertible_ration"
                                                name="covertible_ration"
                                                type="text"
                                                className="form-control"
                                                placeholder="Write here..."
                                            />
                                        </Col>
                                        <Col sm="6" className="mt-3">
                                            <Label htmlFor="max_supply">Max Supply</Label>
                                            <Input
                                                id="max_supply"
                                                name="max_supply"
                                                type="number"
                                                className="form-control"
                                                placeholder="Write here..."
                                            />
                                        </Col>
                                        <Col sm="6" className="mt-3">
                                            <Label htmlFor="yield">Yield</Label>
                                            <Input
                                                id="yield"
                                                name="yield"
                                                type="number"
                                                className="form-control"
                                                placeholder="Write here..."
                                            />
                                        </Col>

                                    </Row>
                                    <div className="d-flex flex-wrap gap-2 mt-4">
                                        <Button type="button" color="primary" className="btn ">
                                            Create Now
                                        </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>

                    </Col>
                </Row>

            </div>
        </React.Fragment >
    )
}

Transaction.propTypes = {
    t: PropTypes.any,
    chartsData: PropTypes.any,
    onGetChartsData: PropTypes.func,
}

export default withTranslation()(Transaction)
