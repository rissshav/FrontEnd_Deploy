import toastr from "toastr";
import "toastr/build/toastr.min.css";
import axios from 'axios';
import moment from 'moment'
import { apiRoute } from "routes/apiRoutes"

const alerShow = (title, message, type = 'success') => {

    toastr.options = {
        // positionClass: positionClass,
        timeOut: 7000,
        // extendedTimeOut: extendedTimeOut,
        closeButton: true,
        // debug: debug,
        progressBar: true,
        // preventDuplicates: preventDuplicates,
        // newestOnTop: newestOnTop,
        // showEasing: showEasing,
        // hideEasing: hideEasing,
        // showMethod: showMethod,
        // hideMethod: hideMethod,
        // showDuration: 500000,
        // hideDuration: 1000000
    };

    if (type == 'success') {
        toastr.success(message, title);
    } else {
        toastr.error(message, title);
    }
}

const apiHeader = async () => {
    const obj = JSON.parse(localStorage.getItem("authUser"))
    if (obj && obj.accessToken) {
        axios.defaults.headers.common["Authorization"] = obj.accessToken;

    } else {
        return {}
    }
}

const getUserDetail = () => {
    var userOBJ = JSON.parse(localStorage.getItem("authUser"))
    return userOBJ;
}

const dateTimeformat = (date) => {
    return moment(date).format('DD MMM, YYYY - h:m A')
}
const dateformat = (date) => {
    return moment(date).format('DD MMM, YYYY')
}

export { alerShow, apiHeader, dateformat, getUserDetail, dateTimeformat };