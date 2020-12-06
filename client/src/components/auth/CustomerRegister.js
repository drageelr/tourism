import React, { Component } from "react";
import classnames from "classnames";
import {
    Button,
    Form,
    FormGroup,
    Input
} from 'reactstrap';    
var api = require('./api');

class CustomerRegister extends Component {
    // Can Add Constructor
    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        rePassword: "",
        errors: {}
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }
    componentDidUpdate(prevprops) {
        if (prevprops.errors !== this.props.errors) {
            this.setState({
                errors: this.props.errors
            });
        }
    }
    componentDidMount=()=>{
        if(this.props.auth)
        {
            this.props.history.push("/home");
        }
    }
    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
            rePassword: this.state.rePassword
        }
        api.apiCallerWithToken('http://localhost:8080/api/auth/customer/signup', newUser, 200).then(res=>  console.log(res))
    }
    render() {
        const { errors } = this.state;
        console.log("Here: ", errors);
        return (
            <div className="home-page">
                <div className="container main">
                <p className="brand-name">BOOK MY TRIP</p>
                <p className="title">Register</p>
                   <Form className="reg-form mt-3" noValidate onSubmit={this.onSubmit}>
                        <FormGroup>
                                    <Input
                                        type="text"
                                        placeholder="First Name"
                                        onChange={this.onChange}
                                        value={this.state.firstName}
                                        error={errors.firstName}
                                        id="firstName"
                                    />
                        </FormGroup>
                        <FormGroup>
                                    <Input
                                        type="text"
                                        placeholder="Last Name"
                                        onChange={this.onChange}
                                        value={this.state.lastName}
                                        error={errors.lastName}
                                        id="lastName"
                                    />
                            
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type="text"
                                placeholder="Enter your email address"
                                onChange={this.onChange}
                                value={this.state.email}
                                error={errors.email}
                                id="email"
                                className={classnames("input-field", {
                                    invalid: errors.email
                                })}
                            />
                            {/* <span className="red-text">{errors.email}</span> */}
                        </FormGroup>
                        <FormGroup className="password-container">
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                onChange={this.onChange}
                                value={this.state.password}
                                error={errors.password}
                                id="password"
                                className={classnames("input-field", {
                                    invalid: errors.password
                                })}

                            />
                            <p></p>
                            <Input
                                type="password"
                                placeholder="Re-enter your password"
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
                            <Button className="signup-btn">Sign Up</Button>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}
export default CustomerRegister;