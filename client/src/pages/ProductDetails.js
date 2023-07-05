import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { BsFillCartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Button, Space } from "antd";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";

const ProductDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useCart();
  const [count, setCount] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params.slug) getProduct();
  }, [params.slug]);

  // Get Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data.product);
      getSimilarProduct(data.product._id, data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Similar Product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleIncrement = () => {
    if (count < product.quantity) {
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleAddToCart = () => {
    if (product.quantity > 0) {
      const cartItem = { ...product, quantity: count };
      setCart([...cart, cartItem]);
      localStorage.setItem("cart", JSON.stringify([...cart, cartItem]));
      toast.success("Item added to Cart");
    }
  };

  return (
    <Layout>
      <div className="container-fluid">
        <div
          className="row"
          style={{ marginTop: "100px", marginInline: "200px" }}
        >
          <div className="col-md-5">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              className="card-img-top"
              alt={product.name}
              height={"100%"}
              width={"100%"}
              style={{ objectFit: "contain", borderRadius: "30px" }}
            />
          </div>
          <div className="col-md-6" style={{ opacity: "0.87" }}>
            <h1 className="fw-bold">{product.name}</h1>
            <p>{product.description}</p>
            <h4 className="fw-bold">From:</h4>
            <h5 className="fw-bold" style={{ color: "#e150f9" }}>
              CHOICE
            </h5>
            <div className="d-flex justify-content-between">
              <div>
                <p>As Low As:</p>
                {Object.keys(product).length > 0 && (
                  <>
                    <p className="fw-bold" style={{ fontSize: "1.5rem" }}>
                      {product.price.toLocaleString("en-PK", {
                        style: "currency",
                        currency: "PKR",
                      })}
                    </p>
                    <sub>
                      {product.oldPrice > 0 && (
                        <p style={{ textDecoration: "line-through" }}>
                          {product.oldPrice.toLocaleString("en-PK", {
                            style: "currency",
                            currency: "PKR",
                          })}
                        </p>
                      )}
                    </sub>
                    <Space wrap>
                      <Button onClick={handleDecrement}>-</Button>
                      <Button>{count}</Button>
                      <Button onClick={handleIncrement}>+</Button>
                    </Space>
                  </>
                )}
              </div>
              <div className="d-flex flex-column justify-content-center align-items-center">
                {product.quantity > 0 ? (
                  <button
                    type="button"
                    className="btn fw-bold mb-2"
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      borderRadius: "40px",
                      padding: "10px",
                      fontSize: "1rem",
                      width: "6rem",
                    }}
                  >
                    In Stock
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn fw-bold"
                    style={{
                      backgroundColor: "#5A5A5A",
                      color: "white",
                      borderRadius: "30px",
                      padding: "18px",
                      fontSize: "1.5rem",
                    }}
                    disabled
                  >
                    Not Available
                  </button>
                )}
                <button
                  type="button"
                  className="btn fw-bold"
                  onClick={handleAddToCart}
                  style={{
                    backgroundColor: "#e150f9",
                    color: "white",
                    borderRadius: "30px",
                    padding: "18px",
                    fontSize: "1.5rem",
                  }}
                  disabled={count === 0}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
        {relatedProducts.length > 0 && (
          <div
            className="row"
            style={{ marginTop: "80px", marginBottom: "80px" }}
          >
            <h2 className="fw-bold" style={{ opacity: "0.87" }}>
              Similar Products
            </h2>
            <div className="home-page">
              <div className="d-flex flex-wrap mt-4">
                {relatedProducts.map((p) => (
                  <div
                    className="card m-2"
                    style={{ width: "18rem" }}
                    key={p._id}
                  >
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      onClick={() => navigate(`/product/${p.slug}`)}
                    />
                    <div className="card-body">
                      <div
                        className="card-name-price"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        <h5 className="card-title text-start">{p.name}</h5>
                        <h5 className="card-title card-price">
                          {p.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </h5>
                      </div>
                      <p
                        className="card-text text-start"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        {p.description.substring(0, 20)}...
                      </p>
                      <div className="card-name-price">
                        <div
                          style={{
                            fontWeight: "bold",
                            backgroundColor: "#e150f9",
                            color: "white",
                            textAlign: "center",
                            padding: "3px 6px",
                            borderRadius: "20px",
                          }}
                        >
                          CHOICE
                        </div>
                        <div>
                          <MdOutlineFavoriteBorder
                            size={25}
                            style={{ marginRight: "10px" }}
                          />
                          <BsFillCartFill size={25} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;
