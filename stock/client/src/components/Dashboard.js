import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import "./Dashboard.css";

import Article from "./Article";
import Header from "./Header";
import axios from "axios";
import Search from "./Search";
import Chart from "./Chart";
import Purchase from "./Purchase";
import StockDetails from "./StockDetails";
import Spinner from "react-bootstrap/Spinner";

const Dashboard = (props) => {
  const [headline, setHeadline] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImg] = useState("");
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let res = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=15min&apikey=${process.env.REACT_APP_ALPHA_VANTAGE}`
      );

      let stuff = [];
      if (res) {
        for (let key in res.data["Time Series (15min)"]) {
          stuff.push({
            x: key,
            y: res.data["Time Series (15min)"][key]["4. close"],
          });
        }
      }
      setChartData(stuff);

      let response = await axios.get(
        `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${process.env.REACT_APP_IEX_KEY}`
      );
      setDayReport({
        ...dayReport,
        open: response.data.open,
        high: response.data.high,
        low: response.data.low,
        close: response.data.close,
        volume: response.data.volume,
      });

      let resy = await axios.get(
        `https://cloud.iexapis.com/stable/stock/${ticker}/news/last/1?token=${process.env.REACT_APP_IEX_KEY}`
      );
      setImg(resy.data[0].image);
      setUrl(resy.data[0].url);
      setHeadline(resy.data[0].headline);
    };

    fetchData();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [ticker]);
  const fetchedData = () => {
    if (loading) {
      return (
        <div>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      );
    } else {
      return (
        <div>
          <Chart data={chartData} ticker={ticker} />
        </div>
      );
    }
  };
  return (
    <div>
      <Header />
      <div className="container">
        <div className="searchStuff my-2">
          <div className="align-self-start">
            <Search setTicker={handleSearchSubmit} />
          </div>
          <div className="align-self-end">
            <Purchase
              price={dayReport.close}
              stockName={stockName}
              ticker={ticker}
              balance={props.user ? props.user.balance : 1}
            />
          </div>
        </div>

        <div>
          <StockDetails stockName={stockName} report={dayReport} />
        </div>

        <div className="row justify-content-center align-items-center">
          <div className="col-8 col-lg-5 mt-2">
            <Article
              url={url}
              img={image}
              headline={headline}
              stockName={stockName}
            />
          </div>
          <div className="chartStuff col-8 col-lg-5 mt-5 img-fluid">
            {fetchedData()}
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return { user: state.auth };
}
export default connect(mapStateToProps)(Dashboard);
