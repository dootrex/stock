import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

const PurchaseConfirmation = ({ handleConfirm, handleCancel }) => {
  return (
    <>
      Are you sure you wanna buy?
      <div>
        <button className="btn btn-danger" onClick={() => handleCancel()}>
          cancel
        </button>
        <button className="btn btn-success" onClick={() => handleConfirm()}>
          confirm
        </button>
      </div>
    </>
  );
};
export default connect(null, actions)(PurchaseConfirmation);
