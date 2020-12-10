import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
    Button,
    Form,
    FormGroup,
    Input
} from 'reactstrap';
var api = require('./api');



class CustomerLogin extends Component {
    state = {
        email: "",
        password: "",
        errors: {}
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }
    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        api.apiCallerWithoutToken("http://localhost:8080/api/auth/customer/login", userData, 200).then(res =>
            {   console.log(res)
                if(res.statusCode == 200)
                {  
                    window.localStorage.setItem('token', res.token);
                    this.props.history.push("/home"); 
                    console.log(res)}
                    else{
                        alert("Error")
                }}
        ).catch(e=>console.log(e))
    }

    render() {

        return (
            <div className="home-page">
                <div className="container main">
                    <p className="brand-name">BOOK MY TRIP</p>
                    <p className="title">Login</p>
                    <Form className="reg-form" noValidate onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Input
                                type="email"
                                placeholder="Enter your email address"
                                onChange={this.onChange}
                                value={this.state.email}
                                id="email"
                            />
                        </FormGroup>
                        <FormGroup className="password-container">
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                onChange={this.onChange}
                                value={this.state.password}
                                id="password"
                            />
                        </FormGroup>
                        <div className="btn-handler">
                            <Link to="/forgot-password" className="link" style={{marginleft:"14%"}}>Forgot Password? :(</Link>
                        </div>  
                        <div className="btn-handler">
                            <Button className="signup-btn">LOGIN</Button>
                        
                            <Button className="signup-btn" onClick={()=>{
                                this.props.history.push('/register');}}>SIGNUP</Button>
                        </div>
                        <div className="btn-handler">
                        <Link to="/login-admin" className="link">Login as Admin</Link>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}

export default CustomerLogin;   