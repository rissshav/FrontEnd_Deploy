import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';

import { fireToast } from '../../../common/toaster';
import axios from 'axios';

const ViewDescription = ({ modalInfo, onHide, show}) => {             //, setModalShow, setUserInfo, setModalShow2 }) => {

    // const { photoId } = props;
    const [detail, setDetail] = useState({ ...modalInfo });
    console.log(detail, onHide, show, "detail on viw new")
    // const [file, setFile] = useState()
    console.log(modalInfo, "<<-- delInfo")
    const API_BASE_URL = "https://expressminds-apis.zip2box.com/uploads/";


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
                    <h5 className=' text-center'>Description</h5>
                    <div className="d-flex justify-content-center text-center mb-2">
                        {detail?.description}
                        {/* <button
                            className="btn btn-primary mt-3"
                            onClick={()=>deleteBanner()}
                        >
                            Delete
                        </button>  */}
                    </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ViewDescription
