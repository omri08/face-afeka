import { GET_PROFILE, PROFILE_ERROR, GET_MY_PROFILE } from "../actions/types";

const initialState = {
  myProfile: null,
  profile: null,
  friends: [],
  friendRequests: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_MY_PROFILE:
      return {
        ...state,
        myProfile: payload,
        loading: false,
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };

    default:
      return state;
  }
}
