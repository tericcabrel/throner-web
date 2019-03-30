import * as keys from './actionTypes';

const initialState = {
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case `${keys.CREATE_LINE_MODEL}_PENDING`:
      return { ...state, loading: true };
    case `${keys.CREATE_LINE_MODEL}_FULFILLED`:
      return { ...state, data: payload, loading: false };
    case `${keys.CREATE_LINE_MODEL}_REJECTED`:
      return { ...state, loading: false, error: payload };

    case keys.TOGGLE_ML_CONSOLE:
      return { ...state };

    default:
      return state;
  }
};
