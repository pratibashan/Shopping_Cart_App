import * as actionTypes from "./actionTypes";

export const populateProducts = () => {
  return dispatch => {
    fetch("http://localhost:5000/api/products")
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: actionTypes.POPULATE_PRODUCTS,
          products: json.products
        });
      })
      .catch(err => {
        dispatch({
          type: "GET_PRODUCTS_REJECTED",
          payload: err
        });
      });
  };
};

export const saveProduct = product => {
  return dispatch => {
    fetch("http://localhost:5000/api/products/addproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
      })

      .catch(err => {
        dispatch({
          type: "POST_PRODUCT_REJECTED",
          payload: "there was an error while posting a new product"
        });
      });
  };
};

export const deleteProduct = productTitle => {
  console.log(productTitle);
  return dispatch => {
    fetch("http://localhost:5000/api/products/" + productTitle, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(json => {
        return json;
      });
    dispatch({
      type: actionTypes.DELETE_PRODUCT,
      productTitle: productTitle
    });
  };
};

export const addToCart = product => {
  return dispatch => {
    product.quantity = 1;
    dispatch({
      type: actionTypes.ADD_TO_CART,
      product: product
    });
  };
};

export const incrementQuantity = cartItem => {
  return dispatch => {
    dispatch({
      type: actionTypes.INCREMENT_QUANTITY,
      cartItem: cartItem
    });
    //console.log(cartItem);
  };
};

export const decrementQuantity = cartItem => {
  return dispatch => {
    dispatch({
      type: actionTypes.DECREMENT_QUANTITY,
      cartItem: cartItem
    });
    //console.log(cartItem);
  };
};
export const deleteCartItem = cartItem => {
  return dispatch => {
    dispatch({
      type: actionTypes.DELETE_CART_ITEM,
      cartItem: cartItem
    });
    //console.log(cartItem);
  };
};

// handleAddProductClick = e => {
//   e.preventDefault();

//   let product = {
//     title: this.state.title,
//     imageURL: this.state.imageURL,
//     description: this.state.description,
//     price: this.state.price
//   };
//   console.log(product);
//   fetch("http://localhost:5000/api/products/addproduct", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(product)
//   })
//     .then(response => response.json())
//     .then(json => {
//       this.productAddedHandler();

//       console.log(json);
//     });
// };
