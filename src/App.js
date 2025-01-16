import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage.js";
import HomePage from "./pages/HomePage/HomePage.js";
import CatalogPage from "./pages/CatalogPage/CatalogPage.js";
import PrivateRoute from "./components/PrivateRoute";
import NavigateBar from "./components/NavigateBar.js";
import { AuthProvider, AuthContext } from "./components/AuthContext.js"; 

function App() {
  return (
    <AuthProvider>
      <div>
        <header>
          <NavigateBar />
        </header>
        <Routes>
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/catalog"
            element={
              <PrivateRoute>
                <CatalogPage />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <AuthContext.Consumer>
                {({ isAuthenticated }) =>
                  isAuthenticated ? (
                    <Navigate to="/home" replace />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              </AuthContext.Consumer>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
