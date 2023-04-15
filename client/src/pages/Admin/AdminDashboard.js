import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
const AdminDashboard = () => {
  const { auth } = useAuth();
  return (
    <Layout>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card">Admin Dashboard</div>
            <div className="card">{auth.user.fname}</div>
            <div className="card">{auth.user.lname}</div>
            <div className="card">{auth.user.phone}</div>
            <div className="card">{auth.user.email}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
