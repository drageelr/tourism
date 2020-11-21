import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {
    Button,
    Form,
    FormGroup,
    Input
} from 'reactstrap';

class Login extends Component {
    state = {
        email: "",
        password: "",
        errors: {}
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }
    componentDidUpdate=()=> {
        if (this.props.loggedIn) {
            this.props.history.push("/home");
        }
    }
    componentDidMount=()=>{
        if(this.props.loggedIn)
        {
            this.props.history.push("/home");
        }
    }
    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData);

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
                    </Form>
                </div>
            </div>
        )
    }
}

export default Login;