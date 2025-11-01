import React from 'react';
import Header from './Header';
import TodoItem from './TodoItem'
import Button from './Button';
import './TodoStyle.css';

function TodoComponent() {
  return (
    <div className='todo-container'>
      <Header title="TODO Application"/>
      <TodoItem text="Eat"/>
      <TodoItem completed = {true} text="Code"/>
      <TodoItem text="Play"/>
      <TodoItem text="Study"/>
      <TodoItem text="Sleep"/>
      <Button/>
    </div>
  )
}

export default TodoComponent
