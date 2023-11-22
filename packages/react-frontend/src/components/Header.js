import logo from "../assets/netflix.png";
import { Link } from "react-router-dom";
import exit from "../assets/exit-icon.png";
import React from "react";
import "./Header.css";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

function Header() {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const logout = () => {
    signOut();
    navigate("/login");
  };

  return (
    <div id="header">
      <div id="logo-bar">
        <Link to={"/"}>
          <img id="nav-bar-img" src={logo} alt="Netflix logo" />
        </Link>
      </div>
      <div id="exit">
        <button id="logout" onClick={logout}>
          Sign out
        </button>
        <Link to={"/"}>
          <img id="exit-img" src={exit} alt="Exit Button" />
        </Link>
      </div>
    </div>
  );
}

export default Header;
