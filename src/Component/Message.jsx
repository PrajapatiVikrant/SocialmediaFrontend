import React from "react";
import { useEffect } from "react";
import "./Message.css"
import { useDispatch, useSelector } from "react-redux";
import { UpdateMessageData } from "../State/Slice/MessageDataSlice";
import { useState } from "react";
import axios from "axios";
function Message() {
    const [messageInput,setMessageInput] = useState('')
    const [update,setupdate] = useState('');
    const messagedata = useSelector((state)=>{
      return state.MessageData;
    })
    const dispatch = useDispatch();
    useEffect(() => {
         getdata();
    })
   async function getdata(){
          update
          const data = await axios.get(`https://socialmedia-backend-two.vercel.app/socialmedia/message/${localStorage.getItem('user1')}/${localStorage.getItem('user2')}`);
          dispatch(UpdateMessageData({
            user_name:localStorage.getItem('user_name'),
            messageBox:data.data
          }))
          setupdate('update')
    }
   async function clearAllChat(){
       const data =  confirm('clear chat for everyone')
       if(data){
        const clear = await axios.delete(`https://socialmedia-backend-two.vercel.app/socialmedia/message/${localStorage.getItem('user1')}/${localStorage.getItem('user2')}`)
         dispatch(UpdateMessageData({
             user_name:localStorage.getItem('user_name'),
             messageBox:clear.data.message
           }))
       
       }
       
    }
   async function SendMessage(){
        
        if(messageInput){
            const data = await axios.post(`https://black-chef-tktuc.pwskills.app:4000/socialmedia/message/${localStorage.getItem('user1')}/${localStorage.getItem('user2')}?token=${localStorage.getItem('token')}&message=${messageInput}`)
            
                
                dispatch(UpdateMessageData({
                    user_name:localStorage.getItem('user_name'),
                    messageBox:data.data.message
                  }))
                  
                  document.getElementById('scroll').click()
                  setMessageInput('')
                  
           
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