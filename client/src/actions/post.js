import api from "../utils/api";
import { ADD_POST, POST_ERROR } from "./types";

//Add post
export const addPost = (formData) => async (dispatch) => {
  try {
    console.log(formData);
    const res = await api.post("/posts", formData);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
