import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import notesReducer from "./notesReducer";
import authReducer from "./authreducer";
import editReducer from "./editreducer"


const rootReducer = combineReducers({
    auth : authReducer,
    notes: notesReducer,
    editing: editReducer
});


export const initializeStore = () => {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware()));
};
