import "./index.css";
import NavBar from "./NavBar";
import MovieList from "./MovieList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./ProfilePage";
import MovieReviewPage from "./MovieReviewPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={
          <div id="landing">
            <NavBar />
            <MovieList genre="Action"/>
            <MovieList genre="Comedy"/>
            <MovieList genre="Horror"/>
          </div>
        }/>
        <Route path="profile" element={<ProfilePage />} />
        {/* for loop num of routes from database */}
        <Route path="movie" element={<MovieReviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
