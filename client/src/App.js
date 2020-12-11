import React, { Component } from 'react';
import { 
  BrowserRouter as Router, 
  Route,
  Switch
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AddUser from './components/auth/AddUser';
import AdminAppNavbar from './components/subcomponents/AdminAppNavbar';
import CustomerAppNavbar from './components/subcomponents/CustomerAppNavbar';
import CustomerForgotPassword from './components/auth/CustomerForgotPassword';
import AdminForgotPassword from './components/auth/AdminForgotPassword';
import CustomerChangePassword from './components/auth/CustomerChangePassword';
import AdminChangePassword from './components/auth/AdminChangePassword';
import CustomerLogin from './components/auth/CustomerLogin';
import AdminLogin from './components/auth/AdminLogin';
import AdminRegister from './components/auth/AdminRegister';
import CustomerRegister from './components/auth/CustomerRegister';
import ViewAllTripAdmin from './components/ViewAllTripAdmin';
import edittripobj from './components/edittripobj';
import ViewAdmin from './components/ViewAdmin';
//will keep user logged in even if refreshes too from a react tutorial
import ViewFinance from './components/ViewFinances';
import RegisterTrip from './components/RegisterTrip';
import CreateLocation from './components/CreateLocation';
import CreatePromoCode from './components/CreatePromoCode';
import PromoCode from './components/PromoCode';
import ViewResponses from './components/ViewResponses';
import ForgotAdminPassword from './components/auth/ForgotAdminPassword';
import ForgotCustomerPassword from './components/auth/ForgotCustomerPassword'
import EditTrip from './components/EditTrip'
import CreateTrip from './components/CreateTrip'
import TripList from './components/TripList'
import Trip from "./components/Trip"
const  App =()=>{
  return (
    <Router>
      <div className="App">
        
      <Route path="/" component={ CustomerAppNavbar } />
        <Route path="/" component={ AdminAppNavbar } />
        <Route path="/view-response/admin" component={ ViewResponses } />
        <Route path="/trips/customer" component={ Trip } />
        <Route path="/home/customer" component={ TripList } />
        <Route path="/edit-trip/admin" component={ EditTrip } />
        <Route path="/home/admin" component={ ViewAllTripAdmin } />
        <Route path="/view-finances/admin" component={ ViewFinance } />
        <Route path="/edit" component={ edittripobj } />
        <Route path="/register" component={ CustomerRegister } />
        <Route path="/register/admin" component={ AdminRegister } />
        <Route exact path="/login/admin" component={ AdminLogin } />
        <Route exact path="/login" component={ CustomerLogin } />
        <Route exact path="/forgot-password" component={ CustomerForgotPassword } />
        <Route exact path="/forgot-password/admin" component={ AdminForgotPassword } />
        <Route exact path="/change-password" component={ CustomerChangePassword } />
        <Route exact path="/change-password/admin" component={ AdminChangePassword } />
        <Route exact path="/view/admin" component={ ViewAdmin } />
        <Route exact path="/add-user/admin" component={ AddUser } />
        <Route exact path="/register-trip" component={ RegisterTrip } />
        <Route exact path="/create-trip/admin" component={ CreateTrip } />
        <Route exact path="/create-location/admin" component={ CreateLocation } />
        <Route exact path="/create-promo/admin" component={ CreatePromoCode } />
        <Route exact path="/view-promo/admin" component={ PromoCode } />
        <Route exact path= "/reset-password" component={ForgotCustomerPassword}/>
        <Route exact path= "/reset-password/admin" component={ForgotAdminPassword}/>
        <Route exact path="/adduser" component={ AddUser } />
      </div>  
    </Router>   
  );
}

export default App;