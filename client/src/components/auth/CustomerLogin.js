import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';
import {
    Button,
    Form,
    FormGroup,
    Input
} from 'reactstrap';
import Axios from "axios";
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
        // axios({
        //     method: "post",
        //     url: "http://localhost:8080/api/auth/admin/login",
        //     data: userData,
        //     responseType: "json"
        // }).then(res=>{
        //     console.log(res)
        // }).catch(err=>console.log(err))
        // axios.post("http://localhost:8080/api/auth/admin/login",userData).then(res=>{
        //     console.log(res)
        // }).catch(err=>console.log(err))

        api.apiCallerWithoutToken("http://localhost:8080/api/auth/customer/login", userData, 200).then(res=>  window.localStorage.setItem('token', res.token))
    }

    render(props) {
        const { errors } = this.props;

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
                            <p></p>
                            <Link to="/forgot-password" className="link">Forgot Password? :(</Link>
                            
                        </FormGroup>
                        <div className="btn-handler">
                            <Button className="signup-btn">LOGIN</Button>
                        </div>
                        <div className="btn-handler">
                            <Button className="signup-btn" onClick={()=>{let path = `newPath`; 
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