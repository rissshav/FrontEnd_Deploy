import React, { useState } from 'react'
// import './AliasRemane.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
    Form,
    Input,
    Label,
} from "reactstrap";
import axios from 'axios';
import { fireToast } from '../../common/toaster';
import { useFormik } from "formik";
import * as Yup from "yup";
import { addAnItem, editAnItem } from 'services/services';
import moment from 'moment';
// import { BASE_API_URL } from 'helpers/api_helper';

const BASE_API_URL = process.env.API_BASE_URL

const AliasRemane = ({ userInfo, onHide, show }) => {

    // const { photoId } = props;
    const [detail, setDetail] = useState({...userInfo});
    const [file, setFile] = useState()
    // console.log(userInfo, "<<-- userInfo")
    // console.log(detail,"det")

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            name: detail?.name,
            artist_name: detail?.artist_name,
            description: detail?.description,
            date_of_creation: moment(detail?.date_of_creation).format('YYYY-MM-DD'),
            // photo_id: detail?._id,
            // file: detail?.photo
           // file: detail?.file
            // file: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter the name of the art"),
            artist_name: Yup.string().required("Please Enter the name of the artist"),
            description: Yup.string().required("Please Enter the description"),
            date_of_creation: Yup.date().required("Please enter the date of creation"),
            // photo_id: Yup.string().required("Photo id is required!"),
            // file: Yup.mixed().required("Please upload the file")
        }),
        onSubmit: async (values) => {
            try {

                    console.log(values, "<<-- values")
                    const formData = new FormData()
                    formData.append('photo_id', userInfo?._id)
                    formData.append('name', values?.name)
                    formData.append('artist_name', values?.artist_name)
                    formData.append('description', values?.description)
                    formData.append('date_of_creation', values?.date_of_creation)
                    if(file){
                        formData.append('file', file)
                    }

                    console.log(formData, "formdata")
                    const resp = await editAnItem(formData);
                    console.log(resp,"resp")
                    if (resp.status == 200) {
                        console.log(resp, "success adding picture ");
                        fireToast("success", resp.message)
                        window.location.reload()
                        // localStorage.setItem("authUser", JSON.stringify(resp?.data));
                        // history.push("/admin/dashboard-list");
                    }
                
            } catch (error) {
                console.log(error.message)
                fireToast('error', error?.response?.data?.error)
            }
            // dispatch(loginUser(values, props.history));
            //dispatch(loginUser(values, props.history));
            // adminLogin(values);
        }
    });

    // const renameAlias = async (e) => {
    //     e.preventDefault(); // Prevent default form submission behavior

    //     try {
    //         const formData = new FormData();
    //         formData.append('file',file);
    //         formData.append('photo_id',detail?._id);
    //         formData.append('name',detail?.name)
    //         formData.append('artist_name',detail?.artist_name)
    //         formData.append('description',detail?.description)
    //         formData.append('date_of_creation',detail?.date_of_creation)
    //         const response = await editAnItem(formData);
    //         console.log(response,"res>>")
    //         if (response) {
    //             onHide()
    //             window.location.reload()
    //             // props.setDomainList()
    //         }
    //     } catch (error) {
    //         console.error('API Error:', error)
    //         fireToast('error', error?.response?.data?.error)
    //     }
    // }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setDetail({ ...detail, [e.target.name]: e.target.value })
            validation.handleChange(e);
            //renameAlias(e);
        }
    };

    const handleInputChange = (e) => {
        setDetail({ ...detail, [e.target.name]: e.target.value })
        //setFile(e.target.files[0])
    }

    const handleFileChange = (e)=>{
        setFile(e.target.files[0]);
        validation.setFieldValue('file', e.target.files[0]);

    }

    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Set Alias
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                    onSubmit={(e) => {
                                        e.preventDefault();
                                        validation.handleSubmit();
                                        return false;
                                    }}
                        >
                        <div className="mb-3">
                            <Label className="d-block mb-2">Name</Label>
                            <Input className='form-control' type="text" name="name" value={detail?.name} onChange={handleInputChange}  
                                placeholder='Enter Alias Name' onKeyPress={handleKeyPress} />
                                                 {validation.touched.name && validation.errors.name ? (
                            <div className="text-danger">{validation.errors.name}</div> 
                         ) : null} 
                        </div>
                        <div className="mb-3">
                            <Label className="d-block mb-2">Artist name</Label>
                            <Input className='form-control' type="text" name="artist_name" value={detail?.artist_name} onChange={handleInputChange}  placeholder='Enter artist_name Name' onKeyPress={handleKeyPress} />
                            {validation.touched.artist_name && validation.errors.artist_name ? (
                            <div className="text-danger">{validation.errors.artist_name}</div> 
                         ) : null} 
                        </div>
                        <div className="mb-3">
                            <Label className="d-block mb-2">Date of creation</Label>
                            <Input className='form-control' type="date" name="date_of_creation" value= {moment(detail?.date_of_creation).format('YYYY-MM-DD')} onChange={handleInputChange}  placeholder='Enter artist_name Name' onKeyPress={handleKeyPress} />
                            {validation.touched.date_of_creation && validation.errors.date_of_creation ? (
                            <div className="text-danger">{validation.errors.date_of_creation}</div> 
                         ) : null} 
                        </div>
                        <div className="mb-3">
                            <Label className="d-block mb-2">Description</Label>
                            <Input className='form-control' type="text" name="description" value={detail?.description} onChange={handleInputChange}  placeholder='Enter artist_name Name' onKeyPress={handleKeyPress} />
                            {validation.touched.description && validation.errors.description ? (
                            <div className="text-danger">{validation.errors.description}</div> 
                         ) : null} 
                        </div>
                        <div className="mb-3">
                            <Label className="d-block mb-2">Art image</Label>
                            <Input className='form-control' type="file" name="file" value='' onChange={handleFileChange}  placeholder='Enter artist_name Name' onKeyPress={handleKeyPress} />
                            {file ?null: (
                            <div className="text-danger">{validation.errors.name}</div> 
                         )} 
                        </div>
                        <div className="text-center">
                            <Button className='border-0' type="submit">Change</Button>
                            {/* onClick={renameAlias}>Change</Button> */}
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AliasRemane