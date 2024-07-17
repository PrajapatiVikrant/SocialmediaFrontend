import React from "react";
import { Route, Routes } from "react-router";
import Comment from "./Comment";
import EditCard from "./EditCard";
import Message from "./Message";
import Navbar from "./Navbar";
import OtherProfile from "./OtherProfile";
import PostForm from "./PostForm";
import Profile from "./Profile";
import ShowNetwork from "./ShowNetwork";
function Home(){
  
    return(
    <>
      <Comment/>
      <Navbar/>
      <Routes>
        <Route path="/" Component={Profile}/>
        <Route path="/postform" Component={PostForm}/>
        <Route path="/otherprofile" Component={OtherProfile}/>
        <Route path="/mynetwork" Component={ShowNetwork}/>
        <Route path="/message" Component={Message}/>
        <Route path="/EditCard" Component={EditCard}/>


        
      </Routes>
    </>
    )
}
export default Home;