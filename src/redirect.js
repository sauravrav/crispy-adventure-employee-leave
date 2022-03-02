import { Link } from "react-router-dom"

const Redirect=()=>{
    return(
        <>
        <div>Please login first</div>
        <Link to="/">Please click here to login first</Link>
        </>
    )
}

export default Redirect