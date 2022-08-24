import React, { useState, useEffect } from 'react';
import '../styles/todo.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TodoItem from './TodoItem';
import TodoEditor from './TodoEditor';

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState({
    id: 0,
    todo: "",
    isCompleted: false,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const loginToken = window.localStorage.getItem('login-token');

  useEffect(() => {
    const hasLoginToken = !!loginToken;
    if (!hasLoginToken) {
      navigate('/');
    }
  }, [])

  const onChange = (e) => {
    setTodo({...todo, todo: e.target.value})
  };

  const getTodoList  = async () => {
    try {
      const response = await axios.get("https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos", {
        headers: {
          Authorization: `Bearer ${loginToken}`
        }
      })
      setTodoList(response.data);
    } catch(error) { 
      console.error(error);
    }

  }

  useEffect(() => {
    getTodoList();
  }, []);

  const createTodoList =  async () => {
    try {
      const response = await axios.post("https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos", {todo: todo.todo} , {
        headers: {
          Authorization: `Bearer ${loginToken}`,
          "Content-Type": `application/json`
        }
      });
    } catch(error) {
      console.error(error);
    }
  }

  const onClickAddTodo = async () => {
    await createTodoList();
    await setTodo({
      id: 0,
      todo: "",
      isCompleted: false,
    })
    await getTodoList();
  }

  const updateTodoItem = async (todo) => {
    try {
      const response = await axios.put(`https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos/${todo.id}`, {
        todo: todo.todo,
        isCompleted : todo.isCompleted
      } , {
        headers: {
          Authorization: `Bearer ${loginToken}`,
          "Content-Type": `application/json`
        }
      })
      getTodoList();
      setIsEditMode(false);
      setTodo({...todo, todo: ""})
    } catch(error) {
      console.error(error);
    }
  }

  const deleteTodoItem = async (id) => {
    try {
      const response = await axios.delete(`https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${loginToken}`
        }
      })
    } catch(error) {
      console.error(error);
    }
  }

  const onUpdate = async (todo) => {
    setIsEditMode(true);
    setTodo({
      id: todo.id,
      todo: todo.todo,
      isCompleted: todo.isCompleted,
    })
  }

  const onDelete = async (id) => {
    await deleteTodoItem(id);
    await getTodoList();
  }

  const getChangeComplete = async (todo) => {
    try {
      const response = await axios.put(`https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos/${todo.id}`, {
        todo: todo.todo,
        isCompleted : !todo.isCompleted
        }, {
          headers: {
          Authorization: `Bearer ${loginToken}`,
          "Content-Type": `application/json`
        }
      })
    } catch(error) {
      console.error(error);
    }
  }

  const onChangeComplete = async (todo) => {
    await getChangeComplete(todo);
    await getTodoList();
  }

  const onCancleUpdate = (todo) => {
    setTodo({...todo, todo: ""})
    setIsEditMode(false);
  }

  return (
    <div className='todo-container'>
      <h2 className='todo-title'>TODO LIST</h2>
      <div>
        {todoList.map((todo) => {
          return <TodoItem key={todo.id} todo={todo} onChangeComplete={onChangeComplete} onUpdate={onUpdate} onDelete={onDelete}/>
        })}
      </div>
      <div>
        <TodoEditor todo={todo} updateTodoItem={updateTodoItem} onClickAddTodo={onClickAddTodo} onCancleUpdate={onCancleUpdate} isEditMode={isEditMode} onChange={onChange} />
      </div>
    </div>
  )
};

export default Todo;