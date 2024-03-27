import './App.css';
import { BrowserRouter as Router,Route,Routes, Navigate, useNavigate,Link } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'
import { selectUserData,setUserData } from './auth';
import Cookies from 'js-cookie';
import Login from './Components/Login/Login';
import StudentHome from './Components/Student/StudentHome/StudentHome';
import CounsellorHome from './Components/Counsellor/CounselorHome/CounselorHome';
import { useEffect, useState } from 'react';
import axios from 'axios';
import StudentProfile from './Components/Student/StudentProfile/StudentProfile';
import UpdateMarks from './Components/Student/UpdateMarks/UpdateMarks';
import FeedBack from './Components/Student/FeedBack/FeedBack';
import Displaymarks from './Components/Student/Displaymarks/Displaymarks';
import Batches from './Components/Counsellor/Batches/Batches';
import CounsellorProfile from './Components/Counsellor/CounsellorProfile/CounsellorProfile';
import DisplayStudents from './Components/Counsellor/DisplayStudents/DisplayStudents';
import DisplayMarks from './Components/Counsellor/DisplayMarks/DisplayMarks';
import EditMarks from './Components/Student/EditMarks/EditMarks';
import DisplayActivities from './Components/Counsellor/DisplayActivities/DisplayActivities';
import CounsellorFeedback from './Components/Counsellor/Feedback/Feedback';
import StudentEditProfile from './Components/Student/StudentProfile/StudentEditProfile';
const ProtectedRoute = ({role,children,setuserData})=>{
  const userData = useSelector(selectUserData)
  setuserData(userData)

  if(userData && userData[0]?.level === role){
    return children
  }else if(userData && userData[0]?.level === null){
    return (
      <div>
        <h3>Unauthorized access</h3>
        <p>You are not authorized to access this page</p>
        <Link to="/">
          <button>Try Again</button>
        </Link>
      </div>
    )
  }else{
    return <Navigate to="/" />
  }
}
function App() {
  const [userData,setuserData] = useState(null)
  const dispatch = useDispatch()
  useEffect(()=>{
    const sessionId = Cookies.get('userId')
    console.log(sessionId)
    if(sessionId){
      axios.get('http://localhost:3002/getDetailsBySessionId',{withCredentials:true}).then((res)=>{
        setuserData(res.data)
        console.log(res.data)
        dispatch(setUserData(res.data))
      }).catch((err)=>{
        console.log(err)
      })
    }else{
      setuserData(null)
      // return <Navigate to='/' />
    }
  },[])
  return (
    <Router>
      <Routes>
        <Route path="/" element={
         <>
          {userData ? userData[0].level === 1 ? <Navigate to='/student' /> : <Navigate to='/counsellor' /> : <Login />}
         </>
        } />
        <Route path="student" element={
          <ProtectedRoute role={1} setuserData={setuserData}>
            {userData && userData[0]?.level === 1 ? <StudentHome /> : null }
          </ProtectedRoute>
        }>
          <Route path="displayMarks" element={
            <ProtectedRoute role={1} setuserData={setuserData}>
            {userData && userData[0]?.level === 1 ? <Displaymarks /> : null }
          </ProtectedRoute>            } />
          <Route path="profile" element = {<StudentProfile />} />
          <Route path="updateMarks" element= {<UpdateMarks />} />
          <Route path="feedback" element= {<FeedBack />} />
          <Route path="editMarks/semester=/:sem" element={<EditMarks />} />
          <Route path="editProfile" element={<StudentEditProfile />} />
        </Route>
        <Route path="counsellor" element={
          <ProtectedRoute role={2} setuserData={setuserData}>
            {userData && userData[0]?.level === 2 ? <CounsellorHome /> : null}
          </ProtectedRoute>
        }>
          <Route path="batches" element={<Batches />} />
          <Route path='profile' element={<CounsellorProfile />} />
          <Route path="displayStudents/:year" element={<DisplayStudents />} />
          <Route path="displayMarks/:id" element={<DisplayMarks />} />
          <Route path="displayActivities/:id" element={<DisplayActivities />} />
          <Route path="feedback/:id" element={<CounsellorFeedback />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
