import React, { Component } from "react";
import {
  Button,
  Table
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from 'react-modal';
var api = require('./auth/api');

Modal.setAppElement(document.getElementById('root'));
class PromoCode extends Component {
  // Can Add Constructor
  constructor(props) {
    super(props);
  this.state = {
    modal: true,
    promos:[]
    }};
  toggle = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
    this.props.history.push("/home/admin");
  };
  remove = (d) => {
    this.setState(
      (state) => {
        const promos = state.promos.filter((item, j) => d !== j);
        return {
          promos,
        };
      },
    );
  };
  display = () => {
    const addedPromos = this.state.promos.map((d, index) =>
      <tr style={{ marginLeft:"10px"}}>
        <td style={{backgroundColor:"#f5f5f5", padding:"10px", marginLeft:"20px"}}>{d.code}</td>
        <td style={{backgroundColor:"#f5f5f5", padding:"10px", marginLeft:"20px"}}>{d.maxDiscount}</td>
        <td style={{backgroundColor:"#f5f5f5", padding:"10px", marginLeft:"20px"}}>{d.discountPercentage}</td>
        <td style={{backgroundColor:"#f5f5f5", padding:"10px", marginLeft:"20px"}}><FontAwesomeIcon onClick={() => {
          api.apiCallerWithToken("http://localhost:8080/api/code/delete", {code:d.code},200).then(this.remove(index))}} style={{ color: "#white" }} icon={faTimes} size="1x" /></td>
      </tr>
    );
    return (
      <Table responsive>
        <tbody>
          <tr style={{ marginLeft:"10px"}}>
        <td className="title-sm-b" style={{color:"white"}}>Code</td>
                    <td className="title-sm-b" style={{color:"white"}}>Maximum Discount</td>
                    <td className="title-sm-b" style={{color:"white"}}>Discount %</td>
                    <td className="title-sm-b" style={{color:"white"}}>Delete</td>
                    </tr>
          {addedPromos}
          
        </tbody>
      </Table>
    );
  }
componentDidMount() {
  api.apiCallerWithoutToken("http://localhost:8080/api/code/fetch", {}, 200).then(
      (e) => {
          if (e.promos !== [])
          {
              this.setState({promos: e.promos });
              this.render()
          }    
      });
}
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
        <p className="title-med"> Promo Codes </p>
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
        <div>
          {this.display()}
        </div>

          <div className="btn-handler">
            <Button className="signup-btn" type="submit" onClick={()=>window.location.href = "/create-promo"}>Create Promo</Button>
            <Button className="signup-btn" type="reset" onClick={this.toggle}>Done</Button>
          </div>
          <p style={{margin:"15px"}}>/</p>
      </Modal>
    );
  }
}
export default PromoCode

