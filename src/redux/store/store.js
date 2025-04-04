import { legacy_createStore as createStore, combineReducers } from "redux";
import { productReducer } from "../reducers/productReducer";

const rootReducer = combineReducers({
  productos: productReducer
});

export const store = createStore(rootReducer);


