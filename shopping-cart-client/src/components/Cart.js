import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../store/actionCreators";
import {
  Modal,
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
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    console.log("In Cart Component");
    //console.log(this.props.cartItemsList);
    console.log(this.props.total);
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
                <Button
                  bsStyle="default"
                  bsSize="small"
                  onClick={() => this.props.decrementBtnClick(cartItem)}
                >
                  -
                </Button>
                <Button
                  bsStyle="default"
                  bsSize="small"
                  onClick={() => this.props.incrementBtnClick(cartItem)}
                >
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
          <Modal show={this.state.show} onHide={() => this.handleClose()}>
            <Modal.Header closeButton>
              <Modal.Title>Your Order has been saved</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h6>Order Summary</h6>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.handleClose()}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Panel>
      );
    });

    return (
      <Panel bsStyle="primary">
        <Panel.Heading>Cart</Panel.Heading>
        {cartItemsList}
        <Row>
          <Col xs={12}>
            <h5>
              Total Amount:<span> </span>
              <b>${this.props.total}</b>
            </h5>
            <Button
              id="checkoutBtn"
              bsStyle="success"
              onClick={() => this.handleShow()}
            >
              Proceed to Checkout
            </Button>
          </Col>
        </Row>
      </Panel>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartItemsList: state.cartReducer.cartItems,
    total: state.cartReducer.total
  };
};
const mapDispatchToProps = dispatch => {
  return {
    incrementBtnClick: cartItem =>
      dispatch(actionCreators.incrementQuantity(cartItem)),
    decrementBtnClick: cartItem =>
      dispatch(actionCreators.decrementQuantity(cartItem)),
    deleteCartItemBtnClick: cartItem =>
      dispatch(actionCreators.deleteCartItem(cartItem))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
