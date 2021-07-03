import { userConstants } from "../actions/authconstants"
const initialState={
    users:[],
    conversations:[]
}

export default (state=initialState,action) =>{
    // console.log(action.type);
    switch(action.type){
        case userConstants.GET_REALTIME_USERS_REQUEST:
            break
        case userConstants.GET_REALTIME_USERS_SUCCESSFULL:
            state={
                ...initialState,
                users:action.payload.usersOnline
            }
            break
        case userConstants.GET_REALTIME_USERS_FAILURE:
            break
        case userConstants.GET_REALTIME_MESSAGES_SUCCESS:
            state={
                ...state,
                conversations:action.payload.conversations
            }
            break
        case userConstants.GET_REALTIME_MESSAGES_FAILURE:
            state={
                ...state,
                conversations:action.payload.conversations
            }

    }
    return state
}