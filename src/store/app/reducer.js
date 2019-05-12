import * as keys from './actionTypes';

const initialState = {
  data: null,
  loading: false,
  error: null,
  gallery: [],
  globalError: null,
  status: 'on',
  battery: 10
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

    case keys.CHECK_STATUS_RESPONSE:
      const { message } = payload;
      return { ...state, ...message };

    case keys.APP_GLOBAL_ERROR:
      return { ...state, globalError: payload };

    case keys.CHANGE_APP_STATUS:
      return { ...state, ...payload };

    default:
      return state;
  }
};
