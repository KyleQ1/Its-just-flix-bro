import React, { useState } from "react";
import logo from "../assets/netflix.png";
import "./LoginPage.css";

const Login = () => {
  const [signIn, setSignIn] = useState(false);
  const [username, setUsername] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="login">
      <div className="login_background">
        <img className="login_logo" src={logo} alt="Netflix logo" />
        <button className="login_button">Sign In</button>
        <div className="login_gradient" />
      </div>
      {signIn ? (
        <h1>HI</h1>
      ) : (
        <div className="login_body">
          <h1>Unlimited movies, TV shows, and more.</h1>
          <h2>Watch anywhere. Cancel anytime.</h2>
          <h3>
            Ready to watch? Enter your email to create or restart your
            membership.
          </h3>
          <div className="login_input">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email address"
                value={username}
                onChange={handleUsernameChange}
              />
              <button
                onClick={() => setSignIn(true)}
                className="login_getStarted"
                type="submit"
              >
                GET STARTED
              </button>
            </form>
          </div>
        </div>
      )}
      ;
    </div>
  );
};

export default Login;
