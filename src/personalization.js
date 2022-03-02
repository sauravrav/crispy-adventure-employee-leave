import Cookies from "js-cookie";
import { useEffect, useState  } from "react"
import "react-datepicker/dist/react-datepicker.css";
//React day picker
import DayPicker,{DateUtils} from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Link } from "react-router-dom";
import styled from 'styled-components'
import './dateStyling.scss'




const Personalization=({valid,invalid,swi,setSwi})=>{

  const [reason,setReason]=useState(null)
  const [reqDate,setReqDate]=useState(null)
  const[hasSubmitted,setHasSubmitted]=useState(false)


const func = () => {
  if (valid.current===null) {
    return "styled";
  }else if(valid.current===true){
    return "ttf";
  }else if(valid.current===undefined) {
    return "styledSubmitted"
  }
  else{
    return "ttt"
  }
};
useEffect(()=>{
func()
},[swi]) 
const [initialState,setInitialState]=useState(
  {
  from: sessionStorage.getItem('moments') !==null ? new Date(JSON.parse(sessionStorage.getItem('moments')).fromfrom): undefined ,
  to: sessionStorage.getItem('moments') !==null ? new Date(JSON.parse(sessionStorage.getItem('moments')).endend):undefined }
)
const handleDayClick=(day)=>{
  if(valid.current===true||valid.current===false){
    console.log('Please do not submit again.Your request has been decided already')
  }
  else{
    const range=DateUtils.addDayToRange(day,initialState)
    setInitialState(range)
    console.log(range.from)
    console.log(range.to)
    setTimeout(()=>{sessionStorage.setItem('moments',JSON.stringify({fromfrom:range.from,endend:range.to}))},1000)
    setReqDate(`${initialState.from.toLocaleDateString()}-${initialState.to.toLocaleDateString()}`)
  }
}

const handleResetClick=()=> {
if(valid.current===true||valid.current===false){
  console.log('Your leave request has been decided already')
}else{
  setInitialState({
    from: undefined,
    to: undefined,
  })
}
}

const[validation,setValidation]=useState(false)
const handleSubmit=()=>{
  if(valid.current===true||valid.current===false){
    console.log('Please do not submit again.Your request has been decided already')
  }
  else if(reqDate===null||reason===null){
    setValidation(true);
  }
  else{
    setReqDate(`${initialState.from.toLocaleDateString()}-${initialState.to.toLocaleDateString()}`)
    setTimeout(()=>{console.log(reqDate)},1000)
    setTimeout(()=>{
      setHasSubmitted(true);
    },1000)
    setValidation(false)
    valid.current=undefined
  }
}
useEffect(()=>{
  sessionStorage.setItem('leaveData',JSON.stringify({reason:reason,reqDate:reqDate})) 
},[hasSubmitted])

const handleLogout=()=>{
Cookies.set('theUser',false)
}

const {from,to}=initialState;
const modifiers = { start: from, end: to };
return(
  <OuterBox>
    <div className="warning" id={validation?"show":"notShow"} >Please enter reason or select the dates properly</div>  
<UserPage className={func()}>
  

{valid.current!==null || hasSubmitted===true ? (<div className="stat" >Your leave status:</div>):(
  <input className="inputReason" type="text" placeholder="Type reason for your leave" required value={reason}
  onChange={(e)=>setReason(e.target.value)}
  />)
}
    
  <DayPicker  
      className="Selectable"
      numberOfMonths={1}
      selectedDays={[from, { from, to }]}
      modifiers={modifiers}
      onDayClick={handleDayClick}
      disabledDays={[
        {
          after: new Date(2022, 0, 1),
          before: new Date(2022,1,25),
        },
      ]}
      />
      <button className="btnReset" onClick={handleResetClick} id={valid.current===null?"show":"notShow"} >Reset</button>    
      <button onClick={handleSubmit} id={valid.current===null?"show":"notShow"}>Submit</button>
      <StyledLink to="/" onClick={handleLogout} ><div className="stat" id="logout" onClick={handleLogout} >Logout</div></StyledLink>
</UserPage>
</OuterBox>
    )
}
const StyledLink=styled(Link)`text-decoration:none;color:white;`
const OuterBox=styled.div`
  height: 100vh;
  width: 100vw;
  background-color: antiquewhite;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;  
`
const UserPage=styled.div`
  display: flex;
  flex-direction: column;
  height: 80%;
  border-radius: 50px;
  background: #e0b2c9;
  box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #bebebe;
  .inputReason{
    padding: 10px;
    border-radius: 10px;
    border: none;
    overflow: hidden;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 15% 20px 0px 20px;
    :focus{
      outline: none;
    }
  }
  .stat{
    margin: 15% 20px 0px 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    box-shadow: 20px 20px 60px #eea1a1, -20px -20px 60px #eec0c0;
    border-radius: 10px;
    padding: 10px;
    background-color: #f3bcd7;
  }
  #logout{
    text-align: center;
    cursor: pointer;
    :hover{
      color: white;
    }
    :focus{
      box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #685d5d;
      font-size: 10px;
    }
  }
  
`

export default Personalization