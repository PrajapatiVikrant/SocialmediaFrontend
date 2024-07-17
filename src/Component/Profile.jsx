import React from "react";
import PostCard from "./SubComponent/PostCard";
import Profilecard from "./SubComponent/Profilecard";
import "./Profile.css"
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import MiniProfileCard from "./SubComponent/MiniProfileCard";

function Profile() {
    const [update,setupdate] = useState(false);
    const [profiledata, setProfiledata] = useState({});
    const [post,setpost] = useState([]);
    const [connection, setconnetion] = useState([])
    const [follower, setfollower] = useState([])
    const [request,setrequest] = useState([])
    const [invitation,setinvitation] = useState([])
    useEffect(() => {
        getprofiledata()
    })
    async function getprofiledata() {
        const data = await axios.get(`https://vikrant-socialmedia-backend.vercel.app/socialmedia/profile?token=${localStorage.getItem('token')}`);
        if (data.data.message === 'Not login') {
            window.location.reload();
        } else {
            const postdata = await axios.get(`https://vikrant-socialmedia-backend.vercel.app/socialmedia/post/read?token=${localStorage.getItem('token')}`);
            
            setpost(postdata.data.message);
            setconnetion(data.data.connection)
            setfollower(data.data.follower)
            setrequest(data.data.request)
            setinvitation(data.data.invitation)
            setProfiledata(data.data);
        }

    }
    return (
        <div className="Profilectn">
            {update}
            <Profilecard
                url={profiledata.url}
                name={profiledata.name}
                connection={connection.length}
                follower={follower.length}
                role={profiledata.title}
                profile="Me"
            />

            <div className="ProfileSection2">
                {post.map((elem,ind)=>{
                    return <PostCard name={elem.postedBy.name} id={elem._id} url={elem.url} title={elem.title} like={elem.like} setupdate={setupdate} me="yes"  />
                })}
                


            </div>
            <div className="ProfleSection3">
                <div className="request_accept">
                    <div className="request_acceptHaeading">Request</div>
                    {request.map((elem,ind)=>{
                        return <MiniProfileCard id = {elem.id} buttonText="Accept"/>
                    })}
               
                    

                </div>
                <div className="request_accept">
                    <div className="request_acceptHaeading">Invited</div>
                    {invitation.map((elem,ind)=>{
                        return <MiniProfileCard id = {elem.id} buttonText=""/>
                    })}
                </div>
            </div>
        </div>
    )
}
export default Profile;