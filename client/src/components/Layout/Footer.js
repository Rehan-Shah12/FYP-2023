import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div style={{ backgroundColor: "#D9D9D9" }} className="text-dark p-3">
      <div className="container text-center">
        <div className="row">
          <div className="col ">
            <span className="fs-1 fw-bolder">CHOICE</span>
            <p className="text-start">
              Your One-Stop Shop for Trusted Products, Sites, and Convenience
            </p>
            <p>
              <strong>Call us:</strong> +92 090078601
            </p>
            <p>
              <strong>Email:</strong> choice@gmail.com
            </p>
          </div>
          <div className="col mt-2">
            <span className="fs-3 fw-bolder d-flex align-items-center justify-content-center  ">
              Information
            </span>
            <span className="footer ">
              <Link to="/about" className="nolinkcolor pb-4 ">
                About us
              </Link>
              {/* <Link to="/about" className="nolinkcolor pb-4 ">
                FAQ
              </Link> */}
              <Link to="/about" className="nolinkcolor pb-4 ">
                Contact us
              </Link>
            </span>
          </div>
          <div className="col mt-2">
            <span className="fs-3 fw-bolder d-flex align-items-center justify-content-center ">
              Account
            </span>
            <span className="footer">
              <Link to="/dashboard/user/profile" className="nolinkcolor pb-4 ">
                My Profile
              </Link>
              <Link
                to="/dashboard/user/order-history"
                className="nolinkcolor pb-4 "
              >
                Order History
              </Link>
              <Link to="/wishlist" className="nolinkcolor pb-4 ">
                Wishlist
              </Link>
            </span>
          </div>
          {/* <div className="col mt-2">
            <span className="fs-3 fw-bolder ">Newsletter</span>
            <p className="pt-4">
              Get instant updates on your e-mail related to our new products
            </p>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                @
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                aria-label="Email"
                aria-describedby="basic-addon1"
              />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
