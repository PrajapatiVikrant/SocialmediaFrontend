import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"

import "./Login.css"
function Signup() {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [title, settitle] = useState('')
    const [password, setpassword] = useState('')
    const [hide,sethide] = useState(true)
    async function signup(e){
        e.preventDefault();
        try {
            
            const data = await axios.post(`https://socialmedia-backend-two.vercel.app/socialmedia/auth/signup?name=${name}&email=${email}&title=${title}&password=${password}`)
            console.log(data.data.message)
            if(data.data.message==="Signup successfully"){
                
                setname('')
                setemail('')
                settitle('')
                setpassword('')
                
            }
            alert(data.data.message)
           
          
        } catch (error) {
           console.log(error) 
        }
    }

    return (
        <div className="formctn">
             <form onSubmit={signup}>
            <div className="loginSignupFrom">
                <h1>SignUp</h1>
                <input type="text" value={name} onChange={(e)=>setname(e.target.value)} placeholder="Enter your name here..." required className="forminput" />
                <input type="text" value={email} onChange={(e)=>setemail(e.target.value)} placeholder="Enter your email here..." required className="forminput" />
                <input type="text" value={title} onChange={(e)=>settitle(e.target.value)} placeholder="Enter your title here..." required className="forminput" />
                <div className="passwordctn">
                <input type={hide?'password':'text'} value={password} onChange={(e)=>setpassword(e.target.value)} placeholder="Enter your password here..." required className="passwordinput" />
                <div className={password?"showhidebtn":"showhidebtndisabled"}  onClick={()=>hide?sethide(false):sethide(true)}>{hide?'Show':'Hide'}</div>
                </div>
              
                <button className="loginSignBtn" disabled={!name||!title||!email||!password} >Signup</button>
                <p>If you have already account? <Link to="/">Login</Link></p>
               
            </div>
            </form>
        </div>
    )


}
export default Signup;