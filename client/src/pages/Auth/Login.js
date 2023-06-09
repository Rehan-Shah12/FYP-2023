import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
// eslint-disable-next-line
import { Link, useLoaderData } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, setAuth } = useAuth("");

  // console.log(auth);

  const navigate = useNavigate();
  const location = useLocation();

  const responseGoogle = async (response) => {
    if (response && response.error === "popup_closed_by_user") {
      console.log("Popup closed by user");
    } else {
      try {
        const res = await axios.post("/api/v1/auth/login", {
          email: response.profileObj.email,
          password: response.profileObj.googleId,
        });
        console.log(res);
        if (res && res.data.success) {
          toast.success(res.data && res.data.message);
          setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token,
          });
          console.log(res.data);
          localStorage.setItem("auth", JSON.stringify(res.data));
          navigate(location.state || "/");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    }
  };

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
        console.log(res.data);
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "15009738640-lid4cd3n7vgrse7a6m2s5u9r4deg85o3.apps.googleusercontent.com",
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

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
              <Link
                to={"/forgot-password"}
                className="nav-link"
                style={{ marginTop: "5px" }}
              >
                <sub
                  style={{
                    fontWeight: "light",
                    opacity: "80%",
                  }}
                >
                  Forgot Password?
                </sub>
              </Link>
            </div>
          </div>
          <div className="d-flex submit-button justify-content-center align-items-center vertical-flex">
            <div className="mb-3 mx-6">
              <GoogleLogin
                className="rounded"
                clientId="15009738640-lid4cd3n7vgrse7a6m2s5u9r4deg85o3.apps.googleusercontent.com"
                buttonText="Sign in with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
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
