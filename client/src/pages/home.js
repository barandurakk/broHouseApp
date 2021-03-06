import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchData } from "../actions/dataActions";
import { fetchUser } from "../actions/authActions";
import "../css/home.css";

//comp
import Nacak from "../components/Nacak";
import Mis from "../components/Mis";
import PostForm from "../components/PostForm";

class Home extends React.Component {
  state = {
    hidden: true,
  };

  componentDidMount() {
    this.props.fetchData();
    this.props.fetchUser();
  }

  handleShow = () => {
    this.setState({
      hidden: !this.state.hidden,
    });
  };

  renderHome = () => {
    const { nacaklar, mislar } = this.props;

    return (
      <div className="home-container">
        <div className="post-container">
          <PostForm />
        </div>
        <div className="data-container">
          <div className="nacak-container">
            <h3 className="nacak-title">-nacaklar</h3>
            {nacaklar.map((nacak) => {
              return <Nacak nacak={nacak} key={nacak._id} />;
            })}
          </div>
          <div className={`mis-container ${this.state.hidden ? "hidden" : ""}`}>
            <h3 className="mis-title">-mışlar</h3>
            {mislar.map((mis) => {
              return <Mis mis={mis} key={mis._id} />;
            })}
          </div>
        </div>
        <button className="show-mis-button" onClick={() => this.handleShow()}>
          -mış
        </button>
      </div>
    );
  };

  renderForbidden = () => {
    return <div>İZNİN YOK!</div>;
  };

  render() {
    const { auth, loading } = this.props;

    return loading ? <p>Yükleniyor...</p> : auth ? this.renderHome() : this.renderForbidden();
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.data.authenticated,
    nacaklar: state.data.caklar,
    mislar: state.data.mislar,
    loading: state.data.loading,
  };
};

export default connect(mapStateToProps, { fetchData, fetchUser })(withRouter(Home));
