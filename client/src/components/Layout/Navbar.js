import React from "react";
import { Link, NavLink } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import useCategory from "../../hooks/useCategory";

const Navbar = () => {
  const categories = useCategory();

  return (
    <>
      <div className="container-fluid border-bottom d-flex align-items-center flex-wrap">
        <div className="d-flex align-items-center justify-content-center category">
          <span>
            <div
              class="dropdown  "
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link
                className="btn dropdown-toggle navbar-nav category"
                type="Link"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <p className="category fw-bold fs-5">
                  <span role="img" aria-label="Category">
                    🛒
                  </span>
                  Category
                </p>
              </Link>
              {console.log("Hello", categories)}

              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to={`/categories`}>
                    All Categories
                  </Link>
                </li>
                {categories.map((c) => {
                  return (
                    <li>
                      <Link
                        key={c}
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
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
              <NavLink to="/choice-mall" className="nav-link">
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
