import { SET_UNAUTHENTICATED, SET_OWNER, SET_ERROR, SET_DATA } from "./types";
import axios from "axios";

export const loginUser = (userData, history) => (dispatch) => {
  console.log(userData);
  axios
    .post("/api/login", { pass: userData.pass })
    .then((res) => {
      dispatch({ type: SET_OWNER, payload: res.data.name });
      history.push("/home");
    })
    .catch((err) => {
      dispatch({ type: SET_ERROR });
    });
};

export const logoutUser = () => (dispatch) => {
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const fetchData = () => (dispatch) => {
  axios
    .get("/api/nacaklar")
    .then((res) => {
      dispatch({ type: SET_DATA, payload: res.data });
    })
    .catch((err) => {
      console.error(err);
    });
};
