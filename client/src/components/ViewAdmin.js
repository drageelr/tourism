import React, { Component } from 'react';
import {
    Table,
    Input
} from 'reactstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faSave } from "@fortawesome/free-solid-svg-icons";

var api = require('./auth/api.js');
class ViewAdmin extends Component {
    state = {
        admins: [{
            id: 10,
            email: "String - must be email",
            firstName: "String",
            lastName: "String",
            active: 0,
            permission: {
                manageAdmins: 1,
                manageTrips: 1,
                manageReqList: 1,
                manageReports: 1
            }
        },
        {
            id: 10,
            email: "String - must be email",
            firstName: "String",
            lastName: "String",
            active: 1,
            permission: {
                manageAdmins: 1,
                manageTrips: 1,
                manageReqList: 1,
                manageReports: 1
            }
        }
        ],
        currentObj: {},
        save: this.save
    }
    onChange  = (e, index) => {
        const admins = [...this.state.currentObj];
        const i= [e.target.id];
        console.log(i)
        [admins[index].i] = e.target.value
    
        this.setState({ admins });
      }
    save = (item) => {
        const userData = {
                email: this.state.currentObj.email,
                firstName:this.state.currentObj.firstName, 
                lastName: this.state.currentObj.lastName, 
                active: this.state.currentObj.active, 
                permission: {
                    manageAdmins: this.state.currentObj.manageAdmins, 
                    manageTrips: this.state.currentObj.manageTrips, 
                    manageReqList: this.state.currentObj.manageReqList, 
                    manageReports: this.state.currentObj.manageReports}
        };
        api.apiCallerWithToken("http://localhost:8080/api/account/admin/edit", userData, 200).then(res => this.setState({ [this.state.currentObj.accepted]: 1 }))
    }
    render() {
        api.apiCallerWithoutToken("http://localhost:8080/api/trip/fetch", {}, 200).then(res =>
            console.log(res)
        )
        const { errors } = this.state;
        return (
            <div style={{ marginLeft: '20px' }}>
                <div className="main-container">
                    <p className="title-med-left">View Admin</p>
                    <Table className="tablee" responsive >
                        <tr>
                            <th className="title-sm-b">Admin ID</th>
                            <th className="title-sm-b">Email</th>
                            <th className="title-sm-b">Name</th>
                            <th className="title-sm-b">Surname</th>
                            <th className="title-sm-b">Active</th>
                            <th className="title-sm-b">Admin</th>
                            <th className="title-sm-b">Trip</th>
                            <th className="title-sm-b">ReqList</th>
                            <th className="title-sm-b">Reports</th>
                            <th className="title-sm-b">Save</th>
                        </tr>
                        {this.state.admins.map((i,index) => {
                            return (<tr>
                                <td className="title-sm-b-s">{i.id}</td>
                                <td className="title-sm-b-s">{<Input type="text" id="email" onChange={(e)=>{this.onChange(e, index)}} value={i.email}></Input>}</td>
                                <td className="title-sm-b-s">{<Input type="text" id={i.firstName} onChange={this.onChange} value={i.firstName}></Input>}</td>
                                <td className="title-sm-b-s">{<Input type="text" id={i.lastName} onChange={this.onChange} value={i.lastName}></Input>}</td>
                                <td className="title-sm-b-s">{<Input type="checkbox" id={i.active} onChange={this.onChange} value={i.active}></Input>}</td>
                                <td className="title-sm-b-s">{<Input type="checkbox" id={i.permission.manageAdmins} onChange={this.onChange} value={i.permission.manageAdmins}></Input>}</td>
                                <td className="title-sm-b-s">{<Input type="checkbox" id={i.permission.manageTrips} onChange={this.onChange} value={i.permission.manageTrips}></Input>}</td>
                                <td className="title-sm-b-s">{<Input type="checkbox" id={i.permission.manageReqList} onChange={this.onChange} value={i.permission.manageReqList}></Input>}</td>
                                <td className="title-sm-b-s">{<Input type="checkbox" id={i.permission.manageReports} onChange={this.onChange} value={i.permission.manageReports}></Input>}</td>
                                <td className = "title-sm-b-s"><button><FontAwesomeIcon  onClick={this.state.save} style={{ color: "#2E5984" }} icon={ faSave} size="1x" /></button></td>
                            </tr>);
                        })}
                    </Table>
                </div>
            </div>
        )
    }
}
export default ViewAdmin;