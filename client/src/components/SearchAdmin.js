import React, { Component } from 'react';
import {
    Form,
    Table,
    Input, Button, Label
} from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faEye } from "@fortawesome/free-solid-svg-icons";

var api = require('./auth/api.js');
class SearchAdmin extends Component {
    state = {
        trips: [],
        currentObj: {},
        today: new Date(),
        id: "",
        email: "",
        firstName: "",
        lastName: "",
    }
    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
        console.log(e.target.id, typeof e.target.id)
      };
      onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.id, typeof this.state.id)
        this.props.history.push({pathname:'/searchview/admin', state: 
        {id: this.state.id,
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,}})
      };
    display = () => {
        
        return (
            <Form className="mt-3" noValidate inline onSubmit={this.onSubmit} >
            <Table className="tablee" responsive >
                <tr>
                    <th className="title-sm-b"><Input
                    type="number"
                    style={{ marginLeft: "115px" }}
                    id="id"
                    placeholder="Search by ID"
                    onChange={this.onChange}
                    value={this.state.id}
                    /></th>
                    <th className="title-sm-b"><Input
                    type="email"
                    style={{ marginLeft: "115px" }}
                    id="email"
                    placeholder="Search by email"
                    onChange={this.onChange}
                    value={this.state.email}
                    /></th>
                    <th className="title-sm-b"><Input
                    type="text"
                    style={{ marginLeft: "115px" }}
                    id="firstName"
                    placeholder="Search by firstName"
                    onChange={this.onChange}
                    value={this.state.firstName}
                    /></th>
                    <th className="title-sm-b"><Input
                    type="text"
                    style={{ marginLeft: "115px" }}
                    id="lastName"
                    placeholder="Search by lastName"
                    onChange={this.onChange}
                    value={this.state.lastName}
                    /></th>
                    
                </tr>
                
            </Table>
            <Button className="signup-btn" type="submit">Search</Button>
            </Form>
        );
    }
    
    render() {
        return (
            <div style={{ marginLeft: '20px' }}>
                <div className="main-container">
                    <p className="title-med-left">Search Trip</p>
                    {this.display()}
                    
                </div>
            </div>
        )
    }
}
export default SearchAdmin;