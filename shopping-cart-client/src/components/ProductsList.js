import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../store/actionCreators";
import { Grid, Col, Row, Button } from "react-bootstrap";
import ProductItem from "./ProductItem";
import ProductsForm from "./ProductsForm";
import Cart from "./Cart";

class ProductsList extends Component {
  componentDidMount() {
    this.props.onPopulateProducts();
  }

  productAddedHandler = () => {
    this.props.onPopulateProducts();
  };

  render() {
    let productsList = this.props.products.map(product => {
      return (
        <Col xs={12} sm={6} md={4} key={product._id}>
          <ProductItem product={product} />
        </Col>
      );
    });

    return (
      <Grid>
        <Row>
          <Cart />
        </Row>
        <Row>
          {/* <Col xs={12} sm={6}>
            <ProductsForm productAddedHandler={this.productAddedHandler} />
          </Col> */}
          {productsList}
        </Row>
      </Grid>
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
    onPopulateProducts: () => dispatch(actionCreators.populateProducts())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsList);
