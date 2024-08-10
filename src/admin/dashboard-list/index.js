import PropTypes, { element, func } from "prop-types"
import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
    Card,
    CardBody,
    Col,
    Row,
    NavItem,
    NavLink,
    Container,
    Badge,
    CardTitle,
    FormGroup,
    Input,
    InputGroup,
} from "reactstrap"
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
// import "../../assets/scss/style.css"
// import { Modal, Form, Button } from "react-bootstrap"
import { useFormik } from "formik"
import * as Yup from "yup"

import "flatpickr/dist/themes/material_blue.css"
import classnames from "classnames"

import { withTranslation } from "react-i18next"
import { adminDashboardListing } from "services/services"
import EditPhoto from "./edit"
import ViewInformation from "./view"
import { fireToast } from '../../common/toaster';
import { IMAGE_BASE_URL } from "helpers/api_helper"


const Transaction = props => {
    const API_BASE_URL = IMAGE_BASE_URL;
    console.log(IMAGE_BASE_URL, "API_BASE_URL");
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShow2, setModalShow2] = React.useState(false);
    const [photoId, setPhotoId] = useState();
    const [dashboardListing, setDashboardListing] = useState()
    const [userInfo, setUserInfo] = useState(null);
    const [userInfo2, setUserInfo2] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchList, setSearch] = useState("");
    const [activeCard, setActiveCard] = useState("A");
    console.log(activeCard, "dddddddd");
    const pageLimit = 10
    console.log(dashboardListing, "dashboardListing");

    useEffect(() => {
        getListing()
    }, [searchList])

    const getListing = async (page = 1, active = activeCard) => {
        try {
            const floor = "G"
            const resp = await adminDashboardListing(searchList, page, floor, active)
            if (resp.status == 200) {
                setDashboardListing(resp?.data?.images)
                console.log(dashboardListing, "<<<<<<<<<<<<<<<<<")
                setTotalPages(resp?.data?.totalpages);
                setCurrentPage(page)
            }
            else {
                fireToast('error', resp.error)
            }
        }
        catch (error) {
            fireToast('error', error?.response?.data?.error)
        }
    }
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            getListing(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            getListing(currentPage - 1);
        }
    };

    const startIndex = (currentPage - 1) * pageLimit + 1;

    const productList = [1, 2, 3]

    return (
        <React.Fragment>
            {/* AliasRemane component */}
            {modalShow && (
                <EditPhoto userInfo={userInfo} show={modalShow} onHide={() => setModalShow(false)} />
            )}
            {modalShow2 && (
                <ViewInformation userInfo={userInfo2} show={modalShow2} onHide={() => setModalShow2(false)} setModalShow={setModalShow} setUserInfo={setUserInfo} setModalShow2={setModalShow2} />
            )}
            <div className="page-content">
                <div className="container-fluid">
                    <Row>
                        <Col lg="12">
                            <CardBody className="border-bottom py-2">
                                <div className="d-flex align-items-center">
                                    <h5 className="mb-0 card-title flex-grow-1">
                                        PICTURE GALLERY
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
                                                    placeholder="Search Here..."
                                                    onChange={(e) => { setSearch(e.target.value) }}
                                                />
                                            </label>
                                            <i className="bx bx-search-alt search-icon"></i>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                            <div className="col-12">
                                <Card>
                                    <div className="row d-flex">




                                        <ul
                                            className="nav nav-tabs nav-tabs-custom justify-content-center pt-2"
                                            role="tablist"
                                        >
                                            <NavItem className="col-sm-2 " >
                                                <NavLink
                                                    style={{ display: 'flex', justifyContent: 'center' }}
                                                    //  className={` rounded ${activeCard == "A" ? 'bg-white text-dark' : ' text-white'}`}
                                                    className={classnames({
                                                        active: activeCard === "A",
                                                    })}
                                                    onClick={() => { setActiveCard("A"), getListing(1, "A") }}
                                                // style={{ cursor: "pointer", backgroundColor: "#800000" }}
                                                >
                                                    Wall 1
                                                </NavLink>
                                            </NavItem>
                                            <NavItem className="col-sm-2">
                                                <NavLink
                                                    style={{ display: 'flex', justifyContent: 'center' }}
                                                    className={classnames({
                                                        active: activeCard === "B",
                                                    })}
                                                    // className={`  rounded ${activeCard == "B" ? 'bg-white text-dark' : ' text-white'}`}
                                                    onClick={() => { setActiveCard("B"), getListing(1, "B") }}
                                                // style={{ cursor: "pointer", backgroundColor: "#800000" }}
                                                >
                                                    Wall 2
                                                </NavLink>
                                            </NavItem>
                                            <NavItem className="col-sm-2" >
                                                <NavLink
                                                    style={{ display: 'flex', justifyContent: 'center' }}
                                                    className={classnames({
                                                        active: activeCard === "C",
                                                    })}
                                                    // className={`  rounded ${activeCard == "B" ? 'bg-white text-dark' : ' text-white'}`}
                                                    onClick={() => { setActiveCard("C"), getListing(1, "C") }}
                                                // style={{ cursor: "pointer", backgroundColor: "#800000" }}
                                                >
                                                    Wall 3
                                                </NavLink>
                                            </NavItem>
                                        </ul>

                                    </div>
                                </Card>


                            </div>
                            <Row>
                                {
                                    dashboardListing?.map((product, key) => (
                                        <Col xl={3} sm={6} key={"_col_" + key}>

                                            <Card
                                                onClick={() =>
                                                    history.push(
                                                        `/ecommerce-product-detail/123`
                                                    )
                                                }
                                            >
                                                <CardBody >
                                                    <div className="product-img position-relative  mt-3" >
                                                        <img src={API_BASE_URL + product?.photo} alt="" className="img-fluid mx-auto d-block" style={{ width: '180px', height: '180px' }} />

                                                        <div className="avatar-sm product-ribbon">

                                                            <span className="avatar-title rounded-circle font-size-15"
                                                                style={{ opacity: 0.8, cursor: "pointer" }}
                                                                onClick={() => { setModalShow2(true); setUserInfo2(product) }}
                                                                onMouseEnter={() => { setModalShow2(true); setUserInfo2(product) }}
                                                            // onMouseLeave={()=>{ setModalShow2(false)}}
                                                            >
                                                                <i className="mdi mdi-eye"></i>
                                                            </span>

                                                        </div>
                                                    </div>
                                                    <div className="mt-4">
                                                        <h5 className="mb-1 text-truncate text-dark">
                                                            {/* <Link
                                                                    to={"/ecommerce-product-detail/" + "1232"}
                                                                    className="text-dark"
                                                                > */}
                                                            {product?.name}
                                                            {/* </Link> */}
                                                        </h5>
                                                        <div className="mt-1">
                                                            <div className="text-muted font-size-14 content-line">
                                                                <p>
                                                                    {product?.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="text-muted mb-3">

                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    ))}
                            </Row>
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