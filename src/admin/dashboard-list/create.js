import PropTypes, { element, func } from "prop-types"
import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useFormik } from "formik";
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
import { addAnItem } from "services/services";
import * as Yup from "yup";
import { fireToast } from '../../common/toaster';


const Transaction = props => {
    const [file, setFile] = useState("null")
    // console.log(file, "file")

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            name: '',
            artist_name: '',
            description: '',
            date_of_creation: ''
            // file: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter the name of the art"),
            artist_name: Yup.string().required("Please Enter the name of the artist"),
            description: Yup.string().required("Please Enter the description"),
            date_of_creation: Yup.date().required("Please enter the date of creation"),
            // file: Yup.mixed().required("Please upload the file")
        }),
        onSubmit: async (values) => {
            try {
                if (file && file != "null") {
                    console.log(values, "<<-- values")
                    const formData = new FormData()
                    formData.append('name', values?.name)
                    formData.append('artist_name', values?.artist_name)
                    formData.append('description', values?.description)
                    formData.append('date_of_creation', values?.date_of_creation)
                    formData.append('file', file)

                    console.log(formData, "formdata")
                    const resp = await addAnItem(formData);
                    console.log(resp, "resp")
                    if (resp.status == 200) {
                        console.log(resp, "success adding picture ");
                        fireToast("success", resp.message)
                        // localStorage.setItem("authUser", JSON.stringify(resp?.data));
                        // history.push("/admin/dashboard-list");
                    }
                }
            } catch (error) {
                fireToast('error', error?.response?.data?.error)
            }
            // dispatch(loginUser(values, props.history));
            //dispatch(loginUser(values, props.history));
            // adminLogin(values);
        }
    });

    //   const handleFileChange = (e) => {
    //     validation.setFieldValue('file', e.target.files[0]);
    //   };

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
                                <CardTitle>Add Art</CardTitle>
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
                                            <Label htmlFor="productname">Art Name</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                type="text"
                                                className="form-control"
                                                placeholder="Write here..."
                                                onChange={validation.handleChange}
                                                invalid={
                                                    validation.touched.name && validation.errors.name ? true : false
                                                }


                                            />
                                        </Col>
                                        <Col sm="6">
                                            <Label htmlFor="manufacturername"> Artist Name </Label>
                                            <Input
                                                id="artist_name"
                                                name="artist_name"
                                                type="text"
                                                className="form-control"
                                                placeholder="Write here..."
                                                onChange={validation.handleChange}
                                                invalid={
                                                    validation.touched.artist_name && validation.errors.artist_name ? true : false}
                                            />
                                        </Col>
                                        <Col sm="6" className="mt-3">
                                            <Label htmlFor="maturity">Date of creation</Label>
                                            <Input
                                                id="date_of_creation"
                                                name="date_of_creation"
                                                type="date"
                                                className="form-control"
                                                placeholder="Write here..."
                                                onChange={validation.handleChange}
                                                invalid={
                                                    validation.touched.date_of_creation && validation.errors.date_of_creation ? true : false}
                                            />
                                        </Col>
                                        <Col sm="6" className="mt-3">
                                            <Label htmlFor="payment_token">Description</Label>
                                            <Input
                                                id="description"
                                                name="description"
                                                type="text"
                                                className="form-control"
                                                placeholder="Write here..."
                                                onChange={validation.handleChange}
                                                invalid={
                                                    validation.touched.description && validation.errors.description ? true : false}
                                            />
                                        </Col>
                                        <Col sm="6" className="mt-3">
                                            <Label htmlFor="colletral_token">Art</Label>
                                            <Input
                                                id="file"
                                                name="file"
                                                type="file"
                                                className="form-control"
                                                placeholder="Write here..."
                                                onChange={(e) => [setFile(e.target.files[0]), validation.handleChange]}
                                                invalid={(!file && file != "null") ? true : false}
                                            />
                                        </Col>
                                    </Row>
                                    <div className="d-flex flex-wrap gap-2 mt-4">
                                        <Button type="submit" color="primary" className="btn" onClick={() => file == "null" && setFile("")}>
                                            Add Now
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
