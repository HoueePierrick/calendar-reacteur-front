import { combineReducers } from "redux";
import { sampleReducer } from "../reducers/sample";

export default combineReducers({
  sample: sampleReducer
});
