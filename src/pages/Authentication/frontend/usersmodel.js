import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import { IMAGE_BASE_URL } from "helpers/api_helper"
import {
    Card,
    CardBody,
    CardText,
    Col,
    Row,
} from "reactstrap";
import { Link } from "react-router-dom"
import moment from "moment"
import { withTranslation } from "react-i18next"
import { adminDashboardListing, modelslistingimages, getusersmodels } from "services/services"
// import EditPhoto from "./edit"
// import ViewInformation from "./view"
import { fireToast } from "common/toaster"

const Usersmodel = ({ userInfo, show, onHide }) => {

    // const { photoId } = props;
    console.log("heyyyy")
    const [detail, setDetail] = useState({ ...userInfo });
    console.log(detail,"detail>")
    const API_BASE_URL = IMAGE_BASE_URL;
    console.log(IMAGE_BASE_URL, "API_BASE_URL");
    const [modalShow, setModalShow] = React.useState(false);
    // const [modalShow2, setModalShow2] = React.useState(false);
    const [photoId, setPhotoId] = useState();
    const [dashboardListing, setDashboardListing] = useState()
    // const [userInfo, setUserInfo] = useState(null);
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

    const getListing = async (page = 1 ) => {
        try {
            console.log("heyyyyy",userInfo)
            const resp = await getusersmodels(searchList, page,userInfo?.userid)
            console.log(resp,"<<<<<<")
            if (resp.status == 200) {
                setDashboardListing(resp?.data?.models)
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

    console.log(detail, onHide, show, "detail on viw new")
    // const [file, setFile] = useState()
    console.log(userInfo, "<<-- userInfo")

    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                style={{ height: "100%" }}
                className='img-view-modal'
            >
                <Modal.Header closeButton className=''>
                    Models
                </Modal.Header>

                <Modal.Body >
                    {/* <div className="my-1 image-view">
                        <img
                            src={API_BASE_URL + detail?.photo}
                            alt=""
                            className="img-thumbnail mx-auto d-block"
                        />

                        <span className="span-icon font-size-15" role='button' onClick={() => { setModalShow2(false); setUserInfo(detail); setModalShow(true) }}>
                            <i className="mdi mdi-pencil"></i>
                        </span>
                    </div> */}

                    {/* <div className="mt-4 mx-1 mb-4">
                        <h4>{detail?.name}</h4>
                        <div className="text-muted font-size-14">
                            <p>
                                {detail?.description}
                            </p>
                        </div>
                    </div> */}

                    {/* <div className="text-center pt-2">
                        <Row>
                            <Col sm={4}>
                                <div>
                                    <p className="text-muted mb-2">Unique ID</p>
                                    <h5 className="font-size-15">{detail?.photo_id}</h5>
                                </div>
                            </Col>
                            <Col sm={4}>
                                <div className="mt-4 mt-sm-0">
                                    <p className="text-muted mb-2">Creation Date</p>
                                    <h5 className="font-size-15">{moment(detail?.date_of_creation).format('LL')}</h5>
                                </div>
                            </Col>
                            <Col sm={4}>
                                <div className="mt-4 mt-sm-0">
                                    <p className="text-muted mb-2">Created by</p>
                                    <h5 className="font-size-15">{detail?.artist_name}</h5>
                                </div>
                            </Col>
                        </Row>
                    </div> */}

                    {/* <div className="col-12 w-100 d-flex justify-content-center d-none">

                        <button
                            className="btn "
                            // onClick={handlePreviousPage}
                            // disabled={currentPage === 1}
                            style={{ background: '#800000', color: 'white' }}
                            onClick={() => { setModalShow2(false); setUserInfo(detail); setModalShow(true) }}
                        >
                            Edit
                        </button>
                    </div> */}

                    {/* <div className="page-content"> */}
                        <div className="container-fluid">
                            <Row>
                                <Col lg="12">
                                    <CardBody className="border-bottom py-2">
                                        <div className="d-flex align-items-center">
                                            <h5 className="mb-0 card-title flex-grow-1">
                                                MODEL GALLERY
                                            </h5>

                                            {/* <div className="search-box me-xxl-2 my-3 my-xxl-0 d-inline-block">
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
                                            </div> */}
                                        </div>
                                    </CardBody>

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
                                                                <img src={API_BASE_URL + product?.thumbnail} alt="" className="img-fluid mx-auto d-block" style={{ width: '180px', height: '180px' }} />

                                                                {/* <div className="avatar-sm product-ribbon"> */}

                                                                {/* <span className="avatar-title rounded-circle font-size-15"
                                                                style={{ opacity: 0.8, cursor: "pointer" }}
                                                                onClick={() => { setModalShow2(true); setUserInfo2(product) }}
                                                                onMouseEnter={() => { setModalShow2(true); setUserInfo2(product) }} */}
                                                                {/* onMouseLeave={()=>{ setModalShow2(false)}} */}
                                                                {/* >
                                                                <i className="mdi mdi-eye"></i>
                                                            </span> */}

                                                                {/* </div> */}
                                                            </div>
                                                            <div className="mt-4 ">
                                                                <h5 className="mb-1 text-truncate text-dark">
                                                                    {/* <Link
                                                                    to={"/ecommerce-product-detail/" + "1232"}
                                                                    className="text-dark"
                                                                > */}
                                                                    {product?.name}
                                                                    {/* </Link> */}
                                                                </h5>
                                                                {/* <div className="mt-1">
                                                            <div className="text-muted font-size-14 content-line">
                                                                <p>
                                                                    {product?.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="text-muted mb-3"> */}

                                                            </div>
                                                            {/* </div>  */}
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            ))}
                                    </Row>
                                    {/* <Row className="mt-2"> */}
                                        {/* <Col md={9}></Col> */}
                                        {/* <Col md={3}> */}
                                            {/* <Pagination
                        {...bootstrap5PaginationPreset}
                        current={currentPage}
                        total={totalCount}
                        onPageChange={page => handlePageClick(page)}
                        className="pagination justify-content-end"
                      /> */}
                                            {/* <div className=""> */}
                                                {/* {supportList?.length > 10 && ( */}
                                                {/* <a>
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={handlePreviousPage}
                                                        disabled={currentPage === 1}
                                                    >
                                                        Previous
                                                    </button>
                                                    <span > {currentPage}   </span>
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={handleNextPage}
                                                        disabled={currentPage === totalPages}
                                                    >
                                                        Next
                                                    </button>

                                                </a>
                                               
                                            </div> */}
                                        {/* </Col> */}
                                    {/* </Row> */}
                                </Col>
                            </Row>
                        </div>
                    {/* </div> */}

                </Modal.Body>
            </Modal>
        </>
    )
}

export default Usersmodel
