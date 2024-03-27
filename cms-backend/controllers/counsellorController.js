const { addProfileQuery ,getStudentsQuery,getStudentDetailQuery,getActivitiesQuery} = require("../models/counsellorModel")

const addProfile = async(req,res)=>{
    try{
        const res1 = await addProfileQuery(req.body,res)
    }catch(e){
        res.send(e.message)
    }
}


const getStudents = async(req,res)=>{
    try{
        console.log(req.session.user)
        const res1 = await getStudentsQuery({'body':req.body,'session':req.session.user},res)
        if(res1.length === 0){
            res.send("No students allotted")
        }else{
            res.send(res1)
        }
    }catch(e){
        res.send(e.message)
    }
}

const getActivities = async(req,res) =>{
    try{
        const res1 = await getActivitiesQuery({'body':req.body,'session':req.session.user,'query':req.query},res)
        res.send(res1)
    }catch(e){
        res.send(e.message)
    }
}

const getStudentDetail = async(req,res) => {
    try{
        console.log("Inside getStudentDetail")
        console.log(req.query)
        const res1 = await getStudentDetailQuery({'body':req.body,'session':req.session.user,'query':req.query},res)
        if(res1.length ===  0){
            res.send("No marks found")
        }else{
            res.send(res1)
        }
    }catch(e){
        res.send(e.message)
    }
}
module.exports = {addProfile,getStudents,getStudentDetail,getActivities}