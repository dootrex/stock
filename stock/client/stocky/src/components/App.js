import React from "react";
import ParticlesBg from "particles-bg";
import Landing from "./Landing";
import Footer from "./Footer";
import Dashboard from "./Dashboard";
import { BrowserRouter, Route } from "react-router-dom";
import { Link, animateScroll as scroll } from "react-scroll";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <>
          <Route exact path="/" component={Landing} />
          <Route exact path="/simulator" component={Dashboard} />
        </>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
