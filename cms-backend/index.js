const express = require('express')
const {createServer} = require('http')
const {Server} = require('socket.io')
const {connectDB} = require('./utils/db')
const cors = require('cors')
const session = require('express-session')
const bodyParser = require('body-parser')
const loginRouter = require('./routes/loginRouter')
const studentRouter = require('./routes/studentRouter')
const counsellorRouter = require('./routes/counsellorRouter')
const createChatRouter = require('./routes/chatRouter')
const {auth} = require('./middleware/auth')
const cookieParser = require('cookie-parser')
const corsOptions = {
    origin : ['http://localhost:3000'],
    credentials:true,
    optionSuccessStatus: 200,
}
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer,{
  cors : corsOptions
})



app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())

app.use(session({
  name:'userId',
  secret:'abc',
  resave : false,
  saveUninitialized : false,
  cookie : {
    maxAge : 1000*60*60*2,
    httpOnly : false
  }
}))


connectDB()




app.use('/',loginRouter)
app.use('/student',studentRouter)
app.use('/counsellor',counsellorRouter)
const chatRouter = createChatRouter(io)
app.use('/chat',chatRouter)

app.get('/dashboard',auth,(req,res)=>{
  res.send("Welcome ")
})

httpServer.listen(3002,()=>{
    console.log('Server is running on port 3002')
})

