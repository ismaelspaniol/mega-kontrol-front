import { createStore, applyMiddleware } from 'redux';
import stores from "../store/reducers";
import thunk from "redux-thunk";

export default createStore(stores, applyMiddleware(thunk));