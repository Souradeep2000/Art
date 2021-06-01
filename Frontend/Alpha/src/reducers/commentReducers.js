import {
  COMMENT_LIST_FAIL,
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
  POST_COMMENT_FAIL,
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
} from "../constants/commentConstants";

export const commentPostReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_COMMENT_REQUEST:
      return { loading: true };
    case POST_COMMENT_SUCCESS:
      return { loading: false, success: action.payload };
    case POST_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const commentListReducer = (
  state = { loading: true, cmts: [] },
  action
) => {
  switch (action.type) {
    case COMMENT_LIST_REQUEST:
      return { loading: true };
    case COMMENT_LIST_SUCCESS:
      return {
        loading: false,
        cmts: action.payload.comments,
        infLen: action.payload.result,
      };
    case COMMENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
