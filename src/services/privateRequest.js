import axios from "axios";
import { BASE_URL } from './../apiEndpoints/index';
import { toast } from "react-toastify";

const privateRequest = axios.create({
    baseURL: "https://resourcing-uat.nimapinfotech.com/api"
    // baseURL: process.env.REACT_APP_API_BASE_URL
})
 
const requestHandler = (request) => {
    const token = localStorage.getItem("token") ? localStorage.getItem("token"): ""
    request.headers.Authorization = `Bearer ${token}`
    return request
}

const clearToken = () => {
    localStorage.removeItem("token")
}

const responseErrorHandler = (error) => {
    if(error.response){
        const {status, data} = error.response
        if(status === 401){
            clearToken()
            window.location.href = "/"
            toast.warn("Token expired, please login")
        }else if(status === 400){
            toast.error(data.message ? data.message : "Invalid Value/ Bad Request")
        }else if(status === 403){
            toast.error(data.message ? data.message : "Access Denied/ Forbidden")
        }else if(status === 404){
            toast.error(data.message ? data.message : "Item doesn't exist")
        }else if(status === 405){
            toast.error(data.message ? data.message : "Invalid Request")
        }else if(status === 504){
            toast.error(data.message ? data.message : "Network Error")
        }else if(status > 500){
            toast.error(data.message ? data.message : "Server Error")
        }
    }
    else{
        toast.error(error.message)
    }
}

const errorHandler = (error) => {
    return Promise.reject(error)
}

privateRequest.interceptors.request.use(
    requestHandler,
    errorHandler
)

privateRequest.interceptors.response.use(
    response => response,
    responseErrorHandler
)

export const privateGet = (endPoint) => {
    return privateRequest.get(endPoint)
}

export const privatePost = (endPoint, data) => {
    return privateRequest.post(endPoint, data)
}

export const privatePut = (endPoint, id, data) => {
    return privateRequest.put(`${endPoint}/${id}`, data)
}

export const privatePatch = (endPoint, id, data) => {
    return privateRequest.put(`${endPoint}/${id}`, data)
}

export const privateDelete = (endPoint, id) => {
    return privateRequest.delete(`${endPoint}/${id}`)
}

export default privateRequest