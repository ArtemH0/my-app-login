import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { AuthContext } from "../../components/AuthContext.js"; 

const users = [
  {
    id: 1,
    username: "john_doe",
    password: "1234",
  },
  {
    id: 2,
    username: "alice_smith",
    password: "5678",
  },
  {
    id: 3,
    username: "bob_jones",
    password: "4321",
  },
  {
    id: 4,
    username: "charlie_brown",
    password: "8765",
  },
];

const LoginPage = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext); 

  const saveUser = (id) => {
    const userId = JSON.stringify(id);
    localStorage.setItem("currentUserId", userId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = users.find(
      (user) => user.username === name && user.password === code
    );

    if (user) {
      handleLogin(); 
      saveUser(user.id);
      navigate("/home");
    } else {
      setError("Invalid name or code!");
    }

    setName("");
    setCode("");
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="code">Code:</label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
