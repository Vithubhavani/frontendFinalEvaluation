import axios from "axios"
import { addTokenHeader } from "../helper/helper";
export const register=async(data)=> {
    const res = axios.post(`${import.meta.env.VITE_BASE_URL}/api/s1/user/register`, data, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded"
        }
    });

    return res;
}

export const login = async (data) => {
    const res = axios.post(`${import.meta.env.VITE_BASE_URL}/api/s1/user/login`, data, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded"
        }
    });
    return res;
}


export const updateUser = async (data) => {
    const headers=addTokenHeader({headers:{}});

    const res = axios.put(`${import.meta.env.VITE_BASE_URL}/api/s1/user/update`, data, {
        headers: headers
    });
if(res.status===401){
    localStorage.removeItem("token");
    alert("You are logged out")
    window.location.href="/"
}
    return res;

}

export const getUser = async () => {
    const headers=addTokenHeader({headers:{}});

    const res = axios.get(`${import.meta.env.VITE_BASE_URL}/api/s1/user`,{
        headers: headers
    });
if(res.status===401){
    localStorage.removeItem("token");
    alert("You are logged out")
    window.location.href="/"
}
    return res;

}



