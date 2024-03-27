const {pool} = require('../utils/db')
const newMessageQuery = async(messageData)=>{
    try{
        const {sender,receiver,message,time} = {...messageData}
        const query = `insert into messages values (?,?,?,?)`
        const res = await pool.query(query,[sender,receiver,message,time])
        return res
    }catch(e){
        return (e.message)
    }
}

const getPreviousMessagesQuery = async(users)=>{
    try{
        const {user1,user2} = {...users}
        const query = `select * from messages where (sender = ? and receiver = ?) or (sender = ? and receiver = ?) order by time asc`
        const [result] = await pool.query(query,[user1,user2,user2,user1])
        return result
    }catch(e){
        return e.message
    }
}

module.exports = {newMessageQuery,getPreviousMessagesQuery}