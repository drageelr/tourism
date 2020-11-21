import React, { Component } from 'react';
import axios from "axios"
import {
    Button,
    Form,
    FormGroup,
    Input
} from 'reactstrap';

class AddUser extends Component {
    state = {
        email: "",
        errors: {}
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }
    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email
        }
        console.log(userData);
        axios
            .post("/api/users/add-user",userData)
            .then(res => 
                window.location.href="/home"
            )
            .catch(err => {

                console.log(err.response)
                this.setState({
                    email: "",
                    errors: err.response.data
                })
            })
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="home-page">
                <div className="container main">
                    <p className="brand-name">BOOK MY TRIP</p>
                    <p className="title">Add User</p>
                    <Form className="reg-form" noValidate onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Input
                                className="input-field"
                                type="email"
                                placeholder="Enter the email address"
                                onChange={this.onChange}
                                value={this.state.email}
                                error={errors.email}
                                id="email"
                            />
                            <p></p>
                            <p></p>
                            <p className="text">Please enter email of new user and ask them to follow instructions in email</p>
                    
                        </FormGroup>
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
export default AddUser;