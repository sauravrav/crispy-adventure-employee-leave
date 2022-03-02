import { Link } from "react-router-dom"
import styled from "styled-components"
import Cookies from 'js-cookie'
import { useEffect,useState } from "react"
import './dateStyling.scss'
const AdminPage=({valid,invalid,user})=>{
    const [approved,setApproved]=useState(false)
    const handleApprove=()=>{
valid.current=false
console.log(valid.current)
    }
    const handleDisApprove=()=>{
valid.current=true
console.log(valid.current)
    }
const showrequests=()=>{
    if(sessionStorage.getItem('leaveData')){
        return `the user has asked leave for this upcoming dates-${JSON.parse(sessionStorage.getItem('leaveData')).reqDate} 
        for this reason - ${JSON.parse(sessionStorage.getItem('leaveData')).reason} `
    }
    else{
        // setApproved(true)
        return 'Nothing to show'
    }
}
    return(
        <LeaveBox>
        <InnerBox>Leave Requests
        <div>Leave Request from user
        </div>
        {sessionStorage.getItem('leaveData')?(
            <>
            <div>{showrequests()}</div>
            <button onClick={handleApprove} className={approved?"notShow":"show"}   >Approve</button>
            <button onClick={handleDisApprove}  className={approved?"notShow":"show"}  >Disapprove</button>
            </>
        ):(
            <div>nothing to show</div>
        )


        }
        <StyledLink to="/" ><button>Please click here to logout</button></StyledLink>
        </InnerBox>
        </LeaveBox>
    )
}
const StyledLink=styled(Link)`text-decoration:none`
const LeaveBox=styled.div`
height: 100vh;
  width: 100vw;
  background-color: antiquewhite;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;    
`
const InnerBox=styled.div`
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
  button{
  font-family:'Courier New', Courier, monospace;
      margin-top: 40px;
      padding: 10px;
      border-radius: 10px;
      cursor: pointer;
      border: none;
      :hover{
          border-radius: 12px;
          padding: 12px;
      }
  }  
  div{
      width: 80%;
  }  

`

export default AdminPage