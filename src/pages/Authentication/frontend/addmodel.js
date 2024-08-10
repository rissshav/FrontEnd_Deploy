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
    FormFeedback,
    Row,
} from "reactstrap";

import "flatpickr/dist/themes/material_blue.css"

import { withTranslation } from "react-i18next"
import { addAnItem, addModel, addUser } from "services/services";
import * as Yup from "yup";
import { fireToast } from '../../../common/toaster';


const Addmodel = props => {
    const [file1, setFile1] = useState("null")
    const [file2, setFile2] = useState("null")
    const [file3, setFile3] = useState("null")
    // console.log(file, "file")

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            name: '',
            description: ''
            // file: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter the name of the model"),
            description: Yup.string().required("Please Enter the description of the model").max(200, "Description must be at most 200 characters"),
            // file: Yup.mixed().required("Please upload the file")
        }),
        onSubmit: async (values) => {
            try {
                if (file1 && file1 != "null" && file2 && file2 != "null" && file3 && file3 != "null") {
                    console.log(values, "<<-- values")
                    const formData =
                     new FormData()
                    formData.append('name', values?.name)
                    formData.append('description', values?.description)
                    formData.append('thumbnail', file1)
                    formData.append('model', file2)
                    formData.append('audio', file3)

                    console.log(formData, "formdata")
                    // const resp = await addAnItem(formData);
                    const resp = await addModel(formData);
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
                                <CardTitle>Add Model</CardTitle>
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
                                            <Label htmlFor="productname">Name</Label>
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
                                                                                        {validation.touched.name && validation.errors.name && (
                                                <FormFeedback>{validation.errors.name}</FormFeedback>
                                            )}
                                        </Col>
                                        <Col sm="6">
                                            <Label htmlFor="productname">Description</Label>
                                            <Input
                                                id="description"
                                                name="description"
                                                type="text"
                                                className="form-control"
                                                placeholder="Write here..."
                                                onChange={validation.handleChange}
                                                invalid={
                                                    validation.touched.description && validation.errors.description ? true : false
                                                }


                                            />
                                                                                        {validation.touched.description && validation.errors.description && (
                                                <FormFeedback>{validation.errors.description}</FormFeedback>
                                            )}
                                        </Col>
                                        <Col sm="6" className="mt-3">
                                            <Label htmlFor="colletral_token">Thumbnail</Label>
                                            <Input
                                                id="file"
                                                name="file"
                                                type="file"
                                                className="form-control"
                                                placeholder="Write here..."
                                                onChange={(e) => [setFile1(e.target.files[0]), validation.handleChange]}
                                                invalid={(!file1 && file1 != "null") ? true : false}
                                            />

                                        </Col>
                                        <Col sm="6" className="mt-3">
                                            <Label htmlFor="colletral_token">Model</Label>
                                            <Input
                                                id="file"
                                                name="file"
                                                type="file"
                                                className="form-control"
                                                placeholder="Write here..."
                                                onChange={(e) => [setFile2(e.target.files[0]), validation.handleChange]}
                                                invalid={(!file2 && file2 != "null") ? true : false}
                                            />

                                        </Col> 
                                        <Col sm="6" className="mt-3">
                                            <Label htmlFor="colletral_token">Audio</Label>
                                            <Input
                                                id="file"
                                                name="file"
                                                type="file"
                                                className="form-control"
                                                placeholder="Write here..."
                                                onChange={(e) => [setFile3(e.target.files[0]), validation.handleChange]}
                                                invalid={(!file3 && file3 != "null") ? true : false}
                                            />
                                        </Col>
                                    </Row>
                                    <div className="d-flex flex-wrap gap-2 mt-4">
                                        <Button type="submit" color="primary" className="btn" onClick={() => file1 == "null" && setFile1("") && file2 == null && setFile2("") && file3 == null && setFile3("")}>
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

Addmodel.propTypes = {
    t: PropTypes.any,
    chartsData: PropTypes.any,
    onGetChartsData: PropTypes.func,
}

export default withTranslation()(Addmodel)