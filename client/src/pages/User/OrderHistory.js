import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth.token) getOrders();
  }, [auth.token]);

  console.log("Orders:", orders);
  return (
    <Layout title={"Order History"}>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h2 className="fw-bold text-center opacity">Order History</h2>{" "}
            <p>
              {orders.map((o, i) => {
                return (
                  <div className="border shadow mb-4 p-4 rounded">
                    <table className="table ">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Status</th>
                          <th scope="col">Buyer</th>
                          <th scope="col">Date</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>{o.status}</td>
                          <td>{o.buyer.fname}</td>
                          {console.log("NAME: ", o.buyer)}
                          <td>{moment(o.createdAt).format("MMMM Do YYYY")}</td>
                          <td>{o.payment.success ? "Success" : "Failed"}</td>
                          <td>{o.products.length}</td>
                          <td>Rs {o.payment.transaction.amount}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="container">
                      {o.products.map((p) => (
                        <div
                          className="row card flex-row mb-3"
                          key={p._id}
                          style={{ borderRadius: "20px" }}
                        >
                          <div
                            className="col-md-4"
                            onClick={() => navigate(`/product/${p.slug}`)}
                          >
                            <img
                              src={`/api/v1/product/product-photo/${p._id}`}
                              className="card-img-top"
                              alt={p.name}
                              width="100%"
                              height={"130px"}
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                          <div
                            className="col-md-6"
                            style={{ paddingTop: "15px" }}
                            onClick={() => navigate(`/product/${p.slug}`)}
                          >
                            <h5 className="card-title fw-bold">{p.name}</h5>
                            <p className="card-text ">
                              {p.description.substring(0, 60)}...
                            </p>
                            <h5 className="card-title card-price fw-bold">
                              {p.price.toLocaleString("en-PK", {
                                style: "currency",
                                currency: "PKR",
                              })}
                            </h5>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderHistory;
