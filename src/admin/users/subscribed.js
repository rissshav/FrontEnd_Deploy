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
import { dateTimeformat } from "admin/commonFunction"
import { withTranslation } from "react-i18next"

import { alerShow, apiHeader } from "../../admin/commonFunction"
import { apiRoute } from "routes/apiRoutes"
// import { LoaderContext } from "context/ContextProvider"
import axios from "axios"
// import { toast } from "react-toastify"
import { dateformat } from "admin/commonFunction"
import Pagination, {
  bootstrap5PaginationPreset,
} from "react-responsive-pagination"

const Transaction = props => {
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
  const [searchEmail, setSearchEmail] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [loaderStatus, setLoaderStatus] = useState(true)
  let [incermentInd, setIncrementInd] = useState(1)
  const perPage = 10

  const obj = JSON.parse(localStorage.getItem("authUser"))

  //fetch users
  const fetchData = (pagenumber, pagelimit, searchEmail = "") => {
    try {
      setLoaderStatus(true)
      axios
        .get(
          apiRoute.subscribedUser+`?page=${pagenumber}&limit=${pagelimit}&search=${searchEmail}`,
          {
            headers: { Authorization: obj?.accessToken },
          }
        )
        .then(res => {
          console.log(res, "user listing >>>>>>")
          setData(res.data.data.items)

          let pageCount = Math.ceil(res.data.data.totalItems / perPage)

          console.log(pageCount, "pageCount <>>>>>>>>>>>>>>>>>")
          setTotalCount(pageCount)
          setLoaderStatus(false)
        })
    } catch (err) {
      setLoaderStatus(false)
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData(currentPage, perPage)
  }, [])

  const handlePageClick = page => {
    setCurrentPage(page)
    fetchData(page, perPage, searchEmail)
  }

  const handleSearchClick = event => {
    setSearchEmail(event.target.value)
    setCurrentPage(1)
    fetchData(1, perPage, event.target.value, statusFilter)
  }

  const handleStatusFilter = e => {
    console.log(e.target.value)
    setStatusFilter(e.target.value)
    if (e.target.value != "") {
      fetchData(1, perPage, "", e.target.value)
    } else {
      fetchData(1, perPage)
    }
  }
  const [modal, setmodal] = useState(false)
  const toggleModal = () => {
    setmodal(!modal)
  }
  //register user
  const handleSubmit = values => {
    console.log(values, "ac")
    const data = new FormData()
    for (const key in values) {
      data.append(key, values[key])
    }
    setloading(true)
    // try {
    //   axios
    //     .post(apiRoute.registerUser, data)
    //     .then(res => {
    //       console.log(res.data.message, "jhkkl;")
    //       setloading(false)
    //       toast.success(res.data.message)
    //       toggleModal()
    //       fetchData(1, perPage)
    //     })
    //     .catch(err => {
    //       console.log(err, "gfhgjkjlk")
    //       setloading(false)
    //       toast.error(err.response.data.error)
    //     })
    // } catch (err) {
    //   console.log(err, "hkjhkjkh")
    //   setloading(false)
    //   toast.error("An error occurred !")
    // }
  }
  

  const deleteUser = user_id => {
    // try {
    //   axios.delete(apiRoute.deleteUser + `?userID=${user_id}`).then(res => {
    //     console.log(res)
    //     toast.success("User Deleted Successfully")
    //     fetchData(1, perPage)
    //   })
    // } catch (err) {
    //   console.log(err)
    //   toast.error("An error occurred !")
    // }
  }

  //delete Job
  const ConfirmDeleteUser = userId => {
    // let URL = BASE_URL + "user/delete/" + userId
    Swal.fire({
      title: "Are you sure?",
      text: "you want to delete this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(result => {
      if (result.isConfirmed) {
        // deleteUser(userId)
      }
    })
  }

  const handleChangeCheck = async event => {
    console.log(event, "fghjkl", event.target.id)

    let id = event.target.id
    let active = event.target.checked

    await axios
      .post(
      apiRoute.subscribedStatus,
        { id, active },
        {
          headers: { Authorization: obj?.accessToken },
        }
      )
      .then(function (response) {
        if (active) {
          alerShow("User Active Successfully")
        } else {
          alerShow("User Inactive Successfully")
        }
      })
      .catch(function (error) {
        // toast.error(error.response.data.error)
        alerShow("Error")
      })
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
      profileImg: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("name is required"),
      email: Yup.string().required("email is required"),
      password: Yup.string().required("password is required"),
      confirmpassword: Yup.string()
        .required("confirm password is required")
        .oneOf([Yup.ref("password"), null], "passwords must match"),
      profileImg: Yup.mixed().required("profile image is required."),
    }),
    onSubmit: values => {
      handleSubmit(values)
    },
  })
  useEffect(() => {
    formik.resetForm()
  }, [modal])

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Row>
            <Col lg="12">
              <Card>
                <CardBody className="border-bottom py-2">
                  <div className="d-flex align-items-center">
                    <h5 className="mb-0 card-title flex-grow-1">
                      Subscribed Users{" "}
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
                            onChange={handleSearchClick}
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
                        <Th>Sr. No.</Th>

                        <Th>Email ID</Th>
                        <Th>Created At</Th>
                        <Th>Status</Th>
                        {/* <Th>Action</Th> */}
                      </Tr>
                    </Thead>
                    <Tbody>
                      {loaderStatus ? (
                        <Tr className="d-none">
                          <Td colSpan="6"> Loading ... </Td>
                        </Tr>
                      ) : listingData?.length != 0 ? (
                        listingData?.map((element, index) => {
                          currentPage > 1
                            ? (incermentInd = (currentPage - 1) * perPage + 1)
                            : 0
                          return (
                            <tr key={index}>
                              <td>
                                <span className="co-name">
                                  {" "}
                                  {incermentInd + index}{" "}
                                </span>
                              </td>

                              <td>{element.email}</td>
                              <td>{dateTimeformat(element.createdAt)}</td>
                              <div className="square-switch mytoggle">
                                <input
                                  type="checkbox"
                                  id={element._id}
                                  switch="success"
                                  defaultChecked={element.isActive}
                                  onChange={handleChangeCheck}
                                />
                                <label
                                  htmlFor={element._id}
                                  data-on-label="Active"
                                  data-off-label="Inactive"
                                />
                              </div>
                            </tr>
                          )
                        })
                      ) : (
                        <tr>
                          <td colSpan={12} style={{ textAlign: "center" }}>
                            No Records Found
                          </td>
                        </tr>
                      )}
                    </Tbody>
                  </Table>

                  <Row className="mt-2">
                    <Col md={9}></Col>
                    <Col md={3}>
                      <Pagination
                        {...bootstrap5PaginationPreset}
                        current={currentPage}
                        total={totalCount}
                        onPageChange={page => handlePageClick(page)}
                        className="pagination justify-content-end"
                      />
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

Transaction.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
}

export default withTranslation()(Transaction)
