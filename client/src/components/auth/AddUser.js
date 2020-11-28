import React, { Component } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Input
} from 'reactstrap';
var api = require('./api');

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
        
        api.apiCallerWithToken("http://localhost:8080/api/account/admin/create", userData, 200).then(res=>  console.log(res))

    }

    render() {
        const { errors } = this.state;
        return (
            <div className="home-page">
                <div className="container main">
                    <p className="brand-name">BOOK MY TRIP</p>
                    <p className="title">Add User</p>
                    <Form className="reg-form" noValidate onSubmit={this.onSubmit}>
                        <FormGroup className="password-container">
                            <Input
                                className="input-field"
                                type="email"
                                placeholder="Enter the email address"
                                onChange={this.onChange}
                                value={this.state.email}
                                error={errors.email}
                                id="email"
                            />
                            <div className="pop-up">
                                Please enter email of new user and ask them to follow instructions in email
                            </div>
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