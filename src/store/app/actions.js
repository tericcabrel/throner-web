import * as keys from "./actionTypes";

import axios from "../../utils/axios";

export function takePictureRequest(data) {
  return {
    type: keys.TAKE_PICTURE_REQUEST,
    message: JSON.stringify(data),
    meta: {
      socket: {
        channel: "TK_PIC_REQUEST"
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
