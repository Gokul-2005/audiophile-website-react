import React, { useContext, useEffect, useState } from 'react'
import { wholeContext } from '../App';
import {Link} from 'react-router-dom';
import './Cart.css'
export default function Cart(props) {
    const {cartData,setCartData} = useContext(wholeContext);
    const setCartTotal = () => {
        let total = 0;
        (cartData).map(ele => {
            let temp = (ele.rate).match(/\d+/g);
            temp = parseInt(temp.join(''));
            total += temp*ele.quantity;
        })
        return `$${total}`
    }
    const removeItem = (ele) => {
        let item = ele.target.parentNode.parentNode.children[1].children[0].innerText;
        let index ;
        (cartData).map((ele,i) => {
            if(ele.link.toUpperCase() === item){
                index=i;
            }
        })
        deleteCartItem(index);
    }
    const deleteCartItem = async (index) => {
        const obj ={user:localStorage.getItem('user'),index:index};
        await fetch('http://localhost:5004/cart',{
           method:'POST',
           headers:{'Content-Type':'application/json'},
           body:JSON.stringify(obj)})
        .then((result) => {return result.json()})
        .then((data) => {
            setCartData(data);
        })
        .catch ((errors) => {console.error(errors)})
     };
     const closeCart = () =>{
        (props.cartRef).current.style.display='none';
     }
  return (
    <div className='Cart' style={{display:'none'}} ref={props.cartRef}>
    {cartData!==undefined ?
    <>
    <h1 className='cartTitle'>{`CART (${cartData.length})`}</h1>
    {(cartData).map((ele,i) => { return <div key={i} className='cartItem'><img src={ele.img} className='cartImg'/> <div className='cartItemDetails'> <h3 className='cartItemName'>{ele.link}</h3><h3 className='cartItemRate'>{ele.rate}</h3></div><h3 className='cartItemQuantity'>{ele.quantity}</h3><button onClick={(event) => {removeItem(event)}} className='removeItem'><i className="fa-solid fa-trash-can"></i></button> </div>})}
    </> : null}
    {cartData!==undefined ?<div style={{width:'90%',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}><h3 id='total'>TOTAL</h3><h3 id='cartTotal'>{setCartTotal()}</h3></div>:null} 
    {cartData.length!==0 ?<Link style={{textDecoration:'none',color:'white'}} to={`/checkout`}><button className='checkoutButton' onClick={closeCart}>CHECKOUT</button></Link>:null} 
    </div>
  )
}
