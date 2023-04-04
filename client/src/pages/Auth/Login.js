import React, { useState } from "react";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, setAuth } = useAuth("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      console.log(res);
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title="Login Here!">
      <div className="auth">
        <h1 className="fs-2 fw-bold mb-0">Log In</h1>
        <p className="fs-5 fw-light mb-5">
          Center Point for your Trusted Sites
        </p>
        <form onSubmit={handleSubmit}>
          <div className="d-flex vertical-flex">
            <div className="mb-3 mx-6">
              <label htmlFor="email" className="form-label fw-bold opacity">
                Email Address*
              </label>
              <input
                type="email"
                className="form-control login-input-field"
                id="email"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
                required
              />
            </div>
            <div className="mb-3 mx-6">
              <label htmlFor="password" className="form-label fw-bold opacity">
                Password*
              </label>
              <input
                type="password"
                className="form-control login-input-field"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your Password"
                required
              />
            </div>
          </div>
          <div className="d-flex submit-button justify-content-center align-items-center vertical-flex">
            <div className="mb-3 mx-6">
              <button type="submit" className="btn submit">
                LOGIN
              </button>
            </div>
            <div className="mb-3 mx-6">
              <Link
                to="/register"
                className="btn gotoregister"
                tabIndex={-1}
                role="button"
                aria-disabled="true"
              >
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
