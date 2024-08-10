import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
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
    FormFeedback,
} from "reactstrap";
import Select from "react-select";

import "flatpickr/dist/themes/material_blue.css"
import { useParams } from "react-router-dom";

import { withTranslation } from "react-i18next"
import { addAnItem, addUser, modelslist as fetchModelsList, edituser, getuserdetails,getmodelinfobyid, getusersmodels } from "services/services";
import * as Yup from "yup";
import { fireToast } from '../../../common/toaster';

const Editpage = props => {
    const [file, setFile] = useState("null")
    const [userdetails, setuserdetails] = useState("null")
    const [modelslist, setModelList] = useState([]);
    const [selectedModels, setSelectedModels] = useState([]);
    const [defaultoptions, setDefaultOptions] = useState([])
    const {id} = useParams()

    useEffect(() => {
        const findmodels = async () => {
            const models = await fetchModelsList()
            console.log(models.data.models,"models")
            const data = models.data.models;
            const modelOptions = data.map(model => ({ value: model.name, label: model.name })); 
            setModelList(modelOptions); 
            
            const user = await getuserdetails({userid:id}) 
            console.log(user?.data?.user,user?.data?.user?.userid,"<<<<<userdetails")
            setuserdetails(user?.data?.user)
            console.log(userdetails,"userdetas")
            const usermodels = await getusersmodels("",1,user?.data?.user?.userid)
            console.log(usermodels,"<<<")
            console.log(usermodels,"usermodels")
            const userdata = usermodels?.data?.models
            console.log(userdata,"userdata")
            const default_data = userdata.map(model => ({ value:model?.name, label: model?.name}))
            setDefaultOptions(default_data)
            setSelectedModels(default_data)
            console.log(default_data,defaultoptions,"<<<<")
        }
        findmodels();
    }, []);

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            userid: '',
            password: '',
        },
        validationSchema: Yup.object({
            // userid: Yup.string().required("Please Enter the id of the user"),
            // password: Yup.string().required("Please Enter the password"),
        }),
        onSubmit: async (values) => {
            try {
                console.log("welcome to on submit")
                const formData = new FormData();
                formData.append('userid',userdetails?._id);
                // formData.append('password', values?.password);
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
            zIndex: 9999,
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
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardBody>
                                <CardTitle>Add User</CardTitle>
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
                                                value={userdetails?.userid}
                                                readOnly
                                                className="form-control"
                                                placeholder="Write here..."
                                                onChange={validation.handleChange}
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
                                                value="password"
                                                readOnly
                                                className="form-control"
                                                placeholder="Write here..."
                                                onChange={validation.handleChange}
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
                                                // id="models"
                                                // name="models"
                                                // isMulti
                                                // options={modelslist}
                                                // value={selectedModels}
                                                // onChange={setSelectedModels}
                                                // classNamePrefix="react-select"
                                                // placeholder="Select models..."
                                                id="models"
                                                name="models"
                                                isMulti
                                                defaultValue={defaultoptions}
                                                options={modelslist}
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
        </React.Fragment>
    )
}

Editpage.propTypes = {
    t: PropTypes.any,
}

export default withTranslation()(Editpage)
