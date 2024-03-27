import React,{useEffect, useState} from 'react'
import './Batches.css'
import { useLocation, useNavigate } from 'react-router-dom'
import image_1 from '../../../assets/1-person.png'
import image_2 from '../../../assets/2-persons.png'
import axios from 'axios'
import TextReveal from '../TextReveal'
function Batches() {
  const text = "Empowerment Awaits: Your Guidance Can Shape Student Destinies!"
  const location = useLocation()
  const navigate = useNavigate()


    const [studentData,setStudentData] = useState([])
    const handleClick = (key,data) =>{
      localStorage.setItem('data',JSON.stringify(data))
      navigate(`/counsellor/displayStudents/${key}`,{state:{data:data,year:key}})
    }

    const mouldData = (data) =>{
      const groupedStudents = data.reduce((acc,student)=>{
        const year = student.year
        if(!acc[year]){
          acc[year] = []
        }
        acc[year].push(student)
        return acc
      },{})
      setStudentData(groupedStudents)
      console.log(groupedStudents)
    }

    useEffect(()=>{
      console.log("Inside Counselor Home")
      axios.get('http://localhost:3002/counsellor/getStudents',{withCredentials:true}).then((res)=>{
        setStudentData(res.data)
        mouldData(res.data)
      }).catch((err)=>{
        console.log(err)
      })
    },[])

 
  return (
    <div className='main-container'>
        <div style={{width:'100%',height:'10%',margin:'1rem',padding:'1rem',display:'flex',alignItems:'center',backgroundColor:'green'}}>
          <TextReveal index={Math.floor(Math.random()*10)} interval={100} />
        </div>
        <div className='batches-container'>
        {
            studentData && Object.keys(studentData).map((key)=>{
              return (
                <div className='component' key ={key} onClick={()=>handleClick(key,studentData[key])}>
                  <img src={ image_1 } style={{height:'60%',width:'60%'}}/>
                  <p style={{color:'black',fontWeight:'500',fontSize:'1.2rem'}}>{`Year ${key}`}</p>
                </div>
              )
            }
            )

        }
        
    </div>
    </div>
    
  )
}

export default Batches