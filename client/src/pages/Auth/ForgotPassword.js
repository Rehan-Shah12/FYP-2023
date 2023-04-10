import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Layout title={"Forgot Password"}>
        <div className="auth">
          <h1 className="fs-2 fw-bold mb-0">Forget Password</h1>
          <p className="fs-5 fw-light mb-5">Retrieve Your Password</p>
          <form onSubmit={handleSubmit}>
            <div className="d-flex vertical-flex">
              <div className="mb-2 mx-6">
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
              <div className="mb-2 mx-6">
                <label
                  htmlFor="newPassword"
                  className="form-label fw-bold opacity"
                >
                  New Password*
                </label>
                <input
                  type="password"
                  className="form-control login-input-field"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter New Password"
                  required
                />
              </div>
              <div className="mb-3 mx-6">
                <label htmlFor="answer" className="form-label fw-bold opacity">
                  Answer*
                </label>
                <input
                  type="text"
                  className="form-control login-input-field"
                  id="answer"
                  aria-describedby="secretAnswer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="What is your Favourite Food?"
                  required
                />
              </div>
            </div>
            <div className="d-flex submit-button justify-content-center align-items-center vertical-flex">
              <div className="mb-3 mx-6">
                <button type="submit" className="btn submit">
                  RESET
                </button>
              </div>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default ForgotPassword;
