import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
// import profilepic from "../../../public/images/profilepic.jpg";

const SearchBar = () => {
  const { auth, setAuth } = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };
  return (
    <div className="border-bottom d-flex justify-content-between px-5 fs-5">
      <div>Logo</div>
      <div>SearchBar</div>
      <div className="profile-space">
        {!auth.user ? (
          <>
            <Link to="/register" className="btn btnforauth">
              Signup
            </Link>
            <Link to="/login" className="btn btnforauth">
              Log In
            </Link>
          </>
        ) : (
          <>
            <Link
              onClick={handleLogout}
              to="/login"
              className="btn btnforauth "
            >
              Log Out
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
