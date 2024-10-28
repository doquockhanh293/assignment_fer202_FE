import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userData = [
    {
      email: "khanh@gmail.com",
      password: "123456",
    },
    {
      email: "thu@gmail.com",
      password: "123456",
    },
    {
      email: "tuan@gmail.com",
      password: "123456",
    },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    // Kiểm tra xem email và password có khớp với bất kỳ tài khoản nào không
    const user = userData.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      setIsLoggedIn(true);
      navigate("/"); // Chuyển về trang chủ sau khi đăng nhập thành công
    } else {
      setError("Login failed: Incorrect email or password");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
