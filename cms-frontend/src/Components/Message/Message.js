import React from 'react'
import './Message.css'
function Message(props) {
  return (
    <div className='message-container'>
         <span className='msg'>{props.message}</span>
         <div className='time-stamp'>{props.time}</div>
    </div>
  )
}

export default Message