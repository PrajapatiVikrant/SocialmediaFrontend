import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Checklogin from "../Utils/Checklogin";
import "./PostForm.css"

function PostForm(){
    const [postttitle,setposttitle] = useState('')
    const [uploadimg,setuploadimg] = useState('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAP4AAADGCAMAAADFYc2jAAAAgVBMVEX///8AAABBQUHl5eWQkJCbm5vCwsI+Pj729vb5+flSUlL8/PyCgoLj4+Pr6+vw8PC8vLzNzc2np6dsbGyxsbHY2NhfX18pKSnd3d1GRkZ+fn5MTEydnZ1kZGTExMRzc3MzMzM4ODiMjIwUFBQgICALCwsWFhYlJSWAgIBRUVEuLi5+X5a0AAAJ3ElEQVR4nO2d2WLiOgyGoYWWHQKBsrUUCjNz+v4PeNhJgixLjuSY5b9swfFHEttaLJdKN6x2NF+1poPGZDZatFqVeFgrukee1Bz2B3/LgGatXqfozimr0x9B5Gf9/vtqFt1HLXXmLyj7UYOo6I5q6Au/70mtK92ieyus+IMMf3gExkX3WFDxhge/06hddK+F9PbDh98/AffwCnRmbvA7zYvufG7N3eG3Wt72ENCZ5KK/8Qcgzgu/1exmR4CFAP1Wt7kMqi9l6MvlftEoDmpLwW/VKhqGraEg/XYJUDQOU5Eo/XYNWDQQS9L05XKjaCSGZJ/8gz6LhiKro0BfLi+KxiKq7mji2FQtGoymHDYOrptY/6y06MvlG3CFfunRl7+LhrOq5uDYoWsFXLE5jOdV36oYfFGfHJpJb/g1ZfEPs9eL6B5UUcH0b5wmDqbMK+crH5k73+B1WkwVkL7JaeI0kbGWCanrtv/wOi0n2AnRYrRwMePGnAsnRn+d5RVF8BKU05+kEctZJF+u3Pzl9lpMXyA+YxhKj+Ec/vPoV2X3WkobMBDJeIizQwfDOTI73Xx+t6X0L+fNv16+d+jrhePalzXJyApcfdNvPuS9rpENpaPpL+RIdRD87JP7A7su6+SR7BD7+Hbru4BA07tL/XYPpN++zKTw//nyjn0XEAhADWfBk8Ze1DVcrVh80PAkPoyo0U4cPONC8ddQz4lT95XNktaA1MjsGj968yYQgeblsOYs0AzAzhW+rV1tkbJXXu3tVCjt7OaOoPApy7YNyVlFGUJ3UY+g8Pv2Pq+JoWpKWLwZGL59zP4m560S+KPA8O30dXpjdv5qWPjW9f4vK1m1Z2tuFBa+rb+/jHtPaa8cFr5luvpg0tvN2VpQ+Phqbc2mt97/YVD4YIb+WU7JWfj41wsKH+2qY24iuoyuhISPhipM9r1VWKh4GhI+Zu65p2VgfvPPW8EnmDkmIe6zSUj4SCoT6BzI3+xHSPjILPVfjmaRteQmJHxsksrRLJYqERI+Zu4irk2bMNdnSPjoEsU5Iwd1fISEj6/Q5+1a/Sy0ncvH6t0IXUgH9e4zkljfsHaW5GaCGvkZAWoU/53cTFDzvn/8oFZ9jLQOIfyg1vyMiJMQfh6Lr9mtCe8Tp0ebhfBd7f1Of/Cx2U4cv4NYcIsYPddACN/N2xOlbOiRJeBIFyk0JYnv4uu73k87EqqZYfXMSuM7eHrBPsokydMzU2XwHfz8hiV0LMLvGZ8f5TFaZc6+uKTISW0y+OwYH7Isl9glTojwSuJzI7x1pK0/Avjkl18Enx3fR5NG4Ox0nqhZeSL4MRPfsigXmP6oM78IfpeJb0k8EqiRQE1plcDfu085+Gu8vWV+/NLSHz6Q14d2zWqP54hFnEQc+yXw60x8a9cE5v4arevolZakJqYlJr51j41EgRRaRiK2E5f4C7a5+NZcYYnyCLSp/wNpgWY4HUsZMPCtu4pFqiPQjH7zg1an7egYs/G93H3qys9kY9VoNY5Od4qBb02UlqmNQsvHLg+iRNjjqFqbujHrZKEw8K1Ny5TG8bGv8Jwtkf4z2i/rriehygB0n5ezzg7K9J/Rbln32ThknoFS31R7eUzTf8e7ZfFGiJUFka9Yk9b35VLpf+DdstRUEPP4Ukc/VyU6mv6HpVtLrFHBmkBaZVsOSjom0v+xdAs1egQMnrM0H/+X5IVY+JjFL1sRUXFjdSosxcMvGfdISpcDU6umkR6hmPim3f4TYXripi6+MotlJr7B8FEoBUe0W5nKFq1h40OvpUohSFYxFqKm2Yvw8UuvmfdSqxAyqxgJSdcmqQN+qdSunDMRllXJCS8taX7AIHfC36obxVtFuvVvX0WXP9Ci3BXfj7qC4z/oH/SI75SXKjb/w+4hf/g1t9aFKvcZAtD+8OeOQVCJ2jINkyvCH/5fV6uom7twpXld4g1/Zy3O7B8DRU57ADVBqj14w9/7711TgLqsAoZpodf0hX9MDHFeJ0RLN/gW7oD0hX/cqpEjEtLD97iCWtgmW1/4p6hzjk05pR61ItNRU/tKwxP+WOYSY3pN0nWVkmzjCf8SHM8ZCWv2KKPgZkEMufjBbybCrrkTAGtvU9QUWK4icqa9H/xkzP1bosHXeACFctcN5nl8fvBTsXHMJxxd+WPManajXr+6mg4+B4t/q3ncG/OjbF7wM0Fb5P68ez5BwAt+JmZrjgftVgfvPo9S9IKfddoYSy0eXmCPJeR94F+HrAxT8ml6FMmOJ8kH/vVMDcfCL0OEtyOEPOBDAQtwVZKYH148nSHmAR+y1qHs/3T6gMz2GJs84INLNOCIhEzGdMPHA6CPb0gKuHLBXG+S8nCIWh78Oql/hjTN98zHoMSppfopMnnwY4rvzrj/J/Pbwb9SQ/kczTz4S0oqm7kiR2p1Y8ybWUgcpds0rSRy4I9JiYzmHNsR7WP5Nwk3+5tfw79y4E8pyxOs9mxiTwaehT7J4yLr7OJE2ZHmJHf83Utt+lEvQmNUF+MGpd9p5fgOvB2ChPL4+5faGrdBs+vPxj0lkPfeZ++UG559bPL4+wwH29RnCdAd32pqEvdszpgIolbipxfHPwzVtpwmS3x6TfpUUn8WcZvk1ElbGuL4x3ka74r1tu6DvuwcztnK7tHTxT8t0vCpz56cuRs8XE4G2hSLfzLjoNPdLrLn5sxc47e2JYcu/smM+8Y+RHmqY8eTgWzRQlX8Cxj2ElLy8n9ck/ct06Aq/sV/hbgldPJST7LMuZr4CesUmfryJWXYhO3kVMavkr6jfOQRbglp4ie/YxyCNU6RTgrfOqWIn3JKGqc+3vmgDkLDQYr4qYilqYQwVuZFRqgzWA+fFrGkV+ByFbqFRA8/Y54aboLaKdoXYT4APfxMJ+Cpj3EypLOwFbca/tVTDX7Kw0Zk1O5Rw796qicNQKrHaJ+EVHDRwvfxVFOFLDm18DmHJKvLbHAp4etP5xyZK9go4VOOOvMn87ENSvjMvFptGS0OHXz5vYX5ZHT66OCr2zFcmZw+KvhhDXw7mZw+Kvi6DhwXmZw+Qvjtr94hc3bQeHfYT6Evg9NHCD+4lz0rQxK0EH5QizxQsNPnYfBhf8PD4MNOn4fBh50+j4MPOn0eB//nsfHBvZEPhA85fR4IH9oZ/Uj4wN64R1n07gTsjhDC760q4at17fJUTmwLXU/8J/4T/4n/xDd86on/xH/iP/HvCr/ugN99vRuNHfDvVk/8R8Y3bbYOMmopL1MKmFoh+LBkKgaleA5ASDLlP2rUQQ9Qxt2WD/H0mysE+zgDqmhtkH0f+tsOChe679twrPb9yFIC7L7v/8Za+qN2E6EcN1Uo5f+6venn5OXONPlcfeHw/wOALKsYARfGyQAAAABJRU5ErkJggg==')
    const [postimage, setpostimage] = useState('');
    const navigate = useNavigate('');
    useEffect(()=>{
         check();
    },[])
   async function check(){
        const loginvalue = await Checklogin();
         if(loginvalue===false){
            navigate('/home');
         }else{
            console.log('happy journey')
         }
   }
   function handlechange(e){
    console.log(e.target.files[0])
       const reader = new FileReader();
       const slectedImg = e.target.files[0]
       const myimg = new FormData();
       myimg.append('postImage',e.target.files[0])
      reader.addEventListener('load',function(){
        console.log(this);
        setuploadimg(this.result)
        
      })
       reader.readAsDataURL(slectedImg)
       setpostimage(myimg);
      
   }
  async function postSubmit(e){
    console.log(postimage)
    e.preventDefault()
      const data =  await axios.post(`https://black-chef-tktuc.pwskills.app:4000/socialmedia/post/create?title=${postttitle}&token=${localStorage.getItem('token')}`,postimage,{
        headers:{
            "Content-Type":"multipart/form-data",
        }
      })
      console.log(data.data.message)
      alert(data.data.message)
   }
    return (
       <>
       <div className="postFormCtn">
   
            <form onSubmit={postSubmit}>
            <div className="postFrom">
                <h1>Post Form</h1>
                <input type="text" value={postttitle} onChange={(e)=>setposttitle(e.target.value)} placeholder="Enter your post title here..." required className="forminput" />
                <form onClick={()=>document.getElementById('mypostimage').click()}>
                    <img className="postimage" width="200px" height="200px" src={uploadimg} alt="postimage" />
                    <input id="mypostimage" accept=".jpg,.jpeg,.png" className="imagedata" type="file" onChange={handlechange} />
                </form>
                <button className="postbtn" disabled={!postttitle||!postimage}>Post</button>
               
            </div>
            </form>
        </div>
       </>
    )
}
export default PostForm;