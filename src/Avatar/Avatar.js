import React from 'react'
import './Avatar.css'
export default function Avatar() {
  return (
    <div className='avatar'>
      <div id='avatarText'>
        <h1 id='avatarH1'>BRINGING YOU THE <br></br> <span id='best'>BEST</span> AUDIO GEAR</h1>
        <p id='avatarp'>Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.</p>
      </div>
      <img src='/assets/shared/desktop/image-best-gear.jpg' alt=''/>
    </div>
  )
}
