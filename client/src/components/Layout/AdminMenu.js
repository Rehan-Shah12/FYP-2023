import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";

const AdminMenu = () => {
  const { auth } = useAuth();
  return (
    <div className="list-group">
      <div className="d-flex justify-content-center align-items-center flex-column mt-5 mb-5">
        <img
          src="/images/profilepic.jpg"
          alt="user"
          className="rounded-circle profilepic "
          style={{ height: "200px", width: "200px" }}
        />
        <h1>{auth.user.fname}</h1>
      </div>
      <div className="text-center rounded">
        {" "}
        {/* <NavLink
          to="/dashboard/admin"
          className="list-group-item list-group-item-action"
        >
          Dashboard
        </NavLink> */}
        <NavLink
          to="/dashboard/admin/profile"
          className="list-group-item list-group-item-action"
        >
          Profile
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className="list-group-item list-group-item-action"
        >
          Add Product
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-category"
          className="list-group-item list-group-item-action"
        >
          Add Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/feedback"
          className="list-group-item list-group-item-action"
        >
          Feedback
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
