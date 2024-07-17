import React from "react";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
function EditCard(){
    const [cardimage,setcardimage] = useState('');
    const navigate = useNavigate();
    const olddata = useSelector((state)=>{
        return state.EditCard;
    })
    const [title,settitle] = useState(olddata.title)
    const [url,seturl] = useState(olddata.url);
    function handleChange(e){
        e.preventDefault();
        console.log(e.target.files[0])
        const reader = new FileReader();
        const slectedImg = e.target.files[0]
        const myimg = new FormData();
        myimg.append('cardImage',e.target.files[0])
      
        setcardimage(myimg);
       reader.addEventListener('load',function(){
         console.log(this);
         seturl(this.result)
         
       })
        reader.readAsDataURL(slectedImg)
        
        
    }
   async function updateCard(){
    console.log(cardimage)
    if(olddata.card=='post'){
        try {
          
            const data =  await axios.put(`https://vikrant-socialmedia-backend.vercel.app/socialmedia/post/update/${olddata.id}?url=${olddata.url}&title=${title}`,cardimage,{
        headers:{
            "Content-Type":"multipart/form-data",
        }
      })
            alert(data.data.message)
            navigate('/')

       
        } catch (error) {
            
            console.log('error',error)
        }
        
    }
    if(olddata.card=="profile"){
    const data =  await axios.put(`https://vikrant-socialmedia-backend.vercel.app/socialmedia/profile/${localStorage.getItem('myId')}?title=${title}&url=${olddata.url}`,cardimage,{
        headers:{
            "Content-Type":"multipart/form-data",
        }
      })
      alert(data.data.message)
      navigate('/')
    }
   

    }
    return (
        <div >
            <center>
            <div style={{margin:"20px",display:"flex",flexDirection:"column",alignItems:"center",width:"300px",boxShadow:"0 0 8px rgb(224, 142, 84)",padding:"20px"}}>
                
                <img style={{cursor:"pointer",width:"200px",height:"200px",borderRadius:"50%"}} src={url} onClick={()=>document.getElementById('EditImg').click()} alt="profileimg" />
                <input style={{display:"none"}} id="EditImg" type="file" accept=".jpg,.jpeg,.png" onChange={handleChange} />
                <br />
                <input style={{width:"95%",fontSize:"14px",padding:"5px"}} type="text" value={title}  onChange={(e)=>settitle(e.target.value)}/>
                <br />
                <button style={{width:"100%",fontSize:"14px",padding:"5px",cursor:"pointer"}} className="editCardbtn" onClick={updateCard}>Edit</button>
            </div>
            </center>
        </div>
    )
}
export default EditCard;