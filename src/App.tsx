import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './style.css';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { text: inputValue, completed: false, isEditing: false }]);
      setInputValue('');
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleToggleCompleted = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleEditClick = (index) => {
    const newTodos = [...todos];
    newTodos[index].isEditing = !newTodos[index].isEditing;
    setTodos(newTodos);
  };

  const handleEditTodo = (index, newText) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    setTodos(newTodos);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      if (todos[index]?.isEditing) {
        handleEditClick(index);
      } else {
        handleAddTodo();
      }
    }
  };

  return (
    <div className="main-container">
      <h1>Todos{todos.length>0 ? "("+todos.length+")": ""}</h1>
      
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <button className="add-todo-button" onClick={handleAddTodo}>Add Todo</button>
      
      <div className="todo-container">
        {todos.map((todo, index) => (
          <div key={index} className={`todo-card ${todo.completed ? 'completed' : ''}`}>
            <div className="todo-content">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleCompleted(index)}
              />
              {todo.isEditing ? (
                <input
                  type="text"
                  value={todo.text}
                  onChange={(e) => handleEditTodo(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ) : todo.completed ? (
                <del>{todo.text}</del>
              ) : (
                <span>{todo.text}</span>
              )}
            </div>
            <div className="todo-actions">
                <FaEdit className="edit-icon" onClick={() => {
                  if(!todo.completed)
                   handleEditClick(index)
                  }} />
              
              <FaTrash className="delete-icon" onClick={() => handleDeleteTodo(index)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
