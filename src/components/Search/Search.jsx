import React, { useState } from "react";

const Search = ({ onSearchCity }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      onSearchCity(city);
      setCity(""); // Clear the input field after search
    }
  };

  return (
    <div className="search">
      <h2>Search for City Weather</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Search;
