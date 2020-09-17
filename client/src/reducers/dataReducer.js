import {
  SET_UNAUTHENTICATED,
  SET_OWNER,
  SET_ERROR,
  SET_DATA,
  POST_DATA,
  DELETE_DATA,
  UPDATE_DATA,
  TO_NACAK,
  TO_MIS,
} from "../actions/types";

const initialState = {
  caklar: [],
  mislar: [],
  cak: {},
  mis: {},
  authenticated: false,
  ownerName: "",
  error: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_OWNER:
      return {
        ...state,
        authenticated: true,
        ownerName: action.payload,
      };

    case SET_UNAUTHENTICATED:
      return {
        ...state,
        ownerName: "",
        authenticated: false,
      };

    case SET_ERROR:
      return {
        ...state,
        error: "PAROLA YANLIŞ YAYLAN!",
      };

    case SET_DATA:
      let nacaklar = [];
      let mislar = [];
      action.payload.map((data) => {
        if (data.mis) {
          mislar.push(data);
        } else {
          nacaklar.push(data);
        }
      });

      return {
        ...state,
        caklar: nacaklar,
        mislar: mislar,
      };

    case POST_DATA:
      const newData = action.payload;
      return {
        ...state,
        caklar: [newData, ...state.caklar],
      };

    case DELETE_DATA:
      const id = action.payload;
      let deletedCaklar = state.caklar.filter((data) => data._id !== id);
      let deletedMislar = state.mislar.filter((data) => data._id !== id);

      return {
        ...state,
        caklar: deletedCaklar,
        mislar: deletedMislar,
      };

    case UPDATE_DATA:
      let updated = action.payload;
      let old = state.caklar;
      let index = old.findIndex((old) => old._id === updated._id);
      let newCak = [...old.slice(0, index), updated, ...old.slice(index + 1, old.length)];
      return {
        ...state,
        caklar: newCak,
      };

    case TO_MIS:
      let oldCaklar = state.caklar;
      let updatedMis = action.payload;

      let newCaklar = oldCaklar.filter((cak) => cak._id !== updatedMis._id);

      return {
        ...state,
        caklar: newCaklar,
        mislar: [updatedMis, ...state.mislar],
      };

    case TO_NACAK:
      let oldMislar = state.mislar;
      let updatedCak = action.payload;

      let newMislar = oldMislar.filter((mis) => mis._id !== updatedCak._id);

      return {
        ...state,
        mislar: newMislar,
        caklar: [updatedCak, ...state.caklar],
      };

    default:
      return state;
  }
};
