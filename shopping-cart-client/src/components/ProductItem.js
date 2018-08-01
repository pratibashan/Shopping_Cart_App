import React, { Component } from "react";
import { Row, Col, Well, Button } from "react-bootstrap";
import { connect } from "react-redux";
import * as actionCreators from "../store/actionCreators";
import Cart from "./Cart";

class ProductItem extends Component {
  //update quantity in the cart
  handleCart(product) {
    console.log("Fired");
    if (this.props.cartItemsList.length > 0) {
      let cartIndex = this.props.cartItemsList.findIndex(item => {
        return item._id === product._id;
        console.log("cartIndex");
        console.log(cartIndex);
      });
      //if there is no match found
      if (cartIndex === -1) {
        this.props.onAddtoCartBtnClick(product);
      } else {
        this.props.incrementQuantity(product);
      }
    } else {
      this.props.onAddtoCartBtnClick(product);
    }
  }
  render() {
    return (
      <Well>
        <Row>
          <Col xs={12}>
            <h6>{this.props.product.title}</h6>
            {/* <img src={this.props.product.imageURL} /> */}
            <p> {this.props.product.description}</p>
            <h6>{this.props.product.price}</h6>
            <Button
              bsStyle="primary"
              onClick={() => this.handleCart(this.props.product)}
            >
              Add to cart
            </Button>
          </Col>
        </Row>
      </Well>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.productReducer.products,
    cartItemsList: state.cartReducer.cartItems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    incrementQuantity: product =>
      dispatch(actionCreators.incrementQuantity(product)),
    onAddtoCartBtnClick: product => dispatch(actionCreators.addToCart(product))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductItem);
