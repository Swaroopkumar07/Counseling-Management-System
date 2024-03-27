const auth = async(req,res,next) =>{
    try{
        if(req.cookies.userId){
            // const id = req.session.user.userId
            // const query = `select * from users where username = ?`
            // const [rows] = await pool.query(query,[id])
            // if(rows.length === 0){
            //     res.send("No user exists")
            // }
            // req.session.user.userId = rows[0].username
            // req.session.user.level = rows[0].level
            // if(rows[0].level === 1){
            //     const query1 = `select * from studentprofile where sid = ?`
            //     const [rows1] = await pool.query(query1,[id])
            //     req.session.user.name = rows1[0].sname
            //     req.session.user.dept_id = rows1[0].dept_id
            //     req.session.user.year = rows1[0].year
            //     req.session.user.c_id = rows1[0].c_id
            
            // }
            console.log(req.session)
            next();
        }else{
            return res.redirect('/')
        }
    }catch(e){
        console.log(e.message)
        res.json(e)
    }
}
module.exports = {auth}