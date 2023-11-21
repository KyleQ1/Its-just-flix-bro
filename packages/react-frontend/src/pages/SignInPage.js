import React from "react";
import "./SignInPage.css";

const SignInPage = () => {
  const register = (e) => {
    e.preventDefault();
  };

  const signIn = (e) => {
    e.preventDefault();
  };

  return (
    <div className="signin">
      <form>
        <h1>Sign In</h1>
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Password" />
        <button type="submit" onClick={signIn}>
          Sign In
        </button>
        <h4>
          <span className="signin_gray">New to Netflix? </span>
          <span className="signin_link" onClick={register}>
            Sign Up Now
          </span>
        </h4>
      </form>
    </div>
  );
};

export default SignInPage;
