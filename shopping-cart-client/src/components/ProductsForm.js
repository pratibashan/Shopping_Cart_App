import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../store/actionCreators";
import {
  Grid,
  Row,
  Col,
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
      optionValue: "",
      products: []
    };
  }
  componentDidMount() {
    this.populateProducts();
  }

  populateProducts() {
    fetch("http://localhost:5000/api/products")
      .then(response => response.json())
      .then(json => {
        this.setState({
          products: json.products
        });
      });
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

  handleSaveProduct = () => {
    let product = {
      title: this.state.title,
      imageURL: this.state.imageURL,
      description: this.state.description,
      price: this.state.price
    };
    this.props.saveProductBtnClick(product);
  };

  render() {
    let productsList = this.state.products.map(product => {
      return <option key={product._id}>{product.title}</option>;
    });
    return (
      <Grid>
        <Row className="show-grid">
          <Col md={6}>
            {/* add product form */}
            <Well>
              <Panel id="productsAddFormPanel">
                <Form>
                  <FormGroup controlId="title" id="productsAddForm">
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
                  <Button
                    bsStyle="primary"
                    type="submit"
                    onClick={() => this.handleSaveProduct()}
                  >
                    save Product
                  </Button>
                </Form>
              </Panel>
            </Well>
          </Col>
          <Col md={6}>
            <Well>
              {/* delete product form */}
              <Panel style={{ marginTop: "25px" }} id="productsDeleteFormPanel">
                <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Select a product to delete</ControlLabel>
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
                <div />
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
          </Col>
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
    onPopulateProducts: () => dispatch(actionCreators.populateProducts()),
    saveProductBtnClick: product =>
      dispatch(actionCreators.saveProduct(product)),
    deleteProductBtnClick: productTitle =>
      dispatch(actionCreators.deleteProduct(productTitle))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsForm);
