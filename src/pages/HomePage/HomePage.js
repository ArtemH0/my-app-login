import React, { useEffect, useState } from "react";
import TodoList from "../../components/Todo/TodoList";
import TodoForm from "../../components/Todo/TodoForm";
import "./HomePage.css"

const HomePage = () => {
  const [todos, setTodos] = useState([]);
  const userId = localStorage.getItem("currentUserId")
  
  useEffect(() => {
    const userTodos = retrieveUserTodos()
    console.log('userTodos: ', userTodos);

    if (userTodos) {
      setTodos(userTodos)
    }
  }, [])

  const addTodo = (text) => {
    const newTodo = { text, id: Date.now(), completed: false };
    const newTodos = [...todos, newTodo];
    console.log('newTodos: ', newTodos);
    saveTodos(newTodos);
  };
  
  const saveTodos = (todos) => {
    setTodos(todos);

    const savedTodos = retrieveTodos()

    const updatedTodos = savedTodos.map((userTodo) => {
      if (userTodo.id === userId) {
        return { id: userId, todos: todos }
      } else {
        return userTodo
      }
    })
    
    if (!updatedTodos.find((userTodo) => userTodo.id === userId)) {
      updatedTodos.push({ id: userId, todos: todos })
    }

    localStorage.setItem("todos", JSON.stringify(updatedTodos))
  }

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    saveTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    saveTodos(updatedTodos);
  };

  const retrieveTodos = () => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || []
    
    return savedTodos
  }

  const retrieveUserTodos = () => {
    const savedTodos = retrieveTodos()

    const currentUserTodos = savedTodos.find((userTodo) => {
      return userTodo.id === userId
    })

    return currentUserTodos?.todos
  } 

  return (
    <div className="home-page">
      <h1>To-Do List</h1>
      <div>
        <h2>Welcome to the Home Page!</h2>
        <p>You are successfully logged in.</p>
      </div>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  );
};

export default HomePage;
