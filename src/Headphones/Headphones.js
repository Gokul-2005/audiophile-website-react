import React, { useContext, useEffect } from 'react'
import Category from '../Category/Category'
import {Link} from 'react-router-dom';

import './Headphones.css'
import { wholeContext } from '../App';
export default function Headphones(props) {
  const {setCartData} = useContext(wholeContext);
  useEffect(() => {getCart('getCart')},[])
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
    <div id='Headphones'>
      <div id='bodyTitle'>{props.category}</div>
      {
        (props.obj).map((ele,i) => {
            return (
                (i%2===0) ? 
                <div key={i} className='mainHeadphoneBody'>
        <img className='headphoneImg' src={ele.img} alt='' />
        <div className='headphoneText'>
        <h3 id='newHeadphone'>{ele.new ?'NEW PRODUCT':null }</h3>
        <h1 className='headphoneTitle'>{ele.title}<br></br>{ele.br}</h1>
        <p className='headphoneDesc'>{ele.desc}</p>
        <Link style={{textDecoration:'none',color:'white'}} to={`/Details?id=${ele.link}`}><button className='headphoneButton'>SEE PRODUCT</button></Link>
                </div>
                </div> : 
                <div key={i} className='mainHeadphoneBody'>
                <div className='headphoneText'>
        <h3 id='newHeadphone'>{ele.new ?'NEW PRODUCT':null }</h3>
        <h1 className='headphoneTitle'>{ele.title}<br></br>{ele.br}</h1>
        <p className='headphoneDesc'>{ele.desc}</p>
        <Link style={{textDecoration:'none',color:'white'}} to={`/Details?id=${ele.link}`}><button className='headphoneButton'>SEE PRODUCT</button></Link>
                </div>
                <img className='headphoneImg' src={ele.img} alt='' />
                </div>
            )
        })
      }  
      <Category user={props.user} />
    </div>
  )
}
