import React, { useState,useRef,useEffect,useLayoutEffect } from 'react'
import moment from 'moment'
import io from 'socket.io-client'
import './FeedBack.css'
import Message from '../../Message/Message'
import { useLocation,useNavigate } from 'react-router-dom'
import { selectUserData } from '../../../auth'
import { useSelector } from 'react-redux'


function FeedBack() {
  const [socket,setSocket] = useState(null)
  const [messages,setMessages] = useState([])
  const [newMessage,setNewMessage] = useState('')
  const lastMsgRef = useRef(null)
  const [scrollToBottom,setScrollToBottom] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()

  const userData = useSelector(selectUserData)
  const sender = userData[0].level === 1 ? userData[0].id : userData[0].id
  const receiver = userData[0].level === 1 ? userData[0].fac_id : location.state.roll_no
  console.log(sender,receiver)
  useEffect(()=>{
    localStorage.setItem('currentRoute',location.pathname)
    console.log(location.pathname)
  },[location.pathname])

  useEffect(()=>{
    const savedRoute = localStorage.getItem('currentRoute')
    if(savedRoute !== location.pathname){
      navigate(savedRoute)
    }
  },[location.pathname,navigate])
  const handleScroll = () =>{
     const isScrolledToBottom = lastMsgRef.current.scrollHeight - lastMsgRef.current.scrollTop === lastMsgRef.current.clientHeight
     setScrollToBottom(isScrolledToBottom)
  }
  useEffect(()=>{
    console.log(window.history)
    if(scrollToBottom && lastMsgRef.current){
      lastMsgRef.current.scrollTop = lastMsgRef.current.scrollHeight
    }
  },[messages,scrollToBottom])

  const groupedMessages = messages?.reduce((acc,current)=>{
      const date = moment(current.time).format('DD-MM-YYYY')
      if(!acc[date])
      acc[date] = []
    acc[date].push(current)
    return acc
    },{})
 
 useEffect(()=>{
    console.log("Inside useeffect")
    const socket = io('http://localhost:3002')
    setSocket(socket)
    if(socket){
      socket.emit('get previous messages',{user1 : sender,user2:receiver})
      socket.on('previous messages',(data)=>{
        if(data.success){
          setMessages(data.result)
        }
      })
      console.log("After loading previous messages ",messages)
      socket.on('new message',(data)=>{
        if(data.success){
          setMessages(prevMessages => [...prevMessages,{sender:data.result.sender,receiver:data.result.receiver,message:data.result.message,time:data.result.time}])
        }
      })
    }
    return () => {
      // Disconnect socket when component unmounts
      socket.disconnect();
    };
   
  },[])

  useEffect(()=>{
    if(socket){
      socket.emit('get previous messages',{user1 : sender,user2:receiver})
      socket.on('previous messages',(data)=>{
        if(data.success && messages !== data.result){
          setMessages(data.result) 
        }
      })
      console.log("After loading previous messages ",messages)
      socket.on('new message',(data)=>{
        if(data.success){
          setMessages(prevMessages => [...prevMessages,{sender:data.result.sender,receiver:data.result.receiver,message:data.result.message,time:data.result.time}])
        }
      })

      console.log("Message after setting new message",messages)
  
     }
  },[messages])
 
const sendMessage = (e)=>{
    if(newMessage.trim() !== ''){
      const curr = moment()
      const time = `${curr.format('YYYY-MM-DD HH:mm:ss')}`
      const messageData = {
        sender : sender,
        receiver : receiver,
        message : newMessage,
        time : time
      }
      setMessages((previousMessages)=>[...previousMessages],messageData)
      if(socket)
      socket.emit('new message',messageData)
      console.log("Message is emitted")
      setNewMessage('')
    }

    
}
  return (
    <>
        <div className='feedback-container'>
            <div className='feedback-header'>{receiver}</div>
            <div className='scroll-view' ref = {lastMsgRef} onScroll={handleScroll}>
                {
                  Object.keys(groupedMessages).map((date)=>(
                    <div key={date} className='date-scroll-container'>
                        <h3 className='date-header'>{date}</h3>
                        <div className='scrollable'>
                        {
                             groupedMessages[date] ? groupedMessages[date].map((m,index) => {
                              return <div key={index} className={m.sender === sender ? "right-message" : "left-message"}><Message message={m.message} time={moment(m.time).format('h:mm A')}/></div>
                          }) : null
                        }
                        </div>
                    </div>
                  ))
                }

            </div>
            <div className='send-message'>
                <input type='text' onChange={(e)=>setNewMessage(e.target.value)} value={newMessage}/>
                <button onClick={sendMessage}>Send</button>
            </div>
        
        </div>
    </>
    
  )
}

export default FeedBack