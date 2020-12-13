import React, { Component } from 'react';
import {
    Table
} from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faEye } from "@fortawesome/free-solid-svg-icons";
var link = require('./name.js');
var api = require('./auth/api.js');
class ViewAllTripAdmin extends Component {
    state = {
        trips: [{ id: 1, name: "l", price: 1, capacity: 0, startDate: "01-01-1999", endDate: "01-01-1999" }],
        currentObj: {},
        today: new Date(),
        id: this.props.location.state.id,
        name: this.props.location.state.name,
        price: this.props.location.state.price,
        capacity: this.props.location.state.capacity
    }
    date= (dateStr)=>{
        console.log(dateStr)
        let dateSplit = dateStr.split("-");
        let day = parseInt(dateSplit[0]);
        console.log(day)
        let month = parseInt(dateSplit[1]) - 1; // I did this because month when given to the date constructor only accepts 0 - 11 values (where 11 represents December and 0 represents Jan)
        console.log(month)
        let year = parseInt(dateSplit[2]);
        console.log(year)
        let datee = new Date(Date.UTC(year, month, day + 1));
        return datee.toDateString()
    }
    display = () => {
        console.log(this.state.trips)
        const addedTrips = this.state.trips.map((i, index) =>
            <tr>
                <td className="title-sm-b-s">{i.id}</td>
                <td className="title-sm-b-s">{i.name}</td>
                <td className="title-sm-b-s">{i.price}</td>
                <td className="title-sm-b-s">{i.capacity}</td>
                <td className="title-sm-b-s">{this.date(i.startDate)}</td>
                <td className="title-sm-b-s">{this.date(i.endDate)}</td>
                <td className="title-sm-b-s"><button><FontAwesomeIcon onClick={() => { this.props.history.push('/edit-trip/admin?id=' + i.id); }} style={{ color: "#2E5984" }} icon={faPen} size="1x" /></button></td>
                <td className="title-sm-b-s"><button><FontAwesomeIcon onClick={() => { this.props.history.push('/view-response/admin?id=' + i.id); }} style={{ color: "#2E5984" }} icon={faEye} size="1x" /></button></td>
            </tr>

        );
        return (
            <Table className="tablee" responsive >
                <tr>
                    <th className="title-sm-b">Trip ID</th>
                    <th className="title-sm-b">Trip Name</th>
                    <th className="title-sm-b">Trip Price</th>
                    <th className="title-sm-b">Trip capacity</th>
                    <th className="title-sm-b">Trip start date</th>
                    <th className="title-sm-b">Trip end date</th>
                    <th className="title-sm-b">Edit</th>
                    <th className="title-sm-b">Responses</th>
                </tr>
                {addedTrips}
            </Table>
        );
    }
    componentDidMount() {
        console.log(
            this.state.name, this.state.id, typeof this.state.id)
        const orgObj = {
            startDate: new Date(),
            id: this.state.id,
            name: this.state.name,
            price: this.state.price,
            capacity: this.state.capacity

        };
        let copyObj = {};
        let keysToCopy = Object.keys(orgObj);
        for (let k of keysToCopy) {
            if (orgObj[k] !== "" && orgObj[k] !== 0) {
                copyObj[k] = orgObj[k];
            }
        }
        
        api.apiCallerWithoutToken(link+"trip/fetch", copyObj
            , 200).then(
                (e) => {
                    console.log(e)
                    if (e.statusCode == 200) {
                        if (e.trips !== []) {
                            this.setState({ trips: e.trips });
                            this.render()
                        }
                    }
                    else {
                        alert("Wrong criteria")

                    }

                });
    }
    render() {
        return (
            <div style={{ marginLeft: '20px' }}>
                <div className="main-container">
                    <p className="title-med-left">Trip Details</p>
                    {this.display()}
                    <p className="title-med-left">Create Trip:
                    <FontAwesomeIcon onClick={() => { this.props.history.push('/create-trip/admin'); }} style={{ color: "white", backgroundColor: "#2E5984", marginLeft: "40px" }} icon={faPlus} size="1x" />
                    </p>
                </div>
            </div>
        )
    }
}
export default ViewAllTripAdmin;