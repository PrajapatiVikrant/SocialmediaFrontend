import axios from "axios"
async function Checklogin() {
   
    if (localStorage.getItem('token')) {
      const data = await axios.post(`https://vikrant-socialmedia-backend.vercel.app/socialmedia/auth/checklogin?token=${localStorage.getItem('token')}`);
      console.log(data.data)
      if(data.data.message === true){
       return true;
      }else{
        return false
      }
    }else{
      return false
    }
  }
  export default Checklogin;