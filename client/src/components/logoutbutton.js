import React from "react"
import { useNavigate } from 'react-router-dom';

function LOGOUT(){
    const navigate = useNavigate();
    const handlelogout = ()=>{
        navigate('/home');
    }
    return(
        <button onClick={handlelogout}>LOGOUT</button>
    );
}
export default LOGOUT;