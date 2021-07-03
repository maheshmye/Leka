import React, { useState } from 'react'
import Input from '../input/input' 
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../../actions'
import { Redirect } from 'react-router'
/**
* @author
* @function SignUp
**/


const SignUp = (props) => {
    const [Firstname,setFirstname]=useState("")
    const [Lastname,SetLastname]=useState("")
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const dispatch=useDispatch()
    const auth=useSelector(state => state.auth)
    // console.log(auth.firstname,"testing")
    const registeruser =(e) =>{
        e.preventDefault()
        const user={
            Firstname,Lastname,username,password
        }
        dispatch(signup(user))
    }
    if(auth.authenticated){
      return <Redirect to={"/"} />
    }
  return(
    <div className="registrationui">
      <h1 style={{color:"#206A5D"}}>signup</h1>
      <form onSubmit={registeruser}>
    <Input
    type="Firstname"
    placeholder="Firstname"
    value={Firstname}
    onChange={(e) =>setFirstname(e.target.value)}
    />
    <Input
    type="lastname"
    placeholder="lastname"
    value={Lastname}
    onChange={(e)=>SetLastname(e.target.value)}
    />
     <Input
    type="username"
    placeholder="username"
    value={username}
    onChange={(e)=>setUsername(e.target.value)}/>
     <Input
    type="password"
    placeholder="password"
    value={password}
    onChange={(e)=>setPassword(e.target.value)}/>
    <div style={{textAlign:'center'}}><Input type="submit" value="signup" /></div>
    
    
</form></div>
   )

 }

export default SignUp