import axios from 'axios'
import './Displaymarks.css'
import React, { useEffect, useState,useRef } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLocation,useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import image from '../../../assets/no-data.jpg'
function Displaymarks() {
    const [data,setData] = useState(null)
    const tableRef = useRef(null)
    const [expandedSemester,setExpandedSemester] = useState(null)
    useEffect(()=>{
        axios.get('http://localhost:3002/student/getMarks',{withCredentials:true}).then((res)=>{
            console.log("Inside usefect")
            console.log(res.data)
            if(res.data.length > 0){
            const groupedMarks = res.data.reduce((acc,current)=>{
                if(!acc[current.semester]){
                    acc[current.semester] = []
                }
                acc[current.semester].push(current)
                return acc
            },{})
            setData(groupedMarks)
            console.log(groupedMarks)
        }else{
            setData(null)
        }
        }).catch((err)=>{
            console.log(err)
        })
    
    },[])
    const refundTableStyle = {
        width:"100%",
        borderCollapse: 'collapse',
        marginTop: '0.8rem',
        border: '1px solid black',
       
    };
    //scroll to the table container
 
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
  },[location.pathname,navigate])
  
  const toggleAccordion = (semester) => {
    setExpandedSemester((prevSemester)=>(prevSemester === semester) ? null : semester)
    if(tableRef.current){
        tableRef.current.scrollIntoView({behavior:'smooth'})
    }
  };
  const handleEdit = (e,data) =>{
    // e.stopPropagation()
    alert("Edit button is clicked")
    console.log(data)
    localStorage.setItem('edit-marks-data',JSON.stringify(data))
    navigate(`/student/editMarks/semester=/${data[0].semester}`,{state:{data:data}})


  }
  return (
        <div className='marks-container'>
         { 
            data ? Object.keys(data).map((semester,index)=>{ 
            return(
            <div className='acoordin' key={index} >
                    <Accordion className='Accordin_box'  square={true} expanded = {expandedSemester === semester}>
                        <AccordionSummary onClick={()=>toggleAccordion(semester)}
                            expandIcon={<ExpandMoreIcon className='accordin_booking_record_icon' />}
                            aria-controls="panel1-content"
                            id="panel1-header" >
                        <div style={{width:"100%",display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                            {`Semester ${semester}`}
                            { expandedSemester === semester ? (<Button style={{backgroundColor:'green',color:'white'}} onClick={(e)=>handleEdit(e,data[semester])}>Edit</Button>) : null}
                        </div>
                        
                        </AccordionSummary>
                        <AccordionDetails ref={tableRef} >
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
                                    data[semester]?.map((item,index)=>(
                                        <tr key={index} className='marks_table_row' >
                                            <td className='marks_subject' >{item.sub_name}</td>
                                            <td >{item.mid1?item.mid1:'-'}</td>
                                            <td >{item.mid2?item.mid2:'-'}</td>
                                            <td>{item.internal?item.internal:'-'}</td>
                                            <td >{item.external?item.external:'-'}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </AccordionDetails>
                </Accordion>
                </div>)
                }) : ( 
                    <div style={{overflow:'hidden',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                        <img src={image} style={{width:'80%',height:"80%",backgroundSize:'cover',backgroundPosition:'center'}} />
                        <p>No data found.Upload you marks </p>
                    </div>
                )
            }
        </div>
  )
}

export default Displaymarks