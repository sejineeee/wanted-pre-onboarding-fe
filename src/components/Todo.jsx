import React, { useState } from 'react';
import '../styles/todolist.scss';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const onChange = (e) => {
    setTodo(e.target.value)
  };

  const onClickAddTodo = () => {
    setTodos([...todos, todo]);
  }

  return (
    <div className= 'container'>
      <div className='todo-list-container'>
        <ul>
          {
            todos.map((todo, index) => {
              <li key={index}><button></button>{todo}</li>
            })
          }
        </ul>
      </div>
      <input type="text" placeholder="오늘 할 일을 적어주세요" onChange={onChange}/>
      <button onClick={onClickAddTodo}>추가</button>
    </div>
  );
};

export default Todo;