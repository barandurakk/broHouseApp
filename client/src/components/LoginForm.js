import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//action
import { loginUser } from "../actions/authActions";

import "../css/LoginForm.css";

class LoginForm extends React.Component {
  state = {
    code: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      pass: this.state.code,
    };

    this.props.loginUser(userData, this.props.history);
  };

  render() {
    const { error } = this.props;

    return (
      <div className="login-form-container">
        {error === "" ? null : <p className="error-message">{error}</p>}
        <form onSubmit={this.handleSubmit} className="login-form">
          <input
            type="password"
            name="code"
            onChange={(event) => this.handleChange(event)}
            className="form-input"
          />
          <button type="submit" className="form-button">
            AÇIL!
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.data.authenticated,
    error: state.data.error,
  };
};

export default connect(mapStateToProps, { loginUser })(withRouter(LoginForm));
