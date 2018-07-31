import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../store/actionCreators";
import {
  Panel,
  Well,
  Grid,
  Col,
  Row,
  Button,
  ButtonGroup,
  Label
} from "react-bootstrap";

class Cart extends Component {
  render() {
    console.log("cart Items");
    console.log(this.props.cartItemsList);
    if (this.props.cartItemsList[0]) {
      return this.renderCart();
    } else {
      return this.renderEmpty();
    }
  }
  renderEmpty() {
    return <div />;
  }
  renderCart() {
    let cartItemsList = this.props.cartItemsList.map(cartItem => {
      return (
        <Panel key={cartItem._id} id="cartPanel">
          <Row>
            <Col xs={12} sm={4}>
              <h6>{cartItem.title}</h6>
              <span> </span>
            </Col>
            <Col xs={12} sm={2}>
              <h6>usd.{cartItem.price}</h6>
            </Col>
            <Col xs={12} sm={2}>
              <h6>
                qty. <Label bsStyle="success">{cartItem.quantity}</Label>
              </h6>
            </Col>
            <Col xs={12} sm={4}>
              <ButtonGroup style={{ minWidth: "30px" }}>
                <Button bsStyle="default" bsSize="small">
                  -
                </Button>
                <Button bsStyle="default" bsSize="small">
                  +
                </Button>
                <Button
                  onClick={() => this.props.deleteCartItemBtnClick(cartItem)}
                  bsStyle="danger"
                  bsSize="small"
                >
                  DELETE
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Panel>
      );
    });

    return (
      <Panel bsStyle="primary">
        <Panel.Heading>Cart</Panel.Heading>
        {cartItemsList}
      </Panel>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartItemsList: state.cartReducer.cartItems
  };
};
const mapDispatchToProps = dispatch => {
  return {
    deleteCartItemBtnClick: cartItem =>
      dispatch(actionCreators.deleteCartItem(cartItem))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
