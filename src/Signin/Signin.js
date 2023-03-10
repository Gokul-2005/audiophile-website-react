import React, { useEffect, useRef, useState } from 'react'
import './Signin.css'
import {Link} from 'react-router-dom';

export default function Signin(props) {
    const [link,setLink] = useState('/signIn')
    const [user,setUser] = useState('');
    const signInFormRef = useRef(null);
    const signUpFormRef = useRef(null);

    useEffect(() => {
        if(user !== ''){
        localStorage.setItem('user',user);    
        setLink(`/Home`)
        console.log(link);
        }
    },[user])
    useEffect(()=>{console.log(((signUpFormRef.current.children[1].value).trim()==='') && ((signUpFormRef.current.children[3].value).trim()===''))},[link])
    const setFormData = (ele,type) => {
        let obj ;
        if(type==='signIn'){
            (signInFormRef.current.children[1].value).trim()==='' || (signInFormRef.current.children[3].value).trim()==='' ? alert('Please Enter the All The Fields'):type==='signIn' ? obj = {username:signInFormRef.current.children[1].value , password : signInFormRef.current.children[3].value , type:type} : obj = {username:signUpFormRef.current.children[1].value , password : signUpFormRef.current.children[3].value , type:type};
        }
        else{
            (signUpFormRef.current.children[1].value).trim()==='' || (signUpFormRef.current.children[3].value).trim()==='' ? alert('Please Enter the All The Fields'):type==='signIn' ? obj = {username:signInFormRef.current.children[1].value , password : signInFormRef.current.children[3].value , type:type} : obj = {username:signUpFormRef.current.children[1].value , password : signUpFormRef.current.children[3].value , type:type};
        }
        if(type==='signIn'){
            if(((signInFormRef.current.children[1].value).trim()==='') && ((signInFormRef.current.children[3].value).trim()==='')){
            }
            else{
                checkUser(obj);
            }
        }
        else{
            if(((signUpFormRef.current.children[1].value).trim()==='') && ((signUpFormRef.current.children[3].value).trim()==='')){
            } 
            else{
                checkUser(obj);
            }
        }
        
    }

    const checkUser = async (obj) => {
         await fetch('http://localhost:5004/signIn',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(obj)})
         .then((result) => {return result.text()})
         .then((data) => {
            if(data.includes('exists')){
                alert('User Already Exists, Please Sign-In');
            }
            if(data.includes('Not')){
                alert('User Not Found, Please Create An Account');
            }
            else{
                setUser(data);
                setLink(`/Home?user=${data}`)
                props.flag(true);
                props.user(data);
            }
         })
         .catch ((errors) => {console.error(errors)})
      };
    
  return (
    <div className="container">
  <div className="left-container">
    <h1>
      Log-In to your &nbsp;&nbsp;&nbsp;&nbsp; <br></br>
      <span>audiophile!</span>
    </h1>
    <div className="sign-in-form form" ref={signInFormRef}>
      <label htmlFor="username">Username</label>
      <input type="text" id="username" name="username" required />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" required />
      <input type="text" hidden defaultValue="signin" name="type" />
    </div>
    <Link style={{textDecoration:'none',color:'white'}} to={link} className='signButton' onClick={(event) => {setFormData(event,'signIn')}} >Sign In</Link>
  </div>
  <div className="right-container">
    <h1>Create your account</h1>
    <div className="sign-up-form form" ref={signUpFormRef}>
      <label htmlFor="new-username">Username</label>
      <input type="text" id="new-username" name="username" required />
      <label htmlFor="new-password">Password</label>
      <input type="password" id="new-password" name="password" required />
      <input type="text" hidden defaultValue="signUp" name="type" />
    </div>
    <Link style={{textDecoration:'none',color:'white'}} to={link} className='signButton' onClick={(event) => {setFormData(event,'signUp')}}>Sign Up</Link>
  </div>
</div>

  )
}
