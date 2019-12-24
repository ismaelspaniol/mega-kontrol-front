import { createStore, applyMiddleware } from 'redux';
import ponyApp from "../store/reducers";
import thunk from "redux-thunk";

export default createStore(ponyApp, applyMiddleware(thunk));