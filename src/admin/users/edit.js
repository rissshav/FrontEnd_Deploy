import PropTypes from "prop-types"
import React, { useEffect, useState, useContext } from "react"
import { Link, useParams } from "react-router-dom"
import {
  Card,
  CardBody,
  Col,
  Row,
  Container,
  CardTitle,
  Button,
  FormFeedback,
} from "reactstrap"
import "../../assets/scss/style.css"
import { toast } from "react-toastify"
import { apiRoute } from "routes/apiRoutes"
import { LoaderContext } from "context/ContextProvider"
import axios from "axios"
import * as Yup from "yup"
import { useFormik, yupToFormErrors } from "formik"

import { withTranslation } from "react-i18next"
import { useHistory } from "react-router"

const NFTImage7 =
  "https://dubai-attraction.com/wp-content/uploads/2021/12/ain-dubai-observation-wheel-550x550.jpg"

const EditUser = props => {
  //meta title
  document.title = "Vendor Update"
  const BASE_PATH = process.env.REACT_APP_BASE_PATH
  const { loader, loading, setloading } = useContext(LoaderContext)
  const history = useHistory()
  const [resultData, setResultData] = useState({
    name: "",
    email: "",
    profileImg: "",
  })
  const [profileImg, setprofileImg] = useState("")
  const { userID } = useParams()

  const changeValues = event => {
    setResultData({ ...resultData, [event.target.name]: event.target.value })
  }

  // Get User Details
  const fetchData = () => {
    try {
      axios.get(apiRoute.userDetail + "?userID=" + userID).then(res => {
        console.log(res.data, "userdata >>>>>>>>>")
        setResultData(res.data.data)
      })
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  // User Update and Validation
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: resultData.name,
      email: resultData.email,
      profileImg: profileImg,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("This field is required."),
      email: Yup.string().required("email is required"),
      // profileImg: Yup.string().required(""),
    }),
    onSubmit: values => {
      console.log(values, "jgjhgj")
      updateUserDetails(values)
    },
  })

  const updateUserDetails = async data => {
    var formData = new FormData()
    formData.append("name", data.name)
    formData.append("email", data.email)
    formData.append("userID", userID)
    formData.append("profileImg", data.profileImg)

    setloading(true)
    await axios
      .put(apiRoute.editUser, formData)
      .then(response => {
        setloading(false)
        toast.success(response.data.message)
        history.push("/admin/users")
      })
      .catch(error => {
        setloading(false)
        toast.error(error.response.data.error)
      })
  }

  return (
    <React.Fragment>
      <div className="page-content margin-custom">
        <Container fluid>
          <Row>
            <Col xl={12}>
              <Card className="border">
                <CardBody>
                  <form
                    onSubmit={e => {
                      e.preventDefault()
                      validation.handleSubmit()
                      return false
                    }}
                    className="validation-cls"
                  >
                    <CardTitle className="h5 mb-4">Edit Vendor Details</CardTitle>

                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <label htmlFor="floatingnameInput">Name</label>
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            id="floatingnameInput"
                            placeholder="Enter Name..."
                            onBlur={validation.handleBlur}
                            onChange={changeValues}
                            value={resultData.name}
                          />
                          {validation.touched.name && validation.errors.name ? (
                            <FormFeedback type="invalid">
                              {validation.errors.name}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <label htmlFor="floatingnameInput">Email</label>
                          <input
                            type="text"
                            name="email"
                            className="form-control"
                            id="floatingnameInput"
                            placeholder="Enter email"
                            onBlur={validation.handleBlur}
                            onChange={changeValues}
                            value={resultData.email}
                          />
                          {validation.touched.email &&
                          validation.errors.email ? (
                            <FormFeedback type="invalid">
                              {validation.errors.email}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={6} className="mb-4">
                        <label htmlFor="floatingnameInput">Profile Image</label>
                        <input
                          type="file"
                          name="profileImg"
                          className="form-control"
                          id="floatingnameInput"
                          placeholder="Upload profile Image"
                          onChange={event => {
                            setprofileImg(event.currentTarget.files[0])
                          }}
                        />
                        {validation.touched.profileImg &&
                        validation.errors.profileImg ? (
                          <FormFeedback type="invalid">
                            {validation.errors.profileImg}
                          </FormFeedback>
                        ) : null}
                      </Col>
                      <Col md={2} className="mb-4 overflow-hidden">
                        <img
                          src={BASE_PATH + resultData.profileImg}
                          style={{ height: "80px" }}
                        />
                      </Col>
                    </Row>

                    <div>
                      <Link
                        to="/admin/users"
                        className="btn btn-secondary w-md mt-2 me-2"
                      >
                        Cancel
                      </Link>
                      <button
                        type="submit"
                        className="btn btn-primary w-md mt-2"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

EditUser.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
}

export default withTranslation()(EditUser)
