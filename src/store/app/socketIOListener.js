import {
  checkStatusResponse,
  sendCommandResponse,
  setGlobalError,
  takePictureResponse
} from "./actions";
import { parseResponseMessage } from "../../utils/helpers";
import { PM_MAPPINGS } from "../../constants";

const canLogRequest = process.env.REACT_APP_LOG_SOCKET === 'TRUE';

const socketConfigure = (socket, store, trySocketConnect) => {
  socket.on("connect", () => {
    console.log(`Connected to socket server !`);
  });

  // Analytic method socket response
  socket.on("throner_res", (data) => {
    if (canLogRequest) {
      console.log('Return socket => ', data);
    }
    const response = parseResponseMessage(data);
    if (response.error) {
      // console.log('Error => ', response.message);
      store.dispatch(setGlobalError({ ...response }));
      return;
    }

    switch (response.processId) {
      case PM_MAPPINGS.TAKE_PICTURE:
        store.dispatch(takePictureResponse(response.data));
        break;
      case PM_MAPPINGS.CHECK_STATUS:
        store.dispatch(checkStatusResponse(response.data));
        break;
      case PM_MAPPINGS.SEND_COMMAND:
        store.dispatch(sendCommandResponse(response.data));
        break;
      default:
        console.log('Unknown socket action !');
        break;
    }
  });

  socket.on("disconnect", () => {
    trySocketConnect();
  });
};

export default socketConfigure;
