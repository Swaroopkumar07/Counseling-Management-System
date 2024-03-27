import React from 'react'
import './Header.css'
import image from '../../assets/logo.jpg'
function Header() {
  return (
    <div className='header'>
        <img src = {image}/>
    </div>
  )
}

export default Header