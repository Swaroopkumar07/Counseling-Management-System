import React, { useEffect, useState } from 'react'
import Header from '../../Header/Header'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserData } from '../../../auth'
import Cookies from 'js-cookie'
import './CounselorHome.css'
import TextReveal from '../TextReveal'
function CounselorHome() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
    const logout = () =>{
      dispatch(setUserData(null))
      Cookies.remove('userId')
      localStorage.clear()
      navigate('/')
    }
    useEffect(()=>{
      navigate('/counsellor/batches')
    },[])
  
  return (
    <>
      <Header />
      <button onClick={logout} className='logout-button'>Logout</button>
      <div className='counsellor-home-container'>
        <div className='active-container-c'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default CounselorHome