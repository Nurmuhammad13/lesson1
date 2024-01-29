import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { getUser } from '../slice/auth';
import { useNavigate } from 'react-router-dom';
import Home from './Home';

export default function Login() {
    let {isLoging,loged,user,error} = useSelector(state => state.authReducer);
    let dispatch = useDispatch();
    let [userName,setUserName] = useState("");
    let [userEmail,setUserEmail] = useState("");
    let nav = useNavigate(null);

    function login(){
        dispatch(getUser({name: userName,email: userEmail}));
    }

    useEffect(()=>{
        if(loged){
            nav("/");
        }
    },[user])

    return (
        <div className='section'>
            <h2>Log in</h2>
            {
                error ? <h2>{error}</h2> : ""
            }
            <form>
                <input value={userName} onChange={(e)=>{setUserName(e.target.value)}} type="text" className='input' placeholder='username' />
                <input value={userEmail} onChange={(e)=>{setUserEmail(e.target.value)}} type="email" className='input' placeholder='email' />
                <button onClick={(e)=>{
                    e.preventDefault();
                    login();
                    }}
                >
                    {isLoging ? "Loading . . ." : "LOGIN"}
                </button>
            </form>
        </div>
    )
}