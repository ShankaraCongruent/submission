import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Login() {
  const { setCurrentUser } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const usersDB = [
    { email: "admin@gmail.com", password: "Admin@123", userName: "Admin", roleId: 4 },
    { email: "bankuser@gmail.com", password: "Bank@123", userName: "BankUser", roleId: 5 },
    { email: "normaluser@gmail.com", password: "Normal@123", userName: "NormalUser", roleId: 6 },
  ];

  const handleLogin = () => {
    const user = usersDB.find((u) => u.email === email && u.password === password);
    if (!user) {
      alert("Invalid credentials");
      return;
    }
    setCurrentUser(user);
    navigate("/landing"); // or dashboard based on role
  };

  return (
    <div style={{ padding: 20 }}>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
