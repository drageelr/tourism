import React, { Component } from "react";
import classnames from "classnames";
import {
    Button,
    Form,
    FormGroup,
    Input
} from 'reactstrap';

class Register extends Component {
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
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            rePassword: this.state.rePassword
        }
        const token = window.location.href.substring( window.location.href.lastIndexOf('/') + 1)
        this.props.registerUser(newUser, this.props.history,token);
    }
    render() {
        const { errors } = this.state;
        console.log("Here: ", errors);
        return (
            <div className="home-page">
                <div className="container main">
                <p className="brand-name">BOOK MY TRIP</p>
                <p className="title">Admin Register</p>
                   <Form className="reg-form mt-3" noValidate onSubmit={this.onSubmit}>
                        <FormGroup>
                            <div className="row">
                                <div className="col-md-6 col-xs-12">
                                    <Input
                                        type="text"
                                        placeholder="First Name"
                                        onChange={this.onChange}
                                        value={this.state.firstName}
                                        error={errors.firstName}
                                        id="firstName"
                                    />
                                </div>
                                <div className="col-md-6 col-xs-12">
                                    <Input
                                        type="text"
                                        placeholder="Last Name"
                                        onChange={this.onChange}
                                        value={this.state.lastName}
                                        error={errors.lastName}
                                        id="lastName"
                                    />
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type="email"
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
                            <div className="pop-up">
                                Password must be greater than 8 characters long and
                                must contain atleast 1 digit and 1 special character
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type="password"
                                placeholder="Re-enter your password"
                                onChange={this.onChange}
                                value={this.state.rePassword}
                                error={errors.rePassword}
                                id="rePassword"
                            />
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
export default Register;
