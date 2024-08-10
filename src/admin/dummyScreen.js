import PropTypes, { element, func } from "prop-types"
import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "../assets/scss/styledummy.css"
import "flatpickr/dist/themes/material_blue.css"
import {
    Col,
    Row,
} from "reactstrap"

import { withTranslation } from "react-i18next"

import bannerImg from '../assets/images/elchai/blue-water-view.png'
import icon1 from '../assets/images/elchai/Group 427319573.png'
import icon2 from '../assets/images/elchai/Group 427319551.png'
import icon3 from '../assets/images/elchai/Group 427319567.png'

import $ from 'jquery';

const Transaction = props => {

    document.title = ""
    const BASE_URL = process.env.REACT_APP_BASE_URL

    const iconManage = () => {

        $(document).ready(function () {

            console.log(document, 'document >>>>>>>>>>>>>>>>>>')

            // set the image-map width and height to match the img size
            $('#image-map').css({
                'width': $('#image-map img').width(),
                'height': $('#image-map img').height()
            })

            //tooltip direction
            var tooltipDirection;

            for (var i = 0; i < $(".pin").length; i++) {
                // set tooltip direction type - up or down             
                if ($(".pin").eq(i).hasClass('pin-down')) {
                    tooltipDirection = 'tooltip-down';
                } else {
                    tooltipDirection = 'tooltip-up';
                }

                // append the tooltip
                $("#image-map").append("<div style='left:" + $(".pin").eq(i).data('xpos') + "px;top:" + $(".pin").eq(i).data('ypos') + "px;' class='" + tooltipDirection + "'> <img src='" + $(".pin").eq(i).data('location') + "'> </div>");
            }

            // show/hide the tooltip
            $('.tooltip-up, .tooltip-down').mouseenter(function () {
                $(this).children('.tooltip').fadeIn(100);
            }).mouseleave(function () {
                $(this).children('.tooltip').fadeOut(100);
            })
        });
    }

    useEffect(() => {
        iconManage();
    }, [])

    return (
        <React.Fragment>

            <div className="page-content">
                <div className="container-fluid">
                    <Row>
                        <Col lg="12">

                            <div id="image-map">
                                <img width={3001} height={1338} src={bannerImg} alt="Our Locations" id="bannerImg" />
                                <div className="pin pin-down" data-xpos={435} data-ypos={575} data-location={icon1}>
                                    <h2>The Pods</h2>
                                </div>
                                <div className="pin pin-down" data-xpos={1115} data-ypos={475} data-location={icon2}>
                                    <h2>Willowbrook Place</h2>
                                </div>
                                <div className="pin pin-down" data-xpos={635} data-ypos={505} data-location={icon3}>
                                    <h2>The Ain Dubai</h2>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </React.Fragment>
    )
}

Transaction.propTypes = {
    t: PropTypes.any,
    chartsData: PropTypes.any,
    onGetChartsData: PropTypes.func,
}

export default withTranslation()(Transaction)
