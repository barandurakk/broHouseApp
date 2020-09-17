import React, { Fragment } from "react";
import { Swipeable } from "react-swipeable";
//redux
import { connect } from "react-redux";
import { deletePost, updatePost, fetchData, nacakToMis } from "../actions/dataActions";

import "../css/Nacak.css";

class Nacak extends React.Component {
  state = {
    hidden: false,
    body: "",
    cost: null,
    x: 0,
  };

  handleDeleteButton = (id) => {
    this.props.deletePost(id);
  };

  handleUpdateButton = () => {
    this.setState({
      hidden: !this.state.hidden,
    });
  };

  handleClosePopup = () => {
    this.setState({
      hidden: false,
    });
  };

  handleSubmit = (e, id) => {
    e.preventDefault();
    let newData = {
      body: this.state.body,
      cost: this.state.cost,
    };
    this.props.updatePost(id, newData);
    this.setState({
      hidden: false,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSwipe = (e) => {
    if (e.deltaX > 30 || e.deltaX < -30) {
      this.setState({
        x: this.state.x,
      });
    } else {
      this.setState({
        x: -e.deltaX,
      });
    }
  };

  handleAfterSwipe = (e, id) => {
    if (e.deltaX >= 30 || e.deltaX <= -30) {
      this.props.nacakToMis(id);
    }

    this.setState({
      x: 0,
    });
  };

  render() {
    const { nacak } = this.props;

    let ownerColor = "";
    if (nacak.owner === "Baran") {
      ownerColor = "blue";
    } else if (nacak.owner === "Tolga") {
      ownerColor = "green";
    } else {
      ownerColor = "red";
    }

    return (
      <Fragment>
        <Swipeable
          onSwiping={(e) => this.handleSwipe(e)}
          onSwiped={(e, id) => this.handleAfterSwipe(e, nacak._id)}
          preventDefaultTouchmoveEvent={true}
        >
          <div
            className="nacak-wrapper"
            style={{
              transform: `translateX(${this.state.x}px)`,
            }}
          >
            <span className="nacak-text">
              {nacak.body.length > 20 ? `${nacak.body.substring(0, 20)}...` : nacak.body}
            </span>
            <div className="nacak-detail-container">
              <div className="nacak-buttons">
                <button className="nacak-update-button" onClick={() => this.handleUpdateButton()}>
                  ...
                </button>
                <button
                  className="nacak-delete-button"
                  onClick={() => this.handleDeleteButton(nacak._id)}
                >
                  X
                </button>
              </div>
              <span className={`nacak-owner ${ownerColor}`}>{nacak.owner}</span>
              <span className="nacak-cost">{nacak.cost}TL</span>
            </div>
          </div>
          <div className={`update-container ${this.state.hidden ? "" : "hidden"}`}>
            <form onSubmit={(e) => this.handleSubmit(e, nacak._id)} className="popup-wrapper">
              <div className="popup-content-wrapper">
                <div className="body-input">
                  <label className="update-label">Ne?</label>
                  <input
                    type="text"
                    onChange={(e) => this.handleChange(e)}
                    name="body"
                    className="body-input"
                    placeholder={nacak.body}
                  />
                </div>

                <div className="cost-input">
                  <label className="update-label">Fiyat</label>
                  <input
                    type="number"
                    onChange={(e) => this.handleChange(e)}
                    name="cost"
                    className="cost-input"
                    placeholder={nacak.cost}
                  />
                </div>
              </div>
              <div className="popup-action-wrapper">
                <button type="submit" className="popup-button update">
                  Gönder
                </button>
                <div className="popup-button close" onClick={() => this.handleClosePopup()}>
                  Kapat
                </div>
              </div>
            </form>
          </div>
        </Swipeable>
      </Fragment>
    );
  }
}

export default connect(null, { deletePost, updatePost, fetchData, nacakToMis })(Nacak);
