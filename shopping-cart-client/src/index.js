import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import BaseLayout from "./components/BaseLayout";
import ProductsList from "./components/ProductsList";
import Cart from "./components/Cart";
import ProductsForm from "./components/ProductsForm";
import product from "./store/reducers/product";
import cart from "./store/reducers/cart";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  productReducer: product,
  cartReducer: cart
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <BaseLayout>
        <Switch>
          <Route exact path="/" component={ProductsList} />
          <Route path="/admin" component={ProductsForm} />
          <Route path="/cart" component={Cart} />
        </Switch>
      </BaseLayout>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
