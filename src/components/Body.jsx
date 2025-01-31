import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import axios from "axios";
export default function Body(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const fetchUser = async ()=>{
        try{
            const res = await axios.get(BASE_URL+"/profile/view",{
               withCredentials:true,
            })
            dispatch(addUser(res.data))
        }catch(err){
            if(err.status===401){
              navigate("/login")
            }
            console.log(err)
        }
    }
    useEffect(()=>{
        fetchUser()
    },[])
    return   <div className="flex flex-col min-h-screen">
    <NavBar />
    <Outlet />
    <Footer />
  </div>
}