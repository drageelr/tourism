import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faBell } from "@fortawesome/free-solid-svg-icons";
import Modal from 'react-modal';
var api = require('./auth/api');

Modal.setAppElement(document.getElementById('root'));
class RegisterTrip extends Component {
  // Can Add Constructor
  state = {
    modal: true,
    tripID: "",
    customerID: "",
    mobile: "",
    code: "",
    numberOfPeople: 0,
  };
  toggle = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
      
    }));
  };
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
        const userData = {
          tripID: this.state.tripID,
          customerID: this.state.customerID,
          mobile: this.state.mobile,
          code: this.state.code,
          numberOfPeople: this.state.numberOfPeople,
        }

        api.apiCallerWithToken("http://localhost:8080/api/trip-req/create", userData,200).then( this.props.history.push("/home"))
  };
  render() {
    return (
      <Modal
        className = "Modall"
        isOpen={this.state.modal}
        toggle={this.toggle}
        align = "centre"
      >
        <div style={{backgroundColor:"#f5f5f5"}}>
        <p>/</p>
        <p className="title-med"> Register For the Trip </p>
        <p>/</p>
        <FontAwesomeIcon
          onClick={this.toggle}
          style={{
            position: "absolute",
            top: "0px",
            right: "0px",
            color: "#2E5984",
            margin: "20px",
          }}
          icon={faTimes}
          size="1.5x"
        />
        </div>
        <Form className="mt-3" noValidate inline onSubmit={this.onSubmit} >
          <div style={{marginTop:"20px"}}>
            <div style={{ width: "90%", margin: "0 auto"}}>
            <FormGroup style={{ width: "100%", paddingBottom: "30px" }}>
                <Label className="title-sm">Trip ID:</Label>
                <Input
                  type="text"
                  style = {{marginLeft:"115px"}}
                  id="tripID"
                  placeholder="Enter Trip ID"
                  onChange={this.onChange}
                  value={this.state.tripID}
                />
                <Label className="title-sm-l">Customer ID:</Label>
                <Input
                  type="text"
                  style = {{marginLeft:"55px"}}
                  id="customerID"
                  placeholder="Enter Customer ID"
                  onChange={this.onChange}
                  value={this.state.customerID}
                />
              </FormGroup>
              <FormGroup style={{ width: "100%", paddingBottom: "30px" }}>
                <Label className="title-sm">Mobile Number:</Label>
                <Input
                  type="number"
                  style = {{marginLeft:"30px"}}
                  id="mobile"
                  placeholder="Enter Mobile Number"
                  onChange={this.onChange}
                  value={this.state.mobile}
                />
                <Label className="title-sm-l">Promo Code:</Label>
                <Input
                  style = {{marginLeft:"55px"}}
                  type="text"
                  placeholder="Enter Promo Code"
                  onChange={this.onChange}
                  value={this.state.code}
                  id="code"
                />
                
              </FormGroup>
              <FormGroup style={{ width: "100%", paddingBottom: "30px" }}>
                <Label className="title-sm">Number of People:</Label>
                <Input
                  style = {{marginLeft:"30px"}}
                  onChange={this.onChange}
                  value={this.state.numberOfPeople}
                  type="number"
                  id="numberOfPeople"
                  placeholder="0"
                  name="quantity" 
                  min="1" 
                  max="20"
                />
              </FormGroup>
            </div>
          </div>
          <div className="btn-handler">
            <Button className="signup-btn" type="submit">Register</Button>
            <Button className="signup-btn" type="reset" onClick={this.toggle}>Cancel</Button>
          </div>
          
          <p style={{margin:"15px"}}>/</p>
        </Form>
      </Modal>
    );
  }
}
export default RegisterTrip
