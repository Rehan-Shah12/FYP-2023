import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { toast } from "react-hot-toast";

const Profile = () => {
  const { auth, setAuth } = useAuth();

  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostal] = useState("");

  // Getting User Data
  useEffect(() => {
    const {
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
    } = auth.user;
    setFirstName(fname);
    setLastName(lname);
    setPhoneNumber(phone);
    setEmail(email);
    setCity(city);
    setCountry(country);
    setState(state);
    setAddress(address);
    setPostal(postcode);
  }, [auth.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
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
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setAuth({ ...auth, user: data.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"My Profile"}>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9 ">
            {" "}
            <form
              className="auth"
              onSubmit={handleSubmit}
              style={{ marginTop: "2rem" }}
            >
              <h2 className="fw-bold mb-5 opacity">Personal Information</h2>
              <div className="d-flex">
                <div className="mb-3 mx-6 ">
                  <label
                    htmlFor="firstName"
                    className="form-lable fw-bold opacity"
                  >
                    First Name*
                  </label>
                  <input
                    type="text"
                    className="form-control input-field"
                    id="firstName"
                    value={fname}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your First Name"
                  />
                </div>
                <div className="mb-3 mx-6">
                  <label
                    htmlFor="lastName"
                    className="form-lable fw-bold opacity"
                  >
                    Last Name*
                  </label>
                  <input
                    type="text"
                    className="form-control input-field"
                    id="lastName"
                    value={lname}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your Last Name"
                  />
                </div>
              </div>
              <div className="d-flex">
                <div className="mb-3 mx-6">
                  <label htmlFor="email" className="form-label fw-bold opacity">
                    Email Address
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
                    disabled
                  />
                </div>
                <div className="mb-3 mx-6">
                  <label
                    htmlFor="password"
                    className="form-label fw-bold opacity"
                  >
                    Password*
                  </label>
                  <input
                    type="password"
                    className="form-control input-field"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your Password"
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
                  />
                </div>
              </div>
              <div className="d-flex">
                <div className="mb-3 mx-6 ">
                  <label
                    htmlFor="country"
                    className="form-lable fw-bold opacity"
                  >
                    Country*
                  </label>
                  <input
                    type="text"
                    className="form-control input-field"
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Enter your Country"
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
                  />
                </div>
              </div>
              <div className="d-flex">
                <div className="mb-3 mx-6 ">
                  <label
                    htmlFor="address"
                    className="form-lable fw-bold opacity"
                  >
                    Address*
                  </label>
                  <input
                    type="text"
                    className="form-control input-field"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your Address"
                  />
                </div>
                <div className="mb-3 mx-6">
                  <label
                    htmlFor="postcode"
                    className="form-lable fw-bold opacity"
                  >
                    Postal Code*
                  </label>
                  <input
                    type="text"
                    className="form-control input-field"
                    id="postcode"
                    value={postcode}
                    onChange={(e) => setPostal(e.target.value)}
                    placeholder="Enter your Postal Code"
                  />
                </div>
              </div>
              <div className="d-flex"></div>
              <div className="d-flex submit-button justify-content-center align-item-center">
                <div className="mb-3 mx-6">
                  <button type="submit" className="btn submit">
                    UPDATE
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
