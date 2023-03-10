import React, { useContext, useEffect, useRef, useState } from 'react'
import {Link,useLocation} from 'react-router-dom';
import { wholeContext } from '../App';
import Cart from '../Cart/Cart';
import './Header.css'
export default function Header(props) {
  const {cartData} = useContext(wholeContext);
  const [cart,setCart] = useState([]);
  const cartRef = useRef(null);
  useEffect(() => {},[cart])
  const getCartData = async (user) => {
    const obj ={user:localStorage.getItem('user')};
    await fetch('http://localhost:5004/Home',{
       method:'POST',
       headers:{'Content-Type':'application/json'},
       body:JSON.stringify(obj)})
    .then((result) => {return result.json()})
    .then((data) => {
        setCart(data);
    })
    .catch ((errors) => {console.error(errors)})
 };
 const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const user = queryParams.get('user');
  const showCart = () => {
    if(cartRef.current.style.display==='flex'){
      cartRef.current.style.display='none'
    }
    else{
      cartRef.current.style.display='flex'
      getCartData(user);
    }
  }
  return (
    <div className='header'>
      <div id='header'>
        <Cart cartRef={cartRef} cartData={cart}  />
        <img src='/assets/shared/desktop/logo.svg' alt='' />
        <div id='navigationWrapper'>
        <Link style={{textDecoration:'none',color:'white'}} to={`Home`}><button className='navButtonClass'>HOME</button></Link>
        <Link style={{textDecoration:'none',color:'white'}} to={`Headphones`}><button className='navButtonClass'>HEADPHONES</button></Link>
        <Link style={{textDecoration:'none',color:'white'}} to={`Speakers`}><button className='navButtonClass'>SPEAKERS</button></Link>
        <Link style={{textDecoration:'none',color:'white'}} to={`Earphones`}><button className='navButtonClass'>EARPHONES</button></Link>
        </div>
        <div style={{textDecoration:'none',color:'white',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}} to={`Cart`} onClick={showCart}><img src='/assets/shared/desktop/icon-cart.svg' alt=''/><div id='cartItemsCount'>{cartData.length}</div></div>
      </div>
    </div>
  )
}
