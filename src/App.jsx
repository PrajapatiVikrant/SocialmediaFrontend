import './App.css'
import Login from './Component/Login'
import { Route, Routes } from 'react-router'
import axios from 'axios'
import Signup from './Component/Signup'
import { useEffect } from 'react'
import { useState } from 'react'
import Home from './Component/Home'
import Checklogin from './Utils/Checklogin'

function App() {
  const [islogged, setislogged] = useState(false);
  useEffect(() => {
      check()
  },[])
  async function check(){
   const checked = await Checklogin();
   setislogged(checked)
  }

 
  

  return (
    <div className="App">
      <Routes>
        <Route path='/*' Component={islogged?Home:Login} />
        <Route path='/signup' Component={islogged?Home:Signup} />
      </Routes>

    

    </div>
  )
}

export default App
