import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { UpdateMessageData } from "../State/Slice/MessageDataSlice";
import { UpdateSelectedProfile } from "../State/Slice/SelectProfileData";


function NetworkProfileCard({id}){
      const [profile,setProfile] = useState('');
      const dispatch = useDispatch();
      const navigate = useNavigate();
      useEffect(()=>{
        getdata()
      },[])
      async function getdata(){
        const data = await axios.get(`https://vikrant-socialmedia-backend.vercel.app/socialmedia/profile/${id}`)
        console.log(data)
        setProfile(data.data);
      }
      async function Message(){
        const data = await axios.get(`https://vikrant-socialmedia-backend.vercel.app/socialmedia/message/${profile.id}?token=${localStorage.getItem('token')}`);
        if(data.data.message !== "Please connect first"){
         
          dispatch(UpdateMessageData({
            user_name:profile.name,
            messageBox:data.data.data
          }))
          localStorage.setItem('user_name',profile.name)
          localStorage.setItem('user1',data.data.user1)
          localStorage.setItem('user2',data.data.user2)
          navigate('/message')
        }else{
          alert(data.data);
        }
      }
      function fullprofile(){
          dispatch(UpdateSelectedProfile(profile));
          navigate('/otherprofile')
      }
    return (
 <div className="miniprofilecard">
            <div className="profileDetail" onClick={fullprofile}>
             <img className="profileImage" src={profile.url} alt="profile image" />
            <div className="nameRole">
                <div className="name">{profile.name}</div>
                <div className="smallRole">{profile.title}</div>
            </div>
            </div>
            <div>
            <button className="accept" onClick={Message} >Message</button>
            </div>
           

        </div>
    )
}
export default NetworkProfileCard;