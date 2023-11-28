import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, RequireAuth } from "react-auth-kit";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import MovieReviewPage from "./pages/MovieReviewPage";
import Login from "./pages/LoginPage";
import Review from "./components/Review";

function App() {
  return (
    <AuthProvider
      authType={"cookie"}
      authName={"_auth"}
      cookieDomain={window.location.hostname}
      cookieSecure={window.location.protocol === "https:"}
    >
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route
            path="/"
            element={
              //<RequireAuth loginPath={"login"}>
                <HomePage />
              //</RequireAuth>
            }
          />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="movie" element={<MovieReviewPage />} />
          <Route path="review" element={<Review />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
