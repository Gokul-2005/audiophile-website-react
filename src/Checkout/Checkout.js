import React, { useContext, useEffect, useRef, useState } from 'react'
import { wholeContext } from '../App'
import Order from '../Order/Order';
import './Checkout.css'
export default function Checkout() {
    const formRef = useRef(null);
    const {cartData,setCartData} = useContext(wholeContext);
    const [order,setOrder] = useState('none');
    const [check,setCheck] = useState(false);
    const [orderDetail,setOrderDetail] = useState({
        name:'',
        email:'',
        number:'',
        address:'',
        zip:'',
        city:'',
        country:'',
    }) 
    useEffect(()=>{getCart('getCart')},[])
    useEffect(()=>{
        let arr = Object.values(orderDetail);
        if(check){
            if(!arr.includes('')){
                setOrder('block')
            } 
            else{
                alert('Please Fill All The Details To Confirm Your Order');
            }
        }
        
        },[orderDetail]);
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
    const setCartTotal = () => {
        let total = 0;
        (cartData).map(ele => {
            let temp = (ele.rate).match(/\d+/g);
            temp = parseInt(temp.join(''));
            total += temp*ele.quantity;
        })
        return total
    }
    const grandTotal = () => {
        let total = setCartTotal();
        return total+50
    }
    const showOrder = () => {
        const name = (formRef.current.children[2]).querySelector('input').value
        const email = (formRef.current.children[3]).querySelector('input').value
        const number = (formRef.current.children[4]).querySelector('input').value
        const address = (formRef.current.children[6]).querySelector('input').value
        const zip = (formRef.current.children[7]).querySelector('input').value
        const city = (formRef.current.children[8]).querySelector('input').value
        const country = (formRef.current.children[9]).querySelector('input').value
        setOrderDetail({...orderDetail,name:name,email:email,number:number,address:address,zip:zip,city:city,country:country});
        setCheck(true);
    }
  return (
    <div className='checkout'>
        <Order grandTotal={grandTotal()} display={order} />
      <div id='formDiv' ref={formRef}>
        <h1 id='checkoutTitle'>checkout</h1>
        <h3 id='billingDetail'>Billing Details</h3>
        <div className='billingLabel'>Name<input type='text' placeholder='Name' className='billingInput'/></div>
        <div className='billingLabel'>Email Address<input type='email' placeholder='Mail Address' className='billingInput'/></div>
        <div className='billingLabel'>Phone Number<input type='number' placeholder='Phone Number' className='billingInput'/></div>
        <h3 id='billingDetail'>Shipping Info</h3>
        <div className='billingLabel'>Address<input type='text' placeholder='Address' className='billingInput'/></div>
        <div className='billingLabel'>ZIP Code<input type='number' placeholder='ZIP Code' className='billingInput'/></div>
        <div className='billingLabel'>City<input type='text' placeholder='City Name' className='billingInput'/></div>
        <div className='billingLabel'>Country<input type='text' placeholder='Country Name' className='billingInput'/></div>
      </div>
      <div id='itemDiv'>
        <h1 id='summary'>SUMMARY</h1>
        {cartData!==undefined ?
    <>
    {(cartData).map((ele,i) => { return <div key={i} className='cartItem'><img src={ele.img} className='cartImg'/> <div className='cartItemDetails'> <h3 className='cartItemName'>{ele.link}</h3><h3 className='cartItemRate'>{ele.rate}</h3></div><h3 className='cartItemQuantity'>{ele.quantity}</h3></div>})}
    </> : null}
    {cartData!==undefined ?<div style={{width:'95%',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:'2vh'}}><h3 id='total'>TOTAL</h3><h3 id='cartTotal'>${setCartTotal()}</h3></div>:null}
    <div style={{width:'95%',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:'2vh'}}><h3 id='total'>SHIPPING</h3><h3 id='cartTotal'>$50</h3></div>
    <div style={{width:'95%',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:'2vh'}}><h3 id='total'>GRAND TOTAL</h3><h3 style={{color:'#D87D4A'}} id='cartTotal'>${grandTotal()}</h3></div>
    <button id='pay' onClick={showOrder}>CONTINUE & PAY</button>
      </div>
    </div>
  )
}
