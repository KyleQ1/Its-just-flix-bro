import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";
import MovieReviewPage from "./MovieReviewPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="movie" element={<MovieReviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
