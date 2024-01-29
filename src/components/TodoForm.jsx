import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, postTodo } from '../slice/todo';

export default function TodoForm() {
  let [val,setVal] = useState("");
  let dispatch = useDispatch();
  let {user} = useSelector(state => state.authReducer);


  function addTodoHandler(){
    if(val.trim() == ""){
      alert("iltimos malumot kiritib keyin bosing")
      return;
    }
    let newObj = {
      userId: user.id,
      title: val,
      completed: false
    }
    dispatch(postTodo(newObj));
  }
  return (
    <div className='todo-form'>
        <input
          value={val}
          onChange={(e) => {setVal(e.target.value)}}
          type="text"
          className='input'
          placeholder='add new task'
        />
        <button onClick={addTodoHandler} >ADD</button>
    </div>
  )
}