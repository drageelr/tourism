import React, { Component } from 'react';
import {
    Table
} from 'reactstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen,  faPlus, faEye } from "@fortawesome/free-solid-svg-icons";

var api = require('./auth/api.js');
class ViewAllTripAdmin extends Component {
    state = {
        trips: [{
            name: "hey",
            id: 121,
            description: "",
            itienrary: "",
            price: 0,
            capacity: 0,
            startDate: Date,
            endDate: Date,
            loc_ids: []
        }],
        currentObj: {},
        today: new Date()
    }
    render() {
        api.apiCallerWithoutToken("http://localhost:8080/api/trip/fetch", {startDate: this.state.today}, 200).then(res =>
            console.log(res)
        )
        return (
            <div style={{ marginLeft: '20px' }}>
                <div className="main-container">
                    
                    <p className="title-med-left">Trip Details</p>
                    <Table className = "tablee" responsive >
                            <tr>
                                <th className="title-sm-b">Trip ID</th>
                                <th className="title-sm-b">Trip Name</th>
                                <th className="title-sm-b">Trip Price</th>
                                <th className="title-sm-b">Trip capacity</th>
                                <th className="title-sm-b">Trip start date</th>
                                <th className="title-sm-b">Trip end date</th>
                                <th className="title-sm-b">Edit</th>
                                <th className="title-sm-b">Delete</th>
                                <th className="title-sm-b">Responses</th>
                            </tr>
                            {this.state.trips.map(i => {
                                return (<tr>
                                    <td className = "title-sm-b-s">{i.id}</td>  
                                    <td className = "title-sm-b-s">{i.name}</td>
                                    <td className = "title-sm-b-s">{i.price}</td>
                                    <td className = "title-sm-b-s">{i.capacity}</td>
                                    <td className = "title-sm-b-s">{i.startDate}</td>
                                    <td className = "title-sm-b-s">{i.endDate}</td>
                                    <td className = "title-sm-b-s"><button><FontAwesomeIcon  onClick={() => {this.props.history.push('/edit-trip');}} style={{ color: "#2E5984" }} icon={faPen} size="1x" /></button></td>
                                    <td className = "title-sm-b-s"><button><FontAwesomeIcon  onClick={()=>{}} style={{ color: "#2E5984" }} icon={faEye} size="1x" /></button></td>
                                </tr>);
                            })}
                    </Table>
                    <p className="title-med-left">Create Trip:
                    <FontAwesomeIcon  onClick={() => {this.props.history.push('/create-trip');}} style={{ color: "white", backgroundColor: "#2E5984", marginLeft:"40px"}} icon={faPlus} size="1x" />
                    </p>
                </div>
            </div>
        )
    }
}
export default ViewAllTripAdmin;