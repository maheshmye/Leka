import { Authconstants } from "../actions/authconstants"

const InitialState={
    firstname:"",
    lastname:"here is the mistake",
    email:"",
    authenticating:false,
    authenticated:false,
    uid:"",
    err:null
}

export default (state=InitialState,action) =>{
    console.log(action.type);
    switch(action.type){
        case Authconstants.USER_LOGIN_REQUEST:
            state={
                ...state,
                authenticating:true,
                authenticated:false,
            }
            
            break
        case Authconstants.USER_LOGIN_SUCCESS:
            state={
                ...state,
                ...action.payload.user,
                authenticating:false,
                authenticated:true,
            }
            break
        case Authconstants.USER_LOGIN_FAILURE:
            state={
                ...state,
                authenticating:false,
                authenticated:false,
                err:action.payload.err
            }
          break
        case Authconstants.USER_LOGOUT_REQUEST:
            
            break
        case Authconstants.USER_LOGOUT_SUCCESSFULL:
            state={
                ...InitialState
            }
            break
        case Authconstants.USER_LOGOUT_FAILURE:
            state={
                ...state,
                err:action.payload.err
            }
    }
    return state
}