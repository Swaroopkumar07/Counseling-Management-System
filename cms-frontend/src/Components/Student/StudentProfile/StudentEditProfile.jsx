import React, { useEffect, useState } from 'react'
import moment from 'moment'
import './StudentEditProfile.css'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
function StudentEditProfile() {  
  const location = useLocation()
  const [profileData,setProfileData] = useState(location.state?.profileData)
  const [technical,setTechnical] = useState('')
  const [games,setGames] = useState('')
  const [literary,setLiterary] = useState('')
  const [extra_activities,setExtraActivities] = useState('')
  const [scholarships,setScholarships] = useState('')
  const navigate = useNavigate()
  console.log(profileData?.technical_activities)
  const handleSubmit = async() =>{
    console.log("Inside edit ",profileData)
     try{
      const res = await axios.post('http://localhost:3002/student/editProfile',profileData,{withCredentials:true})
      console.log(res.data)
      if(res.status === 200){
        alert('Profile Updated Successfully')
        // props.setEdit(!props.edit)
        navigate('/student/profile')
      }
     }catch(e){
      console.log(e.message)
     }
  }

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
  return (
    <div className='profile-container'>
        <form className='form-container'>
          <div className='input-div'>
            <label className='label'>Roll Number</label>
            <input readOnly type='text' placeholder='Enter roll number' className='input-css' value={profileData?.roll_number} onChange={(e)=>setProfileData({...profileData,roll_number:e.target.value})}/>
          </div>
          <div className='input-div'>
            <label className='label'>Name of the Student <br/>(as per SSC Marks Memo)</label>
            <input type='text' placeholder='Name as per SSC'className='input-css' value={profileData?.name} onChange={(e)=>setProfileData({...profileData,name:e.target.value})}/>
          </div>
          <div className='input-div'>
            <label className='label'>Section</label>
            <input type='number' placeholder='Enter section' className='input-css' value={profileData?.section} onChange={(e)=>{setProfileData({...profileData,section:e.target.value});console.log(e.target.value)}}/>
          </div>
          <div className='input-div'>
            <label className='label'>Mobile Number</label>
            <input type='number' placeholder='9494877560'className='input-css' value={profileData?.mob_number} onChange={(e)=>setProfileData({...profileData,mob_number:e.target.value})} />
          </div>
          <div className='input-div'>
            <label className='label'>Personal E-mail</label>
            <input type='text' placeholder='Enter email' className='input-css' value={profileData?.email} onChange={(e)=>setProfileData({...profileData,email:e.target.value})}/>
          </div>
          <div className='input-div' >
            <label className='label'>Admitted Under</label>
            <div className='radio-css'>
                <div style={{width:'50%',height:'auto',display:'flex',flexDirection:'row'}}>
                      <input type='radio' name='admitted-under' value="convenor" id="convenor"className='input-css' checked={profileData?.admission === 'convenor' ? true : false} onClick={(e)=>setProfileData({...profileData,admission:'convenor'})}/>
                      <label htmlFor='convenor'>Convenor</label>
                </div>
                <div style={{width:'50%',height:'auto',display:'flex',flexDirection:'row'}}>
                      <input type='radio' name='admitted-under' value="management" id="management"className='input-css' checked={profileData?.admission === 'management' ? true : false} onClick={(e)=>setProfileData({...profileData,admission:'management'})}/>
                      <label htmlFor='management'>Management</label>  
                </div>
            </div>
            
            
          </div>
          <div className='input-div'>
            <label className='label'>Caste</label>
            <input type='text' placeholder='' className='input-css' value={profileData?.caste} onChange={(e)=>setProfileData({...profileData,caste:e.target.value})} />
          </div>
          <div className='input-div'>
            <label className='label'>Eamcet/ECET Rank</label>
            <div className='radio-css'>
                <div style={{width:'50%',height:'auto',display:'flex',flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                      <input type='radio' name='rank_type' value="eamcet" id="eamcet"className='input-css' checked={profileData?.rank_type === 'eamcet' ? true : false} onClick={(e)=>setProfileData({...profileData,rank_type:'eamcet'})}/>
                      <label htmlFor='convenor'>EAMCET</label>
                </div>
                <div style={{width:'50%',height:'auto',display:'flex',flexDirection:'row'}}>
                      <input type='radio' name='rank_type' value="ecet" id="ecet"className='input-css' checked={profileData?.rank_type === 'ecet' ? true : false} onClick={(e)=>setProfileData({...profileData,rank_type:'ecet'})}/>
                      <label htmlFor='management'>ECET</label>  
                </div>
            </div>
            <input type='number' placeholder='enter rank' className='input-css' value={profileData?.admission_rank} onChange={(e)=>setProfileData({...profileData,admission_rank:e.target.value})}/>
          </div>
          <div className='input-div'>
            <label className='label'>Blood Group</label>
            <input type='text' placeholder='' className='input-css' value={profileData?.blood_grp} onChange={(e)=>setProfileData({...profileData,blood_grp:e.target.value})}/>
          </div>
          <div className='input-div'>
            <label className='label'>Dob</label>
            <input type='text' placeholder='YYYY-MM-DD' className='input-css' value={(profileData?.dob)} onChange={(e)=>setProfileData({...profileData,dob:e.target.value})}/>
          </div>
          
          <div className='input-div'>
            <label className='label'>10<sup>th</sup> Percentage</label>
            <input type='text' placeholder='10th percentage' className='input-css' value={profileData?.tenth_per} onChange={(e)=>setProfileData({...profileData,tenth_per:e.target.value})}/>
          </div>
          <div className='input-div'>
            <label className='label'>Inter/Diploma Percentage</label>
            <input type='text' placeholder='Inter/diploma percentage' className='input-css'value={profileData?.inter_per} onChange={(e)=>setProfileData({...profileData,inter_per:e.target.value})} />
          </div>
          
          <div className='input-div'>
            <label className='label'>Address</label>
            <textarea type='text' placeholder='Enter address'className='input-css' value={profileData?.address} onChange={(e)=>setProfileData({...profileData,address:e.target.value})}/>
          </div>
          <div className='input-div'>
            <label className='label'>Parent Name</label>
            <input type='text' placeholder='Parent name' className='input-css' value={profileData?.parent_name} onChange={(e)=>setProfileData({...profileData,parent_name:e.target.value})}/>
          </div>
          <div className='input-div'>
            <label className='label'>Parent Occupation</label>
            <input type='text' placeholder='Enter occupation'className='input-css' value={profileData?.occupation} onChange={(e)=>setProfileData({...profileData,occupation:e.target.value})}/>
          </div>
          <div className='input-div'>
            <label className='label'>Parent Contact Number</label>
            <input type='text' placeholder='Parent number'className='input-css' value={profileData?.pmob_number} onChange={(e)=>setProfileData({...profileData,pmob_number:e.target.value})}/>
          </div>




          <div className='input-div-list'>
              <label className='label'>Participation in any games and other activities(NCC/NSS)</label>
                  <div className='display-list' style={{width:'100%',height:'auto'}}>
                      <ul>
                          {
                            profileData && profileData?.games?.split('~').map((game,index)=>(
                              <li key={index}>{game}</li>
                            ))
                          }
                      </ul>
                    <div style={{width:'100%',height :'auto',display:'flex'}}>
                        <input type='text' placeholder='Add another' className='input-css' value={games}  onChange={(e)=>setGames(e.target.value)}/>
                        <button onClick={(e)=>{e.preventDefault();setProfileData({...profileData,games:profileData?.games+'~'+games});;setGames('')}}>Add new</button>
                    </div>
                  </div>          
            </div>
            <div className='input-div-list'>
                <label className='label'>Literary Activities</label>
                <div className='display-list' style={{width:'100%',height:'auto'}}>
                      <ul>
                          {
                            profileData && profileData?.literary_activities?.split('~').map((game,index)=>(
                              <li key={index}>{game}</li>
                            ))
                          }
                      </ul>
                      <div style={{width:'100%',height :'auto',display:'flex'}}>
                          <input type='text' placeholder='Add another' className='input-css' value={literary}  onChange={(e)=>setLiterary(e.target.value)}/>
                          <button onClick={(e)=>{e.preventDefault();setProfileData({...profileData,literary_activities:profileData?.literary_activities+'~'+literary});;setLiterary('')}}>Add new</button>
                      </div>
                  </div>          
              </div>

          <div className='input-div-list'>
                <label className='label'>Technical Activities</label>
                <div className='display-list' style={{width:'100%',height:'auto'}}>
                      <ul>
                          {
                            profileData && profileData?.technical_activities?.split('~').map((game,index)=>(
                              <li key={index}>{game}</li>
                            ))
                          }
                      </ul>
                    <div style={{width:'100%',height :'auto',display:'flex'}}>
                        <input type='text' placeholder='Add another' className='input-css' value={technical}  onChange={(e)=>setTechnical(e.target.value)}/>
                        <button onClick={(e)=>{e.preventDefault();setProfileData({...profileData,technical_activities:profileData?.technical_activities+'~'+technical});;setTechnical('')}}>Add new</button>
                    </div>
            </div>
          </div>

          <div className='input-div-list'>
            <label className='label'>Extra-curricular Activities/Achievements</label>
                  <div className='display-list' style={{width:'100%',height:'auto'}}>
                   <ul>
                      {
                        profileData && profileData?.extra_activities?.split('~').map((game,index)=>(
                          <li key={index}>{game}</li>
                        ))
                      }
                   </ul>
              <div style={{width:'100%',height :'auto',display:'flex'}}>
                  <input type='text' placeholder='Add another' className='input-css' value={extra_activities}  onChange={(e)=>setExtraActivities(e.target.value)}/>
                  <button onClick={(e)=>{e.preventDefault();setProfileData({...profileData,extra_activities:profileData?.extra_activities+'~'+extra_activities});;setTechnical('')}}>Add new</button>
              </div>
            </div>          </div>
          <div className='input-div-list'>
            <label className='label'>Scholarships</label>
            <div className='display-list' style={{width:'100%',height:'auto'}}>
                   <ul>
                      {
                        profileData && profileData?.scholarships?.split('~').map((game,index)=>(
                          <li key={index}>{game}</li>
                        ))
                      }
                   </ul>
              <div style={{width:'100%',height :'auto',display:'flex'}}>
                  <input type='text' placeholder='Add another' className='input-css' value={scholarships}  onChange={(e)=>setScholarships(e.target.value)}/>
                  <button onClick={(e)=>{e.preventDefault();setProfileData({...profileData,scholarships:profileData?.scholarships+'~'+scholarships});;setScholarships('')}}>Add new</button>
              </div>
            </div>          </div>
          
          <button className='submit-button' onClick={handleSubmit}>SUBMIT</button>

        </form>
    </div>
  )
}

export default StudentEditProfile