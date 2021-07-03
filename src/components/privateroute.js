import React from 'react'
import { Route ,Redirect} from 'react-router'
/**
* @author
* @function PrivateRoute
**/

const PrivateRoute = ({component:Component,...rest}) => {
  return(
    <div>
        <Route {...rest} component={(props) =>{
            const user=localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null
            if(user){
                return <Component {...props} />
            }
            else{
                return <Redirect to={"/signin"} />
            }}
        } />
    </div>
   )

 }

export default PrivateRoute