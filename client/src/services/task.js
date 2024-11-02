import axios from "axios"
import {addTokenHeader} from '../helper/helper';

export async function getAllTasks(){
    const headers=addTokenHeader({headers:{}});
    const res=await axios.get(`${import.meta.env.VITE_BASE_URL}/api/s1/task`,{
        headers
    });

    if(res.status===401){
        localStorage.removeItem("token");
        alert("You are logged out")
        window.location.href="/"
    }
    return res
}

export async function updateTaskState(taskId,data){
    const headers=addTokenHeader({headers:{}});
    const res=await axios.put(`${import.meta.env.VITE_BASE_URL}/api/s1/task/${taskId}`,data,{headers})

    if(res.status===401){
        localStorage.removeItem("token");
        alert("You are logged out")
        window.location.href="/"
    }
    return res
}

export async function deleteTask(taskId){
    const headers=addTokenHeader({headers:{}});
    const res=await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/s1/task/${taskId}`,{
        headers
    });

    if(res.status===401){
        localStorage.removeItem("token");
        alert("You are logged out")
        window.location.href="/"
    }

    return res
}

export async function updateTask(taskId){
    const headers=addTokenHeader({headers:{}});
    const res=await axios.put(`${import.meta.env.VITE_BASE_URL}/api/s1/task/${taskId}`,{
        headers
    });

    if(res.status===401){
        localStorage.removeItem("token");
        alert("You are logged out")
        window.location.href="/"
    }

    return res 
}

export async function createTask(taskData){
    const headers=addTokenHeader({headers:{}});
    const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/s1/task`,taskData,{
        headers
    });

    if(res.status===401){
        localStorage.removeItem("token");
        alert("You are logged out")
        window.location.href="/"
    }

    return res
}

export async function getAssignee(){
    const headers=addTokenHeader({headers:{}});
    const res=await axios.get(`${import.meta.env.VITE_BASE_URL}/api/s1/task/assignees`,{
        headers
    });

    if(res.status===401){
        localStorage.removeItem("token");
        alert("You are logged out")
        window.location.href="/"
    }

    return res
}


