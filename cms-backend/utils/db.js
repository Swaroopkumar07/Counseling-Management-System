const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host: 'localhost',
    user :'root',
    password : 'admin',
    database : 'cms',
    waitForConnections : true,
    connectionLimit : 10,
    queueLimit : 0
})

const connectDB = async()=>{
    try{
        const conn = await pool.getConnection();
        console.log("Connected to database")
    }catch(e){
        console.log("message",e.message)
    }
}

module.exports = {connectDB,pool}