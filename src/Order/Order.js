import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { wholeContext } from '../App'
import './Order.css'
export default function Order(props) {
    const {billingRef,shippingRef} = props;
    const {cartData,setCartData} = useContext(wholeContext);
    const emptyCart = async () => {
        const obj = {
            type:'emptyCart',
            user:localStorage.getItem('user')
        }
        await fetch('http://localhost:5004/checkout',{
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
    <div className='Order' style={{display:props.display}}>
      <img src='/assets/checkout/icon-order-confirmation.svg' id='confimationImg' />
      <h1 id='thankyouTitle'>THANK YOU <br></br> FOR YOUR ORDER</h1>
      <p id='mailRecieve'>You will receive an email confirmation shortly.</p>
      <div id='orderSummary'>
        <div id='orderSummaryLeft'>
        {cartData != [] ? <div className='cartItem'><img src={cartData[0].img} className='cartImg'/> <div className='cartItemDetails'> <h3 className='cartItemName'>{cartData[0].link}</h3><h3 className='cartItemRate'>{cartData[0].rate}</h3></div><h3 className='cartItemQuantity'>x{cartData[0].quantity}</h3></div>:null}
        <hr></hr>
        <p id='remainingItem'>and {cartData.length !==0 ? cartData.length-1:null} other item(s)</p>
        </div>
        <div id='orderSummaryRight'>
            <h1 id='grandTotalSummary'>GRAND TOTAL</h1>
            <h1 id='summaryTotalCheckout'>${props.grandTotal}</h1>
        </div>
      </div>
      <Link style={{textDecoration:'none',color:'white'}} to={`/home`}><button id='backToHome' onClick={emptyCart}>BACK TO HOME</button></Link> 
    </div>
  )
}
