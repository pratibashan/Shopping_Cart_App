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
  }
  return state;
};
export default reducer;
