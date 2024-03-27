const {pool} = require('../utils/db')


const getSubjectsQuery = async(reqParams,res)=>{
    try{
        const {year,dept_id} = {...reqParams.session}
        const semester = reqParams.body.semester
        const query = `select subject_code,sub_name,elective_batch,lab_batch from subjects_tieup inner join subjects on subjects_tieup.subject_code = subjects.sub_id where roll_no = ? and semester = ? `
        const [subjects] = await pool.query(query,[reqParams.session.userId,semester])
        return subjects
    }catch(e){
        res.send(e.message)
    }
}

const editMarksQuery = async(reqParams,res)=>{
    try{
        console.log("Inside marks data")
        console.log(reqParams.body)
        const {marksData,semester} = {...reqParams.body}
        console.log(semester)
        const userId = reqParams.session.userId
        await pool.query(`delete from marks where roll_no = ? and semester = ?`,[userId,semester])
        const values = Object.keys(marksData).map((mark)=>[userId,marksData[mark].semester,marksData[mark].subject_code,!isNaN(marksData[mark].mid1)?marksData[mark].mid1:0,!isNaN(marksData[mark].mid2)?marksData[mark].mid2:0,!isNaN(marksData[mark].internal)?marksData[mark].internal:0,!isNaN(marksData[mark].external)?marksData[mark].external:0])
        const query = `insert into marks (roll_no,semester,subject_code,mid1,mid2,internal,external) values ?`
        console.log(values)
        await pool.query(query,[values])
        res.send("Marks updated")

    }catch(e){
        res.send(e.message)
    }
}

const getProfileQuery = async(reqParams,res)=>{
    try{
        const query = `select * from profile where roll_number = ?`
        const [rows] = await pool.query(query,[reqParams.session.userId])
        console.log(rows)  
        return rows
    }catch(e){
        res.send(e.message)
    }
}
const editProfileQuery = async(reqParams,res)=>{
    console.log("Inside edit profile query")
    try{
        const profileData = reqParams.body
        console.log(profileData)
        const q1 = `select * from profile where roll_number = ?`
        const [result] = await pool.query(q1,[reqParams.session.userId])
        if(result.length > 0){
        const query = `update profile set name = ? , section = ? , mob_number = ? , email = ? ,admission = ? , caste = ? , rank_type = ? ,admission_rank = ? ,blood_grp = ? , dob = ? , tenth_per = ? , inter_per = ? , address = ? ,parent_name = ? , occupation = ? , pmob_number = ? , games = ? , literary_activities = ? , technical_activities = ? ,extra_activities = ? , scholarships = ? where roll_number = ?`
        const [rows] = await pool.query(query,[profileData.name,profileData.section,profileData.mob_number,profileData.email,profileData.admission,profileData.caste,profileData.rank_type,profileData.admission_rank,profileData.blood_grp,profileData.dob,profileData.tenth_per,profileData.inter_per,profileData.address,profileData.parent_name,profileData.occupation,profileData.pmob_number,profileData.games,profileData.literary_activities,profileData.technical_activities,profileData.extra_activities,profileData.scholarships,reqParams.session.userId])
        return rows
        }
        else{
            const query = `insert into profile (roll_number,name,section,mob_number,email,admission,caste,rank_type,admission_rank,blood_grp,dob,tenth_per,inter_per,address,parent_name,occupation,pmob_number,games,literary_activities,technical_activities,extra_activities,scholarships) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
            const [rows] = await pool.query(query,[reqParams.session.userId,profileData.name,profileData.section,profileData.mob_number,profileData.email,profileData.admission,profileData.caste,profileData.rank_type,profileData.admission_rank,profileData.blood_grp,profileData.dob,profileData.tenth_per,profileData.inter_per,profileData.address,profileData.parent_name,profileData.occupation,profileData.pmob_number,profileData.games,profileData.literary_activities,profileData.technical_activities,profileData.extra_activities,profileData.scholarships])
            return rows
        }
    }catch(e){
        res.send(e.message)
    
    }
}

const getSemesterQuery = async(reqParams,res)=>{
    try{
        const query = `select max(semester) as semester from marks where roll_no = ?`
        const [rows] = await pool.query(query,reqParams.session.userId)
        return rows
    }catch(e){
        res.send(e.message)
    }
}

const getGpaQuery = async(reqParams,res) =>{
    try{
        const query = `select gpa from results where semester = ? and roll_no = ?`
        const [rows] = await pool.query(query,[reqParams.query.semester,reqParams.session.userId])
        if(rows.length === 0)
        return []
        else
        return rows
    }catch(e){

    }
}

const updateProfileQuery = async(reqParams,res)=>{
    try{
        const query = `select * from students where username =  '${reqParams.userId}'`
        const [rows] = await pool.query(query)
        if(rows.length == 0)
        res.send("NO student exists.Please Login!")
        else{
            const query1 = `update studentProfile set sname = '${reqParams.sname}',email = '${reqParams.email}',mob = '${reqParams.mob}',section = ${reqParams.section} where sid = '${reqParams.userId}'`
            const [rows1] = await pool.query(query1)
            res.send("Updated successfully")
        }
    }catch(e){
        res.send(e.message)
    }
}

const submitFormQuery = async(reqParams,res)=>{
    try{
        const {year,dept_id,userId} = {...reqParams.session}
        const {semester,marks,gpa} = {...reqParams.body}
        console.log(reqParams.body)
        const query = `insert into marks (roll_no,semester,subject_code,mid1,mid2,internal,external) values ?`
        const values = marks.map((mark)=>[userId,semester,mark.subject_code,!isNaN(mark.mid1)?mark.mid1:0,!isNaN(mark.mid2)?mark.mid2:0,!isNaN(mark.internal)?mark.internal:0,!isNaN(mark.external)?mark.external:0])
        console.log(values)
        await pool.query(query,[values])
        return "success"
    }catch(e){
        res.send(e.message)
    }

}

//update session data,in auth..
const getMarksQuery = async(reqParams,res)=>{
    try{
        const sid = reqParams.session.userId
        const query = `select semester,subject_code,mid1,mid2,internal,external,sub_name from marks inner join subjects on marks.subject_code = subjects.sub_id where roll_no = ?`
        const [rows] = await pool.query(query,[sid])
        return rows
    }catch(e){
        res.send(e.message)
    }
}

const svaeMessageQuery = async(reqParams,res)=>{
    try{
        const query = `insert into messages (sender,receiver,message,time) values ('${reqParams.session.userId}','${reqParams.body.receiver}','${reqParams.body.message}')`
        const [rows] = await pool.query(query)
    }catch(e){
        res.send(e.message)
    }

}
module.exports = {editProfileQuery,updateProfileQuery,submitFormQuery,getMarksQuery,getSubjectsQuery,getSemesterQuery,getProfileQuery,getGpaQuery,editMarksQuery}