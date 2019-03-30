import * as keys from './actionTypes';

const initialState = {
  data: null,
  loading: false,
  error: null,
  gallery: []
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case `${keys.GET_CAMERA_MEDIA}_PENDING`:
      return { ...state, loading: true };
    case `${keys.GET_CAMERA_MEDIA}_FULFILLED`:
      return { ...state, data: payload, loading: false, gallery: payload };
    case `${keys.GET_CAMERA_MEDIA}_REJECTED`:
      return { ...state, loading: false, error: payload };

    case keys.TAKE_PICTURE_RESPONSE:
      return { ...state, data: payload };

    default:
      return state;
  }
};
