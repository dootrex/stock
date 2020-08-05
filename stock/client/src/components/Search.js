import React, { useState, useEffect } from "react";
import searchBank from "../utils/list";
import "./Search.css";

const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const results = searchBank.filter((item) =>
      item.toLowerCase().includes(searchTerm)
    );
    const short = results.length > 5 ? results.slice(0, 5) : results;
    setSearchResults(short);
  }, [searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    props.setTicker(searchTerm);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-inline">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
          list="tickers"
          className="form-control"
        />
        <datalist id="tickers">
          {searchResults.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </datalist>
        <button className="btn btn-primary">Search</button>
      </form>
    </>
  );
};
export default Search;
