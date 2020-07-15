import React from "react";
import { Link as SiteLink } from "react-router-dom";

export default () => {
  return (
    <>
      <section className="page-section bg-secondary">
        <div className="container py-5" style={{ backgroundColor: "gray" }}>
          <div className="row justify-content-center">
            <div className="col-lg-3 col-md-8 text-center">
              <h2 className="text-white">
                Complete, Risk free with $100000 in Virtual Cash
              </h2>
              <hr
                className="divider col-1"
                style={{ borderTopColor: "red" }}
              ></hr>
              <p className="text-white">
                Start with $100,000 in virtual cash and put your trading skills
                to the test! Compete with thousands of Investopedia traders and
                trade your way to the top!
              </p>
            </div>
            <div className="col-lg-3 col-md-8 text-center">
              <h2 className="text-white">
                A Stepping Stone to the Real Markets
              </h2>
              <hr
                className="divider col-1"
                style={{ borderTopColor: "red" }}
              ></hr>
              <p className="text-white">
                The ideal platform to get your financial feet wet! Submit trades
                in a virtual environment before you start risking your own
                capital.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="page-section bg-secondary" id="destination">
        <div
          className="container py-3"
          style={{ backgroundColor: "lightGray" }}
        >
          <h4 className="text-center py-3">What is a Stock Market Game?</h4>
          <hr className="col-1"></hr>
          <p className=" text-center px-5">
            Online stock market games are simple, easy-to-use programs that
            imitate the real-life workings of the equities markets. Most stock
            market games give users $100,000 in pretend money to start. From
            there, players pick to purchase; most of the stocks are those that
            are available on the New York Stock Exchange (NYSE), Nasdaq and the
            American Stock Exchange (AMEX).
          </p>
          <p className="text-center px-5">
            Most online stock simulators try to match real-life circumstances
            and actual performance as much as possible. Many even charge broker
            fees and commissions. These charges can significantly affect an
            investor's bottom line, and including these in simulated trading
            helps users learn to factor these costs in when making purchasing
            decisions. Along the way, they’ll also learn the basics of finance
            and learn the basic terminology of investing, such as momentum
            trading, shorts and P/E ratios.
          </p>
        </div>
      </section>
      <section className="page-section bg-secondary" id="destination">
        <div
          className="container py-3"
          style={{ backgroundColor: "lightGray" }}
        >
          <h4 className="text-center py-3">Some Caveats</h4>
          <hr className="col-1"></hr>
          <p className="text-center px-5">
            These useful skills can be applied to an actual trading account. Of
            course, in the real world, there are numerous factors that affect
            trading and investment decisions, such as one's risk tolerance,
            investment horizon, investment objectives, taxation issues, need for
            diversification, and so on. It is impossible to take investor
            psychology into account because actual hard cash is not at risk.
          </p>
          <p className="text-center px-5">
            Also, while the Investopedia Stock Simulator comes close to
            replicating the real-life experience of trading, it does not
            currently offer a real-time trading environment with live prices.
            However, for most users, the 15-minute lag in trade execution will
            not be an impairment to their learning experience.
          </p>
          <div className="text-center">
            <SiteLink
              to="/simulator"
              className="btn btn-primary btn-xl text-white"
            >
              Get Started
            </SiteLink>
          </div>
        </div>
      </section>
    </>
  );
};
