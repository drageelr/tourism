import React, { Component } from 'react';
import {
} from 'reactstrap';
import Tab from './subcomponents/Tab';
var api = require('./auth/api');

class TripList extends Component{
    constructor (props) {
        super(props);
        this.state = {
            trips: [],
            form: '',
            id: this.props.location.state.id,
            name: this.props.location.state.name,
            price: this.props.location.state.price,
            capacity: this.props.location.state.capacity
        }
    }
    componentDidMount(){
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
        api.apiCallerWithoutToken("http://localhost:8080/api/trip/fetch", copyObj , 200).then(
          (e) => {
            if (e.trips !== []) {
              this.setState({ trips: e.trips });
              this.render()
            }
          });
      }
    render() {
        const url = "/home/trips/customer";
        const urlTab = "/trips/customer?=";
        const trips = this.state.trips.map((trip,index) =>
            <Tab name={ trip.name } startDate={trip.startDate} endDate={trip.endDate} key={index} link={ urlTab.concat(trip.id.toString())} Description={trip.description}  type="large" />
            
        );
        return (
            <div className="next-layer mt-4">
                <div className="main-container">
                    { trips }
                </div>
            </div>
        );
    }
}

export default TripList


