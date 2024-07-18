import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./MiniProfileCard.css"
function MiniProfileCard({id,buttonText}){
    const [profile,setProfile] = useState({});
    const [mybutton,setmybutton] = useState('');
    useEffect(()=>{
       getdata()
    })
   async function getdata(){
   
    const data = await axios.get(`https://socialmedia-backend-two.vercel.app/socialmedia/profile/${id}`);
    setProfile(data.data)
    }
   async function Connect(){
        console.log(profile.name)
        const data = await axios.post(`https://socialmedia-backend-two.vercel.app/socialmedia/profile/connect/${id}/${profile.name}?token=${localStorage.getItem('token')}`)
        console.log(data.data.message);
        alert(data.data.message)
    }

    return (
        <div className="miniprofilecard">
            <div className="profileDetail">
             <img className="profileImage" src={profile.url} alt="profile image" />
            <div className="nameRole">
                <div className="name">{profile.name}</div>
                <div className="smallRole">{profile.title}</div>
            </div>
            </div>
            <div>
            {(buttonText==="Accept")?<button className="accept" onClick={Connect}>Accept</button>:""}
            </div>
           

        </div>
    )
}
export default MiniProfileCard;