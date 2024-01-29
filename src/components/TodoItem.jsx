import React from 'react'

export default function TodoItem({item}) {
  return (
    <div className="item">
      <div className="todo-inner">
        <div>
          <p>{item.title}</p>
        </div>
        <div className='todo-actions'>
          <input type="checkbox" checked={item.completed} />
          <button>UPDATE</button>
          <button className='btn-delete'>DELETE</button>
        </div>
      </div>
    </div>
  )
}