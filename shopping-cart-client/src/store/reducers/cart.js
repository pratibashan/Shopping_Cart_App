import * as actionTypes from "../actionTypes";

const initialState = {
  cartItems: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      return {
        ...state,
        cartItems: state.cartItems.concat(action.product)
      };

    case actionTypes.DELETE_CART_ITEM:
      console.log(action.cartItem._id);
      return {
        ...state,
        cartItems: state.cartItems.filter(cartItem => {
          return cartItem._id != action.cartItem._id;
        })
      };
  }
  return state;
};

export default reducer;
