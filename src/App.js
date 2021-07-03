
import './App.css';
import {BrowserRouter as Router,Route} from "react-router-dom"
import Home from './containers/homepage/home';
import Login from './containers/loginpage/login';
import Register from './containers/registerpage/register';
import PrivateRoute from './components/privateroute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isuserlogged } from './actions';
function App() {

const auth=useSelector(state => state.auth)
const dispatch=useDispatch()  
useEffect(() => {
    if(!auth.authenticated){
      dispatch(isuserlogged())
    }
  },[])
  return <div>
    
    <Router >
      <PrivateRoute path="/" exact component={Home} />
      <Route path="/signin" component={Login} />
      <Route path="/signup" component={Register} />
      </Router> 
  </div>
}

export default App;
