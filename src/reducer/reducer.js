import {combineReducers} from "redux"
import authReducers from "./authReducers"
import userReducer from "./userReducer"

const rootreducer=combineReducers({
    auth:authReducers,
    user:userReducer
})

export default rootreducer
