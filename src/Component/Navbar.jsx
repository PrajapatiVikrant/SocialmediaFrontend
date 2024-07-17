import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { UpdateSelectedProfile } from "../State/Slice/SelectProfileData";
import "./Navbar.css"
function Navbar(){
    const [search, setsearch] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function logout(){
        localStorage.setItem('token','');
        window.location.reload();
    }
   async function searched(e){
        const pressKey = e.key;
        if(pressKey === 'Enter'){
            
            const data = await axios.get(`https://black-chef-tktuc.pwskills.app:4000/socialmedia/profile/otherprofile/${search}`);
            console.log(data)
            if(data.data === "Not found"){
                alert(data.data)
            }else{
                dispatch(UpdateSelectedProfile(data.data))
                setsearch('')
                navigate('./otherprofile')
            }
            
        }
    }
    return (
        <nav className="navbar-ctn">
            <div className="navsection">
                <div className="logo">Socialmedia</div>
                <div className="Search">
                    <div className="searchlogo"><i class="fa-solid fa-magnifying-glass"></i></div>
                    <input type="text" value={search} onChange={(e)=>setsearch(e.target.value)} onKeyUp={searched} placeholder="Search profile here..." className="searchinput" />
                </div>
            </div>
            <div className="navsection">
            <Link to="/" className="nav-item" ><div >Profile</div></Link>
            <Link to="./mynetwork" className="nav-item"><div>My network</div></Link>
            <Link to="./postform" className="nav-item"><div>Post</div></Link>
            <div className="nav-item" onClick={logout}>Logout</div>
            </div>
        </nav>
    )
}
export default Navbar;