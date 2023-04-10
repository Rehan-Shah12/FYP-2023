import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const AdminProfile = () => {
  return (
    <Layout>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">Profile</div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminProfile;
