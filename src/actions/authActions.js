import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import { Authconstants } from "./authconstants"

// const auth = firebase.auth()
// const firestore=firebase.firestore()
export const signup=(user) =>{
    return async (dispatch) =>{
           const db=firebase.firestore()
           dispatch({
               type:Authconstants.USER_LOGIN_REQUEST
           })
           firebase.auth()
           .createUserWithEmailAndPassword(user.username,user.password)
           .then(data =>{
            //    console.log(data)
               const current_user=firebase.auth().currentUser
               const name=`${user.Firstname}`
               current_user.updateProfile({
                   displayName:name
               }).then(() =>{
                   db.collection('users')
                   .doc(data.user.uid)
                   .set({
                       firstname:user.Firstname,
                       lastname:user.Lastname,
                       uid:data.user.uid,
                       isOnline:true,
                       createdAt: new Date()
                       
                   }).then(() =>{
                   
                       const loggedinUser={
                        firstname:user.Firstname,
                        lastname:user.Lastname,
                        uid:data.user.uid,
                        email:user.username
                       }
                       localStorage.setItem("user",JSON.stringify({loggedinUser}))
                       localStorage.setItem("firstname",user.Firstname)
                       localStorage.setItem("uid",data.user.uid)
                  console.log("user logged in successfully...!");
                  dispatch({
                      type:Authconstants.USER_LOGIN_SUCCESS,
                      payload:{user:loggedinUser}
                  })
                    })
                   .catch((err) =>{
                       console.log(err)
                       dispatch({
                           type:Authconstants.USER_LOGIN_FAILURE,
                           payload:{err}  
                       })
                   })

               })
           }).catch(err =>{
               console.log(err)
           })
    }
}

export const signin=(user) =>{
    return async (dispatch) =>{
       // const db=firebase.firestore()
        dispatch({
            type:Authconstants.USER_LOGIN_REQUEST
        })



        firebase.auth().signInWithEmailAndPassword(user.username,user.password)
        .then(data =>{
            //  console.log(data)

            const db=firebase.firestore()

            db.collection("users")
            .doc(data.user.uid)
            .update({
                isOnline:true
            })
            .then( () => {
                const name=data.user.displayName;
                const firstname=name;
    
                const loggedinUser={
                   firstname,
                   uid:data.user.uid,
                   email:user.username
                  }
                  localStorage.setItem('user',JSON.stringify(loggedinUser))
                  localStorage.setItem("firstname",firstname)
                          localStorage.setItem("uid",data.user.uid)
                  dispatch({
                      type:Authconstants.USER_LOGIN_SUCCESS,
                      payload:{user:loggedinUser}
                  })
            }
              
                
                
            ).catch( err => {console.log(err)}
            
            )



            
            
               
    
            }).catch(err =>{
                console.log(err)
                dispatch({
                    type:Authconstants.USER_LOGIN_FAILURE,
                    payload:{err}
                })
    
            })

    }
}

export const isuserlogged =() => {
    return async dispatch =>{
        const user=localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null
        if(user){
           dispatch({
               type:Authconstants.USER_LOGIN_SUCCESS,
               payload:{user}
           })
        }
        else{
            dispatch({
                type:Authconstants.USER_LOGIN_FAILURE,
                payload:{err:"log in failed"}
            })
        }
    }
}

export const logout=(uid) =>{
    
    return async dispatch =>{
        dispatch({
            type:Authconstants.USER_LOGOUT_REQUEST
        })
        const db=firebase.firestore()
        db.collection("users")
        .doc(uid)
        .update({
            isOnline:false
        }).then(()=>{
            firebase.auth()
            .signOut()
            .then(
                () =>{
                    localStorage.clear()
                    dispatch({
                        type:Authconstants.USER_LOGOUT_SUCCESSFULL
                    })
                    console.log("successfully logged out")
                }
            )
            .catch( (err) =>{
                dispatch({
                    type:Authconstants.USER_LOGOUT_FAILURE,
                    payload:{err}
                })
            })
        })
        .catch((err) =>{
            console.log(err)
        })
        
        
        
       

    }
}