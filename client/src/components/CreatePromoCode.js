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
class CreatePromoCode extends Component {
  // Can Add Constructor
  state = {
    modal: true,
    site: "",
    city: "",
    province: "",
  };
  toggle = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
      code: "",
      maxDiscount: 0,
      discountPercentage: 0,

    }));
    this.props.history.push("/home/admin");
  };
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      code: this.state.code,
      maxDiscount: this.state.maxDiscount,
      discountPercentage: this.state.discountPercentage,
    }

    api.apiCallerWithToken("http://localhost:8080/api/code/create", userData, 200).then((res) => {
      if (res.statusCode == 200) {
        this.props.history.push("/view-promo/admin");
        console.log(res)
      }
      else {
        alert("Error")
      }
    })
  };
  render() {
    return (
      <Modal
        className="Modall"
        isOpen={this.state.modal}
        toggle={this.toggle}
        align="centre"
      >
        <div style={{ backgroundColor: "#f5f5f5" }}>
          <p>/</p>
          <p className="title-med"> Create Promo Code </p>
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
          <div style={{ marginTop: "20px" }}>
            <div style={{ width: "90%", margin: "0 auto" }}>
              <FormGroup style={{ width: "100%", paddingBottom: "30px" }}>
                <Label className="title-sm">Code:</Label>
                <Input
                  type="text"
                  style={{ marginLeft: "115px" }}
                  id="code"
                  placeholder="Enter code"
                  onChange={this.onChange}
                  value={this.state.code}
                />
                <Label className="title-sm-l">Maximum Discount:</Label>
                <Input
                  type="number"
                  style={{ marginLeft: "55px" }}
                  id="maxDiscount"
                  placeholder="Enter Maximum Discount Amount"
                  onChange={this.onChange}
                  value={this.state.maxDiscount}
                />
              </FormGroup>
              <FormGroup style={{ width: "100%", paddingBottom: "30px" }}>

                <Label className="title-sm" style={{ marginLeft: "120px" }}>Discount Percentage:</Label>
                <Input
                  style={{ marginLeft: "65px" }}
                  type="number"
                  placeholder="Enter Percentage"
                  onChange={this.onChange}
                  value={this.state.discountPercentage}
                  id="discountPercentage"
                />

              </FormGroup>
            </div>
          </div>
          <div className="btn-handler">
            <Button className="signup-btn" type="submit">Create</Button>
            <Button className="signup-btn" type="reset" onClick={this.toggle}>Cancel</Button>
          </div>

          <p style={{ margin: "15px" }}>/</p>
        </Form>
      </Modal>
    );
  }
}
export default CreatePromoCode

