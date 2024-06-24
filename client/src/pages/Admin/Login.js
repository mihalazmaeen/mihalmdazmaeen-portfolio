import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { ShowLoading, HideLoading } from "../../redux/rootSlice";
import { useDispatch } from "react-redux";

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const login = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/admin-login", user);
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", JSON.stringify(response.data));
        window.location.href = "/admin";
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        message.error("Login failed. Invalid username or password.");
      } else {
        message.error(
          "An error occurred during login. Please try again later."
        );
      }
      dispatch(HideLoading());
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-primary">
      <div className="flex flex-col gap-5 w-96 p-5 shadow border border-gray-500 bg-white">
        <h1 className="text-2xl text-center">Admin Login</h1>
        <hr />
        <Input
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Enter username"
        />
        <Input
          type="text"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter password"
        />
        <button className="bg-primary text-white p-2" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
