import Header from "./Header";
import "./ProfilePage.css"

function ProfilePage() {
    return (
        <div id="landing">
            <Header />
            <div id="username">
                <h2>Username</h2>
            </div>
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
