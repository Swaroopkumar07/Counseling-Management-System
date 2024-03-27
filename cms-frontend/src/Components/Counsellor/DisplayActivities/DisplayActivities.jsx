import axios from 'axios'
import './DisplayActivities.css'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function DisplayActivities() {
    const location = useLocation()
    const [data,setData] = useState()
    useEffect(()=>{
        axios.get('http://localhost:3002/counsellor/getActivities',{params:{roll_no:location.state.roll_no},withCredentials:true}).then((res)=>{
            console.log(res.data)
            setData(res.data[0])
        })
        console.log(location.state.roll_no)
    },[])
  return (
    <div className='activities-container'>
        <div className='sub-container'>
            <p className='activity-label'>Technical Activities</p>
            <ol>
              {
                data && data?.technical_activities?.split('~').map((activity)=>(
                  <li key={activity}>{activity}</li>
                ))
              }
            </ol>
        </div>
        <div className='sub-container'>
            <p className='activity-label'>Participation in any games(NCC/NSS)</p>
            <ol>
              {
                data && data?.games?.split('~').map((activity)=>(
                  <li key={activity}>{activity}</li>
                ))
              }
            </ol>
        </div>
        <div className='sub-container'>
            <p className='activity-label'>ExtraCurricular Activities</p>
            <ol>
              {
                data && data?.extra_activities?.split('~').map((activity)=>(
                  <li key={activity}>{activity}</li>
                ))
              }
            </ol>
        </div>
        <div className='sub-container'>
            <p className='activity-label'>Literary Activities</p>
            <ol>
              {
                data && data?.literary_activities?.split('~').map((activity)=>(
                  <li key={activity}>{activity}</li>
                ))
              }
            </ol>
        </div>
        <div className='sub-container'>
            <p className='activity-label'>Scholarships</p>
            <ol>
              {
                data && data?.scholarships?.split('~').map((activity)=>(
                  <li key={activity}>{activity}</li>
                ))
              }
            </ol>
        </div>
    </div>
  )
}

export default DisplayActivities