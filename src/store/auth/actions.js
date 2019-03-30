import * as keys from "./actionTypes";

import axios from "../../utils/axios";

export const toggleMachineLearningConsole = (data) => {
  return {
    type: keys.TOGGLE_ML_CONSOLE,
    payload: data
  }
};

export function createLineModel(data) {
  return {
    type: keys.CREATE_LINE_MODEL,
    async payload() {
      try {
        // console.log('Post data => ', data);
        const res = await axios.post('linemodels/create', data);
        return res.data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  };
}
