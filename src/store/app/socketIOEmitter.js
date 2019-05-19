import _ from 'lodash';

const canLogRequest = process.env.REACT_APP_LOG_SOCKET === 'TRUE';

const socketIOEmitter = (socket) => () => (next) => (action) => {
  if(canLogRequest && _.startsWith(action.type, 'SKT')) {
    console.log('Data sent:', action);
  }

  if (action.meta && action.meta.socket && action.meta.socket.channel) {
    let io = socket;
    if (action.meta.socket.namespace) {
      io = io.of(action.meta.socket.namespace);
    }
    
    if (action.meta.socket.room) {
      io = io.to(action.meta.socket.room);
    }
  
    io.emit(action.meta.socket.channel, action.message);
  }
  return next(action);
};

export default socketIOEmitter;
