const express = require('express')
const { newMessageQuery ,getPreviousMessagesQuery} = require('../models/chatModel')
const chatRouter = (io) =>{
    const router = express.Router()

    

    io.on('connection',(socket)=>{
        console.log("Client connected")

        socket.on('new message',async(messageData)=>{   
            try{
                console.log(messageData)
                const res = await newMessageQuery(messageData)
                socket.emit('message processed',{success:true,result:res})
            }catch(e){
                socket.emit("message processed",{success:false,result:e.message})
            }
        })

        socket.on('get previous messages',async(users)=>{
            try{
                const previousMessages = await getPreviousMessagesQuery(users)
                socket.emit('previous messages',{success:true,result:previousMessages})
            }catch(e){
                socket.emit('previous messages',{success:false,result:e.message})
            }
        })
      })
   

    return router

}

module.exports = chatRouter