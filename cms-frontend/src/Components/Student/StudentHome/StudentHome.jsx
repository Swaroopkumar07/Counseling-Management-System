import React from 'react'
import './StudentHome.css'
import { useState ,useEffect} from 'react'
import { HiOutlineDocumentDuplicate } from "react-icons/hi2";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { VscFeedback } from "react-icons/vsc";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";

import {useNavigate,Outlet, Link,useLocation} from 'react-router-dom'
import Header from '../../Header/Header'
import Cookies from 'js-cookie'
import { selectUserData, setUserData } from '../../../auth'
import { useDispatch, useSelector } from 'react-redux'

function StudentHome() {
  const [active,setactive] = useState(1)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userData = useSelector(selectUserData)

  const logout = () =>{
    dispatch(setUserData(null))
    Cookies.remove('userId')
    localStorage.clear()
    navigate('/')
  }

  const location = useLocation()
  const data = {
    sender : userData[0]?.id,
    receiver : userData[0]?.fac_id
  }

  useEffect(()=>{ 
    const savedRoute = localStorage.getItem('currentRoute')
    if(savedRoute !== location.pathname){
      navigate(savedRoute)
    }
  },[navigate,location.pathname])

  useEffect(()=>{
    const savedRoute = localStorage.getItem('currentRoute')
    if(savedRoute === undefined || savedRoute === null){
      navigate('/student/displayMarks')
    }
  },[])

  return (
    <>
       <Header />
       <div className='student-home-container'>
            <div className='sidebar-container'>
                <Link to="/student/displayMarks" className='link' onClick={() => setactive(1)}>
                  <HiOutlineDocumentDuplicate size={25} color={active === 1 ? '#000080' : 'white'} style={{marginRight:'1rem'}}/>
                  <span style={{ color: active === 1 ? '#000080' : 'white',fontSize:'1.2rem' }}>Display Marks</span>
                </Link>  
                <Link to="/student/updateMarks" className='link' onClick={() => setactive(2)}>
                    <MdOutlineDriveFolderUpload size={25} color={active === 2 ? '#000080' : 'white'} style={{marginRight:'1rem'}}/>
                    <span style={{ color: active === 2 ? '#000080' : 'white',fontSize:'1.2rem' }}>Marks Upload</span>
                </Link> 
                <Link to="/student/feedback" className='link' onClick={() => setactive(3)}>
                    <VscFeedback size={25} color={active === 3 ? '#000080' : 'white'} style={{marginRight:'1rem'}}/>
                    <span style={{ color: active === 3 ? '#000080' : 'white',fontSize:'1.2rem' }}>Feedback</span>
                </Link> 
                <Link to="/student/profile" className='link' onClick={() => setactive(4)}>
                    <FaUserCircle size={25} color={active === 4 ? '#000080' : 'white'} style={{marginRight:'1rem'}}/>
                    <span style={{ color: active === 4 ? '#000080' : 'white',fontSize:'1.2rem' }}>Profile</span>
                </Link>    
                <div className='link' onClick={logout}>
                    <BiLogOutCircle size={25} color={'white'} style={{marginRight:'1rem'}}/>
                    <span style={{ color:'white',fontSize:'1.2rem' }}>Logout</span>
                </div>      
             </div>
          <div className='active-container'>
            <Outlet />
          </div>
       </div> 
    </>
  )
}

export default StudentHome