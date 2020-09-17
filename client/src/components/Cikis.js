import React from "react";
import { connect } from "react-redux";

import { logoutUser } from "../actions/authActions";

class Cikis extends React.Component {
  render() {
    this.props.logoutUser();
    return <div>Cikildi</div>;
  }
}

export default connect(null, { logoutUser })(Cikis);
