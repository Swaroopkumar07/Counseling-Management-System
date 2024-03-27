const {loginQuery,addUserQuery,getDetailsBySessionIdQuery} = require('../models/loginModel');
const login = async(req,res)=>{
    try{
        const res1 = await loginQuery(req.body,res)
        if(res1.length !== 0){
            if(res1[0].level === 1){
                req.session.user = {
                    'userId':res1[0].id,
                    'level':res1[0].level,
                    'name' : res1[0].name,
                    'branch' : res1[0].branch,
                    'fac_id' : res1[0].fac_id
                }
            }
            else if(res1[0].level === 2){
                req.session.user = {
                    'userId' : res1[0].id,
                    'level': res1[0].level,
                    'name' : res1[0].name,
                    'branch' : res1[0].branch
                }
            }           
            res.send(res1)
        } 
        else{
            res.send("Invalid username or password")
        }     
    }catch(e){
        res.json({
            error:e.message
        })
    }
}

const getDetailsBySessionId = async(req,res)=>{
    try{
        const res1 = await getDetailsBySessionIdQuery(req.session.user,res)
        if(res1.length !== 0){
            if(res1[0].level === 1){
                req.session.user = {
                    'userId':res1[0].id,
                    'level':res1[0].level,
                    'name' : res1[0].name,
                    'year' : res1[0].year,
                    'dept_id' : res1[0].dept_id,
                    'c_id' : res1[0].c_id
                }
            }
            else if(res1[0].level === 2){
                req.session.user = {
                    'userId' : res1[0].id,
                    'level': res1[0].level,
                    'name' : res1[0].name,
                    'branch' : res1[0].branch
                }
            }    
            res.send(res1)
        } 
        else{
            res.send("Invalid username or password")
        }
    }catch(e){
        res.json({error:e.message })
    }
}

const addUser = async(req,res)=>{
    try{
        const res1 = await addUserQuery(req.body,res)
    }catch(e){
        res.send(e.message)
    }

}

module.exports = {login,addUser,getDetailsBySessionId}