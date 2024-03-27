import React from 'react'
import './Counsellornav.css'
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserData } from '../../../auth'
import Cookies from 'js-cookie'
function Counsellornav(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const logout = () =>{
      dispatch(setUserData(null))
      Cookies.remove('userId')
      navigate('/')
    }
  return (
    <div className='sidebar-container'>
        <p onClick={()=>props.setactive(1)} style={{color : props.active == 1 ? 'blue' : 'white'}}>Batches</p>
        <p onClick={()=>props.setactive(2)} style={{color : props.active == 2 ? 'blue' : 'white'}}>Profile</p>
        {/* <p onClick={()=>props.setactive(3)} style={{color : props.active == 3 ? 'blue' : 'white'}}>Feedback</p>
        <p onClick={()=>props.setactive(4)} style={{color : props.active == 4 ? 'blue' : 'white'}}>Profile</p> */}
        <p onClick={logout}>Logout</p>
    </div>
  )
}

export default Counsellornav