import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import PropTypes from "prop-types"
import { IMAGE_BASE_URL } from "helpers/api_helper"
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    Col,
    Row,
    Button,
    Form,
    Input,
    Label,
    FormFeedback
} from "reactstrap";
import { Link } from "react-router-dom"
import moment from "moment"
// import "flatpickr/dist/themes/material_blue.css"
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { withTranslation } from "react-i18next"
import { adminDashboardListing, modelslistingimages, getusersmodels, edituser } from "services/services"
import { addAnItem, addUser, modelslist as fetchModelsList } from "services/services";
// import EditPhoto from "./edit"
// import ViewInformation from "./view"
import { fireToast } from "common/toaster"

const Edituser = ({ userInfo, show, onHide }) => {

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
    const [selectedModels, setSelectedModels] = useState([]);
    const [modelslist, setModelList] = useState([]);
    const pageLimit = 10
    console.log(dashboardListing, "dashboardListing");
    let modelss = []



    useEffect(() => {
        console.log("hello")
        const findmodels = async () => {
            const models = await fetchModelsList()
            console.log(models.data.models,"modelsssssssssssss")
            const data = models.data.models;
            const modelOptions = data.map(model => ({ value: model.name, label: model.name })); 
            console.log(modelOptions,"<<<")
            modelss = modelOptions
            setModelList(modelOptions); 
            console.log(modelslist,modelss,"modelslist")
        } 
        findmodels();
    }, [])

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            // userid: '',
            // password: '',
        },
        validationSchema: Yup.object({
            // userid: Yup.string().required("Please Enter the id of the user"),
            // password: Yup.string().required("Please Enter the password"),
        }),

        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                formData.append('userid', detail?._id);
                formData.append('models', JSON.stringify(selectedModels.map(model => model.value)));
                console.log(formData,"formdata")
                const resp = await edituser(formData);
                if (resp.status === 200) {
                    fireToast("success", resp.message);
                }
            } catch (error) {
                fireToast('error', error?.response?.data?.error);
            }
        }
    });

    const customStyles = {
        menu: (provided, state) => ({
            ...provided,
            zIndex:9999,
            maxHeight: '200px',
            overflowY: 'auto',
        }),
        control: (provided, state) => ({
            ...provided,
            minHeight: '40px',
        }),
        menuList: (provided, state) => ({
            ...provided,
            maxHeight: '200px',
            overflowY: 'auto',
        }),
        menuPortal: base => ({
            ...base,
            zindex:9999
        })
    };

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
                    Edit User
                </Modal.Header>

                <Modal.Body >
                        <div className="container-fluid">
                            <Row>
                                <Col lg="12">
                                <Card>
                            <CardBody>
                                
                                <p className="card-title-desc mb-4">
                                    Fill all information below
                                </p>

                                <Form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        validation.handleSubmit();
                                        return false;
                                    }}
                                >
                                    <Row>
                                        <Col sm="6">
                                            <Label htmlFor="productname">User Id</Label>
                                            <Input
                                                id="userid"
                                                name="userid"
                                                type="text"
                                                // value={detail?.userid}
                                                // readOnly
                                                className="form-control"
                                                placeholder="Write here..."
                                                // onChange={validation.handleChange}
                                                // invalid={
                                                //     validation.touched.userid && validation.errors.userid ? true : false
                                                // }
                                            />
                                            {/* {validation.touched.userid && validation.errors.userid && (
                                                <FormFeedback>{validation.errors.userid}</FormFeedback>
                                            )} */}
                                        </Col>
                                        <Col sm="6">
                                            <Label htmlFor="manufacturername"> Password </Label>
                                            <Input
                                                id="password"
                                                name="password"
                                                type="password"
                                                // value="password"
                                                // readOnly
                                                className="form-control"
                                                placeholder="Write here..." 
                                                // onChange={validation.handleChange}
                                                // invalid={
                                                //     validation.touched.password && validation.errors.password ? true : false}
                                            />
                                            {/* {validation.touched.password && validation.errors.password && (
                                                <FormFeedback>{validation.errors.password}</FormFeedback>
                                            )} */}
                                        </Col>
                                        <Col sm="6" className="mt-3">
                                            <Label htmlFor="models">Models</Label>
                                            <Select
                                                id="models"
                                                name="models"
                                                isMulti
                                                options={[{value:"ab",label:"ab"},{value:"12",label:"12"}]}//{modelslist}
                                                value={selectedModels}
                                                onChange={setSelectedModels}
                                                placeholder="Select models..."
                                                styles={customStyles}
                                                menuPortalTarget={document.body}
                                                menuPosition="fixed"
                                                className="react-select-container"
                                                classNamePrefix="react-select"
                                            />
                                            {selectedModels.length === 0 && (
                                                <FormFeedback style={{ display: 'block' }}>
                                                    Please select at least one model.
                                                </FormFeedback>
                                            )}
                                        </Col>
                                    </Row>
                                    <div className="d-flex flex-wrap gap-2 mt-4">
                                        <Button type="submit" color="primary" className="btn">
                                            Add Now
                                        </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                                </Col>
                            </Row>
                        </div>

                </Modal.Body>
            </Modal>
        </>
    )
}

Edituser.propTypes = {
    t: PropTypes.any,
}

export default withTranslation()(Edituser)

// export default Edituser

