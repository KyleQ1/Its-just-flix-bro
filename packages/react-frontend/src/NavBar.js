import React from "react";
import logo from "./assets/netflix-logo.png";
import accountIcon from "./assets/account-icon.png"
import search from "./assets/search-icon.png"

function NavBar() {
    return(
        // <div>
        //     <header>
        //         <img src={logo} align="left"/>
        //         <img src={accountIcon} align="right"/>
        //         <img src={search} align="right"/>
        //     </header>
        //     <table width="30%">
        //         <tr>
        //             <td width="20%">Home</td>
        //             <td>TV Shows</td>
        //             <td width="20%">Movies</td>
        //             <td>My List</td>
        //         </tr>
        //     </table>
        // </div>
        <div id="header">
            <div id="logo-bar">
                <img src={logo} alt="Netflix logo"/>
                <div id="nav-bar">
                    <a href="#">Home</a>
                    <a href="#">Movies</a>
                    <a href="#">TV Shows</a>
                    <a href="#">My List</a>
                </div>
            </div>
            <div id="search-and-account">
                <img src={search} alt="Search icon"/>
                <img src={accountIcon} alt="Account icon"/>
            </div>
        </div>
    )
    
}

export default NavBar
