import React, { useState } from "react";
import { useNavigate, useLocation} from "react-router-dom"; // Importing useNavigate hook
// import loginImg from "../register/logo.png";
import "../register/loginsignupstyle.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../context/auth";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initializing navigate hook
  const location = useLocation();
  const [auth, setAuth] = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple form validation
    if (!email || !password) {
      toast.error("Please fill out all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/v1/auth/login", {
        email,
        password,
      });
      // console.log('hiii')

      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth, 
          user: res.data.user, 
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state ||"/"); // Using navigate instead of history.push
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
    console.log("hello");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <div className="base-container">
      {/* <div className="header">Register</div> */}
      <div className="content">
        {/* <div className="image">
          <img src={loginImg} alt="Company logo" />
        </div> */}
        <form onSubmit={handleSubmit}>
          <div className="form">
            <div className="form-group">
              <input
                type="text"
                name="email"
                value={email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                placeholder="Password"
                required
              />
            </div>
          </div>
          <div className="footer1">
            <button type="submit" className="btn">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;