import * as keys from "./actionTypes";

import axios from "../../utils/axios";

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


export function checkStatusRequest(data) {
  return {
    type: keys.CHECK_STATUS_REQUEST,
    message: `PM003:::${JSON.stringify(data)}`,
    meta: {
      socket: {
        channel: "throner_req"
      }
    }
  };
}

export const checkStatusResponse = (data) => {
  return {
    type: keys.CHECK_STATUS_RESPONSE,
    payload: data
  }
};

export function verifyBatteryRequest(data) {
  return {
    type: keys.VERIFY_BATTERY_REQUEST,
    message: `PM005:::${JSON.stringify(data)}`,
    meta: {
      socket: {
        channel: "throner_req"
      }
    }
  };
}

export const verifyBatteryResponse = (data) => {
  return {
    type: keys.VERIFY_BATTERY_RESPONSE,
    payload: data
  }
};

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
