import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import NetworkProfileCard from "./NetworkProfileCard";
import "./ShowNetwork.css"

function ShowNetwork({ id }) {
    const [connection, setconnection] = useState([]);
    useEffect(() => {
        getdata()
    },[])
    async function getdata() {

        const data = await axios.get(`https://vikrant-socialmedia-backend.vercel.app/socialmedia/profile?token=${localStorage.getItem('token')}`)
        console.log(data.data)
        setconnection(data.data.connection)
       
    }
    return (
        <center>
            <div className="allnetworkctn">
                <div className="totalconnection">Connection:{connection.length}</div>
                {connection.map((elem,ind)=>{
                    return  <NetworkProfileCard id={elem.id} key={ind}/>
                })}
               
            </div>
        </center>
    )
}
export default ShowNetwork;