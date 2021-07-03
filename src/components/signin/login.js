import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signin } from '../../actions'
import Input from '../input/input'
import { Redirect } from 'react-router'

/**
* @author
* @function SignIn
**/

const SignIn = (props) => {
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const dispatch=useDispatch()
    const auth=useSelector(state => state.auth)
    // useEffect(() => {
    //     if(!auth.authenticated){

    //     }
    // })
    const userSignin=(e)=>{
        e.preventDefault()
        const user={
            username,password
        }
        dispatch(signin(user))
    }
    if(auth.authenticated){
        return <Redirect to={"/"} />
    }
  return(
    <div className="registrationui">
        <h1 style={{color:"#206A5D"}}>signin</h1>
        
        <form onSubmit={userSignin}>
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
            <div ><Input  type="submit" value="login" /></div>
            
        </form>
    </div>
   )

 }

export default SignIn