import PropTypes from "prop-types"
import React, { useEffect, useRef } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"

const SidebarContent = props => {
  const ref = useRef()
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname

    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [props.location.pathname])

  useEffect(() => {
    ref.current.recalculate()
  })

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item)
      return false
    }
    scrollElement(item)
    return false
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100 bg-dark" ref={ref} >
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            {/* <li className="menu-title">
              <i className="mdi mdi-arrow-right-drop-circle-outline font-size-12"></i>{" "}
              {props.t("Dashboard")}{" "}
            </li>
            <li>
              <Link to="/admin/dashboard">
                <i className="bx bx-home-circle"></i>
                <span>{props.t("Dashboard")}</span>
              </Link>
            </li> */}

            {/* <li className="menu-title">
              <i className="mdi mdi-arrow-right-drop-circle-outline font-size-12"></i>{" "}
              {props.t("Management")}
            </li>

            <li className="active mm-active">
              <Link to="/" className="has-arrow">
                <i className="bx bx-customize"></i>
                <span>{props.t("Deals / Bonds")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/admin/deals" >
                    <i className="bx bx-list-ul"></i>
                    <span>{props.t("List")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/deals/create" >
                    <i className="bx bx-list-ul"></i>
                    <span>{props.t("Add New")}</span>
                  </Link>
                </li>
              </ul>
            </li> */}

            <li className="menu-title  text-white">
              <i className="mdi mdi-arrow-right-drop-circle-outline font-size-12  text-white"></i>{" "}
              {props.t("Management")}
            </li>

            <li className="active mm-active">
              <Link to="/" className="has-arrow">
                <i className="bx bx-customize"></i>
                <span>{props.t("Users")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/view">
                    <i className="bx bx-list-ul"></i>
                    <span>{props.t("Users")}</span>
                  </Link> 
                </li>
                <li>
                  <Link to="/add">
                    <i className="bx bx-list-ul"></i>
                    <span>{props.t("Create User")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/viewmodel">
                    <i className="bx bx-list-ul"></i>
                    <span>{props.t("Models")}</span>
                  </Link> 
                </li>
                <li>
                  <Link to="/addmodel">
                    <i className="bx bx-list-ul"></i>
                    <span>{props.t("Add Model")}</span>
                  </Link> 
                </li>
              </ul>
            </li>
            
            {/* <li>
              <Link to="/dashboard/add">
                <i className="bx bx-customize"></i>
                <span>{props.t("Add New")}</span>
              </Link>
            </li> */}

            {/* <li>
              <Link to="/admin/liquidity-pools">
                <i className="bx bx-customize"></i>
                <span>{props.t("Liquidity Pools")}</span>
              </Link>
            </li> */}
          </ul>

        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
