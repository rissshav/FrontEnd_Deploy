import axios from "axios";
import accessToken from "./jwt-token-access/accessToken";

//pass new generated access token here
const token = accessToken;

//apply base url for axios
// const API_URL = "http://localhost:8002/api";
const API_URL = "http://16.171.174.131:8002/api";
export const IMAGE_BASE_URL = "http://16.171.174.131:8002/uploads/";
// const API_URL = "https://artgallery-apis.zip2box.com/api"
// export const IMAGE_BASE_URL = "https://artgallery-apis.zip2box.com/uploads/"
// const API_URL = "https://apis.hypsoverse.com/api"
// export const IMAGE_BASE_URL = "https://apis.hypsoverse.com/uploads/"

const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.defaults.headers.common["Authorization"] = token;

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response.data);
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data);
}
export async function postAsForm(url, data, config = {}) {
  return axiosApi
    .post(url, data, { ...config })
    .then(response => response.data);
}

export async function putAsForm(url, data, config = {}) {
  return axiosApi
    .put(url, data, { ...config })
    .then(response => response.data);
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data);
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data);
}
