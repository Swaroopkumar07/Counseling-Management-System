const uuid = require('uuid')
const {pool} = require('../utils/db')
const addProfileQuery = async(reqParams,res)=>{
    try{
        const {name,email,dept_id} = {...reqParams}
        const id = uuid.v4()
        const query = `insert into counsellor (c_id,name,email,dept_id) values ('${id}','${name}','${email}','${dept_id}')`
        
    }catch(e){
        res.send(e.message)
    }
}
//change the below functions
const getStudentsQuery = async(reqParams,res)=>{
    try{
        console.log("Inside query")
        // const query = `with CTE as (select roll_no,section,ceil(max(semester)/2) as year from student_status group by roll_no,section)
        //                select students.roll_no,name,branch,section,year from students inner join cte on students.roll_no = cte.roll_no where students.roll_no in
        //                (select s_id from student_faculty where fac_id= ? )`
        const query = ` with cte as (select roll_no,section,ceil(max(semester)/2) as year from student_status where roll_no in (select s_id from student_faculty where fac_id = ? ) group by roll_no,section having timestampdiff(year,max(starting_date),curdate()) = 0)
                        select cte.roll_no,section,year,name,branch from cte inner join students on cte.roll_no = students.roll_no;`
        const [rows] = await pool.query(query,[reqParams.session.userId])
        console.log(rows)
        return rows
    }catch(e){
        res.send(e.message)
    }
}

const getStudentDetailQuery = async(reqParams,res)=>{
    
    // SELECT semester, sub_name, mid1, mid2, internal, external FROM mark_map INNER JOIN (semesters INNER JOIN marks ON marks.sem_id = semesters.sem_id) ON mark_map.mark_id = marks.mark_id inner join subjects on mark_map.sub_id = subjects.sub_id where semesters.year = 2020 and semesters.dept_id = 1 and marks.sid = '20131a05h3';    
    try{
        // const query = `select semester,sub_name,mid1,mid2,internal,external,gpa from mark_map inner join (semesters inner join marks on marks.sem_id = semesters.sem_id) on mark_map.mark_id = marks.mark_id inner join subjects on mark_map.sub_id = subjects.sub_id where semesters.year = ? and semesters.dept_id = ? and marks.sid = ?`
        const query = `select marks.semester,sub_name,gpa,mid1,mid2,internal,external from marks inner join results on marks.roll_no = results.roll_no and marks.semester = results.semester inner join subjects on marks.subject_code = subjects.sub_id where marks.roll_no = ?`
        const [rows] = await pool.query(query,[reqParams.query.roll_no])
        // return rows
        return rows
    }catch(e){
        res.send(e.message)
    }
}

const getActivitiesQuery = async(reqParams,res) =>{
    console.log(reqParams.query.roll_no)
    try{
        const query = `select * from profile where roll_number = ?`
        const [rows] = await pool.query(query,[reqParams.query.roll_no])
        return rows
    }catch(e){
        res.send(e.message)
    }
}

module.exports = {addProfileQuery,getStudentsQuery,getStudentDetailQuery,getActivitiesQuery}