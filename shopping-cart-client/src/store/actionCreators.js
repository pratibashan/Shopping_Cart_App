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

export const deleteProduct = productTitle => {
  console.log(productTitle);
  return dispatch => {
    dispatch({
      type: actionTypes.DELETE_PRODUCT,
      productTitle: productTitle
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
