import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Canceled",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const { auth, setAuth } = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeStatus = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth.token) getOrders();
  }, [auth.token]);

  return (
    <Layout title={"All Orders Data - Admin"}>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
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
                        <td>
                          {
                            <Select
                              bordered={false}
                              onChange={(value) =>
                                handleChangeStatus(o._id, value)
                              }
                              defaultValue={o.status}
                            >
                              {status.map((s, i) => (
                                <Option key={i} value={s}>
                                  {s}
                                </Option>
                              ))}
                            </Select>
                          }
                        </td>
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
