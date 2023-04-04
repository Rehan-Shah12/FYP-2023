import React from "react";
import { NavLink } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

const Navbar = () => {
  return (
    <>
      <div className="container-fluid border-bottom d-flex align-items-center flex-wrap">
        <div className="d-flex align-items-center justify-content-center">
          <span role="img">
            <p className="category fw-bold fs-5">🛒 Category</p>
          </span>
        </div>
        <div>
          <ul className="nav navbar-nav">
            <li className="nav-item ">
              <NavLink to="/" className="nav-link" aria-current="page">
                HOME
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link">
                ABOUT US
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/choiceMall" className="nav-link">
                CHOICEMALL
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/wishlist" className="nav-link">
                WISHLIST
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <ul className="nav navbar-nav">
            <li className="ps-3">
              <BsFacebook size={25} />
            </li>
            <li className="ps-3">
              <BsInstagram size={25} />
            </li>
            <li className="ps-3">
              <BsTwitter size={25} />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
