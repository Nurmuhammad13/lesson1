import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOut } from '../slice/auth';

export default function Navbar() {
  let state = useSelector(state => state.authReducer);
  let dispatch = useDispatch();
  return (
    <nav>
      <div className="logo">
        Logo
      </div>
      <div className="menu">
        <Link to={"/"}>Home</Link>
        <Link to={"posts"}>Posts</Link>
        {
          state.user ? <><Link to={"myposts"}>My Posts</Link><Link to={"todo"}>Todo</Link></> : ""
        }
      </div>
      <div className="menu">
        {
          state.user ? <Link to={"/"} onClick={() => { dispatch(logOut()) }}>Log out</Link> : <Link to={"login"}>Log in</Link>
        }
      </div>
    </nav>
  )
}