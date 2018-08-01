import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../store/actionCreators";
import {
  Well,
  Panel,
  Form,
  FormControl,
  FormGroup,
  ControlLabel,
  Button
} from "react-bootstrap";
import "../Styles.css";

class ProductsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "title",
      imageURL: "imageURL",
      description: "description",
      price: "price",
      optionValue: ""
    };
  }

  handleTextChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleOptionChange = e => {
    console.log(this.state);
    console.log(e.target.value);
    this.setState({ optionValue: e.target.value });
  };

  handleAddProductClick = e => {
    e.preventDefault();

    let product = {
      title: this.state.title,
      imageURL: this.state.imageURL,
      description: this.state.description,
      price: this.state.price
    };
    console.log(product);
    fetch("http://localhost:5000/api/products/addproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    })
      .then(response => response.json())
      .then(json => {
        this.props.productAddedHandler();

        console.log(json);
      });
  };

  render() {
    let productsList = this.props.products.map(product => {
      return <option key={product._id}>{product.title}</option>;
    });
    return (
      <Well>
        <Panel id="productsAddFormPanel">
          <Form onSubmit={this.handleAddProductClick}>
            <FormGroup controlId="title">
              <ControlLabel>Title</ControlLabel>
              <FormControl
                type="text"
                onChange={this.handleTextChange}
                name="title"
                placeholder="Product Title"
              />
            </FormGroup>
            <FormGroup controlId="imageURL">
              <ControlLabel>ImageURL</ControlLabel>
              <FormControl
                type="text"
                onChange={this.handleTextChange}
                name="imageURL"
                placeholder="ImageURL"
              />
            </FormGroup>
            <FormGroup controlId="description">
              <ControlLabel>Description</ControlLabel>
              <FormControl
                type="text"
                onChange={this.handleTextChange}
                name="description"
                placeholder="Product Description"
              />
            </FormGroup>
            <FormGroup controlId="price">
              <ControlLabel>Price</ControlLabel>
              <FormControl
                type="text"
                onChange={this.handleTextChange}
                name="price"
                placeholder="Product Price"
              />
            </FormGroup>
            <Button bsStyle="primary" type="submit">
              Add Product
            </Button>
          </Form>
        </Panel>
        <Panel style={{ marginTop: "25px" }} id="productsDeleteFormPanel">
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Select a product id to delete</ControlLabel>
            <FormControl
              value={this.state.optionValue}
              onChange={this.handleOptionChange}
              componentClass="select"
              placeholder="select"
            >
              <option value="select">select</option>
              {productsList}
            </FormControl>
          </FormGroup>
          <Button
            id="productDeleteBtn"
            bsStyle="danger"
            onClick={() =>
              this.props.deleteProductBtnClick(this.state.optionValue)
            }
          >
            Delete Product
          </Button>
        </Panel>
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
    deleteProductBtnClick: productTitle =>
      dispatch(actionCreators.deleteProduct(productTitle))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsForm);
