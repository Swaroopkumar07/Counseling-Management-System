const {pool} = require('../utils/db')
const bcrypt = require('bcrypt')
const loginQuery = async(reqParams,res) =>{
    try{
        const {username,password} = {...reqParams}
        if(username.includes('@gvpce.ac.in')){
            const query = `select * from faculty where username = ? and pwd = ?`
            const [rows] = await pool.query(query,[username,password])
            if(rows.length === 0)
            return []
            else{
                return [{
                    'level' : 2,
                    'name' : rows[0].fac_name,
                    'id' : rows[0].fac_id,
                    'branch' : rows[0].branch,
                }]
            }
        }else{
        const query = `SELECT * FROM students where username = ? and pwd = ?`;
        const [rows] = await pool.query(query,[username,password])
        if(rows.length === 0){
            return []
        }
        else{
            const query1 =`select fac_id from student_faculty where s_id = ?`
            const [result] = await pool.query(query1,[username])
            return [{
                'level' : 1,
                'name' : rows[0].name,
                'branch' : rows[0].branch,
                'fac_id' : result[0].fac_id,
                'id' : rows[0].roll_no
            }]
        }
    }  

    }catch(e){
    res.status(500).send({message:e.message})
    }
}

const getDetailsBySessionIdQuery = async(reqParams,res)=>{
    try{
        //chose database based on level
        if(reqParams.userId === undefined)
        return []
        if(reqParams.level === 1){
        const query = `select name,branch,roll_no,fac_id from students inner join student_faculty on students.roll_no = student_faculty.s_id where students.roll_no = ?`
        const [rows] = await pool.query(query,[reqParams.userId])
        return [
            {
                'name':rows[0].name,
                'branch':rows[0].branch,
                'fac_id':rows[0].fac_id,
                'id':reqParams.userId,
                'level':1
            }
        ]
    }else{
        const query = `select * from faculty where fac_id = '${reqParams.userId}'`
        const [rows] = await pool.query(query)
        return [
            {
                'name':rows[0].fac_name,
                'branch':rows[0].branch,
                'id':reqParams.userId,
                'level':reqParams.level
            }
        ]
    }
    }catch(e){
        res.status(500).send({message:e.message})
    }
}

const addUserQuery = async(reqParams,res)=>{
    try{
        const {username,password,level} = {...reqParams}
        const hashedPassword = await bcrypt.hash(password,10)
        const query = `INSERT INTO users(username,password,level) VALUES ('${username}', '${hashedPassword}',${level})`
        const [rows] = await pool.query(query)
        res.send("Student added successfully")

    }catch(e){
        res.send(e.message)
    }
}

module.exports = {loginQuery,addUserQuery,getDetailsBySessionIdQuery}