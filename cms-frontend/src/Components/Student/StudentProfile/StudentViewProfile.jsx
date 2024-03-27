import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './StudentViewProfile.css'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

function StudentViewProfile(props) {
  const [profileData,setProfileData] = useState(props.profileData)
  const navigate = useNavigate()
  
  const handleEdit = ()=>{
    navigate('/student/editProfile',{state: {profileData: profileData}})
  }
  return (
    <div className='profile-view-container'>
      <button className='button-edit' onClick={handleEdit}>EDIT</button>
      <div className='personal-details-container'>
            <p className='profile-header'>Personal Details</p>
            <div className='personal-scrollable'>
            <div className='div-container'>
                <label>Roll Number</label>
                <p>{profileData?.roll_number}</p>
            </div>
            <div className='div-container'>
              <label>Name</label>
              <p>{profileData?.name}</p>
            </div>
            <div className='div-container'>
              <label>Email</label>
              <p>{profileData?.email}</p>
            </div>
            <div className='div-container'>
              <label>Section</label>
              <p>{profileData?.section}</p>
            </div>
            <div className='div-container'>
              <label>Mobile Number</label>
              <p>{profileData?.mob_number}</p>
            </div>
            <div className='div-container'>
              <label>Date of Birth</label>
              <p>{(moment(profileData?.dob)).format('YYYY-MM-DD')}</p>
            </div>
            <div className='div-container'>
              <label>Admission Type</label>
              <p>{profileData?.admission}</p>
            </div>
            <div className='div-container'>
              <label>{profileData?.rank_type} Rank</label>
              <p>{profileData?.admission_rank}</p>
            </div>
            <div className='div-container'>
              <label>Caste</label>
              <p>{profileData?.caste}</p>
            </div>
            <div className='div-container'>
              <label>Blood Group</label>
              <p>{profileData?.blood_grp}</p>
            </div>
            <div className='div-container'>
              <label>10<sup>th</sup> Percentage</label>
              <p>{profileData?.tenth_per}</p>
            </div>
            <div className='div-container'>
              <label>Inter Percentage</label>
              <p>{profileData?.inter_per}</p>
            </div>
            <div className='div-container'>
              <label>Address</label>
              <p>{profileData?.address}</p>
            </div>
            <div className='div-container'>
              <label>Parent Name</label>
              <p>{profileData?.parent_name}</p>
            </div>
            <div className='div-container'>
              <label>Parent Occupation</label>
              <p>{profileData?.occupation}</p>
            </div>
            <div className='div-container'>
              <label>Mobile Number</label>
              <p>{profileData?.pmob_number}</p>
            </div>
            </div>
        
        </div>
        <div className='personal-details-container'>
            <p className='profile-header'>Activities</p>
            <div className='personal-scrollable'>
            <div className='div-container-list'>
                <label>Games</label>
                <div className='display-list' style={{width:'100%',height:'auto'}}>
                  <ul style={{}}>
                  {
                    profileData?.games.split('~').map((game)=>(
                      <li>{game}</li>

                    ))
                  }
                  </ul>
                </div>
            </div>
            <div className='div-container-list'>
              <label>Extra-curricular Activities</label>
              <div className='display-list' style={{width:'100%',height:'auto'}}>
                  <ul style={{}}>
                  {
                    profileData?.extra_activities.split('~').map((game)=>(
                      <li>{game}</li>

                    ))
                  }
                  </ul>
                </div>            
              </div>
            <div className='div-container-list'>
              <label>Literary Activities</label>
              <div className='display-list' style={{width:'100%',height:'auto'}}>
                  <ul style={{}}>
                  {
                    profileData?.literary_activities.split('~').map((game)=>(
                      <li>{game}</li>

                    ))
                  }
                  </ul>
                </div>            
              </div>
            <div className='div-container-list'>
              <label>Technical Activities</label>
              <div className='display-list' style={{width:'100%',height:'auto'}}>
                  <ul style={{}}>
                  {
                    profileData?.technical_activities.split('~').map((game)=>(
                      <li>{game}</li>

                    ))
                  }
                  </ul>
                </div>            </div>
            <div className='div-container-list'>
              <label>Scholarships</label>
              <div className='display-list' style={{width:'100%',height:'auto'}}>
                  <ul style={{}}>
                  {
                    profileData?.scholarships.split('~').map((game)=>(
                      <li>{game}</li>

                    ))
                  }
                  </ul>
                </div>            
              </div>
           
            </div>
        
        </div>
      
    </div>
  )
}

export default StudentViewProfile