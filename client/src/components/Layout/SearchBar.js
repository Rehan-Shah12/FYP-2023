import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import SearchInput from "../Form/SearchInput";
import { BsCart4 } from "react-icons/bs";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { useNavigate } from "react-router-dom";

// import profilepic from "../../../public/images/profilepic.jpg";

const SearchBar = () => {
  const navigate = useNavigate();

  const { auth, setAuth } = useAuth();
  const [cart] = useCart();
  const [openDropDownProfile, setOpenDropDownProfile] = useState(false);
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };
  return (
    <div className="border-bottom d-flex justify-content-between px-5 fs-5 align-items-center pt-2 pb-2">
      <div>Logo</div>
      <div>
        <SearchInput />
      </div>
      <div className="profile-space">
        {!auth.user ? (
          <>
            <Link to="/register" className="btn btnforauth">
              Signup
            </Link>
            <Link to="/login" className="btn btnforauth">
              Log In
            </Link>
            <Link to={"/cart"} style={{ marginLeft: "25px" }}>
              <Badge count={cart.length}>
                <BsCart4 size={25} />
              </Badge>
            </Link>
          </>
        ) : (
          <div className="d-flex">
            <Link to={"/cart"} style={{ marginRight: "25px" }}>
              <Badge count={cart.length}>
                <BsCart4 size={25} />
              </Badge>
            </Link>

            <div>
              <img
                onClick={() => setOpenDropDownProfile(!openDropDownProfile)}
                src="/images/profilepic.jpg"
                alt="user"
                className="rounded-circle profilepic"
              />
              {openDropDownProfile && (
                <ul className="profile-dropdown">
                  <li className="nav-link">
                    <Link
                      to={`/dashboard/${
                        auth.user.role === 1 ? "admin" : "user"
                      }/profile`}
                      className="btn btnforauth "
                    >
                      Profile
                    </Link>
                  </li>
                  <li className="nav-link">
                    <Link
                      to={`/dashboard/${
                        auth.user.role === 1 ? "admin" : "user"
                      }`}
                      className="btn btnforauth "
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-link">
                    <Link
                      onClick={handleLogout}
                      to="/login"
                      className="btn btnforauth "
                    >
                      Log Out
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
