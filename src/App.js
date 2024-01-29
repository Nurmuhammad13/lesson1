import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Posts from './components/Posts';
import Login from './components/Login';
import MyPosts from './components/MyPosts';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { login } from './slice/auth';
import Todo from './components/Todo';

function App() {
  let dispatch = useDispatch();
  useEffect(()=>{
    if(JSON.parse(localStorage.getItem("user"))){
      dispatch(login(JSON.parse(localStorage.getItem("user"))));
    }
  },[]);
  return (
    <div className='container'>
      <Navbar/>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='posts' element={<Posts/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='myposts' element={<MyPosts/>}/>
        <Route path='todo' element={<Todo/>}/>
      </Routes>
    </div>
  );
}

export default App;
