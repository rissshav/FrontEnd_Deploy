// import PropTypes, { element, func } from "prop-types"
// import React, { useContext, useEffect, useState } from "react"
// import { Link } from "react-router-dom"
// import { useFormik } from "formik";
// import {
//     Button,
//     Card,
//     CardBody,
//     CardTitle,
//     Col,
//     Container,
//     Form,
//     Input,
//     Label,
//     Row,
// } from "reactstrap";

// import "flatpickr/dist/themes/material_blue.css"

// import { withTranslation } from "react-i18next"
// import { addAnItem, addUser, modelslist } from "services/services";
// import * as Yup from "yup";
// import { fireToast } from '../../../common/toaster';


// const Add = props => {
//     const [file, setFile] = useState("null")
//     const [modelslist, setModelList] = useState("null")

//     const findmodels = async()=>{
//         const models = await modelslist()
//         console.log(models,"<<<<")
//     }
//     // console.log(file, "file")

//     const validation = useFormik({
//         // enableReinitialize : use this flag when initial values needs to be changed
//         enableReinitialize: true,

//         initialValues: {
//             userid: '',
//             password: '',
//             // file: ''
//         },
//         validationSchema: Yup.object({
//             userid: Yup.string().required("Please Enter the id of the user"),
//             password: Yup.string().required("Please Enter the password"),
//             // file: Yup.mixed().required("Please upload the file")
//         }),
//         onSubmit: async (values) => {
//             try {
//                 if (file && file != "null") {
//                     console.log(values, "<<-- values")
//                     const formData = new FormData()
//                     formData.append('userid', values?.userid)
//                     formData.append('password', values?.password)
//                     formData.append('file', file)

//                     console.log(formData, "formdata")
//                     // const resp = await addAnItem(formData);
//                     const resp = await addUser(formData);
//                     console.log(resp, "resp")
//                     if (resp.status == 200) {
//                         console.log(resp, "success adding picture ");
//                         fireToast("success", resp.message)
//                         // localStorage.setItem("authUser", JSON.stringify(resp?.data));
//                         // history.push("/admin/dashboard-list");
//                     }
//                 }
//             } catch (error) {
//                 fireToast('error', error?.response?.data?.error)
//             }

//         }
//     });
//     return (
//         <React.Fragment>
//             <div className="page-content">

//                 <Row>
//                     <Col xs="12">
//                         <Card>
//                             <CardBody>
//                                 <CardTitle>Add User</CardTitle>
//                                 <p className="card-title-desc mb-4">
//                                     Fill all information below
//                                 </p>

//                                 <Form
//                                     onSubmit={(e) => {
//                                         e.preventDefault();
//                                         validation.handleSubmit();
//                                         return false;
//                                     }}
//                                 >
//                                     <Row>
//                                         <Col sm="6">
//                                             <Label htmlFor="productname">User Id</Label>
//                                             <Input
//                                                 id="userid"
//                                                 name="userid"
//                                                 type="text"
//                                                 className="form-control"
//                                                 placeholder="Write here..."
//                                                 onChange={validation.handleChange}
//                                                 invalid={
//                                                     validation.touched.userid && validation.errors.userid ? true : false
//                                                 }


//                                             />
//                                         </Col>
//                                         <Col sm="6">
//                                             <Label htmlFor="manufacturername"> Password </Label>
//                                             <Input
//                                                 id="password"
//                                                 name="password"
//                                                 type="password"
//                                                 className="form-control"
//                                                 placeholder="Write here..."
//                                                 onChange={validation.handleChange}
//                                                 invalid={
//                                                     validation.touched.password && validation.errors.password ? true : false}
//                                             />
//                                         </Col>
//                                         <Col sm="6" className="mt-3">
//                                             <Label htmlFor="colletral_token">Model</Label>
//                                             <Input
//                                                 id="file"
//                                                 name="file"
//                                                 type="file"
//                                                 className="form-control"
//                                                 placeholder="Write here..."
//                                                 onChange={(e) => [setFile(e.target.files[0]), validation.handleChange]}
//                                                 invalid={(!file && file != "null") ? true : false}
//                                             />
//                                         </Col>
//                                     </Row>
//                                     <div className="d-flex flex-wrap gap-2 mt-4">
//                                         <Button type="submit" color="primary" className="btn" onClick={() => file == "null" && setFile("")}>
//                                             Add Now
//                                         </Button>
//                                     </div>
//                                 </Form>
//                             </CardBody>
//                         </Card>

//                     </Col>
//                 </Row>

//             </div>
//         </React.Fragment >
//     )
// }

// Add.propTypes = {
//     t: PropTypes.any,
//     chartsData: PropTypes.any,
//     onGetChartsData: PropTypes.func,
// }

// export default withTranslation()(Add)



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

import { withTranslation } from "react-i18next"
import { addAnItem, addUser, modelslist as fetchModelsList } from "services/services";
import * as Yup from "yup";
import { fireToast } from '../../../common/toaster';

const Add = props => {
    const [file, setFile] = useState("null")
    const [modelslist, setModelList] = useState([]);
    const [selectedModels, setSelectedModels] = useState([]);

    useEffect(() => {
        const findmodels = async () => {
            const models = await fetchModelsList()
            console.log(models.data.models,"models")
            const data = models.data.models;
            const modelOptions = data.map(model => ({ value: model.name, label: model.name })); 
            setModelList(modelOptions); 
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
            userid: Yup.string().required("Please Enter the id of the user"),
            password: Yup.string().required("Please Enter the password"),
        }),
        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                formData.append('userid', values?.userid);
                formData.append('password', values?.password);
                formData.append('models', JSON.stringify(selectedModels.map(model => model.value)));
                console.log(formData,"formdata")
                const resp = await addUser(formData);
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
                                                className="form-control"
                                                placeholder="Write here..."
                                                onChange={validation.handleChange}
                                                invalid={
                                                    validation.touched.userid && validation.errors.userid ? true : false
                                                }
                                            />
                                            {validation.touched.userid && validation.errors.userid && (
                                                <FormFeedback>{validation.errors.userid}</FormFeedback>
                                            )}
                                        </Col>
                                        <Col sm="6">
                                            <Label htmlFor="manufacturername"> Password </Label>
                                            <Input
                                                id="password"
                                                name="password"
                                                type="password"
                                                className="form-control"
                                                placeholder="Write here..."
                                                onChange={validation.handleChange}
                                                invalid={
                                                    validation.touched.password && validation.errors.password ? true : false}
                                            />
                                            {validation.touched.password && validation.errors.password && (
                                                <FormFeedback>{validation.errors.password}</FormFeedback>
                                            )}
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

Add.propTypes = {
    t: PropTypes.any,
}

export default withTranslation()(Add)
