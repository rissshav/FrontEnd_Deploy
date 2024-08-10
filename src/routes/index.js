import React from "react"
import { Redirect } from "react-router-dom"

// // Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

import View from "../pages/Authentication/frontend/view"
import Add from "../pages/Authentication/frontend/add"
import Viewmodel from "../pages/Authentication/frontend/viewmodels"
import Addmodel from "../pages/Authentication/frontend/addmodel"
import Editpage from "pages/Authentication/frontend/edituserpage"

// Admin Dashboard
// import AdminDashboard from "../admin/dashboard/index"
import AdminChangePassword from "../admin/account/index"
import AdminDeals from "../admin/deals/index"
import AdminDealsView from "../admin/deals/view"
import AdminDealsCreate from "../admin/deals/create"
import AdminLiquidityPools from "../admin/liquidity/index"

import AdminDashboardList from "../admin/dashboard-list/index"
import AdminDashboardListView from "../admin/dashboard-list/view"
import AdminDashboardListAdd from "../admin/dashboard-list/create"
import AdminDashboardListFirstFloor from "../admin/dashboard-list/firstfloor"

const authProtectedRoutes = [
  // Admin Routes
  // { path: "/admin/dashboard", component: AdminDashboard },
  { path: "/admin/change-password", component: AdminChangePassword },
  { path: "/admin/deals", component: AdminDeals },
  { path: "/admin/deals/view", component: AdminDealsView },
  { path: "/admin/deals/create", component: AdminDealsCreate },
  { path: "/admin/liquidity-pools", component: AdminLiquidityPools },

  { path: "/admin/dashboard-list", component:AdminDashboardList },
  { path: "/dashboard/view", component:AdminDashboardListView },
  { path: "/dashboard/add", component:AdminDashboardListAdd},
  { path: "/dashboard/firstfloor", component:AdminDashboardListFirstFloor},

  // { path: "/dashboard", component: AdminDashboard },

  { path: "/", exact: true, component: () => <Redirect to="/login" /> },

  { path: "/view", component: View},
  { path: "/add", component: Add},
  { path: "/viewmodel", component: Viewmodel},
  { path: "/addmodel", component: Addmodel },
  { path: "/edituser/:id", component: Editpage}
]

const publicRoutes = [

  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },

]

export { authProtectedRoutes, publicRoutes }
