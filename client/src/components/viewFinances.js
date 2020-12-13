import React, { Component } from 'react';
import {
    Table
} from 'reactstrap';
var api = require('./auth/api.js');
class ViewFinance extends Component {
    state = {
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        January:"",February:"",March:"",April:"",May:"",June:"",July:"",August:"", September:"", October:"", November:"", December:"",
        today: new Date(),
        i:12,
        yearly:120
    }
    componentDidMount() {
        api.apiCallerWithToken("http://localhost:8080/api/finance/monthly", { month: 0 ,year:2020}, 200).then(
          (e) => {
            if (e.totalAmount !== undefined)
              this.setState({ January: e.totalAmount });
          });
          api.apiCallerWithToken("http://localhost:8080/api/finance/monthly", { month: 1 ,year:2020}, 200).then(
            (e) => {
              if (e.totalAmount !== undefined)
                this.setState({ February: e.totalAmount });
            });
            api.apiCallerWithToken("http://localhost:8080/api/finance/monthly", { month: 2 ,year:2020}, 200).then(
          (e) => {
            if (e.totalAmount !== undefined)
              this.setState({ March: e.totalAmount });
          });
          api.apiCallerWithToken("http://localhost:8080/api/finance/monthly", { month: 3 ,year:2020}, 200).then(
          (e) => {
            if (e.totalAmount !== undefined)
              this.setState({ April: e.totalAmount });
          });
          api.apiCallerWithToken("http://localhost:8080/api/finance/monthly", { month: 4 ,year:2020}, 200).then(
          (e) => {
            if (e.totalAmount !== undefined)
              this.setState({ May: e.totalAmount });
          });
          api.apiCallerWithToken("http://localhost:8080/api/finance/monthly", { month: 5 ,year:2020}, 200).then(
          (e) => {
            if (e.totalAmount !== undefined)
              this.setState({ June: e.totalAmount });
          });
          api.apiCallerWithToken("http://localhost:8080/api/finance/monthly", { month: 6 ,year:2020}, 200).then(
          (e) => {
            if (e.totalAmount !== undefined)
              this.setState({ July: e.totalAmount });
          });
          api.apiCallerWithToken("http://localhost:8080/api/finance/monthly", { month: 7 ,year:2020}, 200).then(
          (e) => {
            if (e.totalAmount !== undefined)
              this.setState({ August: e.totalAmount });
          });
          api.apiCallerWithToken("http://localhost:8080/api/finance/monthly", { month: 8 ,year:2020}, 200).then(
          (e) => {
            if (e.totalAmount !== undefined)
              this.setState({ September: e.totalAmount });
          });
          api.apiCallerWithToken("http://localhost:8080/api/finance/monthly", { month: 9 ,year:2020}, 200).then(
          (e) => {
            if (e.totalAmount !== undefined)
              this.setState({ October: e.totalAmount });
          });
          api.apiCallerWithToken("http://localhost:8080/api/finance/monthly", { month: 10 ,year:2020}, 200).then(
          (e) => {
            if (e.totalAmount !== undefined)
              this.setState({ November: e.totalAmount });
          });
          api.apiCallerWithToken("http://localhost:8080/api/finance/monthly", { month: 11 ,year:2020}, 200).then(
          (e) => {
            if (e.totalAmount !== undefined)
              this.setState({ December: e.totalAmount });
          });
          api.apiCallerWithToken("http://localhost:8080/api/finance/yearly", { year:2020}, 200).then(
          (e) => {
            if (e.totalAmount !== undefined)
              this.setState({ yearly: e.totalAmount });
          });
      }
      
    display = () => {
        const addedTrips = (
            <tbody>
            <tr>
                <td className="title-sm-b-s">{this.state.months[0]}</td>
                <td className="title-sm-b-s">{this.state.January}</td>
            </tr>
            <tr>
            <td className="title-sm-b-s">{this.state.months[1]}</td>
            <td className="title-sm-b-s">{this.state.February}</td>
        </tr>
        <tr>
        <td className="title-sm-b-s">{this.state.months[2]}</td>
        <td className="title-sm-b-s">{this.state.March}</td>
    </tr>
    <tr>
    <td className="title-sm-b-s">{this.state.months[3]}</td>
    <td className="title-sm-b-s">{this.state.April}</td>
</tr>
<tr>
    <td className="title-sm-b-s">{this.state.months[4]}</td>
    <td className="title-sm-b-s">{this.state.May}</td>
</tr>
<tr>
    <td className="title-sm-b-s">{this.state.months[5]}</td>
    <td className="title-sm-b-s">{this.state.June}</td>
</tr>
<tr>
    <td className="title-sm-b-s">{this.state.months[6]}</td>
    <td className="title-sm-b-s">{this.state.July}</td>
</tr>
<tr>
    <td className="title-sm-b-s">{this.state.months[7]}</td>
    <td className="title-sm-b-s">{this.state.August}</td>
</tr>
<tr>
    <td className="title-sm-b-s">{this.state.months[8]}</td>
    <td className="title-sm-b-s">{this.state.September}</td>
</tr>
<tr>
    <td className="title-sm-b-s">{this.state.months[9]}</td>
    <td className="title-sm-b-s">{this.state.October}</td>
</tr>
<tr>
    <td className="title-sm-b-s">{this.state.months[10]}</td>
    <td className="title-sm-b-s">{this.state.November}</td>
</tr>
<tr>
    <td className="title-sm-b-s">{this.state.months[11]}</td>
    {console.log(this.state.months[11], this.state.December)}
    <td className="title-sm-b-s">{this.state.December}</td>
</tr>   
</tbody>
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

                    <p className="title-med-left">Trip Details</p>
                    {this.display()}

                    <p className="title-med-left">Yearly Sum :{this.state.yearly}
                    
                    </p>
                </div>
            </div>
        )
    }
}
export default ViewFinance;