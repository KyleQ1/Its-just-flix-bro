import React, { useState } from "react";
import logo from "../assets/netflix.png";
import accountIcon from "../assets/account-icon.png";
import searchIcon from "../assets/search-icon.png";
import { Link } from "react-router-dom";
import "./Header.css";
import Search from "./Search.js";

function NavBar() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleSearchIconHover = () => {
    setIsSearchExpanded(true);
  };

  const handleSearchBlur = () => {
    setIsSearchExpanded(false);
  };

  return (
    <div id="navigational-bar">
      <div id="logo-bar">
        <Link to={"/"}>
          <img id="nav-bar-img" src={logo} alt="Netflix logo" />
        </Link>
        <div id="nav-bar">
          <button>Home</button>
          <button>Movies</button>
        </div>
      </div>
      <div id="search-and-account" onBlur={handleSearchBlur}>
        {isSearchExpanded && <Search />}
        <img
          id="nav-bar-img"
          src={searchIcon}
          alt="Search icon"
          onClick={handleSearchIconHover}
        />
        <Link to={"/profile"}>
          <img id="nav-bar-img" src={accountIcon} alt="Account icon" />
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
