import React, { Component } from "react";
import { Row, Col, Well, Button } from "react-bootstrap";
import { connect } from "react-redux";
import * as actionCreators from "../store/actionCreators";

class ProductItem extends Component {
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
              onClick={() => this.props.onAddtoCartBtnClick(this.props.product)}
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
    products: state.productReducer.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // onPopulateProducts: () => dispatch(actionCreators.populateProducts())
    onAddtoCartBtnClick: product => dispatch(actionCreators.addToCart(product))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductItem);
