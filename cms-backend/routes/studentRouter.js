const express = require('express');
const {addStudent, updateProfile, editProfile, submitForm, getMarks,getSubjects,feedback,getSemester,getProfile,getGpa,editMarks} = require('../controllers/studentController');
const {auth} = require('../middleware/auth')
const router = express.Router()

    router.post('/getSubjects',auth,getSubjects)
    router.get('/getProfile',auth,getProfile)
    router.post('/editProfile',auth,editProfile)
    router.post('/updateProfile',auth,updateProfile)
    router.post('/submitForm',auth,submitForm)
    router.get('/getMarks',auth,getMarks)
    router.get("/getSemester",auth,getSemester)
    router.get("/getGpa",auth,getGpa)
    router.post("/editMarks",auth,editMarks)

module.exports = router
