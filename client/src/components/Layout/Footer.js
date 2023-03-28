import React from "react";

const Footer = () => {
  return (
    <div style={{ backgroundColor: "#D9D9D9" }} className="text-dark p-3">
      <div className="container text-center">
        <div className="row">
          <div className="col ">
            <span className="fs-1 fw-bolder">CHOICE</span>
            <p className="text-start">
              Address Lorem ipsum dolor sit amet consectetur adipiscing elit Ut
              et massa
            </p>
            <p>
              <strong>Call us:</strong> +92 090078601
            </p>
            <p>
              <strong>Email:</strong> example@gmail.com
            </p>
          </div>
          <div className="col">
            <span className="fs-5 fw-bolder ">Information</span>
            <p>About us</p>
            <p>FAQ</p>
            <p>Contact us</p>
          </div>
          <div className="col ">
            <span className="fs-5 fw-bolder ">Account</span>
            <p>My Profile</p>
            <p>Order History</p>
            <p>Wishlist</p>
          </div>
          <div className="col ">
            <span className="fs-5 fw-bolder ">Newsletter</span>
            <p>
              Get instant updates on your e-mail related to our new products
            </p>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">
                @
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Email"
                aria-label="Email"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
