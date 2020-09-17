import { SET_UNAUTHENTICATED, SET_ERROR, SET_USER, LOADING_DATA } from "./types";
import axios from "axios";
import _ from "lodash";

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .post("/api/login", { pass: userData.pass })
    .then((res) => {
      dispatch(fetchUser());
      history.push("/home");
    })
    .catch((err) => {
      dispatch({ type: SET_ERROR });
    });
};

export const logoutUser = () => (dispatch) => {
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const fetchUser = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/api/ownerDetail")
    .then((res) => {
      if (_.isEmpty(res.data)) {
        dispatch({ type: SET_UNAUTHENTICATED });
      } else {
        dispatch({ type: SET_USER, payload: res.data });
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
