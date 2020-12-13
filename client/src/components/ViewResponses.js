import React, { Component } from 'react';
import axios from "axios"
import {
    Table
} from 'reactstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
var link = require('./name.js');
var api = require('./auth/api.js');
class ViewResponses extends Component {
    state = {
        trips: [],
        rejectTrip: this.rejectTrip,
        acceptTrip: this.acceptTrip,
        currentObj: {}
    }
    acceptTrip = (item) => {
         api.apiCallerWithToken(link+"trip-req/edit", { id: item.id, accepted: 1 }, 200).then
         (res => {if(res.statusCode == 200)
         {  
            this.setState({ [item.accepted]: 1 })}
         else{
             alert("Error")
         }
        })
    }

    rejectTrip = (item) => {
        console.log(item)
         api.apiCallerWithToken(link+"trip-req/edit", { id: item.id, accepted: -1 }, 200).then
         (res => {if(res.statusCode == 200)
         {  
            this.setState({ [item.accepted]: -1 })}
         else{
             alert("Error")
         }
        })
    
    }
    if = (e) => {
        if (e.accepted == 1)
            return (<td className="title-sm-b-s">Accepted</td>);
        else if (e.accepted === 0)
            return (<td className="title-sm-b-s"><button onClick={()=>{this.acceptTrip(e)}}><FontAwesomeIcon  style={{ color: "#2E5984" }} icon={faCheck} size="2x" /></button></td>);
        else
            return (<br />);
    }
    if2 = (e) => {
        if (e.accepted == -1)
            return (<td className="title-sm-b-s">Rejected</td>);
        else if (e.accepted === 0)
            return (
                <td className="title-sm-b-s"><button><FontAwesomeIcon onClick={(res) => {this.rejectTrip(e)}
                } style={{ color: "#2E5984" }} icon={faTimes} size="2x" /></button></td>);
        else
            return (<br />);
    };
    componentDidMount() {

        api.apiCallerWithToken(link+"trip-req/fetch", {
            tripID: window.location.href.substring(window.location.href.lastIndexOf('=') + 1)
        }, 200).then(
            (e) => {
                console.log(e)
                if (e.tripReqs !== []) {
                    this.setState({ trips: e.tripReqs });
                }
            });
    }
    render() {

        return (
            <div style={{ marginLeft: '20px' }}>
                <div className="main-container">
                    <p className="title-med-left">Responses</p>
                    <Table className="tablee" responsive >
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
                                <td className="title-sm-b-s">{i.tripID}</td>
                                <td className="title-sm-b-s">{i.customerID}</td>
                                <td className="title-sm-b-s">{i.code}</td>
                                <td className="title-sm-b-s">{i.numberOfPeople}</td>
                                <td className="title-sm-b-s">{i.amountDue}</td>
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