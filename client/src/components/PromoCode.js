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
    data:[{id:1,code:"LOL", maxDiscount:120, discountPercentage:50},{id:1,code:"LOL", maxDiscount:120, discountPercentage:50},{id:1,code:"LOL", maxDiscount:120, discountPercentage:50}],
  }};
  toggle = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
      
    }));
  };
  display = () => {
    const addedPromos = this.state.data.map((d, index) =>
      <tr style={{textAlign: "center"}}>
        <td>{d.code}</td>
        <td>{d.maxDiscount}</td>
        <td>{d.discountPercentage}</td>
        <td><FontAwesomeIcon onClick={() => this.remove(index, d.code)} style={{ color: "#white" }} icon={faTimes} size="1x" /></td>
      </tr>
    );
    return (
      <Table responsive>
        <tbody>
          {addedPromos}
        </tbody>
      </Table>
    );
  }
  remove = (d, did) => {
    api.apiCallerWithToken("http://localhost:8080/api/code/delete", {id:did},200).then( 
      this.setState(state => {
          const data = state.data.filter((item, j) => d !== j)
          return {
              data,
          };
      }
      )
    )
};
setloc= (e)=>{
  this.setState({data:e.promos})
}
  render() {
    api.apiCallerWithToken("http://localhost:8080/api/code/fetch", {},200).then(
      
        (e) => {if(e.promos!==undefined){this.setloc(e)}}
      )
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

