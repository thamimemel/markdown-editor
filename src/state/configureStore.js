import { createStore, combineReducers } from "redux";
import appReducer from "./reducers/appReducer";
import settingsReducer from "./reducers/settingsReducer";

export default () => {
  const store = createStore(
    combineReducers({
      app: appReducer,
      settings: settingsReducer,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
};
