import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { UpdatedEditData } from "../../State/Slice/EditDataSlice";
import { UpdateMessageData } from "../../State/Slice/MessageDataSlice";
import "./Profilecard.css"
function Profilecard(props) {
    const [OtherProfile,setOtherProfile] = useState('');
    const [connection,setconnection] = useState('Connect');
    const [editbtn,seteditbtn] = useState(true)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        getData()
     })

   async function getData(){
        
        if(props.profile !== "Me"){
            const connectionstatus = await axios.get(`https://socialmedia-backend-two.vercel.app/socialmedia/profile/connectionStatus/${props.id}?token=${localStorage.getItem('token')}`);
           
            setconnection(connectionstatus.data.message);
        }
        async function Message(){
            console.log("Message")
            const data = await axios.get(`https://socialmedia-backend-two.vercel.app/socialmedia/message/${props.id}?token=${localStorage.getItem('token')}`);
            if(data.data.message !== "Please connect first"){
             
              dispatch(UpdateMessageData({
                user_name:props.name,
                messageBox:data.data.data
              }))
              localStorage.setItem('user_name',props.name)
              localStorage.setItem('user1',data.data.user1)
              localStorage.setItem('user2',data.data.user2)
              navigate('/message')
            }else{
              alert(data.data.message);
            }
          } 
        
      async function connect(){
        if(connection === "Connected"){
                alert("You are already connected")
        }else{
            const data = await axios.post(`https://socialmedia-backend-two.vercel.app/socialmedia/profile/connectreq/${props.id}?token=${localStorage.getItem('token')}`)
            setconnection(data.data.message)
        }
            
        }
        if(props.profile !== "Me"){
            setOtherProfile(()=>{
             return (
                 <div className="connetionbtn_followerbtn">
                     <button className="connetionconnectionbtn" onClick={connect}>{connection}</button>
                     <button className="connetionconnectionbtn" onClick={Message}>Message</button>
                 </div>
             )
            })
            seteditbtn(false);
         }else{
             setOtherProfile('')
         }
    }
    function EditProfile(){
        console.log('edit file')
  
        dispatch(UpdatedEditData({
            card:'profile',
            url:props.url,
            name:props.name,
            title:props.role
        }))
        navigate('/EditCard');
    } 
    
   
   

    return (
        <div className="ProfileSection1">
    
            <img src={props.url} alt="ProfileImage" className="profileimage" />

            <div className="profileText">
            <i className={editbtn?"editbtn fa-solid fa-pen":"hiddenEditbtn fa-solid fa-pen"} onClick={EditProfile}></i>
                <div className="ProfileName">{props.name}</div>
                <div className="connetion_follower">
                    <div className="profile-item1">Connection:{props.connection}</div>
                </div>

                <div className="role">{props.role}</div>
                <br />
                {OtherProfile}
            </div>
        </div>
    )
}
export default Profilecard;