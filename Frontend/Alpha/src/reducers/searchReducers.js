import {
  SEARCH_INPUT_SUCCESS,
  SEARCH_LIST_SUCCESS,
} from "../constants/searchConstant";

export const searchListReducer = (
  state = { loading: true, searchedItems: [] },
  action
) => {
  switch (action.type) {
    case SEARCH_LIST_SUCCESS:
      return { loading: false, searchedItems: action.payload };

    default:
      return state;
  }
};

export const searchInputReducer = (
  state = { loading: true, searchedText: "" },
  action
) => {
  switch (action.type) {
    case SEARCH_INPUT_SUCCESS:
      return { loading: false, searchedText: action.payload };

    default:
      return state;
  }
};
