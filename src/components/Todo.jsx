import React, { useEffect } from 'react'
import TodoItem from './TodoItem'
import TodoForm from './TodoForm'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos } from '../slice/todo';

export default function Todo() {
  let {data} = useSelector(state => state.todoSlice);
  let dispatch = useDispatch();
  let {user} = useSelector(state => state.authReducer)

  useEffect(()=>{
    if(user){
      dispatch(fetchTodos(user.id));
    }
  },[dispatch,user]);

  return (
    <div className='section'>
      <h2>Todo List</h2>
      <TodoForm />
      <div className="section-content">
        {
          data.map(item => <TodoItem key={item.id} item={item}/>)
        }
      </div>
    </div>
  )
}