import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import './EditMarks.css'
import { Button } from '@mui/material'
import axios from 'axios'
function EditMarks() {
    const location = useLocation()
    const navigate = useNavigate()
    const [marksData,setMarksData] = useState()
    const {sem} = useParams()
    useEffect(()=>{
        const data = localStorage.getItem('edit-marks-data')
        const groupedData = JSON.parse(data).reduce((acc,current)=>{
            if(!acc[current.subject_code]){
                acc[current.subject_code] = current
            }
            return acc
        },{})
        setMarksData(groupedData)
        console.log(groupedData)

    },[])
    useEffect(()=>{
       localStorage.setItem('currentRoute',(location.pathname)) 
    },[location.pathname])

    useEffect(()=>{
        const savedRoute = localStorage.getItem('currentRoute')
        if(location.pathname !== savedRoute)
        navigate(savedRoute)
    },[navigate,location.pathname])
    const refundTableStyle = {
        width:'100%',
        borderCollapse: 'collapse',
        border: '1px solid black',

      };
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
            const data = {
                marksData : marksData,
                semester : sem
            }
            const result = await axios.post('http://localhost:3002/student/editMarks',data,{withCredentials:true})
            console.log(result.data)
            if(result.data === "Marks updated"){
                alert("Marks Updated,navigating to display marks")
                setTimeout(()=>{
                    navigate('/student/displayMarks')
                },2000)
            }
        }catch(err){
            console.log(err)
        }
      }
  return (
    <div className='edit-marks-container'>
        <div className='accordin_box' style={{alignItems:'center'}}>
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
                                    marksData ? Object.keys(marksData).map((item)=>(
                                        <tr key={marksData[item].subject_code} className='marks_table_row' >
                                            <td className='marks_subject'>{marksData[item].sub_name}</td>
                                            <td contentEditable={true} onBlur={(e)=>handleInputChange(e,marksData[item].subject_code,'mid1')}>{marksData[item].mid1}</td>
                                            <td contentEditable={true} onBlur={(e)=>handleInputChange(e,marksData[item].subject_code,'mid2')}>{marksData[item].mid2}</td>
                                            <td contentEditable={true} onBlur={(e)=>handleInputChange(e,marksData[item].subject_code,'internal')}>{marksData[item].internal}</td>
                                            <td contentEditable={true} onBlur={(e)=>handleInputChange(e,marksData[item].subject_code,'external')}>{marksData[item].external}</td>
                                        </tr>
                                    ))  : null
                                }
                            </tbody>
         </table>
         </div>

         <Button style={{backgroundColor:'green',color:'white',marginTop:'1rem'}} onClick={handleUpdate}>Update</Button>
    </div>
  )
}

export default EditMarks