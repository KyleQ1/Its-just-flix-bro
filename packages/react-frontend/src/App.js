import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";
import MovieReviewPage from "./MovieReviewPage";
import Login from "./Login";

function App() {
  const user = null;

  return (
    <BrowserRouter>
      <Routes>
        {!user ? (
          // redirect to login
          <Route path="" element={<Login />} />
        ) : (
          <Route path="" element={<HomePage />} />
        )}
        <Route path="profile" element={<ProfilePage />} />
        <Route path="movie" element={<MovieReviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
