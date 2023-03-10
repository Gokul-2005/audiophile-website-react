import React, { useContext, useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom';
import { wholeContext } from '../App';
import Category from '../Category/Category';
import './Details.css'
export default function Details(props) {
    const  [Quantity,setQuantity] = useState(1);
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
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const param = queryParams.get('id');
    const param1 = queryParams.get('user');
    const decreaseQuantity = (ele) => {
        let quantity = parseInt(ele.target.parentNode.children[1].innerText);
        quantity =  quantity>1 ? quantity-1 : quantity;
        setQuantity(quantity)
        ele.target.parentNode.children[1].innerText = quantity;
    }
    
    const increaseQuantity = (ele) => {
        let quantity = parseInt(ele.target.parentNode.children[1].innerText);
        quantity = quantity+1;
        setQuantity(quantity)
        ele.target.parentNode.children[1].innerText = quantity;    
    }

    const addToCart = (e,img,rate,link) => {
        const obj = {img:img,rate:rate,link:link,Quantity:Quantity,user:localStorage.getItem('user')};
        setCart(obj)
        e.target.innerText='ADDED TO CART'
    }

    const setCart = async (obj) => {
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
    <div id='Details'>
      {(props.details).map((ele,i) => {
       return (ele.link===param) ? 
       <div key={i} style={{width:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'center'}}><div className='detailMain'>
        <img src={ele.img} id='detailImg' alt='' />
        <div className='detailText'>
        <h3 id='newHeadphone'>{ele.new ?'NEW PRODUCT':null }</h3>
        <h1 className='headphoneTitle'>{ele.title}<br></br>{ele.br}</h1>
        <p className='headphoneDesc'>{ele.desc}</p>
        <br></br>
        <br></br>
        <h3 className='rate'>{ele.rate}</h3>
        <div className='buttonBox'> <button onClick={(event) => {decreaseQuantity(event,this)}} className='quantitybutton'>-</button><span className='quantity'>1</span><button className='quantitybutton' onClick={(event) => {increaseQuantity(event,this)}}>+</button> <button className='addToCart' onClick={(event) => {addToCart(event,ele.img,ele.rate,ele.link)}}>ADD TO CART</button> </div>
        </div>
       </div>
       <div className='detailsBody'>
        <div className='detailBodyLeft'>
            <h1 style={{color:'black'}}>FEATURES</h1>
            <p className='features'>{ele.feature1}</p>
            <p className='features'>{ele.feature2}</p>
        </div>
        <div className='detailBodyRight'>
            <h1 style={{color:'black'}}>IN THE BOX</h1>
            <div className='specs'>
                {
                    (ele.box).map((ele,index) => {
                       return <div key={index} className='specSub'> <h3 className='specsQuantity'>{ele[0]}</h3><h3 className='specsName'>{ele[1]}</h3> </div>
                    })
                }
            </div>
        </div>
        </div>
        <div className='datailsImg'>
            <div className='detailsImgLeft'>
                <img className='detailsImgLeftMain' src={ele.img1} alt='' />
                <img className='detailsImgLeftMain' src={ele.img2} alt='' />
            </div>
            <div className='detailsImgRight'>
            <img className='detailsImgRightMain' src={ele.img3} alt='' />
            </div>
        </div>
        </div>:null
      })}
      <Category user={props.user} />
    </div>
  )
}
