import {
  SET_DATA,
  POST_DATA,
  DELETE_DATA,
  UPDATE_DATA,
  TO_MIS,
  TO_NACAK,
  LOADING_DATA,
} from "./types";
import axios from "axios";

export const fetchData = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/api/nacaklar")
    .then((res) => {
      dispatch({ type: SET_DATA, payload: res.data });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const postData = (dataDetail) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .post("/api/yeni", dataDetail)
    .then((res) => {
      dispatch({ type: POST_DATA, payload: res.data });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const deletePost = (id) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/api/sil/${id}`)
    .then((res) => {
      dispatch({ type: DELETE_DATA, payload: id });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const updatePost = (id, newData) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .post(`/api/guncelle/${id}`, { body: newData.body, cost: newData.cost })
    .then((res) => {
      dispatch({ type: UPDATE_DATA, payload: res.data });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const nacakToMis = (id) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/api/toMis/${id}`)
    .then((res) => {
      dispatch({ type: TO_MIS, payload: res.data });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const misToNacak = (id) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/api/toNacak/${id}`)
    .then((res) => {
      dispatch({ type: TO_NACAK, payload: res.data });
    })
    .catch((err) => {
      console.error(err);
    });
};
