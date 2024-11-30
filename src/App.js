import { useState } from "react";
import "./App.css";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router";
import LoginPage from "./pages/LoginPage/LoginPage.js";
import HomePage from "./pages/HomePage/HomePage.js";
import CatalogPage from "./pages/CatalogPage/CatalogPage.js";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/login");
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
          path="/login"
          element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/home"
          element={
            isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/catalog"
          element={
            isAuthenticated ? <CatalogPage /> : <Navigate to="/login" replace />
          }
        />

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
