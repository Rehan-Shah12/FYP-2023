import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";

const Register = () => {
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [postcode, setPostal] = useState("");

  const navigate = useNavigate();

  const responseGoogle = async (response) => {
    if (response && response.error === "popup_closed_by_user") {
      console.log("Popup closed by user");
    } else {
      try {
        const res = await axios.post("/api/v1/auth/register", {
          fname: response.profileObj.givenName,
          lname: response.profileObj.familyName,
          email: response.profileObj.email,
          password: response.profileObj.googleId,
        });
        console.log(res);
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
    }
  };

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        fname,
        lname,
        email,
        password,
        phone,
        city,
        country,
        state,
        address,
        postcode,
        answer,
      });
      console.log(res);
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
    <Layout title="Signup Here!">
      <div className="auth">
        <h1 className="fs-2 fw-bold mb-0">Register</h1>
        <p className="fs-5 fw-light mb-5">
          Center Point for your Trusted Sites
        </p>
        <form onSubmit={handleSubmit}>
          <div className="d-flex">
            <div className="mb-3 mx-6 ">
              <label htmlFor="firstName" className="form-lable fw-bold opacity">
                First Name*
              </label>
              <input
                type="text"
                className="form-control input-field"
                id="firstName"
                value={fname}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your First Name"
                required
              />
            </div>
            <div className="mb-3 mx-6">
              <label htmlFor="lastName" className="form-lable fw-bold opacity">
                Last Name*
              </label>
              <input
                type="text"
                className="form-control input-field"
                id="lastName"
                value={lname}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your Last Name"
                required
              />
            </div>
          </div>
          <div className="d-flex">
            <div className="mb-3 mx-6">
              <label htmlFor="email" className="form-label fw-bold opacity">
                Email Address*
              </label>
              <input
                type="email"
                className="form-control input-field"
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
                className="form-control input-field"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your Password"
                required
              />
            </div>
          </div>
          <div className="d-flex">
            <div className="mb-3 mx-6 ">
              <label htmlFor="phone" className="form-lable fw-bold opacity">
                Phone Number*
              </label>
              <input
                type="text"
                className="form-control input-field"
                id="phone"
                value={phone}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your Phone Number"
                required
              />
            </div>
            <div className="mb-3 mx-6">
              <label htmlFor="city" className="form-lable fw-bold opacity">
                City*
              </label>
              <input
                type="text"
                className="form-control input-field"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your City"
                required
              />
            </div>
          </div>
          <div className="d-flex">
            <div className="mb-3 mx-6 ">
              <label htmlFor="country" className="form-lable fw-bold opacity">
                Country*
              </label>
              <input
                type="text"
                className="form-control input-field"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Enter your Country"
                required
              />
            </div>
            <div className="mb-3 mx-6">
              <label htmlFor="state" className="form-lable fw-bold opacity">
                Region/State*
              </label>
              <input
                type="text"
                className="form-control input-field"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="Region/State"
                required
              />
            </div>
          </div>
          <div className="d-flex">
            <div className="mb-3 mx-6 ">
              <label htmlFor="address" className="form-lable fw-bold opacity">
                Address*
              </label>
              <input
                type="text"
                className="form-control input-field"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your Address"
                required
              />
            </div>
            <div className="mb-3 mx-6">
              <label htmlFor="postcode" className="form-lable fw-bold opacity">
                Postal Code*
              </label>
              <input
                type="text"
                className="form-control input-field"
                id="postcode"
                value={postcode}
                onChange={(e) => setPostal(e.target.value)}
                placeholder="Enter your Postal Code"
                required
              />
            </div>
          </div>
          <div className="d-flex">
            <div className="mb-3 mx-6 ">
              <label htmlFor="answer" className="form-lable fw-bold opacity">
                Answer*
              </label>
              <input
                type="text"
                className="form-control input-field"
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="What is your Favourite Food?"
                required
              />
            </div>
          </div>
          <div className="d-flex submit-button justify-content-center align-item-center">
            <div className="mb-3 mx-6">
              <GoogleLogin
                className="rounded"
                clientId="15009738640-lid4cd3n7vgrse7a6m2s5u9r4deg85o3.apps.googleusercontent.com"
                buttonText="Sign up with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
            <div className="mb-3 mx-6">
              <button type="submit" className="btn submit">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
