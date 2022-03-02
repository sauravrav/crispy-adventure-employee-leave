import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { adminData, userData } from "./data/data";
const LoginPage = ({user,swi,setSwi,setUser}) => {
  const [isAdmin,setIsAdmin]=useState(false)
  const navigate=useNavigate()
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const theAdminData=JSON.stringify(adminData)
  const theUserData=JSON.stringify(userData)
  const handleClick=()=>{  
        const join=JSON.stringify({email:email,password:password})
        if (isAdmin?theUserData==join:theAdminData==join) {
          setUser(!user)
          setSwi(!swi)
          setTimeout(()=>{navigate(isAdmin?"userPage":"adminPage")
          sessionStorage.setItem("userInfo",join)
        },1000)
          console.log('BINGO'); 
        } else {
          console.log(join);
        }
      }
  return (
    <Login>
      <LoginBox>
      <Panel>
        {isAdmin?"User Panel":"Admin Panel"}<br/>
        <button onClick={()=>setIsAdmin(!isAdmin)} >If you are not {isAdmin?"user":"admin"} please click here</button>
      </Panel>
          <div>  Email <br/>
          <input type="email" value={email}  onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div> Password <br/>
          <input type="password" value={password}  onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <button onClick={()=>handleClick()}>Submit</button>
      </LoginBox>
    </Login>
  );
};
const Login = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: antiquewhite;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Panel=styled.div``
const LoginBox = styled.div`
  height: 80%;
  width: 50%;
  border-radius: 50px;
  background: #fa7f7f;
  box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #bebebe;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: antiquewhite;
  font-family:'Courier New', Courier, monospace;
  div{
      margin: 10px 10px;
      input{
          padding: 10px;
          border-radius: 10px;
          border: none;
      }
  }
  button{
  font-family:'Courier New', Courier, monospace;
      margin-top: 40px;
      padding: 10px;
      border-radius: 10px;
      border: none;
      cursor: pointer;
      :hover{
          border-radius: 12px;
          padding: 12px;
      }
  }
`;

export default LoginPage;
