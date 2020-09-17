import React from "react";
import { connect } from "react-redux";

import "../css/PostForm.css";

//actions
import { postData } from "../actions/dataActions";

class PostForm extends React.Component {
  state = {
    body: "",
    cost: 0,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const formDetail = {
      body: this.state.body,
      cost: this.state.cost,
    };

    this.props.postData(formDetail);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div className="post-form-wrapper">
        <form onSubmit={(e) => this.handleSubmit(e)} className="form-container">
          <div className="body-input">
            <label className="body-label">Ne?</label>
            <input
              type="text"
              onChange={(e) => this.handleChange(e)}
              name="body"
              className="body-input"
            />
          </div>

          <div className="cost-input">
            <label className="cost-label">Fiyat</label>
            <input
              type="number"
              onChange={(e) => this.handleChange(e)}
              name="cost"
              className="cost-input"
            />
          </div>
          <button type="submit" className="form-button">
            Gönder
          </button>
        </form>
      </div>
    );
  }
}

export default connect(null, { postData })(PostForm);
