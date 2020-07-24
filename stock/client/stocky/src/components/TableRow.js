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
    let response = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=pk_6a8c8cf8c08245cf96f1aa8d55a157ea`
    );

    setCurrent(response.data.close);
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
        <button
          onClick={() => handleSell(ticker, balance + current * quantity)}
        >
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
