import React from "react";

const Information = (props) => {
  return (
    <>
      <ul className="list-group">
        <li className="list-group-item d-flex display-4 text-center lead">
          {props.stockName}
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Open
          <span className="badge badge-primary badge-pill">
            {props.report.open}
          </span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          High
          <span className="badge badge-primary badge-pill">
            {props.report.high}
          </span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Low
          <span className="badge badge-primary badge-pill">
            {props.report.low}
          </span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Close
          <span className="badge badge-primary badge-pill">
            {props.report.close}
          </span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Volume
          <span className="badge badge-primary badge-pill">
            {props.report.volume}
          </span>
        </li>
      </ul>
    </>
  );
};
export default Information;
