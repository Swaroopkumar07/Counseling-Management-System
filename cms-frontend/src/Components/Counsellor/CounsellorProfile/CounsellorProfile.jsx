import React,{useEffect} from 'react'
import { useLocation ,useNavigate} from 'react-router-dom'
function CounsellorProfile() {
  const navigate = useNavigate()
  const location = useLocation()
 
    const {state} = useLocation()
  return (
    <div>
        Hello students
    </div>
    

  )
}

export default CounsellorProfile