import React, { useEffect, useState } from 'react'
import './DisplayStudents.css'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useLocation,useNavigate } from 'react-router-dom';
function DisplayStudents() {
    const {state} = useLocation()
    const [data,setData] = useState([])
    const location = useLocation()
    const navigate = useNavigate()
  
    useEffect(()=>{
      const savedData = localStorage.getItem('data')
      setData(JSON.parse(savedData))
    },[])

  
    
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

      const handleAcademic = (e,data) =>{
        console.log(data)
        navigate(`/counsellor/displayMarks/${data.roll_no}`,{state:{data : data}})
      }
      const handleActivities = (e,data) =>{
        navigate(`/counsellor/displayActivities/${data.roll_no}`,{state:{roll_no:data.roll_no}})
      }
      const handleFeedback = (e,data) =>{
        navigate(`/counsellor/feedback/${data.roll_no}`,{state:{roll_no:data.roll_no,name:data.name}})
      }
  return (
    <div className='table-container'>
    <TableContainer component={Paper}>
      <Table aria-label="customized table" className='student_table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell >RollNo</StyledTableCell>
            <StyledTableCell>Branch</StyledTableCell>
            <StyledTableCell >Section</StyledTableCell>
            <StyledTableCell >Actions</StyledTableCell> {/* Added Actions column */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.length > 0 ? (data?.map((row) => (
            <StyledTableRow key={row.roll_no}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="left">{row.roll_no}</StyledTableCell>
              <StyledTableCell align="left">{row.branch}</StyledTableCell>
              <StyledTableCell align="center">{row.section}</StyledTableCell>
              <StyledTableCell align="center">
                {/* Buttons for Academics, Social Activities, and Feedback */}
                <Button onClick={(e)=>handleAcademic(e,row)}>Academics</Button>
                <Button onClick={(e)=>handleActivities(e,row)}>Social Activities</Button>
                <Button onClick={(e)=>handleFeedback(e,row)}>Feedback</Button>
              </StyledTableCell>
            </StyledTableRow>
          ))) : (<p>Hello</p>)}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default DisplayStudents