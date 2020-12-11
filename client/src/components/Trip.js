
import React, { Component } from 'react';
import {
    Table,
    Button,
    Form
} from 'reactstrap';

var api = require('./auth/api.js');
class Trip extends Component {
    state = {
        trips: [{ id: 1, name: "l", price: 1, capacity: 0, startDate: new Date(), endDate: new Date }],
    }

    componentDidMount() {
        api.apiCallerWithoutToken("http://localhost:8080/api/trip/fetch", {
            id:
                window.location.href.substring(window.location.href.lastIndexOf('=') + 1),
        }, 200).then(
            (e) => {
                if (e.trips !== []) {
                    this.setState({ trips: e.trips });
                    this.render()
                    console.log(this.state.trips[0])
                }
            });
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.props.history.push("/register-trip?="+window.location.href.substring(window.location.href.lastIndexOf('=') + 1));
    
        
      };
    render() {
        return (
            <div style={{ marginLeft: '20px' }}>
                <div className="main-container">
                    <p className="title-med-left">Trip Details</p>
                    <Form className="mt-3" noValidate inline onSubmit={this.onSubmit} >
                        <Table className="tablee" responsive >
                            <tr>
                                <td className="title-sm-b"></td>
                                <td className="title-med">{this.state.trips[0].name}</td>
                                <td className="title-sm-b"></td>
                            </tr>
                            <tr>
                                <td className="title-sm-b">Trip ID: {this.state.trips[0].id}</td>
                                <td className="title-sm-b"><br></br></td>
                                <td className="title-sm-b">Price: {this.state.trips[0].price}</td>

                            </tr>
                            <tr>
                                <td className="title-sm-b"></td>
                                <td className="title-sm-b"></td>
                                <td className="title-sm-b">Capacity:{this.state.trips[0].capacity}</td>
                            </tr>
                            <tr>
                                <td className="title-sm-b">Description: <br /> {this.state.trips[0].description}</td>
                            </tr>
                            <tr>
                                <td className="title-sm-b">Itinerary: <br /> {this.state.trips[0].itienrary}</td>
                            </tr>
                        </Table>
                        <Button className="signup-btn" type="submit" >Register</Button>
                    </Form>
                </div>
            </div>
        )
    }
}
export default Trip;