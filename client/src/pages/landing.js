import React from "react";
import "../css/landing.css";

//comp
import LoginForm from "../components/LoginForm";

class Landing extends React.Component {
  render() {
    return (
      <div className="landing-body">
        <div className="landing-title-wrapper">
          <h1 className="landing-title">BRO HOUSE</h1>
          <p className="landing-desc">Parolayı söyle...</p>
        </div>
        <div className="login-container">
          <div className="login-wrapper">
            <LoginForm />
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
