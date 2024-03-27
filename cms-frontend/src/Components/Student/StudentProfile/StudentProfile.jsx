import React, { useEffect, useState } from 'react'
import './StudentProfile.css'
import StudentEditProfile from './StudentEditProfile'
import axios from 'axios'
import StudentViewProfile from './StudentViewProfile'
import { useLocation,useNavigate } from 'react-router-dom'
function StudentProfile() {
    const [profileData,setProfileData] = useState(null)
    const [edit,setEdit] = useState(0)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(()=>{
    localStorage.setItem('currentRoute',location.pathname)
    console.log(location.pathname)
  },[location.pathname])

  useEffect(()=>{
    const savedRoute = localStorage.getItem('currentRoute')
    if(savedRoute !== location.pathname){
      navigate(savedRoute)
    }
  },[navigate])
    useEffect(()=>{
        //fetch data from backend
        console.log(window.history)
        console.log("Inside profile")
        axios.get('http://localhost:3002/student/getProfile',{withCredentials:true}).then((res)=>{
          console.log(res.data)
           if(res.data === 'OK'){
              navigate('/student/editProfile')
           }else{
            setProfileData(res.data[0])
           }
        }).catch((err)=>{
            console.log(err)
        })
    },[])
  return (
    <>
      {profileData? <StudentViewProfile profileData={profileData} /> : null}
    </>
  )
}

export default StudentProfile