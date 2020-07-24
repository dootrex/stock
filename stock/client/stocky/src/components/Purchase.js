import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import PurchaseConfirmation from "./PurchaseConfirmation";

//next you have to handle balance check and error handling associated with balance and input
const Purchase = ({ stockName, price, ticker, postStock, balance }) => {
  const [quantity, setQuantity] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);
  const [allow, setAllow] = useState(true);
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    if (balance !== 1 && balance > orderTotal) {
      setAllow(true);
      setError("");
    } else {
      setAllow(false);
      setError("Must Login to buy");
    }
  }, [quantity, balance]);

  const handleChange = (e) => {
    setQuantity(e.target.value);
    setOrderTotal(e.target.value * price);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirm(true);
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

  const buyButton = () => {
    if (allow) {
      return <button>Buy</button>;
    } else {
      return <button disabled>Buy</button>;
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
      return (
        <>
          <div>
            <form onSubmit={handleSubmit}>
              <input
                type="number"
                value={quantity}
                onChange={handleChange}
                placeholder={`# of ${stockName}`}
              ></input>
              {buyButton()}
            </form>
          </div>
        </>
      );
    }
  };
  return <>{inConfirmation()}</>;
};

export default connect(null, actions)(Purchase);
