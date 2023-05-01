import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";

const UserMenu = () => {
  const { auth, setAuth } = useAuth();
  return (
    <div className="list-group">
      <div className="d-flex justify-content-center align-items-center flex-column mt-5 mb-5">
        <img
          src="/images/profilepic.jpg"
          alt="user"
          className="rounded-circle profilepic "
          style={{ height: "200px", width: "200px" }}
        />
        <h1>{auth && auth.user.fname}</h1>
      </div>
      <div className="text-center rounded">
        <NavLink
          to="/dashboard/user/profile"
          className="list-group-item list-group-item-action"
        >
          Profile
        </NavLink>
        <NavLink
          to="/dashboard/user/order-history"
          className="list-group-item list-group-item-action"
        >
          Order History
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
