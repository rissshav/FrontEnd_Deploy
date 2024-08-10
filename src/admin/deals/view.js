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
    
    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container-fluid">

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
