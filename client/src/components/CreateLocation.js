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
class CreateLocation extends Component {
  // Can Add Constructor
  state = {
    modal: true,
    site: "",
    city:"",
    province:"",
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
          site: this.state.site,
          city: this.state.city,
          province: this.state.province
        }

        api.apiCallerWithToken("http://localhost:8080/api/location/create", userData,200).then( res =>
        {
          if(res.statusCode == 200)
          {  
          this.props.history.push("/create-trip"); 
          console.log(res)}
          else{
              alert("Error")
          }}
       )
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
        <p className="title-med"> Create Location </p>
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
                <Label className="title-sm">Site:</Label>
                <Input
                  type="text"
                  style = {{marginLeft:"115px"}}
                  id="site"
                  placeholder="Enter Site"
                  onChange={this.onChange}
                  value={this.state.site}
                />
                <Label className="title-sm-l">City:</Label>
                <Input
                  type="text"
                  style = {{marginLeft:"55px"}}
                  id="city"
                  placeholder="Enter City"
                  onChange={this.onChange}
                  value={this.state.city}
                />
              </FormGroup>
              <FormGroup style={{ width: "100%", paddingBottom: "30px" }}>
               
                <Label className="title-sm">Province:</Label>
                <Input
                  style = {{marginLeft:"65px"}}
                  type="text"
                  placeholder="Enter Province"
                  onChange={this.onChange}
                  value={this.state.province}
                  id="province"
                />
                
              </FormGroup>
            </div>
          </div>
          <div className="btn-handler">
            <Button className="signup-btn" type="submit">Create</Button>
            <Button className="signup-btn" type="reset" onClick={this.toggle}>Cancel</Button>
          </div>
          
          <p style={{margin:"15px"}}>/</p>
        </Form>
      </Modal>
    );
  }
}
export default CreateLocation

