import React from "react";
import "./Search.css";

function Search({ onMouseOut }) {
  return (
    <div className="search">
      <input type="text" placeholder="Type here..." onMouseOut={onMouseOut} />
    </div>
  );
}

export default Search;
