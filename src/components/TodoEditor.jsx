import React, { useState, useEffect } from 'react';

const TodoEditor = ({todo, isEditMode, onChange, onClickAddTodo, updateTodoItem, onCancleUpdate}) => {

  return (
    <div className= 'editor-container'>
      <div className='write-container'>
        <label className='content-label' htmlFor="todo-content">오늘 할 일</label>
        <input type="text" value={todo.todo} placeholder='오늘 할 일을 적어주세요.' id="todo-content" onChange={onChange}/>
      </div>
      <div className='editor-button-group'>
        {
          isEditMode ? (
            <div className='editor-button'>
              <button className='modify-button' onClick={()=> updateTodoItem(todo)}>수정</button>
              <button className='cancle-button' onClick={()=> onCancleUpdate(todo)}>취소</button>
            </div>
          )
          : <button className='add-button' onClick={() => onClickAddTodo()}>추가</button>
        }
      </div>
    </div>
  );
};

export default TodoEditor;