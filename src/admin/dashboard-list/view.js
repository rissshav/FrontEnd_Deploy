import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { IMAGE_BASE_URL } from "helpers/api_helper"
import {
    Card,
    CardBody,
    CardText,
    Col,
    Row,
} from "reactstrap";
import { Link } from "react-router-dom"
import moment from "moment"

const ViewInformation = ({ userInfo, onHide, show, setModalShow, setUserInfo, setModalShow2 }) => {

    // const { photoId } = props;
    const [detail, setDetail] = useState({ ...userInfo });
    console.log(detail, onHide, show, "detail on viw new")
    // const [file, setFile] = useState()
    console.log(userInfo, "<<-- userInfo")
    const API_BASE_URL = IMAGE_BASE_URL;

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
                    Art Detail
                </Modal.Header>

                <Modal.Body >
                    {/* <div>

                        <Card>
                            <div style={{ height: "200px" }}>
                                <a href={API_BASE_URL + detail?.photo} target="_blank" rel="noreferrer">
                                    <img src={API_BASE_URL + detail?.photo} className='img-fluid card-img-top' style={{ objectFit: "contain", height: "100%" }} />
                                </a>
                            </div>
                            <CardBody >
                                <CardText >
                                    {detail?.description}
                                </CardText>
                            </CardBody>
                        </Card>
                    </div> */}

                    <div className="my-1 image-view">
                        <img
                            src={API_BASE_URL + detail?.photo}
                            alt=""
                            className="img-thumbnail mx-auto d-block"
                        />

                        <span className="span-icon font-size-15" role='button' onClick={() => { setModalShow2(false); setUserInfo(detail); setModalShow(true) }}>
                            <i className="mdi mdi-pencil"></i>
                        </span>
                    </div>

                    <div className="mt-4 mx-1 mb-4">
                        <h4>{detail?.name}</h4>
                        <div className="text-muted font-size-14">
                            <p>
                                {detail?.description}
                            </p>
                        </div>
                    </div>

                    <div className="text-center pt-2">
                        <Row>
                            <Col sm={4}>
                                <div>
                                    <p className="text-muted mb-2">Unique ID</p>
                                    <h5 className="font-size-15">{detail?.photo_id}</h5>
                                </div>
                            </Col>
                            <Col sm={4}>
                                <div className="mt-4 mt-sm-0">
                                    <p className="text-muted mb-2">Creation Date</p>
                                    <h5 className="font-size-15">{moment(detail?.date_of_creation).format('LL')}</h5>
                                </div>
                            </Col>
                            <Col sm={4}>
                                <div className="mt-4 mt-sm-0">
                                    <p className="text-muted mb-2">Created by</p>
                                    <h5 className="font-size-15">{detail?.artist_name}</h5>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <div className="col-12 w-100 d-flex justify-content-center d-none">

                        <button
                            className="btn "
                            // onClick={handlePreviousPage}
                            // disabled={currentPage === 1}
                            style={{ background: '#800000', color: 'white' }}
                            onClick={() => { setModalShow2(false); setUserInfo(detail); setModalShow(true) }}
                        >
                            Edit
                        </button>
                    </div>

                </Modal.Body>
            </Modal>
        </>
    )
}

export default ViewInformation
