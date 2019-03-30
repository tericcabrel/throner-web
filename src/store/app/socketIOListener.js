import {
  takePictureResponse
} from "./actions";

const socketConfigure = (socket, store, trySocketConnect) => {
  socket.on("connect", () => {
    console.log(`Connected to socket server !`);
  });

  // Analytic method socket response
  socket.on("TK_PIC_RESPONSE", (data) => {
    const socketError = null; //getSocketErrorMessage(data);

    //TODO create a modal in withUserHOC for handling Socket error TEC
    if (socketError === null) {
      store.dispatch(takePictureResponse(JSON.parse(data)));
    }
  });

  socket.on("disconnect", () => {
    trySocketConnect();
  });
};

export default socketConfigure;
