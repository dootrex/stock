import axios from "axios";
import { FETCH_USER } from "./types";

export const fetchUser = () => async (dispatch) => {
  const user = await axios.get("/api/current_user");
  dispatch({
    type: FETCH_USER,
    payload: user.data,
  });
};
export const postStock = (
  ticker,
  quantity,
  price,
  balance,
  stockName
) => async (dispatch) => {
  const user = await axios.post("/api/stock", {
    ticker,
    quantity,
    price,
    balance,
    stockName,
  });
  dispatch({
    type: FETCH_USER,
    payload: user.data,
  });
};
//check in colt steele course if there is another way of doing this
export const removeStock = (ticker, newBalance) => async (dispatch) => {
  const user = await axios.post("/api/stock/remove", { ticker, newBalance });
  dispatch({
    type: FETCH_USER,
    payload: user.data,
  });
};
