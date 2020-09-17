import React, { Fragment } from "react";
import "../css/Mis.css";
import { connect } from "react-redux";
import { deletePost, fetchData, misToNacak } from "../actions/dataActions";
import { Swipeable } from "react-swipeable";

class Mis extends React.Component {
  state = {
    x: 0,
  };

  handleDeleteButton = (id) => {
    this.props.deletePost(id);
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
      this.props.misToNacak(id);
    }

    this.setState({
      x: 0,
    });
  };

  render() {
    const { mis } = this.props;

    let ownerColor = "";
    if (mis.owner === "Baran") {
      ownerColor = "blue";
    } else if (mis.owner === "Tolga") {
      ownerColor = "green";
    } else {
      ownerColor = "red";
    }
    return (
      <Fragment>
        <Swipeable
          onSwiping={(e) => this.handleSwipe(e)}
          onSwiped={(e, id) => this.handleAfterSwipe(e, mis._id)}
          preventDefaultTouchmoveEvent={true}
        >
          <div
            className="mis-wrapper"
            style={{
              transform: `translateX(${this.state.x}px)`,
            }}
          >
            <span className="mis-text">
              {mis.body.length > 20 ? `${mis.body.substring(0, 24)}...` : mis.body}
            </span>
            <div className="mis-detail-container">
              <div className="mis-buttons">
                <button
                  className="mis-delete-button"
                  onClick={() => this.handleDeleteButton(mis._id)}
                >
                  X
                </button>
              </div>
              <span className={`mis-owner ${ownerColor}`}>{mis.owner}</span>
              <span className="mis-cost">{mis.cost}TL</span>
            </div>
          </div>
        </Swipeable>
      </Fragment>
    );
  }
}

export default connect(null, { deletePost, fetchData, misToNacak })(Mis);
