import React from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";

import Table from "react-bootstrap/Table";
import * as actions from "../actions";

import Header from "./Header";
import TableRow from "./TableRow";

const Portfolio = ({ user, removeStock, history }) => {
  const handleSell = (ticker, newBalance) => {
    removeStock(ticker, newBalance);
  };

  if (user) {
    let portfolioBalance = user.stocks.reduce((sum, stock) => {
      return sum + stock.amount;
    }, 0);
    portfolioBalance = parseFloat(portfolioBalance).toFixed(2);
    return (
      <div style={{ backgroundColor: "lightcyan" }}>
        <Header />
        <div className="container" style={{ height: "100vh" }}>
          <ul className="list-group mt-2">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Cash Available
              <span className="badge badge-primary badge-pill">
                {user.balance.toFixed(2)}
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Portfolio Balance
              <span className="badge badge-primary badge-pill">
                {portfolioBalance}
              </span>
            </li>
          </ul>
          <Table responsive="sm mt-2">
            <thead>
              <tr>
                <th>Stock</th>
                <th>Ticker</th>
                <th>#</th>
                <th>Purchase Price</th>
                <th>Original Value($)</th>
                <th>% of my portfolio</th>
                <th>Current Price</th>
              </tr>
            </thead>
            <tbody>
              {user.stocks.map((stock) => (
                <TableRow
                  ticker={stock.ticker}
                  quantity={stock.quantity}
                  amount={stock.amount}
                  stockName={stock.stockName}
                  balance={user.balance}
                  handleSell={handleSell}
                />
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  } else {
    history.push("/simulator");
    return <Redirect to="/simulator" />;
  }
};

const mapStateToProps = (state) => {
  return { user: state.auth };
};
export default connect(mapStateToProps, actions)(withRouter(Portfolio));
