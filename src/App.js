import { useEffect, useState } from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage.js";
import HomePage from "./pages/HomePage/HomePage.js";
import CatalogPage from "./pages/CatalogPage/CatalogPage.js";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", "false");
    localStorage.removeItem("currentUserId");
    navigate("/login");
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
    navigate("/home");
  };

  return (
    <div>
      <header>
        <div className="headertext">
          <Link to="/home">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/catalog">Catalog</Link>
          {isAuthenticated && (
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          )}
        </div>
      </header>
      <Routes>
        <Route
          path="/home"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/catalog"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <CatalogPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={<LoginPage setIsAuthenticated={handleLogin} />}
        />
        <Route
          path="/"
          element={
            isAuthenticated
              ? <Navigate to="/home" replace />
              : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
