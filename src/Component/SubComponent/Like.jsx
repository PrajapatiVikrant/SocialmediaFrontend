import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
function Like({likedata,url,id}){
    const [like,setLike] = useState(false)
    const [likes,setLikes] = useState(likedata.length)

    
    useEffect(()=>{
        checkLike()
    },[])





//    checkLike funtion check that I have check any post or not
    function checkLike(){
        const myId = localStorage.getItem('myId');
        for(let i=0;i<likedata.length;i++){
            if(likedata[i].id==myId){
                setLike(true)
                break;
            }
        }
    }




    // IncreaseLike function like any post
    async function IncreaseLike(){
        const data = await axios.post(`https://socialmedia-backend-two.vercel.app/socialmedia/post/like/${id}?token=${localStorage.getItem('token')}`) 
        console.log(data.data.message)
        if(data.data.message = "updated"){
            setLikes(likes+1);
            setLike(true)
        }
       
    }




    // DecreaseLike function unlike any post
    async function DecreaseLike(){
        const data = await axios.post(`https://socialmedia-backend-two.vercel.app/socialmedia/post/unlike/${id}?token=${localStorage.getItem('token')}`) 
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