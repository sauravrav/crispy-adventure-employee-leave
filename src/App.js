import React, { useEffect, useRef, useState } from "react";
import AdminPage from "./adminPage";
import LoginPage from "./loginPage"
import Redirect from "./redirect";
import {Route,Routes,Navigate, useNavigate} from "react-router-dom"
import Personalization from "./personalization";


const App =()=> {
  const [user,setUser]=useState(false)
  const [swi,setSwi]=useState(false)
  const valid=useRef(null)
  const invalid=useRef(false)
  return (
    <Routes>
    <Route path="/" element={<LoginPage swi={false} setSwi={setSwi} user={false} setUser={setUser} />} />
    <Route path="/adminPage" element={user ? <AdminPage  
   valid={valid} invalid={invalid}  />:<Redirect/>} />
    <Route path="/userPage" element={user ? <Personalization 
   valid={valid} invalid={invalid} swi={swi} setSwi={setSwi} />:<Redirect/>} />
    </Routes>
  );
}

export default App;
