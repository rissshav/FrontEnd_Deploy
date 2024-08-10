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
import Usersmodel from "./usersmodel"
import Edituser from "./edituser"
import Deleteuser from "./deleteuser"
// import "../../assets/scss/style.css"
// import { Modal, Form, Button } from "react-bootstrap"
import { useFormik } from "formik"
import * as Yup from "yup"
import { IMAGE_BASE_URL } from "helpers/api_helper"

import "flatpickr/dist/themes/material_blue.css"

import { withTranslation } from "react-i18next"

import { apiRoute } from "routes/apiRoutes"
// import { LoaderContext } from "context/ContextProvider"
import axios from "axios"
// import { toast } from "react-toastify"
import { dateformat, dateTimeformat } from "admin/commonFunction"
import Pagination, {
  bootstrap5PaginationPreset,
} from "react-responsive-pagination"
import { viewusers } from "services/services"
import { fireToast } from "common/toaster"

const View = props => {
  // const {
  //   Add,
  //   Edit,
  //   showEdit,
  //   handleShow,
  //   handelShow1,
  //   handleClose,
  //   setloading,
  // } = useContext(LoaderContext)

  document.title = "Users"
  const BASE_URL = process.env.REACT_APP_BASE_URL
  const [dateFilter, setDateFilter] = useState([])
  const [listingData, setData] = useState([])
  const [searchName, setSearchName] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [loaderStatus, setLoaderStatus] = useState(true)
  let [incermentInd, setIncrementInd] = useState(1)
  const [modalShow, setModalShow] = React.useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [modalShowEdit, setModalShowEdit] = React.useState(false);
  const [userInfoEdit, setUserInfoEdit] = useState(null);
  const [modalShowDel, setModalShowDel] = React.useState(false);
  const [userInfoDel, setUserInfoDel] = useState(null);

  const pagelimit = 10

  const formatDate = (dateString) => {
    if (!dateString) {
      return "";  // Or any default value you prefer
    }
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      //   timeZoneName: 'short',
      timeZone: 'GMT',
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
    return formattedDate;

  };

  //fetch users
  const getListing = async (pagenumber = 1) => {
    try {
      console.log(searchName, pagenumber, pagelimit, ">>>>>>>")
      const resp = await viewusers(searchName, pagenumber, pagelimit)
      console.log(resp.data.users, "response......")
      console.log(resp.data.totalItems, pagelimit, "?????????")
      const pages = Math.ceil(Number(resp.data.totalItems) / Number(pagelimit))
      console.log(pages, "<<<<<")
      console.log(resp.status, "status")
      console.log(totalCount, pages, "totalcountb4")
      if (resp.status == 200) {
        setData(resp.data.users)
        setTotalCount(pages)
        console.log(pages, totalCount, "pages")
        setCurrentPage(pagenumber)
      }
      else {
        fireToast('error', resp.error)
      }


      // axios
      //   .get(
      //      apiRoute.waitListUsers+`?page=${pagenumber}&limit=${pagelimit}&search=${searchName}`
      //   )
      //   .then(res => {
      //     console.log(res, "user listing >>>>>>")
      //     setData(res.data.data.items)

      //     let pageCount = Math.ceil(res.data.data.totalItems / perPage)
      //     setTotalCount(pageCount)
      //     console.log(totalCount, "totalCount")
      // setData([{name:"av",email:"adbadk",createdAt:"23712"},{name:"av",email:"adbadk",createdAt:"23712"},{name:"av",email:"adbadk",createdAt:"23712"}])
      //       setLoaderStatus(false)
      // })
    } catch (err) {
      fireToast('error', err?.response?.data?.error)
      setLoaderStatus(false)
      console.log(err)
    }
  }

  useEffect(() => {
    getListing()
  }, [searchName])

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      getListing(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    console.log(currentPage, totalCount, "<<<<<")
    if (currentPage < totalCount) {
      getListing(currentPage + 1);
    }
  };






  const [modal, setmodal] = useState(false)
  const startIndex = (currentPage - 1) * pagelimit + 1;



  return (
    <React.Fragment>

      {modalShow && (
        <Usersmodel userInfo={userInfo} show={modalShow} onHide={() => setModalShow(false)} />
      )}
      {modalShowEdit && (
        <Edituser userInfo={userInfoEdit} show={modalShowEdit} onHide={() => setModalShowEdit(false)} />
      )}
      {modalShowDel && (
        <Deleteuser userInfo={userInfoDel} show={modalShowDel} onHide={() => setModalShowDel(false)} />
      )}

      <div className="page-content">
        <div className="container-fluid">
          <Row>
            <Col lg="12">
              <Card>
                <CardBody className="border-bottom py-2">
                  <div className="d-flex align-items-center">
                    <h5 className="mb-0 card-title flex-grow-1">
                      {" "}
                      Users List{" "}
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
                            onChange={(e) => { setSearchName(e.target.value) }}
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
                    <Thead>
                      <Tr>
                        <Th style={{ width: '15%' }}>Sr. No.</Th>
                        <Th style={{ width: '25%' }}>User ID</Th>
                        <Th style={{ width: '15%' }}>Created At</Th>
                        <Th style={{ width: '15%' }}>Model</Th>
                        <Th style={{ width: '15%' }}>Edit</Th>
                        <Th style={{ width: '15%' }}>Delete</Th>

                      </Tr>
                    </Thead>
                    {listingData.length === 0 ? (
                      <p>No Data Found</p>
                    ) : (
                      <Tbody>
                        {
                          listingData?.map((element, index) => (


                            <tr key={index}>
                              <td>{startIndex + index}</td>
                              {/* <td>
                                <span className="co-name">
                                  {" "}
                                  {incermentInd + index}{" "}
                                </span>
                              </td> */}

                              <td>{element?.userid}</td>
                              <td>{formatDate(element?.createdAt)}</td>
                              {/* <td>
                                <div className="d-flex align-items-center">
                                  <div className="avatar-xs rounded-circle align-self-center" >
                                    {/* <h5 className="font-size-14">
                                      {element?.model}
                                    </h5> */}
                              {/* <img src={IMAGE_BASE_URL + element?.model} alt="" className="img-fluid mx-auto d-block" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center'}}/>
                                  </div>
                                </div>
                              </td>  */}
                              <td style={{ width: "45px" }}>
                                <div className="avatar-sm">
                                
                                    <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-24"
                                        style={{ opacity: 0.8, cursor: "pointer" }}
                                        onClick={() => { setModalShow(true); setUserInfo(element) }}
                                        >
                                      <i className="mdi mdi-eye" />
                                    </span>
                                    
                                  
                                </div>
                              </td>
                              <td style={{ width: "45px" }}>
                                <div className="avatar-sm">
                                <Link to={`/edituser/${element._id}`}>
                                  <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-24"
                                      style={{ opacity: 0.8, cursor: "pointer" }}
                                      // onClick={() => { setModalShowEdit(true); setUserInfoEdit(element) }}
                                      >
                                    <i className="mdi mdi-account-edit" />
                                  </span>
                                  </Link>
                                
                              </div>   
                              </td>
                              <td style={{ width: "45px" }}>
                                <div className="avatar-sm">
                                  
                                    <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-24"
                                        style={{ opacity: 0.8, cursor: "pointer" }}
                                        onClick={() => { setModalShowDel(true); setUserInfoDel(element) }}
                                        >
                                      <i className="mdi mdi-delete-circle" />
                                    </span>
                                  
                                </div>
                              </td>
                            </tr>
                          ))
                        }
                      </Tbody>
                    )}

                  </Table>

                  <Row className="mt-2">
                    <Col md={9}></Col>
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
                            disabled={currentPage === totalCount}
                          >
                            Next
                          </button>

                        </a>
                        {/* )}  */}
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  )
}

View.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
}

export default withTranslation()(View)