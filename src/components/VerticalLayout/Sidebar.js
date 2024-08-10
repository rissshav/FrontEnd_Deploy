import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"
import SidebarContent from "./SidebarContent"

import { Link } from "react-router-dom"

import logoLightPng from "../../assets/images/Logo2.png"
import shortLogo from "../../assets/images/short-logo.png"

const Sidebar = props => {
  return (
    <React.Fragment>
      <div className="vertical-menu" >
        <div className="navbar-brand-box bg-dark"  >
          <Link to="/" className="logo logo-dark">
            <span className="logo-sm">
              <img src="" alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src="" alt="" height="17" />
            </span>
          </Link>

          <Link to="/" className="logo logo-light" >
            <span className="logo-sm">
              <img src="" alt="" height="22" />
            </span>
            <span className="logo-lg text-light">
              <img src="" alt="" height="37" className="mt-2" />
            </span>
          </Link>
        </div>
        <div data-simplebar className="h-100">
          {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
        </div>
        <div className="sidebar-background"></div>
      </div>
    </React.Fragment>
  )
}

Sidebar.propTypes = {
  type: PropTypes.string,
}

const mapStatetoProps = state => {
  return {
    layout: state.Layout,
  }
}
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Sidebar)))
