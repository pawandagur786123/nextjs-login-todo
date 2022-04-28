// import { createStore, combineReducers, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import notesReducer from "./notesReducer";
// import authReducer from "./authreducer";
// import editReducer from "./editreducer"


// const rootReducer = combineReducers({
//     auth : authReducer,
//     notes: notesReducer,
//     editing: editReducer
// });


// export const initializeStore = () => {
//   return createStore(rootReducer, composeWithDevTools(applyMiddleware()));
// };

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { composeWithDevTools } from "redux-devtools-extension";
import notesReducer from "./notesReducer";
import authReducer from "./authreducer";
import editReducer from "./editreducer"

const rootReducer = combineReducers({
  auth : authReducer,
  notes: notesReducer,
  editing: editReducer
});

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const initializeStore = () => {
  let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware()));
  let persistor = persistStore(store)
  return { store, persistor }
}