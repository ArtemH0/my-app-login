function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <li
      style={{
        textDecoration: todo.completed ? "line-through" : "none",
        cursor: todo.completed ? "default" : "pointer",
      }}
    >
      <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
      <button className="Delete" onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  );
}

export default TodoItem;
