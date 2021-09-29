import React from 'react'
import header from '../../../assets/image/header.png'
import footer from '../../../assets/image/footer.png'
import './header.css'
export default function Header(props) {
  return (
    <>
      <div className="title">
        <img src={header} alt=""/>
      </div>
      {props.children}

        <img className='footer' src={footer} alt=""/>

  
    </>
  )
}
