import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";

const OrderHistory = () => {
  return (
    <Layout title={"Order History"}>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">Order History</div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderHistory;
