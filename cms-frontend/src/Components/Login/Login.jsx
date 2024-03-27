import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './Login.css'
import axios from 'axios'
import Header from '../Header/Header'
import { useDispatch } from 'react-redux'
import { setUserData } from '../../auth'
function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData,setformData] = useState({
        'username':'',
        'password':''
    })
    const handleSubmit = async(e) =>{
        e.preventDefault()
        const result = await axios.post('http://localhost:3002/login',formData,{withCredentials:true})
        if(result.data === 'Invalid username or password'){
            alert('Invalid username or password')
            return
        }
        const userData = result.data
        console.log(userData)
        if(userData[0]?.level){
            //store userData in redux
            dispatch(setUserData(userData))
            switch(userData[0]?.level){
                case 1:
                    navigate("/student")
                    break;
                case 2:
                    navigate("/counsellor")
                    break;
                default:
                    alert("Navigating to no dashboard")
                    navigate("/")
                
            }
        }else{
            alert("Unable to access the level")
            navigate("/")
        }

    }
  return (
    <div className='container-login'>
        <Header />
        <div className='title'>GVPCE(A)-COUNSELING MANAGEMENT SYSTEM</div>
        <div  className='login-container'>
            <p style={{fontSize:'1.2rem',color:'rgb(93, 178, 232)'}}>Login to your account</p>
            <input type='text' placeholder='Username' className='input-container' onChange={(e)=>setformData({...formData,username:e.target.value})}/>
            <input type='password' placeholder='Password' className='input-container' onChange={(e)=>setformData({...formData,password:e.target.value})}/>
            <button className='login-button' onClick={handleSubmit}>Login</button>
        </div>
    </div>
  )
}

export default Login