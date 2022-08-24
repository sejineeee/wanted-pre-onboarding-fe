import React from 'react';


const TodoItem = ({todo, onChangeComplete, onUpdate, onDelete}) => {
  return (
      <div className='todo-item' key={todo.id}>
        <div>
          <button className='check-button' onClick={() => onChangeComplete(todo)}>{todo.isCompleted ? "⭕" : "❌"}</button>
          <span className='item-content'>{todo.todo}</span>
        </div> 
        <div className='button-container'>  
          <button className='modify-button' onClick={() => onUpdate(todo)}>수정</button>
          <button className='delete-button' onClick={() => onDelete(todo.id)}>삭제</button>
        </div>
      </div>
  )

};

export default TodoItem;