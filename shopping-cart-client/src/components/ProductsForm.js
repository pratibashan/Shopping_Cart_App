import React, { Component } from "react";
//import { connect } from "react-redux";
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
      price: "price"
    };
  }

  handleTextChange = e => {
    //console.log(e.target.name);
    //console.log(e.target.value);

    this.setState({
      [e.target.name]: e.target.value
    });

    console.log("handleTextChange");
    console.log(this.state);
  };

  handleAddProductClick = e => {
    e.preventDefault();
    //console.log(this.state);
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
    return (
      <Well>
        <Panel id="productsFormPanel">
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
                type="number"
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
      </Well>
    );
  }
}

export default ProductsForm;
