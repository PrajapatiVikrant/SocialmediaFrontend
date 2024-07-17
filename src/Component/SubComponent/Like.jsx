import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
function Like({likedata,url,id}){
    const [like,setLike] = useState(false)
    const [likes,setLikes] = useState(likedata.length)
    useEffect(()=>{
        console.log(likedata)
        checkLike()
    },[])
    function checkLike(){
        const myId = localStorage.getItem('myId');
        for(let i=0;i<likedata.length;i++){
            if(likedata[i].id==myId){
                setLike(true)
                break;
            }
        }
    }
    async function IncreaseLike(){
        const data = await axios.post(`https://black-chef-tktuc.pwskills.app:4000/socialmedia/post/like/${id}?token=${localStorage.getItem('token')}`) 
        console.log(data.data.message)
        if(data.data.message = "updated"){
            setLikes(likes+1);
            setLike(true)
        }
       
    }
    async function DecreaseLike(){
        const data = await axios.post(`https://black-chef-tktuc.pwskills.app:4000/socialmedia/post/unlike/${id}?token=${localStorage.getItem('token')}`) 
        console.log(data.data.message)
        if(data.data.message = "updated"){
            setLikes(likes-1)
            setLike(false);
        }
        
    }
    return (
        <>  
    <i id="Like" className={like?'Like fa-solid fa-heart':'Like fa-regular fa-heart'} onClick={like?DecreaseLike:IncreaseLike}></i>
    <div>{likes}</div>
    </>
    )
}
export default Like;