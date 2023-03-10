import React, { useContext, useEffect } from 'react'
import Category from '../Category/Category'
import './Home.css'
import {Link} from 'react-router-dom';
import { wholeContext } from '../App';
export default function Home(props) {
  const {setCartData} = useContext(wholeContext);
  useEffect(()=>{getCart('getCart')},[])
  const getCart = async (type) => {
    const obj = {
        type:type,
        user:localStorage.getItem('user')
    }
    await fetch('http://localhost:5004/details',{
       method:'POST',
       headers:{'Content-Type':'application/json'},
       body:JSON.stringify(obj)})
    .then((result) => {return result.json()})
    .then((data) => {
        console.log(data);
       setCartData(data);
    })
    .catch ((errors) => {console.error(errors)})
 };
  return (
    <div id='Home'>
      <div id='poster'>
        <div id='posterText'>
            <h4 id='newProduct'>NEW PRODUCT</h4>
            <h1 id='title'>XX99 Mark II <br></br>Headphones</h1>
            <p id='posterPara'>Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.</p>
            <Link style={{textDecoration:'none',color:'white'}} to={`/Details?id=xx99II`}><button id='seeProduct'>SEE PRODUCT</button></Link>
        </div>
      </div>
      
        <Category user={props.user} />

      <div id='zx9speaker'>
        <img src='/assets/home/desktop/image-speaker-zx9.png' id='zx9Img' alt='' />
        <div id='zx9text'>
        <h1 id='zx9title'>ZX9 <br></br> SPEAKER</h1>
        <p id='zx9para'>Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.</p>
        <Link style={{textDecoration:'none',color:'white'}} to={`/Details?id=zx9`}><button id='zx9button'>SEE PRODUCT</button></Link>
        </div>
      </div>
      <div id='zx7Speaker'>
        <h1 id='zx7title'>ZX7 SPEAKER</h1>
        <Link style={{textDecoration:'none',color:'white'}} to={`/Details?id=zx7`}><button id='zx7button'>SEE PRODUCT</button></Link>
      </div>
      <div id='yx1earphone'>
        <div id='yx1Img'></div>
        <div id='yx1Text'>
        <h1 id='yx1Title'>YX1 EARPHONES</h1>
        <Link style={{textDecoration:'none',color:'white'}} to={`/Details?id=yx1`}><button id='yx1Button'>SEE PRODUCT</button></Link>
        </div>
      </div>
    </div>
  )
}
