const express = require('express')
const { addProfile,getStudents, getStudentDetail,getActivities } = require('../controllers/counsellorController')
const {auth} = require('../middleware/auth')
const router = express.Router()

router.post('/addProfile',addProfile)
router.get('/getStudents',auth,getStudents)
router.get('/getStudentDetails',auth,getStudentDetail)
router.get('/getActivities',auth,getActivities)

module.exports = router