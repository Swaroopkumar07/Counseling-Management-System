import React, { useEffect, useState } from 'react'
import './UpdateMarks.css'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
function UpdateMarks() {
  const refundTableStyle = {
    width:"100%",
    borderCollapse: 'collapse',
    marginTop: '0.8rem',
    border: '1px solid black',
  };

  const [data,setData] = useState([])
  const [gpa,setGpa] = useState(null)
  const [marksData,setMarksData] = useState(null)
  const [semester,setSemester] = useState(0)
  const [sent,setSent] = useState(false)
  const [sem,setSem] = useState()
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
  },[navigate,location.pathname])

  useEffect(()=>{
    axios.get("http://localhost:3002/student/getSemester",{withCredentials:true}).then((res)=>{
      console.log(res.data)
      setSem(res.data[0].semester === null ? 1 : res.data[0].semester+1)
    }).catch((err)=>{
      console.log(err.message)
    })
  },[])

  const modifyData = (data) =>{
    const indexedObject = data.reduce((acc,current)=>{
      acc[current.subject_code] = current;
      return acc
    },{})
    setMarksData(indexedObject)
  }

  const handleSend = async() =>{
      try{
        const data = {semester:sem}
        const result = await axios.post("http://localhost:3002/student/getSubjects",data,{withCredentials:true})
        console.log(result.data)
        setData(result.data)
        setSent(true)
        modifyData(result.data)
      }catch(e){
        console.log(e)
      }
  }

    const handleInputChange = (e,index,field) =>{
      const value = e.target.innerText
      console.log(index,field,value)
      if(!marksData[index].hasOwnProperty(field)){
        marksData[index][field] = 0
      }
      marksData[index][field] = parseInt(value,10)
      console.log(marksData)
    }
    const handleUpdate = async() =>{
      try{
        console.log(marksData)
        const newArray = Object.values(marksData)
        setMarksData(newArray)
        console.log(newArray)
        const postData = {marks:newArray,semester:sem,gpa : gpa}
        console.log(postData)
        const result = await axios.post("http://localhost:3002/student/submitForm",postData,{withCredentials:true})
        alert("Marks updated successfully!")
        console.log(result)
        navigate('/student/displayMarks')
      }catch(e){
        console.log(e)
      }
    }

    const handleSemester = async(e) =>{
        setSemester(e.target.value)
        const res = await axios.get('http://localhost:3002/student/getGpa',{params:{semester:e.target.value},withCredentials:true})
        console.log(res.data)
        if(res.data.length > 0)
        setGpa(res.data[0].gpa)
    }
  return (
  <>
    <div className='update-marks-container'>
       <div className='semester-div' style={sent ? {display:"none"} : {display:"flex"}}>
           <label className='label'>Select Semester</label>
           <select value={semester} onChange={(e)=>handleSemester(e)} className='select'>
              <option value={0}>Semester</option>
              <option value={sem}>{sem}</option>
           </select>
           <p style={{display:"flex",textAlign:'center',justifyContent:'center',alignItems:'center'}}  className='label'>{gpa !== null ? `GPA ${gpa}` : null}</p>
           <button style={(semester !== 0) ? {display:"flex",textAlign:'center',justifyContent:'center',alignItems:'center'} : {display:"none"}} onClick={handleSend} className='button'>SEND</button>
       </div>

       <div className='accordin' style={(sent === false) ? {display:"none"} : {display:"flex"} }>
          <Accordion className='accordin_box'>
              <AccordionDetails>
                  <table style={refundTableStyle}  >
                      <thead className='tableHeaderRefundStyle'>
                          <tr className='marks_table_row' >
                              <th className='marks_subject'>Subject</th>
                              <th>mid1</th>
                              <th>mid2</th>
                              <th>Internal</th>
                              <th>External</th>
                          </tr>
                      </thead>
                      <tbody>
                        {
                            data ? data?.map((item)=>(
                                <tr key={item.subject_code} className='marks_table_row' >
                                    <td className='marks_subject'>{item.sub_name}</td>
                                    <td contentEditable={true} onBlur={(e)=>handleInputChange(e,item.subject_code,'mid1')}>{item.mid1?item.mid1:' '}</td>
                                    <td contentEditable={true} onBlur={(e)=>handleInputChange(e,item.subject_code,'mid2')}>{item.mid2?item.mid2:' '}</td>
                                    <td contentEditable={true} onBlur={(e)=>handleInputChange(e,item.subject_code,'internal')}>{item.internal?item.internal:' '}</td>
                                    <td contentEditable={true} onBlur={(e)=>handleInputChange(e,item.subject_code,'external')}>{item.external?item.external:' '}</td>
                                </tr>
                            ))  : null
                        }
                      </tbody>
                  </table>
                </AccordionDetails>
              </Accordion>
            <button onClick={handleUpdate} className='button'>Update</button>                
              </div>
    </div>
    
  </>
  )
}

export default UpdateMarks