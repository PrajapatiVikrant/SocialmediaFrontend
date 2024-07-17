import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { UpdatedCommentData } from "../../State/Slice/CommentDataSlice";
import { UpdatedEditData } from "../../State/Slice/EditDataSlice";
import Like from "./Like";
import "./PostCard.css"
function PostCard({name,title,url,me,like,id,setupdate}){
    const [deleteEditbtn,setDeleteEditbtn] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
   useEffect(()=>{
     deleteEdit()
   },[])
   function deleteEdit(){
   function EditPost(){
    console.log('edit file')
        dispatch(UpdatedEditData({
            card:'post',
            id:id,
            url:url,
            name:name,
            title:title
        }))
        navigate('/EditCard');
   }
  async function DeletePost(){
    const sure = confirm('Are you sure to delete this post');
    console.log(url)
    if(sure){
        
         const data = await axios.delete(`https://black-chef-tktuc.pwskills.app:4000/socialmedia/post/delete/${id}?post_url=${url}`);

        alert(data.data.message)
        setupdate(true)
    }
  
   }
         if(me==="yes"){
            setDeleteEditbtn(()=>{
                return (
                    <div className="deleteEditbtn">
                        <i className="fa-solid fa-pen" onClick={EditPost}></i>
                        <i className="fa-solid fa-trash" onClick={DeletePost}></i>
                    </div>
                )
            })
         }else{
            setDeleteEditbtn('')
         }
        
   }
  async function CommentOpen(){
    const data = await axios.get(`https://black-chef-tktuc.pwskills.app:4000/socialmedia/post/showcomments/${id}`);
    console.log(data.data)
    dispatch(UpdatedCommentData(data.data));
    document.getElementById('commentctn').style.display= "block"
   }
    return (
        <>
        <div className="postcard">
            {deleteEditbtn}
            <div className="Username">{name}</div>
            <div className="post">
                <div className="title">{title}</div>
                <img src={url} alt="PostImage" className="PostImage" />
          
            </div>
            <center><Like url={url} id={id}  likedata={like} /></center>
            <br />
            <button className="comment" onClick={CommentOpen}>Comment</button>
            

        </div>
        
        </>
    )
}
export default PostCard;