import * as keys from './actionTypes';
import { FLIGHT_STATUS } from "../../constants";
import { batteryVoltageToPercent } from "../../utils/helpers";

const initialState = {
  data: null,
  loading: false,
  error: null,
  gallery: [],
  globalError: null,
  status: 'on',
  battery: 20,
  flightStatus: FLIGHT_STATUS.LANDED,
  thrust: 0,
  sessions: [],
  session: null,
  positions: [],
  settings: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case `${keys.GET_CAMERA_MEDIA}_PENDING`:
      return { ...state, loading: true };
    case `${keys.GET_CAMERA_MEDIA}_FULFILLED`:
      return { ...state, loading: false, gallery: payload };
    case `${keys.GET_CAMERA_MEDIA}_REJECTED`:
      return { ...state, loading: false, error: payload };

    case `${keys.GET_SESSIONS}_PENDING`:
      return { ...state, loading: true };
    case `${keys.GET_SESSIONS}_FULFILLED`:
      return { ...state, loading: false, sessions: payload };
    case `${keys.GET_SESSIONS}_REJECTED`:
      return { ...state, loading: false, error: payload };

    case `${keys.GET_SESSION}_PENDING`:
      return { ...state, loading: true, session: null };
    case `${keys.GET_SESSION}_FULFILLED`:
      return { ...state, loading: false, session: payload };
    case `${keys.GET_SESSION}_REJECTED`:
      return { ...state, loading: false, error: payload };

    case keys.TAKE_PICTURE_RESPONSE:
      return { ...state, data: payload };

    case keys.CHECK_STATUS_RESPONSE:
      const { message } = payload;
      const batteryPercent = batteryVoltageToPercent(message.battery);
      const updatedMessage = { ...message, battery: batteryPercent };
      return { ...state, ...updatedMessage };

    case keys.APP_GLOBAL_ERROR:
      return { ...state, globalError: payload };

    case keys.CHANGE_APP_STATUS:
      return { ...state, ...payload };

    case `${keys.GET_SETTING}_PENDING`:
      return { ...state, loading: true, settings: null };
    case `${keys.GET_SETTING}_FULFILLED`:
      return { ...state, loading: false, settings: payload };
    case `${keys.GET_SETTING}_REJECTED`:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};
