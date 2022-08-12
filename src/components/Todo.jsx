import React, { useState, useEffect } from 'react';
import '../styles/todolist.scss';
import axios from 'axios';

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState({
    title: "",
    content: "",
  });
  const loginToken = window.localStorage.getItem('login-token');

  const onChange = (e, key) => {
    setTodo({...todo, [key]: e.target.value})
  };

  const getTodoList  = async () => {
    try {
      const response = await axios.get("http://localhost:8080/todos", {
        headers: {
          Authorization: `${loginToken}`
        }
      }).then((response) => {
        setTodoList(response.data.data);
      })
    } catch(error) { 
      console.error(error);
    }

  }

  useEffect(() => {
    getTodoList();
  }, []);

  const createTodoList =  async () => {
    try {
      const response = await axios.post("http://localhost:8080/todos", todo, {
        headers: {
          Authorization: `${loginToken}`
        }
      },
      {
        data: todo,
      })
    } catch(error) {
      console.error(error);
    }
  }

  const onClickAddTodo = (e) => {
    e.preventDefault();
    createTodoList();
    getTodoList();

  }

  const updateTodoItem = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8080/todos/${id}`, todo, {
        headers: {
          Authorization: `${loginToken}`
        }
      })
    } catch(error) {
      console.error(error);
    }

  }

  const deleteTodoItem = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/todos/${id}`, {
        headers: {
          Authorization: `${loginToken}`
        }
      })
    } catch(error) {
      console.error(error);
    }
  }

  const onUpdate = (e) => {
    e.preventDefault();
    updateTodoItem();

  }

  const onDelete = (e, id) => {
     e.preventDefault();
     deleteTodoItem(id);
     getTodoList();
  }

  return (
    <div className= 'container'>
      <div className='todo-list-container'>
        <ul>
          {
            todoList.map((todo) => {
              return <li key={todo.id}>{todo.title}<button onClick={onUpdate}>수정</button><button onClick={(e) => onDelete(e, todo.id)}>삭제</button></li>
            })
          }
        </ul>
      </div>
      <div className='todo-write-container'>
        <label htmlFor="todo-title">제목</label>
        <input type="text" placeholder='제목을 적어주세요' id="todo-title" onChange={(e) => {onChange(e, "title")}}/>
        <label htmlFor="todo-content">내용</label>
        <input type="text" placeholder="내용을 적어주세요" id='todo-content' onChange={(e) => {onChange(e, "content")}}/>
      </div>
      <button onClick={onClickAddTodo}>추가</button>
    </div>
  );
};

export default Todo;