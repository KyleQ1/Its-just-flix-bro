import React from "react";
import logo from "../assets/netflix.png";
import accountIcon from "../assets/account-icon.png";
import search from "../assets/search-icon.png";
import { Link } from "react-router-dom";
import "./Header.css";

function NavBar() {
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
      <div id="search-and-account">
        <img id="nav-bar-img" src={search} alt="Search icon" />
        <Link to={"/profile"}>
          <img id="nav-bar-img" src={accountIcon} alt="Account icon" />
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
