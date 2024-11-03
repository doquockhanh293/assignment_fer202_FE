// App.js
import React, { useState } from "react";
import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import ProductEdit from "./components/ProductEdit";
import Manage from "./components/Manage";
import ProductAdd from "./components/ProductAdd";
import LoginPage from "./components/LoginPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    navigate("/login");
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <Navigate to="/login" replace />
      ) : (
        <>
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">
                Product App
              </Link>
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/"
                      style={{ color: "#FF69B4" }}
                    >
                      Product List
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/manage"
                      style={{ color: "#FF69B4" }}
                    >
                      Manage
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/add"
                      style={{ color: "#FF69B4" }}
                    >
                      Add Product
                    </Link>
                  </li>
                </ul>
                <div
                  className="d-flex justify-content-center me-3"
                  style={{
                    border: "2px solid #FF4500", // Mã màu xanh dương đậm
                    borderRadius: "4px", // Bo góc
                    padding: "4px", // Padding bên trong
                  }}
                >
                  <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Search product..."
                    value={searchQuery}
                    onChange={handleSearch}
                    style={{ width: "300px" }} // Chiều rộng tùy chỉnh
                  />
                </div>
                <div className="d-flex align-items-center">
                  <span style={{ color: "red" }} className="me-2">
                    Welcome, {username}!
                  </span>
                  <span
                    onClick={handleLogout}
                    className="text-decoration-underline text-white"
                    style={{ cursor: "pointer" }}
                  >
                    Logout
                  </span>
                </div>
              </div>
            </div>
          </nav>
        </>
      )}

      <Routes>
        <Route
          path="/login"
          element={
            <LoginPage
              setIsLoggedIn={setIsLoggedIn}
              setUsername={setUsername}
            />
          }
        />
        {isLoggedIn && (
          <>
            <Route
              path="/"
              element={<ProductList searchQuery={searchQuery} />}
            />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/products/:id/edit" element={<ProductEdit />} />
            <Route path="/manage" element={<Manage />} />
            <Route path="/add" element={<ProductAdd />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
