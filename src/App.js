// App.js
import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import ProductEdit from "./components/ProductEdit";
import Manage from "./components/Manage";
import ProductAdd from "./components/ProductAdd";
import LoginPage from "./components/LoginPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Product App
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Product List
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/manage">
                  Manage
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add">
                  Add Product
                </Link>
              </li>
            </ul>
            {/* Form tìm kiếm */}
            <form className="d-flex" style={{ marginLeft: "20px" }}>
              <input
                type="search"
                placeholder="Search"
                className="form-control me-2"
                aria-label="Search"
              />
              <button type="submit" className="btn btn-secondary">
                Search
              </button>
            </form>
            {/* Nút Login / Logout */}
            <div style={{ marginLeft: "20px", padding: "5px" }}>
              {isLoggedIn ? (
                <button onClick={handleLogout} className="btn btn-secondary">
                  <i className="bi bi-arrow-right-circle"></i> Logout
                </button>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="btn btn-secondary"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products/:id/edit" element={<ProductEdit />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/add" element={<ProductAdd />} />
        <Route
          path="/login"
          element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
        />
      </Routes>
    </div>
  );
}

export default App;
