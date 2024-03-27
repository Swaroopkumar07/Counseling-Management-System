const express = require('express');
const {login, addUser,getDetailsBySessionId} = require('../controllers/loginController');
const router = express.Router()

router.post('/login',login)
router.get('/getDetailsBySessionId',getDetailsBySessionId)
router.post('/register',addUser)

module.exports = router