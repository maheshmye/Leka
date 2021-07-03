import React from 'react'
import "/leka/src/App.css"
import  {Link}  from "react-router-dom" 
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions'

/**
* @author
* @function Header
**/

const Header = (props) => {
    const auth=useSelector(state => state.auth)
    const uid=localStorage.getItem("uid")
    const name=localStorage.getItem("firstname")
    const dispatch=useDispatch()
    return(<div className="header">
        <div style={{width:"100px",height:"80px",float:'left',paddingLeft:"20px"}}><h3 ><Link to="/" style={{textDecoration:"none",color:"#194350"}}><h2 style={{fontFamily:"cursive"}}>Leka</h2></Link></h3></div>
        
        {!auth.authenticated? <div><div style={{width:"60px",height:"80px",float:"right",paddingRight:"20px"}} ><h4 ><Link  to="/signup" style={{textDecoration:"none",color:"#194350"}} ><h3 style={{fontFamily:"cursive"}}>Signup</h3></Link></h4></div>
        <div style={{width:"60px",height:"80px",float:"right",paddingRight:"20px"}}><h4 ><Link  to="/signin" style={{textDecoration:"none",color:"#194350"}} ><h3 style={{fontFamily:"cursive",textDecoration:"none"}}>Signin</h3></Link></h4></div></div>:
        <div><div style={{width:"60px",height:"80px",float:"right",paddingRight:"20px"}}><h4 ><Link  to="/signin" style={{textDecoration:"none",color:"#194350"}} onClick={() => dispatch(logout(uid))} ><h3 style={{fontFamily:"cursive"}}>Logout</h3></Link></h4></div>
        <div style={{width:"60px",height:"80px",paddingTop:"3px",fontFamily:"cursive",color:"#053742",float:"right",paddingRight:"38%"}}><h3>{name}</h3></div>
        </div>

 }
        
        
        
    </div>
        
   )}



export default Header