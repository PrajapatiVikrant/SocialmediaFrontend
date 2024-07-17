import React from "react";
import { useEffect } from "react";
import "./Message.css"
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { UpdateMessageData } from "../State/Slice/MessageDataSlice";
import { useState } from "react";
const socket = io('https://vikrant-socialmedia-backend.vercel.app');
function Message() {
    const [messageInput,setMessageInput] = useState('')
    const [scroll,setscroll] = useState(0)
    const messagedata = useSelector((state)=>{
      return state.MessageData;
    })
    const dispatch = useDispatch();
    useEffect(() => {
        
        socket.emit('getdata',{user_id1:localStorage.getItem('user1'),user_id2:localStorage.getItem('user2')})
        socket.on('messagearray', (data) => {
            dispatch(UpdateMessageData({
                user_name:localStorage.getItem('user_name'),
                messageBox:data
              }))
        })
    }, [])
    function clearAllChat(){
       const data =  confirm('clear chat for everyone')
       if(data){
        socket.emit('clearChat',{user_id1:localStorage.getItem('user1'),user_id2:localStorage.getItem('user2')})
        socket.on('clearChat',(data)=>{
         dispatch(UpdateMessageData({
             user_name:localStorage.getItem('user_name'),
             messageBox:data.message
           }))
        })
       }
       
    }
    function SendMessage(){
        
        if(messageInput){
            socket.emit('sendMessage',{user_id1:localStorage.getItem('user1'),user_id2:localStorage.getItem('user2'),token:localStorage.getItem('token'),message:messageInput})
            socket.on('sendResponse',(data)=>{
                console.log(data)
                dispatch(UpdateMessageData({
                    user_name:localStorage.getItem('user_name'),
                    messageBox:data.message
                  }))
                  
                  document.getElementById('scroll').click()
                  setMessageInput('')
                  
            })
        }else{
            alert('message field  required')
        }
        
    }
    return (
        <center>
            <div className="messageComponent">
                <div className="connectionDetail">
                    <div className="connectionName">{messagedata.user_name}</div>
                    <div className="clearAllChat" onClick={clearAllChat}>Delete:{messagedata.messageBox.length}</div>
                </div>
                <a href='#down' id="scroll">scroll</a>
                   
                <div className="messagectn">
                       {messagedata.messageBox.map((elem,ind)=>{
                        
                        return (
                            <div className={(elem.name==localStorage.getItem('user_name'))?'other':'me'}>
                                
                            <div className="message">
                            <div className="message_name">{elem.name}</div>
                            <div className={(elem.name==localStorage.getItem('user_name'))?'message_other':'message_me'}>{elem.message.message_text}</div>
                            <br />
                        </div>
                        </div>
                        )
                       })} 
                       <div id="down"></div>
                </div>
                <div className="sendctn">
                <input className="messageInput" value={messageInput} onChange={(e)=>setMessageInput(e.target.value)} placeholder="Enter message here.." type="text" />
                <button className="messageBtn" disabled={!messageInput} onClick={SendMessage}>Send</button>
                </div>
                

            </div>
        </center>
    )
}
export default Message;