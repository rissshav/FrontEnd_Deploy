// import PropTypes, { element, func } from "prop-types"
// import React, { useContext, useEffect, useRef , useState } from "react"
// import { Link } from "react-router-dom"
// import {
//     Card,
//     CardBody,
//     Col,
//     Row,
//     NavItem,
//     NavLink,
//     Container,
//     Badge,
//     CardTitle,
//     FormGroup,
//     Input,
//     InputGroup,
// } from "reactstrap"
// import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
// // import "../../assets/scss/style.css"
// // import { Modal, Form, Button } from "react-bootstrap"
// import { useFormik } from "formik"
// import * as Yup from "yup"

// import "flatpickr/dist/themes/material_blue.css"
// import classnames from "classnames"

// import { withTranslation } from "react-i18next"
// import { adminDashboardListing, modelslistingimages } from "services/services"
// // import EditPhoto from "./edit"
// // import ViewInformation from "./view"
// import { fireToast } from "common/toaster"
// import { IMAGE_BASE_URL } from "helpers/api_helper"
// import ViewDescription from "./descriptionmodal"


// const Viewmodel = props => {
//     const API_BASE_URL = IMAGE_BASE_URL;
//     console.log(IMAGE_BASE_URL, "API_BASE_URL");
//     const [modalDescription, setModalDescription] = React.useState(false);
//     const [modalInfo, setModalInfo] = useState(null);
//     const [modalShow, setModalShow] = React.useState(false);
//     const [modalShow2, setModalShow2] = React.useState(false);
//     const [photoId, setPhotoId] = useState();
//     const [dashboardListing, setDashboardListing] = useState()
//     const [userInfo, setUserInfo] = useState(null);
//     const [userInfo2, setUserInfo2] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [searchList, setSearch] = useState("");
//     const [activeCard, setActiveCard] = useState("A");
//     const audioRefs = useRef({});

//     console.log(activeCard, "dddddddd");
//     const pageLimit = 10
//     console.log(dashboardListing, "dashboardListing");

//     const audioRef = useRef(null);

//     const playAudio = (audioId) => {
//         const audio = audioRefs.current[audioId];
//         if (audio) {
//             console.log("Audio source:", audio.src);
//             audio.play().catch(error => {
//                 console.error("Playback error:", error);
//             });
//         } else {
//             console.error("Audio ref not set");
//         }
//     };

//     useEffect(() => {
//         getListing()
//     }, [searchList])

//     const getListing = async (page = 1 ) => {
//         try {
//             console.log("heyyyyy")
//             const resp = await modelslistingimages(searchList, page)
//             console.log(resp,"<<<<<<")
//             if (resp.status == 200) {
//                 setDashboardListing(resp?.data?.models)
//                 console.log(dashboardListing, "<<<<<<<<<<<<<<<<<")
//                 setTotalPages(resp?.data?.totalpages);
//                 setCurrentPage(page)
//             }
//             else {
//                 fireToast('error', resp.error)
//             }
//         }
//         catch (error) {
//             fireToast('error', error?.response?.data?.error)
//         }
//     }
//     const handleNextPage = () => {
//         if (currentPage < totalPages) {
//             getListing(currentPage + 1);
//         }
//     };

//     const handlePreviousPage = () => {
//         if (currentPage > 1) {
//             getListing(currentPage - 1);
//         }
//     };

//     const startIndex = (currentPage - 1) * pageLimit + 1;

//     const productList = [1, 2, 3]

//     return (
//         <React.Fragment>
//             {modalDescription && (
//                 <ViewDescription  modalInfo={modalInfo} show={modalDescription} onHide={() => setModalDescription(false)} />
//             )}
//             {/* {modalAdd && (
//                 <Addbanner getListing={() => { getListing() }} addInfo={addInfo} show={modalAdd} onHide={() => setModalAdd(false)} />
//             )} */}
//             <div className="page-content">
//                 <div className="container-fluid">
//                     <Row>
//                         <Col lg="12">
//                             <CardBody className="border-bottom py-2">
//                                 <div className="d-flex align-items-center">
//                                     <h5 className="mb-0 card-title flex-grow-1">
//                                         MODEL GALLERY
//                                     </h5>

//                                     <div className="search-box me-xxl-2 my-3 my-xxl-0 d-inline-block">
//                                         <div
//                                             className="position-relative"
//                                             style={{ marginTop: "10px" }}
//                                         >
//                                             <label htmlFor="search-bar-0" className="search-label">
//                                                 <span id="search-bar-0-label" className="sr-only">
//                                                     Search this table
//                                                 </span>
//                                                 <input
//                                                     id="search-bar-0"
//                                                     type="text"
//                                                     className="form-control"
//                                                     placeholder="Search Here..."
//                                                     onChange={(e) => { setSearch(e.target.value) }}
//                                                 />
//                                             </label>
//                                             <i className="bx bx-search-alt search-icon"></i>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </CardBody>

//                             <Row>
//                                 {
//                                     dashboardListing?.map((product, key) => (

//                                         <Col xl={3} sm={6} key={"_col_" + key}>

//                                             <Card>
//                                                         <div className="avatar-sm product-ribbon"> 

//                                                             <span className="avatar-title rounded-circle font-size-15 ms-1"
//                                                                 style={{ opacity: 0.8, cursor: "pointer",marginRight: "2px" }}
//                                                                 onClick={() => { playAudio((product._id)) }}

//                                                             >
//                                                                 <i className="mdi mdi-volume-high"></i>
//                                                             </span>
//                                                             <span className="avatar-title rounded-circle font-size-15"
//                                                                 style={{ opacity: 0.8, cursor: "pointer" }}
//                                                                 onClick={() => { setModalDescription(true); setModalInfo(product) }}
//                                                             //     onMouseEnter={() => { setModalShow2(true); setUserInfo2(product) }}
//                                                             // onMouseLeave={()=>{ setModalShow2(false)}}
//                                                             >
//                                                                 <i className="mdi mdi-eye"></i>
//                                                             </span>
//                                                             <audio ref={el => (audioRefs.current[product._id] = el)} src={API_BASE_URL + product?.audio}></audio>

//                                                             {/* <audio ref={audioRef} src={API_BASE_URL + product?.audio}></audio> */}



//                                                         </div> 

//                                                 <CardBody >
//                                                 <h6 className="mb-1 text-truncate text-dark">
//                                                         {product?.name}
//                                                     </h6>
//                                                     <hr style={{border: '0.1px solid black' ,width: '100%'}} />
//                                                     <div className="product-img position-relative  mt-3" >
//                                                         <img src={API_BASE_URL + product?.thumbnail} alt="" className="img-fluid mx-auto d-block" style={{ width: '180px', height: '180px' }} />

//                                                         {/* <div className="avatar-sm product-ribbon"> 

//                                                             <span className="avatar-title rounded-circle font-size-15"
//                                                                 style={{ opacity: 0.8, cursor: "pointer" }}
//                                                                 onClick={() => { setModalShow2(true); setUserInfo2(product) }}
//                                                                 onMouseEnter={() => { setModalShow2(true); setUserInfo2(product) }}
//                                                             onMouseLeave={()=>{ setModalShow2(false)}}
//                                                             >
//                                                                 <i className="mdi mdi-volume-high"></i>
//                                                             </span>

//                                                         </div> */}
//                                                     </div>
//                                                     <div className="mt-4 ">
//                                                         {/* <h5 className="mb-1 text-truncate text-dark"> */}
//                                                             {/* <Link
//                                                                     to={"/ecommerce-product-detail/" + "1232"}
//                                                                     className="text-dark"
//                                                                 > */}
//                                                              {/* {product?.description}  */}
//                                                             {/* </Link> */}
//                                                          {/* </h5> */}
//                                                         {/* <div className="mt-1"> 
//                                                             <div className="text-muted font-size-14 content-line">
//                                                                 <p>
//                                                                     {product?.description}
//                                                                 </p>
//                                                             </div>
//                                                         </div>
//                                                         <div className="text-muted mb-3"> */}
//                                                             <div className="text-muted font-size-14 content-line">
//                                                                 <p>
//                                                                     {product?.description}
//                                                                 </p>
//                                                             </div>

//                                                         </div> 
//                                                     {/* </div>  */}
//                                                 </CardBody>
//                                             </Card>
//                                         </Col>
//                                     ))}
//                             </Row>
//                             <Row className="mt-2">
//                     {/* <Col md={9}></Col> */}
//                     <Col md={3}>
//                       {/* <Pagination
//                         {...bootstrap5PaginationPreset}
//                         current={currentPage}
//                         total={totalCount}
//                         onPageChange={page => handlePageClick(page)}
//                         className="pagination justify-content-end"
//                       /> */}
//                       <div className="">
//                         {/* {supportList?.length > 10 && ( */}
//                         <a>
//                           <button
//                             className="btn btn-primary"
//                             onClick={handlePreviousPage}
//                             disabled={currentPage === 1}
//                           >
//                             Previous 
//                           </button>
//                           <span > {currentPage}   </span>
//                           <button
//                             className="btn btn-primary"
//                             onClick={handleNextPage}
//                             disabled={currentPage === totalPages}
//                           >
//                             Next
//                           </button>

//                         </a>
//                         {/* )}  */}
//                       </div>
//                     </Col>
//                   </Row>
//                         </Col>
//                     </Row>
//                 </div>
//             </div>
//         </React.Fragment>
//     )
// }

// Viewmodel.propTypes = {
//     t: PropTypes.any,
//     chartsData: PropTypes.any,
//     onGetChartsData: PropTypes.func,
// }

// export default withTranslation()(Viewmodel)

import PropTypes, { element, func } from "prop-types"
import React, { useContext, useEffect, useRef, useState } from "react"
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
import { adminDashboardListing, modelslistingimages } from "services/services"
// import EditPhoto from "./edit"
// import ViewInformation from "./view"
import { fireToast } from "common/toaster"
import { IMAGE_BASE_URL } from "helpers/api_helper"
import ViewDescription from "./descriptionmodal"


const Viewmodel = props => {
    const API_BASE_URL = IMAGE_BASE_URL;
    console.log(IMAGE_BASE_URL, "API_BASE_URL");
    const [modalDescription, setModalDescription] = React.useState(false);
    const [modalInfo, setModalInfo] = useState(null);
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
    const audioRefs = useRef({});
    const [playingAudioId, setPlayingAudioId] = useState(null);


    console.log(activeCard, "dddddddd");
    const pageLimit = 10
    console.log(dashboardListing, "dashboardListing");

    const audioRef = useRef(null);

    const playAudio = (audioId) => {
        const audio = audioRefs.current[audioId];
        console.log(audio,"audio")
        if (audio) {
            if (playingAudioId === audioId) {
                // Stop the audio if it is currently playing
                audio.pause();
                audio.currentTime = 0; // Optional: reset to start
                setPlayingAudioId(null);
            } else {
                // Stop any currently playing audio
                if (playingAudioId) {
                    const currentAudio = audioRefs.current[playingAudioId];
                    if (currentAudio) {
                        currentAudio.pause();
                        currentAudio.currentTime = 0;
                    }
                }
                // Play the selected audio
                audio.play().catch(error => {
                    console.error("Playback error:", error);
                });
                setPlayingAudioId(audioId);
            }
        } else {
            console.error("Audio ref not set");
        }
    };

    useEffect(() => {
        getListing()
    }, [searchList])

    const getListing = async (page = 1) => {
        try {
            console.log("heyyyyy")
            const resp = await modelslistingimages(searchList, page)
            console.log(resp, "<<<<<<")
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

    const startIndex = (currentPage - 1) * pageLimit + 1;

    const productList = [1, 2, 3]

    return (
        <React.Fragment>
            {modalDescription && (
                <ViewDescription modalInfo={modalInfo} show={modalDescription} onHide={() => setModalDescription(false)} />
            )}
            {/* {modalAdd && (
                <Addbanner getListing={() => { getListing() }} addInfo={addInfo} show={modalAdd} onHide={() => setModalAdd(false)} />
            )} */}
            <div className="page-content">
                <div className="container-fluid">
                    <Row>
                        <Col lg="12">
                            <CardBody className="border-bottom py-2">
                                <div className="d-flex align-items-center">
                                    <h5 className="mb-0 card-title flex-grow-1">
                                        MODEL GALLERY
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

                            <Row>
                                {
                                    dashboardListing?.map((product, key) => (

                                        <Col xl={3} sm={6} key={"_col_" + key}>

                                            <Card>
                                                <div className="avatar-sm product-ribbon">

                                                    <span
                                                        className={classnames("avatar-title rounded-circle font-size-15", {
                                                            "text-danger": playingAudioId === product._id // Example visual indication
                                                        })}
                                                        style={{ opacity: 0.8, cursor: "pointer", marginRight: "2px" }}
                                                        onClick={() => { playAudio(product._id) }}
                                                    >
                                                        <i className={`mdi ${playingAudioId === product._id ? 'mdi-pause' : 'mdi-volume-high'}`}></i>
                                                    </span>
                                                    <span className="avatar-title rounded-circle font-size-15"
                                                        style={{ opacity: 0.8, cursor: "pointer" }}
                                                        onClick={() => { setModalDescription(true); setModalInfo(product) }}
                                                    //     onMouseEnter={() => { setModalShow2(true); setUserInfo2(product) }}
                                                    // onMouseLeave={()=>{ setModalShow2(false)}}
                                                    >
                                                        <i className="mdi mdi-eye"></i>
                                                    </span>
                                                    <audio ref={el => (audioRefs.current[product._id] = el)} src={API_BASE_URL + product?.audio}></audio>

                                                    {/* <audio ref={audioRef} src={API_BASE_URL + product?.audio}></audio> */}



                                                </div>

                                                <CardBody >
                                                    <h6 className="mb-1 text-truncate text-dark">
                                                        {product?.name}
                                                    </h6>
                                                    <hr style={{ border: '0.1px solid black', width: '100%' }} />
                                                    <div className="product-img position-relative  mt-3" >
                                                        <img src={API_BASE_URL + product?.thumbnail} alt="" className="img-fluid mx-auto d-block" style={{ width: '180px', height: '180px' }} />

                                                        {/* <div className="avatar-sm product-ribbon"> 

                                                            <span className="avatar-title rounded-circle font-size-15"
                                                                style={{ opacity: 0.8, cursor: "pointer" }}
                                                                onClick={() => { setModalShow2(true); setUserInfo2(product) }}
                                                                onMouseEnter={() => { setModalShow2(true); setUserInfo2(product) }}
                                                            onMouseLeave={()=>{ setModalShow2(false)}}
                                                            >
                                                                <i className="mdi mdi-volume-high"></i>
                                                            </span>

                                                        </div> */}
                                                    </div>
                                                    <div className="mt-4 ">
                                                        {/* <h5 className="mb-1 text-truncate text-dark"> */}
                                                        {/* <Link
                                                                    to={"/ecommerce-product-detail/" + "1232"}
                                                                    className="text-dark"
                                                                > */}
                                                        {/* {product?.description}  */}
                                                        {/* </Link> */}
                                                        {/* </h5> */}
                                                        {/* <div className="mt-1"> 
                                                            <div className="text-muted font-size-14 content-line">
                                                                <p>
                                                                    {product?.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="text-muted mb-3"> */}
                                                        <div className="text-muted font-size-14 content-line">
                                                            <p>
                                                                {product?.description}
                                                            </p>
                                                        </div>

                                                    </div>
                                                    {/* </div>  */}
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    ))}
                            </Row>
                            <Row className="mt-2">
                                {/* <Col md={9}></Col> */}
                                <Col md={3}>
                                    {/* <Pagination
                        {...bootstrap5PaginationPreset}
                        current={currentPage}
                        total={totalCount}
                        onPageChange={page => handlePageClick(page)}
                        className="pagination justify-content-end"
                      /> */}
                                    <div className="">
                                        {/* {supportList?.length > 10 && ( */}
                                        <a>
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
                                        {/* )}  */}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        </React.Fragment>
    )
}

Viewmodel.propTypes = {
    t: PropTypes.any,
    chartsData: PropTypes.any,
    onGetChartsData: PropTypes.func,
}

export default withTranslation()(Viewmodel)