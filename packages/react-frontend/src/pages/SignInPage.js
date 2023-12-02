import React, { useState } from "react";
import "./SignInPage.css";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const failedLogin = "Invalid email or password.";
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleLogin = (data) => {
    const verify_url = "http://localhost:8000/user/data";

    fetch(verify_url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    })
      .then((res) => {
        if (res.status !== 200) res.json();
      })
      .then(() => {
        if (
          signIn({
            token: data.token,
            expiresIn: 3600,
            tokenType: "Bearer",
            authState: { email: formData.email },
          })
        ) {
          console.log("Login successful");
          navigate("/");
        }
      })
      .catch(() => setError(failedLogin));
  };

  const onRegister = (e) => {
    e.preventDefault();
    const register_url = "http://localhost:8000/user/register";
    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }
    fetch(register_url, settings)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          setError(failedLogin);
        }
      })
      .then(handleLogin)
      .catch(() => setError(failedLogin))
  }

  const onSignIn = (e) => {
    e.preventDefault();

    // Send request to backend
    const login_url = "http://localhost:8000/user/login";
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(formData),
    };

    fetch(login_url, options)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          setError(res.json().message);
        }
      })
      .then(handleLogin)
      .catch(() => setError(failedLogin));
  };

  return (
    <div className="signin">
      <form onSubmit={onSignIn}>
        <h1>Sign In</h1>
        <span className="signin_error">{error}</span>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button type="submit">Sign In</button>
        <h4>
          <span className="signin_gray">New to Netflix? </span>
          <button className="signin_link"i onClick={onRegister}>Sign up now.</button>
        </h4>
      </form>
    </div>
  );
};

export default SignInPage;
