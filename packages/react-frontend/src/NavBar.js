import React from "react";
import logo from "./assets/netflix-logo.png";
import accountIcon from "./assets/account-icon.png";
import search from "./assets/search-icon.png";

function NavBar() {
  return (
    <div id="header">
      <div id="logo-bar">
        <img id="nav-bar-img" src={logo} alt="Netflix logo" />
        <div id="nav-bar">
          <a href="#">Home</a>
          <a href="#">Movies</a>
          <a href="#">TV Shows</a>
          <a href="#">My List</a>
        </div>
      </div>
      <div id="search-and-account">
        <img id="nav-bar-img" src={search} alt="Search icon" />
        <img id="nav-bar-img" src={accountIcon} alt="Account icon" />
      </div>
    </div>
  );
}

export default NavBar;
