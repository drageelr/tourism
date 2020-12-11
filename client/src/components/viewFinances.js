import React, { Component } from 'react';
import {
    Table
} from 'reactstrap';
var api = require('./auth/api.js');
class ViewFinance extends Component {
    state = {
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        currentObj: {},
        today: new Date()
    }
    display = () => {
        const addedTrips = this.state.months.map((i, index) =>
            <tr>
                <td className="title-sm-b-s">{i}</td>
                {() => api.apiCallerWithoutToken("http://localhost:8080//api/finance/monthly", { month: index, year:2020 }, 200).then((res) => {
                    console.log(res);
                    <td className="title-sm-b-s">{res.totalAmount}</td>
                })}

            </tr>

        );
        return (
            <Table className="tablee" responsive >
                <tr>
                    <th className="title-sm-b">Month</th>
                    <th className="title-sm-b">Income</th>
                </tr>
                {addedTrips}
            </Table>
        );
    }
    render() {
        return (
            <div style={{ marginLeft: '20px' }}>
                <div className="main-container">
                    {console.log("path", this.props.match, this.props.location)}

                    <p className="title-med-left">Trip Details</p>
                    {this.display()}

                    <p className="title-med-left">Yearly Sum:
                    {() => api.apiCallerWithoutToken("http://localhost:8080//api/finance/yearly", {year: 2020}, 200).then((res) => {
                        console.log(res);
                        <td className="title-sm-b-s">{res.totalAmount}</td>
                    })}
                    </p>
                </div>
            </div>
        )
    }
}
export default ViewFinance;