import React, { Component } from 'react';
import axios from "axios"
import {
    Button,
    Form,
    FormGroup,
    Input
} from 'reactstrap';
var api = require('./api');

class CustomerForgotPassword extends Component {
    state = {
        email: "",
        errors: {}
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }
    componentDidMount=()=>{
        if(this.props.auth)
        {
            this.props.history.push("/home");
        }
    }
    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email
        }
        api.apiCallerWithoutToken("http://localhost:8080/api/account/customer/forgot-password/req", userData,200).then(res=>  console.log(res))

    }

    render() {
        const { errors } = this.state;
        return (
            <div className="home-page">
                <div className="container main">
                    {/* <img src={ logo } alt={ "Logo" } /> */}
                    <p className="brand-name">BOOK MY TRIP</p>
                    <p className="title">Forgot Password</p>
                    <Form className="reg-form" noValidate onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Input
                                className="input-field"
                                type="email"
                                placeholder="Enter your email address"
                                onChange={this.onChange}
                                value={this.state.email}
                                error={errors.email}
                                id="email"
                            />
                            <div className="pop-up">
                        Enter the email you used to sign up and a password-reset link will be emailed to you.
                        </div>
                        </FormGroup>
                        
                        <p className="text"></p>
                        <span>{errors.email}</span>
                        <div className="btn-handler">
                            <Button className="signup-btn">Submit</Button>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}
export default CustomerForgotPassword;