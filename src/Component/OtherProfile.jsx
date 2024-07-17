import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import PostCard from "./SubComponent/PostCard";
import Profilecard from "./SubComponent/Profilecard";
import "./OtherProfile.css"
function OtherProfile(){
  const [post,setpost] = useState([]);
  const profiledata = useSelector((state)=>{
      console.log(state.SelectProfile)
      return state.SelectProfile
    })
  useEffect(()=>{
    getPost()
  },[])
  async function getPost(){
        const data = await axios.get(`https://black-chef-tktuc.pwskills.app:4000/socialmedia/post/read/${profiledata.id}`)
        setpost(data.data.message)
  }
   
     return (
        <div className="Otherprofilectn">
         
              <Profilecard
                  id={profiledata.id}
                  url={profiledata.url}
                  name={profiledata.name}
                  connection={profiledata.connection.length}
                  role={profiledata.title}
                  profile="Other"
              />
              <div className="postctn">
              {post.map((elem,ind)=>{
                    return <PostCard 
                    name={elem.postedBy.name} 
                    url={elem.url} 
                    id={elem._id}
                    title={elem.title}
                    like={elem.like} 
                    me="no"
                      />
                })}
              </div>
        </div>
     )
}
export default OtherProfile;