const {editProfileQuery,updateProfileQuery,submitFormQuery, getMarksQuery,getSubjectsQuery,getSemesterQuery,getProfileQuery,getGpaQuery,editMarksQuery} = require('../models/studentModel')


const getProfile = async(req,res)=>{
    try{
        console.log("Inside get profile")
        const res1 = await getProfileQuery({'body':req.body,'session':req.session.user},res)
        if(res1.length === 0){
            res.send("OK")
        }else{
            res.send(res1)
        }
    }catch(e){
        res.send(e.message)
    }
}
const editProfile = async(req,res)=>{
    console.log("Inside edit profile controller")
    try{
        const res1 = await editProfileQuery({'body':req.body,'session':req.session.user},res)
        res.send(res1)
    }catch(e){
        res.send(e.message)
    }
}

const updateProfile = async(req,res)=>{
    try{
        const res1 = await updateProfileQuery(req.body,res)
    }catch(e){
        res.send(e.message)
    }
}

const getSubjects = async(req,res) =>{
    try{
        console.log("Inside getsubjects")
        console.log(req.query)
        console.log(req.session.user)
        const res1 = await getSubjectsQuery({'body':req.body,'session':req.session.user,'query':req.query},res)
        console.log(res1)
        if(res1.length !== 0)
        res.send(res1)
    }catch(e){
        res.send(e.message)
    }
}

const getGpa = async(req,res) =>{
    try{
        const res1 = await getGpaQuery({'body':req.body,'session':req.session.user,'query':req.query},res)
        res.send(res1)
    }catch(e){
        res.send(e.message)
    }
}

const submitForm = async(req,res)=>{
    try{
        const res1 = await submitFormQuery({'body':req.body,'session':req.session.user},res)
        res.send("Marks updated")
    }catch(e){
        res.send(e.message)
    }

}

const getSemester = async(req,res)=>{
    try{
        const res1 = await getSemesterQuery({'body':req.body,'session':req.session.user},res)   
        res.send(res1)
    }catch(e){
        res.send(e.message)
    }
}
const getMarks = async(req,res)=>{
    try{
        const res1 = await getMarksQuery({'body':req.body,'session':req.session.user},res)
        if(res1.length != 0)
        //map for each semester,assign the subjects and marks.
        res.send(res1)
    }catch(e){
        res.send(e.message)
    }
}

const editMarks = async(req,res)=>{
    try{
        const res1 = await editMarksQuery({'body':req.body,'session':req.session.user},res)
        res.send(res1)
    }catch(e){
        res.send(e.message)
    }
}

const feedback = async(req,res,io)=>{
    try{
        io.on('connection',(socket)=>{
            console.log("A user connected")
            socket.on('get previous messages',async()=>{
                const res1 = await getPreviousMessagesQuery(req,res)
                io.emit('previous messages',res1)
            })

            socket.on('new message',async(message)=>{
                const res1 = await saveMessageQuery(req,res)
                io.emit('new message',message)
            })
        }
        )
    }catch(e){

    }
}
module.exports = {editProfile,updateProfile,submitForm,getMarks,getSubjects,feedback,getSemester,getProfile,getGpa,editMarks}