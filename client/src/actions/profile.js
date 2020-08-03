import { GET_PROFILE, PROFILE_ERROR } from "./types";
import api from "../utils/api";
import { setAlert } from "./alert";

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await api.get("/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update profile
export const updateProfile = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/profile", formData);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Profile Updated", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }
  }
};
