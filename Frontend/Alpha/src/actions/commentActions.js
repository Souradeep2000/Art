import axios from "../axios";
import {
  COMMENT_LIST_FAIL,
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
  POST_COMMENT_FAIL,
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
} from "../constants/commentConstants";

export const postComment = (token, rating, productId) => async (dispatch) => {
  dispatch({
    type: POST_COMMENT_REQUEST,
  });
  try {
    const response = await axios.patch(
      `/api/product/reviews/${productId}`,
      { rating },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    dispatch({ type: POST_COMMENT_SUCCESS, payload: response.data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: POST_COMMENT_FAIL, payload: message });
  }
};

export const listComments = (productId, page) => async (dispatch) => {
  dispatch({
    type: COMMENT_LIST_REQUEST,
  });

  try {
    const response = await axios.get(
      `/api/comments/${productId}?limit=${page * 3}`
    );
    dispatch({ type: COMMENT_LIST_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: COMMENT_LIST_FAIL, payload: err.message });
  }
};
