import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import "./Dashboard.css";

import Header from "./Header";
import axios from "axios";
import Search from "./Search";
import Chart from "./Chart";
import Purchase from "./Purchase";
import StockDetails from "./StockDetails";
import Spinner from "react-bootstrap/Spinner";

const Dashboard = (props) => {
  const [loading, setLoading] = useState(true);
  const [ticker, setTicker] = useState("AAPL");
  const [stockName, setStockName] = useState("Apple Inc");
  const [chartData, setChartData] = useState([]);
  const [dayReport, setDayReport] = useState({
    open: 0,
    high: 0,
    low: 0,
    close: 0,
  });

  const handleSearchSubmit = (event) => {
    setTicker(event.split("-")[0]);
    setStockName(event.split("-")[1]);
  };
  const fetchedData = () => {
    if (loading) {
      return (
        <div className="spinner">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      );
    } else {
      return (
        <div className="spinner">
          <Chart data={chartData} ticker={ticker} />
        </div>
      );
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let res = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=15min&apikey=V6PMYFQGMDIY3Y1P`
      );

      let stuff = [];
      for (let key in res.data["Time Series (15min)"]) {
        stuff.push({
          x: key,
          y: res.data["Time Series (15min)"][key]["4. close"],
        });
      }
      setChartData(stuff);

      //intraday data fetch with another api key to help with the request limit
      let response = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=0TLHVL9EOZXQ9BG0`
      );
      //this is to get the latest date
      let dates = Object.keys(response.data["Time Series (Daily)"]);
      setDayReport({
        ...dayReport,
        open: response.data["Time Series (Daily)"][dates[0]]["1. open"],
        high: response.data["Time Series (Daily)"][dates[0]]["2. high"],
        low: response.data["Time Series (Daily)"][dates[0]]["3. low"],
        close: response.data["Time Series (Daily)"][dates[0]]["4. close"],
        volume: response.data["Time Series (Daily)"][dates[0]]["5. volume"],
      });
    };
    fetchData();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [ticker]);
  return (
    <div className="container">
      <Header />
      <Search setTicker={handleSearchSubmit} />
      {fetchedData()}
      <Purchase
        price={dayReport.close}
        stockName={stockName}
        ticker={ticker}
        balance={props.user ? props.user.balance : 1}
      />
      <StockDetails stockName={stockName} report={dayReport} />
    </div>
  );
};

function mapStateToProps(state) {
  return { user: state.auth };
}
export default connect(mapStateToProps)(Dashboard);
