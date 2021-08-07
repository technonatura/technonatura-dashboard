import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";

import RootReducer from "./reducers";
import watcherSaga from "./sagas/watcher";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, thunk];

const Store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);
export type RootStore = ReturnType<typeof RootReducer>;

sagaMiddleware.run(watcherSaga);

export default Store;
