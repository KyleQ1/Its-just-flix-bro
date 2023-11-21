import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import MovieReviewPage from "./pages/MovieReviewPage";
import Login from "./pages/LoginPage";

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
