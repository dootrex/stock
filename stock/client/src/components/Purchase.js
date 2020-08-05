import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Alert from "react-bootstrap/Alert";
import PurchaseConfirmation from "./PurchaseConfirmation";

const Purchase = ({ stockName, price, ticker, postStock, balance }) => {
  const [quantity, setQuantity] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (balance !== 1 && balance > orderTotal) {
      setConfirm(true);
    } else {
      setError("Must Login and have balance higher than order total to buy.");
      const timer = setTimeout(() => {
        setError("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  };
  const handleChange = (e) => {
    setQuantity(e.target.value);
    setOrderTotal(e.target.value * price);
  };
  const handleCancel = () => {
    setConfirm(false);
    setQuantity(0);
    setOrderTotal(0);
  };
  const handleConfirm = () => {
    postStock(ticker, quantity, price, balance, stockName);
    setConfirm(false);
    setQuantity(0);
    setOrderTotal(0);
  };
  const errorShow = () => {
    if (error === "") {
      return (
        <div>
          <form onSubmit={handleSubmit} className="form-inline">
            <input
              type="number"
              value={quantity}
              onChange={handleChange}
              placeholder={`# of ${stockName}`}
              className="form-control"
            ></input>
            <button className="btn btn-primary">Buy</button>
          </form>
        </div>
      );
    } else {
      return <Alert variant="warning">{error}</Alert>;
    }
  };
  const inConfirmation = () => {
    if (confirm) {
      return (
        <>
          <PurchaseConfirmation
            handleCancel={handleCancel}
            handleConfirm={handleConfirm}
          />
        </>
      );
    } else {
      return <>{errorShow()}</>;
    }
  };
  return <>{inConfirmation()}</>;
};

export default connect(null, actions)(Purchase);
