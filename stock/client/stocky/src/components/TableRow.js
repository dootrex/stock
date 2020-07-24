import React, { useState } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

const TableRow = ({
  ticker,
  quantity,
  amount,
  stockName,
  balance,
  handleSell,
}) => {
  const [current, setCurrent] = useState(0);
  const [fetching, setFetching] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const handleCheck = async () => {
    setFetching(true);
    let res = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=DH1J1NJL9H9HFP8D`
    );
    let dates = Object.keys(res.data["Time Series (Daily)"]);
    setCurrent(res.data["Time Series (Daily)"][dates[0]]["4. close"]);
    const timer = setTimeout(() => {
      setFetching(false);
    }, 3000);
    return () => clearTimeout(timer);
  };

  const fetcher = () => {
    if (fetching) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    } else if (current === 0) {
      return <button onClick={() => handleCheck()}>Check Current Price</button>;
    } else {
      return (
        <button onClick={() => handleSell(ticker, balance - amount)}>
          Sell at {current}
        </button>
      );
    }
  };

  return (
    <tr>
      <td>{stockName}</td>
      <td>{ticker}</td>
      <td>{quantity}</td>
      <td>{amount / quantity}</td>
      <td>{amount.toFixed(2)}</td>
      <td>{((amount / balance) * 100).toFixed(2)}</td>
      <td>{fetcher()}</td>
    </tr>
  );
};
export default TableRow;
