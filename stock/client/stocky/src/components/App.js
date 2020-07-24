import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchUser } from "../actions";

import ParticlesBg from "particles-bg";
import Landing from "./Landing";
import About from "./About";
import Footer from "./Footer";
import Portfolio from "./Portfolio";
import Dashboard from "./Dashboard";
import { BrowserRouter, Route } from "react-router-dom";
import { Link, animateScroll as scroll } from "react-scroll";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <>
        <BrowserRouter>
          <>
            <Route exact path="/" component={Landing} />
            <Route exact path="/about" component={About} />
            <Route exact path="/simulator" component={Dashboard} />
            <Route exact path="/portfolio" component={Portfolio} />
            {/* portfolio not yet created */}
          </>
        </BrowserRouter>
        <Footer />
      </>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.auth };
}

export default connect(mapStateToProps, { fetchUser })(App);
