import * as actionTypes from "../actionTypes";

const initialState = {
  products: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POPULATE_PRODUCTS:
      return {
        ...state,
        products: action.products
      };

    case actionTypes.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product => {
          return product.title != action.productTitle;
        })
      };
  }
  return state;
};

export default reducer;
