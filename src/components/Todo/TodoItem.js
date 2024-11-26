function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <li
      style={{
        cursor: todo.completed ? "default" : "pointer",
        gap: 8
      }}
    >
      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
        }}
        onClick={() => toggleTodo(todo.id)}
      >
        {todo.text}
      </span>
      <button className="Delete" onClick={() => deleteTodo(todo.id)}>
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
