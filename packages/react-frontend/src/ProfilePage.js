import logo from "./assets/netflix-logo.png"
import { Link } from "react-router-dom"
import exit from "./assets/exit-icon.png"

function ProfilePage() {
    return (
        <div id="landing">
            <div id="header">
                <div id="logo-bar">
                    <Link to={"/"}><img id="nav-bar-img" src={logo} alt="Netflix logo"/></Link>
                </div>
                <div id="exit">
                    <Link to={"/"}><img id="exit-img" src={exit} alt="Exit Button"/></Link>
                </div>
            </div>
            <div id="username">
                <h2>Username</h2>
            </div>
            {/* <div id="filler"></div> */}
            <div id="watchlist">
                <h2>watchlist</h2>
                <div id="watchlist-movies">
                    <h3>Movie</h3>
                    <h3>Movie</h3>
                    <h3>Movie</h3>
                    <h3>Movie</h3>
                    <h3>Movie</h3>
                </div>
            </div>
            <div id="review-list">
                <h2>My Reviews</h2>
                <div id="reviews">
                    <h3>Review</h3>
                    <h3>Review</h3>
                    <h3>Review</h3>
                    <h3>Review</h3>
                    <h3>Review</h3>
                </div>
            </div>
        </div>
        
    );
}

export default ProfilePage
