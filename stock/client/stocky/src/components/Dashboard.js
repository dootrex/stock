import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Search from "./Search";
import Chart from "./Chart";
import Information from "./Information";

const Dashboard = () => {
  const [ticker, setTicker] = useState("AAPL");
  const [stockName, setStockName] = useState("Apple Inc");
  const [chartData, setChartData] = useState([]);
  const [dayReport, setDayReport] = useState({ open: "default", close: "" });

  const handleSearchSubmit = (event) => {
    setTicker(event.split("-")[0]);
    setStockName(event.split("-")[1]);
  };

  useEffect(() => {
    const fetchData = async () => {
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
  }, [ticker]);
  return (
    <div className="container">
      <Search setTicker={handleSearchSubmit} />
      <Chart data={chartData} ticker={ticker} />
      <Information stockName={stockName} report={dayReport} />
    </div>
  );
};
export default Dashboard;
