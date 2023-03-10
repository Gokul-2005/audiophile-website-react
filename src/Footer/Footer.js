import React from 'react'
import './Footer.css'
import {Link} from 'react-router-dom';

export default function Footer() {
  return (
    <div className='Footer'>
      <div id='footerNav'>
        <img src='/assets/shared/desktop/logo.svg' alt='' />
        <div id='navigationWrapper'>
        <Link style={{textDecoration:'none',color:'white'}} to={"Home"}><button className='navButtonClass'>HOME</button></Link>
        <Link style={{textDecoration:'none',color:'white'}} to={"Headphones"}><button className='navButtonClass'>HEADPHONES</button></Link>
        <Link style={{textDecoration:'none',color:'white'}} to={"Speakers"}><button className='navButtonClass'>SPEAKERS</button></Link>
        <Link style={{textDecoration:'none',color:'white'}} to={"Earphones"}><button className='navButtonClass'>EARPHONES</button></Link>
        </div>
      </div>
      <div id='footerMid'>
      <p id='footerDesc'>Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week.</p>
       <div id='footerImgDiv'> 
      <img src='/assets/shared/desktop/icon-facebook.svg' alt='' />
      <img src='/assets/shared/desktop/icon-instagram.svg' alt='' />
      <img src='/assets/shared/desktop/icon-twitter.svg' alt='' />
      </div>
      </div>
        <p id='copyright'>Copyright 2021. All Rights Reserved</p>
    </div>
  )
}
