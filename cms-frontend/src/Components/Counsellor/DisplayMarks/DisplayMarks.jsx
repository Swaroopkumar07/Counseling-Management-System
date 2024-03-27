import axios from 'axios'
import './DisplayMarks.css'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import image from '../../../assets/no-data.jpg'
function DisplayMarks() {
    const location = useLocation()
    const navigate = useNavigate()
    const [flag,setFlag] = useState(1)
    const [marksData,setMarksData] = useState()
    const {id} = useParams()
    const refundTableStyle = {
        width: '50rem',
        borderCollapse: 'collapse',
        marginBottom: '1rem',
        padding: '1rem',
        border: '1px solid black',
       
    };

    const mouldData = (data) =>{
        const groupedMarks = data.reduce((acc,marks)=>{
            const semester = marks.semester
            if(!acc[semester]){
                acc[semester] = []
            }else{
                acc[semester].push(marks)
            }
            return acc
        },{})
        console.log(groupedMarks)
        setMarksData(groupedMarks)
    }
    useEffect(()=>{
        console.log(id)
        axios.get('http://localhost:3002/counsellor/getStudentDetails',{params : {roll_no:id},withCredentials:true}).then((res)=>{
            console.log(res.data)
            if(res.data === 'No marks found'){
                setFlag(0)
            }
            mouldData(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])
  return (
    <div className='display-marks-container-c'>
            {
                flag === 0 ? (
                    <img  src={image} style={{width:'100%',height:"100%",maxWidth:"100%",backgroundSize:'cover',backgroundPosition:'center'}}/>
                ) : (
            marksData && Object.keys(marksData).map((semester)=>{
                return (
                    <div key={semester}>
                        <h2>{`Semester ${semester}`}</h2>
                        <table style={refundTableStyle}>
                            <thead className='tableHeaderRefundStyle'>
                                <tr className='marks_table_row'>
                                    <th className='marks_subject'>Subject Name</th>
                                    <th>Mid1</th>
                                    <th>Mid2</th>
                                    <th>Internal</th>
                                    <th>External</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    marksData[semester].map((subject)=>{
                                        return (
                                            <tr key={subject.sub_id} className='marks_table_row'>
                                                <td className='marks_subject'>{subject.sub_name}</td>
                                                <td>{subject.mid1}</td>
                                                <td>{subject.mid2}</td>
                                                <td>{subject.internal}</td>
                                                <td>{subject.external}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                )
            }))
    }
        
    </div>
  )
}

export default DisplayMarks