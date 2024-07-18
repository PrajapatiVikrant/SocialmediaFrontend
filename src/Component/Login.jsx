import React from "react";
import { useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom";

import "./Login.css"
function Login() {
    const [email, setemail] = useState('vicky@gmail.com')
    const [password, setpassword] = useState('vicky')
    const [hide,sethide] = useState(true)
    async function submitLoin(e){
        e.preventDefault()
        try {
          const data = await axios.post(`https://socialmedia-backend-two.vercel.app/socialmedia/auth/login/${email}/${password}`);
        if(data.data.message === 'Login successfully'){
            
            setemail('')
            setpassword('');
            localStorage.setItem('myId',data.data.id)
            localStorage.setItem('token',data.data.token)
            window.location.reload();
        }else{
            alert(data.data.message)
        }
        
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="formctn">
            <form onSubmit={submitLoin}>
            <div className="loginSignupFrom">
                <h1>Login</h1>
                <input type="text" value={email} onChange={(e)=>setemail(e.target.value)} placeholder="Enter your email here..." required className="forminput" />
                <div className="passwordctn">
                <input type={hide?'password':'text'} value={password} onChange={(e)=>setpassword(e.target.value)} placeholder="Enter your password here..." required className="passwordinput" />
                <div className={password?"showhidebtn":"showhidebtndisabled"} disabled={!password} onClick={()=>hide?sethide(false):sethide(true)}>{hide?'Show':'Hide'}</div>
                </div>
              
                <button className={(!email||!password)?"loginSignBtndisabled":"loginSignBtn"} >Login</button>
                <p>If you have no account? <Link to="/signup">SignUp</Link></p>
            </div>
            </form>
        </div>
    )


}
export default Login;