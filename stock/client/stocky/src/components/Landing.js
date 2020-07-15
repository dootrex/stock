import React from "react";
import "./Landing.css";
import About from "./About";
import ParticlesBg from "particles-bg";
import { Link as SiteLink } from "react-router-dom";
import { Link } from "react-scroll";

export default () => {
  return (
    <>
      <div className="masthead">
        <ParticlesBg type="lines" num={10} bg={true} />
        <div className=" h-100 d-flex flex-column align-items-center justify-content-center container">
          <div className="text-center mb-5">
            <h1 className="text-uppercase text-white font-weight-bold">
              Stocky
            </h1>
            <hr className="col-1" style={{ borderTopColor: "red" }}></hr>

            <p className="text-white">A free Stock Market Simulator</p>
            <SiteLink
              to="/simulator"
              className="btn btn-primary btn-xl text-white"
            >
              Get Started
            </SiteLink>
          </div>

          <div className="text-white mt-5">
            <Link to="destination" smooth={true} duration={1000}>
              <i class="fa fa-arrow-down fa-3x bounce" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </div>
      <About />
    </>
  );
};
