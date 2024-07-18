import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdatedCommentData } from "../State/Slice/CommentDataSlice";
import "./Comment.css"
function Comment(){
    const [comment,setComment] = useState('')
    const dispatch = useDispatch();
    const commentdata = useSelector((state)=>{
        return state.CommentData
    })
    async function postComment(){
         const data = await axios.post(`https://socialmedia-backend-two.vercel.app/socialmedia/post/comment/${commentdata.post_id}?token=${localStorage.getItem('token')}&message=${comment}`)
         console.log(data.data.message)
         dispatch(UpdatedCommentData({
            post_id:commentdata.post_id,
            message:data.data.message
         }))
         setComment('')
         document.getElementById('scrollComment').click()

    }
    function closeCommentBox(){
        document.getElementById('commentctn').style.display= "none";
    }
   
    return (
       <div className="Commentctn" id="commentctn">
        <a href="#down" id="scrollComment"></a>
        <center>
        <div className="commentdisplay">
            <div className="commentHeadline">
                <div>COMMENT BOX</div>
                <div className="crossbtn" onClick={closeCommentBox}>&times;</div>
            </div>
      
        <div className="commentmessagectn">
           {commentdata.message?commentdata.message.map((elem)=>{
              return (
                <div className="commentDetail">
                    <div className="commentname">{elem.name}</div>
                    <div className="commentMessage">{elem.message}</div>
                </div>
              )
           }):''}
           <div id="down"></div>
        </div>
        <div className="inputctn">
            <input type="text" value={comment} placeholder="Enter comment here..." onChange={(e)=>setComment(e.target.value)} className="Commentinput" />
            <button className="commentbtn" disabled={!comment} onClick={postComment}>Comment</button>
        </div>
        </div>
        </center>
       </div>
    )
   
}
export default Comment;