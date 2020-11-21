import React, { Component } from 'react';
import { 
  BrowserRouter as Router, 
  Route,
  Switch
} from "react-router-dom";
import { 
  setCurrentUser, 
  logoutUser } 
from "./actions/authActions";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AddUser from './components/auth/AddUser';
import ForgotPassword from './components/auth/ForgotPassword';
import jwt_decode from "jwt-decode";
import Login from './components/auth/Login';
import Register from './components/auth/AdminRegister';
import ResetPassword from './components/auth/ResetPassword';
import setAuthToken from "./utils/setAuthToken";
import store from "./store"
//will keep user logged in even if refreshes too from a react tutorial
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

const  App =()=>{
  return (
    <Router>
      <div className="App">
        <Route path="/register" component={ Register } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/fp" component={ ForgotPassword } />
        <Route exact path="/adduser" component={ AddUser } />
        <Route exact path="/resetpassword" component={ ResetPassword } />
      </div>  
    </Router>   
  );
}

export default App;