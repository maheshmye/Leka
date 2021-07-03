import firebase from "firebase"
import "firebase/auth"
import "firebase/firestore"
import { userConstants } from "./authconstants"

export const getRealtimeusers=(uid)=>{
    return async (dispatch)=>{
        
        dispatch({
            type:userConstants.GET_REALTIME_USERS_REQUEST
        })
        const db=firebase.firestore()
        const unsubscribe=db.collection("users")
    .onSnapshot((querySnapshot) => {
        const usersOnline = []
        querySnapshot.forEach((doc) => {
            if(doc.data().uid!==uid){
                usersOnline.push(doc.data())
            }
            
        })
        dispatch({
            type:userConstants.GET_REALTIME_USERS_SUCCESSFULL,
            payload:{usersOnline}
        })
     })
    //  console.log(unsubscribe)
     return unsubscribe
    }
}




export const sendingMessage=(msgobj) =>{
    return async dispatch =>{
        const db=firebase.firestore()
        db.collection("conversations")
        .add({
            ...msgobj,
            isView:false,
            createdAt:new Date()
        })
        .then((data) => {
            // console.log(data)
        })
        .catch(err =>{
            console.log(err)
        })
    }
}

export const getrealtimeConversations = (user) =>{
    return async dispatch=>{
        console.log("entered")
        const db=firebase.firestore()
        db.collection("conversations")
        .where("user_uid_1","in",[user.uid_1,user.uid_2])
        .orderBy("createdAt","asc")
        .onSnapshot((querySnapshot) =>{
            const conversations=[]
            querySnapshot.forEach(doc =>{

                if((doc.data().user_uid_1==user.uid_1 && doc.data().user_uid_2==user.uid_2)
                ||
                (doc.data().user_uid_1==user.uid_2 && doc.data().user_uid_2==user.uid_1)){
                    conversations.push(doc.data())
                }
                
            })
            if(conversations.length>0){
                dispatch({
                    type:userConstants.GET_REALTIME_MESSAGES_SUCCESS,
                    payload:{conversations}
                })
            }
            else{
                dispatch({
                    type:userConstants.GET_REALTIME_MESSAGES_FAILURE,
                    payload:{conversations}
                })
            }

            console.log(conversations)
        })
    }
}