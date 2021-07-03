import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getrealtimeConversations, getRealtimeusers, sendingMessage } from '../../actions'
import Header from '../../components/header/header'

// import React from 'react';
import "/leka/src/App.css"

const User=(props)=>{
  const random = Math.floor(Math.random() * 5)
  const color=["#402218","#053742","#FF7600","#BB371A","#24A19C"]
  const {user,onClick}=props
  return <div onClick={() => onClick(user) } className="displayName">
  <div className="displayPic">
      {/* <img src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg" alt="" /> */}
      <div className="usernamepic"style={{backgroundColor:color[random]}}>{user.firstname[0]}</div>
  </div>
  <div style={{margin: '0 10px',display:"flex",flex:1,justifyContent:"space-between"}}>
      <span style={{fontWeight: 500}}>{user.firstname}</span>
      <span className={user.isOnline?"userOnline":"userOffline"}></span>
  </div>
</div>
}

const Home = (props) => {

  const dispatch=useDispatch()
  
  const auth=useSelector(state=> state.auth)
  const user=useSelector(state => state.user)
  const [chatStarted,setChatStarted]=useState(false)
  const [chatUsername,setChatUsername]=useState("")
  const [message,setMessage]=useState("")
  const [userUid,setUserUid]=useState("")
  // let unsubscribe
  // console.log(auth.uid)
  useEffect(()=>{
   dispatch(getRealtimeusers(auth.uid))
    .then(unsubscribe => {
      return unsubscribe
    }).catch(err => {
      console.log(err)
    })
    // console.log(unsubscribe,"subscribe");
  },[])
  // console.log(unsubscribe,"subscribe");
  // useEffect(()=>{
  //   return () => {
  //     unsubscribe.then(f => f()).catch(err => console.log(err))
  //   }
  // })
  const initchat=(user) =>{
    setChatStarted(true)
    setChatUsername(user.firstname)
    setUserUid(user.uid)
    dispatch(getrealtimeConversations({uid_1:localStorage.getItem("uid"),uid_2:user.uid}))
  }

  const sendMessage=(e)=>{
    const msgObj={
      user_uid_1:localStorage.getItem("uid"),
      user_uid_2:userUid,
      message
    }
    if(message!==""){
      dispatch(sendingMessage(msgObj))
    }
    setMessage("")
    // console.log(msgObj)
  }

  // const userview=(data) => {

  // }

  return (

    <div ><Header />
    <section className="container" style={{position:'fixed',top:"80px"}} >
    <div className="listOfUsers">
<div style={{textAlign:'center',paddingTop:"10px",marginBottom:"23px"}}><h3>
<img src="https://img.icons8.com/ios/22/000000/speech-bubble-with-dots.png"/>  Chats</h3></div><hr />

{
  user.users.length> 0 ?
  user.users.map(user =>{
    return <User
    onClick={initchat} 
    key={user.uid} 
    user={user} />
  }):null
}



        
                
    </div>
    <div className="chatArea">
    <div className="chatHeader" style={{zIndex:"1"}}> 
        <div style={{marginTop:"20px",fontFamily:"cursive"}}><h2>{chatStarted?chatUsername:null}</h2></div>
        </div>
        <div className="messageSections"   >
            {chatStarted?
            user.conversations.map(con =><div style={{ textAlign:con.user_uid_1==localStorage.getItem("uid")?"right" :'left',width:"100%",height:"12%" }}>
            <p className="messageStyle" key={user.id} >{con.message}
            </p>
            
            
        </div>)
            :null}

        </div>
        {
          chatStarted?<div className="chatControls">
          <textarea 
           value={message}
           onChange={(e) => setMessage(e.target.value)}/>
          <button onClick={sendMessage}>Send</button>
      </div>:null
        }
    </div>
</section></div>
    
  );
}

export default Home;