import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';

import { fireToast } from '../../../common/toaster';
import { deleteuser } from 'services/services';
import axios from 'axios';

const Deleteuser = ({ userInfo, onHide, show}) => {             //, setModalShow, setUserInfo, setModalShow2 }) => {

    // const { photoId } = props;
    const [detail, setDetail] = useState({ ...userInfo });
    // const [showModal, setshowModal] = useState({show});
    console.log(detail, onHide, show, "detail on viw new")
    // const [file, setFile] = useState()
    console.log(userInfo, "<<-- delInfo")
    const API_BASE_URL = "https://expressminds-apis.zip2box.com/uploads/";

    const getListing = async (page = 1 ) => {
        try {
            console.log("heyyyyy",userInfo)
            const resp = await getusersmodels(searchList, page,userInfo?.userid)
            console.log(resp,"<<<<<<")
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

    const deleteuserfunction = async (detail) => {
        try {
            console.log(detail,"info")
            const resp = await deleteuser({userid:detail?._id})
            if(resp.status == 200){
               
                console.log("successfully deleted")
                fireToast("success", resp.message);
                // window.location.reload()
                window.location.href = window.location.href;
                
            }
            else{
                fireToast('error', resp.error)
            }
        }
        catch (error) {
            fireToast('error', error?.response?.data?.error)
        }
    }


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
                    
                </Modal.Header>

                <Modal.Body> 
                    <div>
                    <h5 className=' text-center'>Delete User</h5>
                    <div>
                        <h6 className=' text-center mt-4'>Are you sure you want to permanently delete this user ?</h6>
                        <div className='d-flex' style={{justifyContent: 'center'}}>
                        <button
                        type="submit"
                            className="btn btn-primary mt-3"
                            onClick={()=>deleteuserfunction(detail)} 
                        >
                            Delete
                        </button> 
                        </div>

                    </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Deleteuser