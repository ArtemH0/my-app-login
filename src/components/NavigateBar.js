import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Link } from "react-router-dom";

const NavigateBar = () => {
  const { isAuthenticated, handleLogout } = useContext(AuthContext); 

  return (
    <nav className="headertext">
        <Link to="/home">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/catalog">Catalog</Link>
        {isAuthenticated && (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        )}
    </nav>
  );
};

export default NavigateBar;
