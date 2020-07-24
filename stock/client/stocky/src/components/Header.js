import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";

class Header extends Component {
  login() {
    if (this.props.user) {
      return (
        <Nav>
          <Nav.Link as={Link} to="/portfolio">
            {this.props.user.userName}
          </Nav.Link>
          <Nav.Link as={Link} to="/portfolio">
            {this.props.user.balance.toFixed(2)}
          </Nav.Link>
          <Nav.Link href="/api/logout">Logout</Nav.Link>
        </Nav>
      );
    } else {
      return (
        <Nav>
          <Nav.Link href="/auth/google" style={{ color: "blue" }}>
            Login with Google
          </Nav.Link>
        </Nav>
      );
    }
  }

  render() {
    return (
      <>
        <Navbar
          collapseOnSelect
          expand="md"
          variant="dark"
          style={{ backgroundColor: "black" }}
        >
          <Navbar.Brand as={Link} to="/simulator">
            Stocky
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/portfolio">
                My Portfolio
              </Nav.Link>
            </Nav>
            {this.login()}
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}
function mapStateToProps(state) {
  return { user: state.auth };
}
export default connect(mapStateToProps)(Header);
