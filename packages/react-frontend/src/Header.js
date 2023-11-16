import logo from "./assets/netflix-logo.png"
import { Link } from "react-router-dom"
import exit from "./assets/exit-icon.png"
import React from "react";
import "./Header.css"

function Header() {
    return(
        <div id="header">
            <div id="logo-bar">
                <Link to={"/"}><img id="nav-bar-img" src={logo} alt="Netflix logo"/></Link>
            </div>
            <div id="exit">
                <Link to={"/"}><img id="exit-img" src={exit} alt="Exit Button"/></Link>
            </div>
        </div>
    );
}

export default Header