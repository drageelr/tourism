import React, { Component } from 'react';
import {
    Form,
    Table,
    Input, Button
} from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faEye } from "@fortawesome/free-solid-svg-icons";


class SearchTripAdmin extends Component {
    state = {
        trips: [{ id: 1, name: "l", price: 1, capacity: 0, startDate: new Date(), endDate: new Date }],
        currentObj: {},
        today: new Date(),
        id: 0,
        name: "",
        price: 0,
        capacity: 0,
    }
    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
        console.log(e.target.id, typeof e.target.id)
      };
      onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.id, typeof this.state.id)
        this.props.history.push({pathname:'/search/admin', state: 
        {id: this.state.id,
        name: this.state.name,
        price: this.state.price,
        capacity: this.state.capacity,}})
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
                    inputmode="numeric"
                    /></th>
                    <th className="title-sm-b"><Input
                    type="text"
                    style={{ marginLeft: "115px" }}
                    id="name"
                    placeholder="Search by Name"
                    onChange={this.onChange}
                    value={this.state.name}
                    /></th>
                    <th className="title-sm-b"><Input
                    type="number"
                    style={{ marginLeft: "115px" }}
                    id="capacity"
                    placeholder="Search by capacity"
                    onChange={this.onChange}
                    value={this.state.capacity}
                    /></th>
                    <th className="title-sm-b"><Input
                    type="number"
                    style={{ marginLeft: "115px" }}
                    id="price"
                    placeholder="Search by price"
                    onChange={this.onChange}
                    value={this.state.price}
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
export default SearchTripAdmin;