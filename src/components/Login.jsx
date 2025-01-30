import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
export default function Login(){
    const [emailId,setEmailId] = useState("")
    const [password,setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate("/")
    async function handleLogin (){
     try{
        const res = await axios.post(BASE_URL + "/login",{
            emailId,
            password,
          },{
            withCredentials:true,
          })
         dispatch(addUser(res.data))
         return navigate("/")
     }catch(err){
        console.log(err)    
     }
    }
    return <div className="flex justify-center my-10">
                <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
            
            <div>
               <label className="input input-bordered flex items-center gap-2 my-4">
                Email
                <input type="text" value={emailId} className="grow" placeholder="example@gmail.com" 
                onChange={(e)=>{setEmailId(e.target.value)}}
                />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                password
                <input type="text" value={password} className="grow" placeholder="password" 
                 onChange={(e)=>{setPassword(e.target.value)}}
                />
                </label>
            </div>
           
            <div className="card-actions justify-end my-2">
                <button onClick={handleLogin} className="btn btn-primary">Login</button>
            </div>
            </div>
        </div>
</div>
}