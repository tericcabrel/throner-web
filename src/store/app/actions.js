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


export function getCameraGallery(data) {
  return {
    type: keys.GET_CAMERA_MEDIA,
    async payload() {
      try {
        // console.log('Post data => ', data);
        const res = await axios.post('camera/media', data);
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
