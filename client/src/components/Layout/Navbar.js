import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="container-fluid border-bottom d-flex align-items-center flex-wrap">
        <div className="brand-logo fw-bolder fs-2 ">Choice</div>
        <div>
          <ul className="nav navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link">
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/choiceMall" className="nav-link">
                ChoiceMall
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/wishlist" className="nav-link">
                Wishlist
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <ul className="nav navbar-nav">
            <li>Social Logos</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
