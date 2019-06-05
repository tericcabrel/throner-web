import * as keys from "./actionTypes";

import axios from "../../utils/axios";
import {CHECK_STATUS_KEY} from "../../constants";

export function takePictureRequest(data) {
  return {
    type: keys.TAKE_PICTURE_REQUEST,
    message: `PM001:::${JSON.stringify(data)}`,
    meta: {
      socket: {
        channel: "throner_req"
      }
    }
  };
}

export const takePictureResponse = (data) => {
  return {
    type: keys.TAKE_PICTURE_RESPONSE,
    payload: data
  }
};


export function checkStatusRequest() {
  return {
    type: keys.CHECK_STATUS_REQUEST,
    message: `PM003:::${JSON.stringify({ action: '1' })}`,
    meta: {
      socket: {
        channel: "throner_req"
      }
    }
  };
}

export const checkStatusResponse = (data) => {
  localStorage.removeItem(CHECK_STATUS_KEY);
  return {
    type: keys.CHECK_STATUS_RESPONSE,
    payload: data
  }
};

export function sendCommand(data) {
  return {
    type: keys.SEND_COMMAND_REQUEST,
     message: `PM005:::${JSON.stringify(data)}`,
    meta: {
      socket: {
        channel: "throner_req"
      }
    }
  };
}

export const sendCommandResponse = (data) => {
  return {
    type: keys.SEND_COMMAND_RESPONSE,
    payload: data
  }
};
/* ============================================================================== */
export function getCameraGallery() {
  return {
    type: keys.GET_CAMERA_MEDIA,
    async payload() {
      try {
        const res = await axios.get('pictures');
        return res.data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  };
}

export const setGlobalError = (data) => {
  return {
    type: keys.APP_GLOBAL_ERROR,
    payload: data
  }
};

export function deletePicture(id) {
  return {
    type: keys.DELETE_PICTURE,
    async payload() {
      try {
        const res = await axios.delete(`pictures/${id}`);
        return res.data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  };
}

export function deleteAllPictures() {
  return {
    type: keys.DELETE_ALL_PICTURE,
    async payload() {
      try {
        const res = await axios.delete('pictures');
        return res.data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  };
}

export const changeAppStatus = (data) => {
  return {
    type: keys.CHANGE_APP_STATUS,
    payload: data
  }
};

export function getSessions() {
  return {
    type: keys.GET_SESSIONS,
    async payload() {
      try {
        const res = await axios.get('sessions');
        return res.data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  };
}

export function getSession(id) {
  return {
    type: keys.GET_SESSION,
    async payload() {
      try {
        const res = await axios.get(`sessions/${id}`);
        return res.data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  };
}
