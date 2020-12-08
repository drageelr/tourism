import React, { Component } from 'react';
import axios from "axios"
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    Table
} from 'reactstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes,faCheck } from "@fortawesome/free-solid-svg-icons";

var api = require('./auth/api.js');
class ViewResponses extends Component {
    state = {
        trips: [{
            tripID: 1212, 
            customerID: 121, 
            code: "String", 
            numberOfPeople: 5, 
            amountDue: 10, 
            accepted: 0
        },
        {
            tripID: 1212, 
            customerID: 121, 
            code: "String", 
            numberOfPeople: 5, 
            amountDue: 10, 
            accepted: 1
        }],
        rejectTrip: this.rejectTrip,
        acceptTrip: this.acceptTrip,
        currentObj: {}
    }
    componentDidMount = () => {
        if (this.props.auth) {
            this.props.history.push("/home");
        }



    }
    acceptTrip = (item) => {
        api.apiCallerWithoutToken("http://localhost:8080/api/trip-req/edit", { id: this.state.currentObj.id, accepted: 1 }, 200).then(res => this.setState({ [this.state.currentObj.accepted]: 1 }))

    }

    rejectTrip = (item) => {
        api.apiCallerWithoutToken("http://localhost:8080/api/trip-req/edit", { id: this.state.currentObj.id, accepted: -1 }, 200).then(res => this.setState({ [this.state.currentObj.accepted]: -1 }))

    }
    if= (e) =>{
        if(e.accepted===1)
         return(<td className = "title-sm-b-s">Accepted</td>);
        else if(e.accepted === 0)
        return (<td className = "title-sm-b-s"><FontAwesomeIcon onClick={this.state.acceptTrip} style={{ color: "#2E5984" }} icon={faCheck} size="2x" /></td>);
        else
        return(<br/>);
    }
    if2 = (e)=>  {
        if(e.accepted===-1)
        return(<td className = "title-sm-b-s">Rejected</td>);
        else if(e.accepted===0)
        return(<td className = "title-sm-b-s"><FontAwesomeIcon  onClick={this.state.rejectTrip} style={{ color: "#2E5984" }} icon={faTimes} size="2x" /></td>);
        else
        return(<br/>);
    };
    render() {
        api.apiCallerWithoutToken("http://localhost:8080/api/trip/fetch", {}, 200).then(res =>
            console.log(res)
        )
        const { errors } = this.state;
        return (
            <div style={{ marginLeft: '20px' }}>
                <div className="main-container">
                    <p className="title-med-left">Trip Details</p>
                    <Table className = "tablee" responsive >
                            <tr>
                                <th className="title-sm-b">Trip ID</th>
                                <th className="title-sm-b">Customer ID</th>
                                <th className="title-sm-b">Code</th>
                                <th className="title-sm-b">Number of People:</th>
                                <th className="title-sm-b">Amount Due</th>
                                <th className="title-sm-b">Accept</th>
                                <th className="title-sm-b">Reject</th>
                            </tr>
                            {this.state.trips.map(i => {
                                return (<tr>
                                    <td className = "title-sm-b-s">{i.tripID}</td>
                                    <td className = "title-sm-b-s">{i.customerID}</td>
                                    <td className = "title-sm-b-s">{i.code}</td>
                                    <td className = "title-sm-b-s">{i.numberOfPeople}</td>
                                    <td className = "title-sm-b-s">{i.amountDue}</td>
                                    {this.if(i)}
                                    {this.if2(i)}
                                </tr>);
                            })}
                    </Table>
                </div>
            </div>
        )
    }
}
export default ViewResponses;