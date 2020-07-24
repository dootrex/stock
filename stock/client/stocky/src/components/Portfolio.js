import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Table from "react-bootstrap/Table";
import * as actions from "../actions";

import Header from "./Header";
import TableRow from "./TableRow";

const Portfolio = ({ user, removeStock }) => {
  const handleSell = (ticker, newBalance) => {
    removeStock(ticker, newBalance);
  };

  if (user) {
    return (
      <>
        <Header />
        <Table responsive="sm">
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
        <h2>{user.balance}</h2>
      </>
    );
  } else {
    return <Redirect to="/simulator" />;
  }
};

const mapStateToProps = (state) => {
  return { user: state.auth };
};
export default connect(mapStateToProps, actions)(Portfolio);
