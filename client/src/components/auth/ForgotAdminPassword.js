import React, { Component } from 'react';
import axios from "axios"
import {
    Button,
    Form,
    FormGroup,
    Input
} from 'reactstrap';
var api = require('./api');

class ForgotAdminPassword extends Component {
    state = {
        password: "",
        rePassword: "",
        errors: {}        
    }
    componentDidMount=()=>{
        if(this.props.auth)
        {
            this.props.history.push("/home");
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            password: this.state.password,
        }
        const token = window.location.href.substring( window.location.href.lastIndexOf('/') + 1)
        window.localStorage.setItem('token', token)
        api.apiCallerWithToken("http://localhost:8080/api/account/admin/forgot-password/res", userData,200).then(res=>  console.log(res))

    }

    render() {
        const { errors } = this.state;
        return (
            <div className="home-page">
                <div className="container main">
                    <p className="brand-name">BOOK MY TRIP</p>
                    <p className="title">Change Password</p>
                    <Form className="reg-form" noValidate onSubmit={this.onSubmit}>
                        <FormGroup className="password-container">
                            
                            <Input 
                                className="input-field"
                                type="password" 
                                placeholder="Enter new password" 
                                onChange={this.onChange}
                                value={this.state.password} 
                                error={errors.password} 
                                id="password"
                                />
                            <p></p>
                            <Input 
                                className="input-field"
                                type="password" 
                                placeholder="Confirm new password" 
                                onChange={this.onChange}
                                value={this.state.rePassword} 
                                error={errors.rePassword} 
                                id="rePassword"
                                />
                            <div className="pop-up">
                                Password must be greater than 8 characters long and
                                must contain atleast 1 digit and 1 special character
                            </div>
                        </FormGroup>
                        <div className="btn-handler">
                            <Button className="signup-btn">Confirm</Button>
                        </div>
                    </Form>
                </div>    
            </div>
        )
    }
}
export default ForgotAdminPassword;