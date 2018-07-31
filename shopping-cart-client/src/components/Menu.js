import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actionCreators from "../store/actionCreators";
import { Nav, NavItem, Navbar, Badge } from "react-bootstrap";
import "../Styles.css";
class Menu extends Component {
  render() {
    return (
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">React-Bootstrap</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="/about">
              About
            </NavItem>
            <NavItem eventKey={2} href="/contactus">
              Contact Us
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="/admin">
              Admin
            </NavItem>
            <NavItem eventKey={2} href="/cart">
              Your Cart
              {/* <Badge className="badge">1</Badge> */}
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      // <div id="menu">
      //   {/* <NavLink exact to="/">
      //     Product
      //   </NavLink> */}
      //   <NavLink to="/admin">Admin</NavLink>
      //   <NavLink to="/cart">Cart({this.props.cartItems.length})</NavLink>
      // </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.cartReducer.cartItems
  };
};

export default connect(
  mapStateToProps,
  null
)(Menu);
