import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { MdDeleteOutline } from "react-icons/md";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { updateProductStock } from "../services/productService";
// import productModel from "../../../models/productModel";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const { auth, setAuth } = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Delete Item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  // Total Price
  const totalPrice = () => {
    try {
      let total = 0;
      cart.map((item) => {
        total = total + item.price * item.quantity;
      });
      return total.toLocaleString("en-PK", {
        style: "currency",
        currency: "PKR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const updateProductStock = async (cart) => {
  //   try {
  //     for (const item of cart) {
  //       const product = await productModel.findById(item.productId);
  //       if (product) {
  //         product.quantity -= item.quantity; // Deduct the quantity
  //         await product.save();
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // Get Payment Getway Token:

  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data && data.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth.token]);

  // Handle Payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]); // Clear the cart
      await updateProductStock(data.cart); // Deduct the quantity from stock
      navigate("/dashboard/user/order-history");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <p
              className="text-center  fw-bold"
              style={{
                marginTop: "2.5rem",
                marginBottom: "0.5rem",
                fontSize: "2.5rem",
              }}
            >
              {!auth.user
                ? "Hello Guest"
                : `Hello  ${auth.token && auth.user.fname}`}
            </p>
            <h5 className="text-center">
              {cart.length
                ? `You have ${cart.length} Items in your Cart
                   ${auth.token ? "" : "Please Login to Checkout !"}`
                : " Your Cart Is Empty"}
            </h5>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-7  mb-5">
            {cart.map((p) => (
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
                  <p className="card-text">
                    {p.description.substring(0, 60)}...
                  </p>
                  <h5 className="card-title card-price fw-bold">
                    {p.price.toLocaleString("en-PK", {
                      style: "currency",
                      currency: "PKR",
                    })}
                  </h5>
                  <p className="card-text">Quantity: {p.quantity}</p>{" "}
                  {/* Added quantity */}
                </div>
                <div className="col-md-2 cart-remove-btn d-flex justify-content-center align-items-center">
                  <div onClick={() => removeCartItem(p._id)}>
                    <MdDeleteOutline size={50} color="red" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-5">
            <div className="text-center p-2">
              <h3 className="fw-bold ">Cart Summary</h3>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total : {totalPrice()} </h4>
              {auth && auth.user && auth.user.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth.user.address}</h5>
                    <button
                      className="btn btn-info mt-2 rounded-pill"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth.token ? (
                    <button
                      className="btn btn-info rounded-pill"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-dark rounded-pill"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Please Login to checkout
                    </button>
                  )}
                </div>
              )}
              <div className="mt-2 mb-5">
                {!clientToken || !auth.token || !cart.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        // paypal: {
                        //   flow: "vault",
                        // },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth.user.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
