import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

const SellConfirmation = ({ handleConfirm, handleCancel }) => {
  return (
    <>
      Are you sure you wanna Sell?
      <div>
        <button onClick={() => handleCancel()}>cancel</button>
        <button onClick={() => handleConfirm()}>confirm</button>
      </div>
    </>
  );
};
export default connect(null, actions)(SellConfirmation);
