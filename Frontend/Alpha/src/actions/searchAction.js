import {
  SEARCH_INPUT_SUCCESS,
  SEARCH_LIST_SUCCESS,
} from "../constants/searchConstant";

export const listSearch = (data) => async (dispatch) => {
  dispatch({ type: SEARCH_LIST_SUCCESS, payload: data });
};

export const searchInput = (data) => async (dispatch) => {
  dispatch({ type: SEARCH_INPUT_SUCCESS, payload: data });
};
