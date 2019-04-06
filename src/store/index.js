import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import dynamicMiddlewares, { addMiddleware } from "redux-dynamic-middlewares";
import io from "socket.io-client";

// Import socket utilities
import socketIOEmitterMiddleware from "./app/socketIOEmitter";
import socketIOListener from "./app/socketIOListener";

// reducers
import AuthReducer from './auth/reducer';
import AppReducer from './app/reducer';

const middlewares = [ dynamicMiddlewares, thunk, promise ];

const socketUrl = process.env.REACT_APP_SOCKET_URL;
const socketPath = process.env.REACT_APP_SOCKET_PATH;

// combined reducers
const reducers = combineReducers({
  auth: AuthReducer,
  app: AppReducer,
});

export function configureStore(initialState) {

  let composeEnhancers;
  if (process.env.NODE_ENV !== 'production') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  } else {
    composeEnhancers = compose;
  }

  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(
      applyMiddleware(...middlewares)
    )
  );

  // Configure socket
  let socket;

  const trySocketConnect = () => {
    if (socket) socket.close();

    if(!socketPath) {
      socket = io.connect(`${socketUrl}`);
    } else {
      socket = io.connect(`${socketUrl}`, { path: socketPath });
    }

    socketIOListener(socket, store, trySocketConnect);

    socket.on("connect", () => {
      addMiddleware(socketIOEmitterMiddleware(socket));
    });
  };

  trySocketConnect();

  return store;
}
