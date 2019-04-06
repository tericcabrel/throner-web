import _ from 'lodash';

const socketIOEmitter = (socket) => () => (next) => (action) => {
  if(_.startsWith(action.type, 'SKT')) {
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
