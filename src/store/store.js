import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootreducer from "../reducer/reducer";

const store=createStore(rootreducer,applyMiddleware(thunk))
export default store