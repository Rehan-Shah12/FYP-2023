import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { BsFillCartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const navigate = useNavigate();

  const params = useParams();
  const [product, setProduct] = useState({});
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
      console.log("Hello");
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
  return (
    <Layout>
      <div className="container-fluid">
        {" "}
        <div
          className="row"
          style={{ marginTop: "100px", marginInline: "200px" }}
        >
          <div className="col-md-5">
            {" "}
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              className="card-img-top"
              alt={product.name}
              height={"100%"}
              width={"100%"}
              style={{
                objectFit: "contain",
                borderRadius: "30px",
              }}
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
              {" "}
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
                      {" "}
                      {product.oldPrice > 0 && (
                        <p style={{ textDecoration: "line-through" }}>
                          {product.oldPrice.toLocaleString("en-PK", {
                            style: "currency",
                            currency: "PKR",
                          })}
                        </p>
                      )}
                    </sub>
                  </>
                )}
              </div>
              <div className="d-flex flex-column justify-content-center align-items-center ">
                {" "}
                {product.quantity > 0 && (
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
                )}
                {/* <button
                  type="button"
                  className="btn fw-bold"
                  style={{
                    backgroundColor: "#e150f9",
                    color: "white",
                    borderRadius: "30px",
                    padding: "18px",
                    fontSize: "1.5rem",
                  }}
                >
                  Add To Cart
                </button> */}
                {product.quantity > 0 ? (
                  <button
                    type="button"
                    className="btn fw-bold"
                    style={{
                      backgroundColor: "#e150f9",
                      color: "white",
                      borderRadius: "30px",
                      padding: "18px",
                      fontSize: "1.5rem",
                    }}
                  >
                    Add To Cart
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
              </div>
            </div>
          </div>
        </div>
        {relatedProducts != 0 && (
          <div
            className="row"
            style={{ marginTop: "80px", marginBottom: "80px" }}
          >
            <h2 className="fw-bold " style={{ opacity: "0.87" }}>
              {" "}
              Similar Products
            </h2>
            <div className="home-page">
              {" "}
              <div className="d-flex flex-wrap mt-4">
                {relatedProducts.map((p) => (
                  <div className="card m-2" style={{ width: "18rem" }}>
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
                      </p>{" "}
                      <div className="card-name-price">
                        <div
                          style={{
                            fontWeight: "bold",
                            backgroundColor: "#e150f9",
                            color: "white",
                            textAlign: "center",
                            padding: "3px 6px ",
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
