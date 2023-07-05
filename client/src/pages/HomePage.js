import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { BsFillCartFill } from "react-icons/bs";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import KommunicateChat from "../chat";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line
  const { auth, setAuth } = useAuth();

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container mt-3  ">
        {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-6  homepagefont p-2">
            Search and Find your Products across Different E-commerce Sites
          </div>
          <div className="col-6 d-none d-md-block">
            {" "}
            <img
              src="/images/homepage.png"
              alt="World Map"
              style={{ height: "25rem" }}
            />
          </div>
        </div>
        <div>
          <div
            id="carouselExample"
            className="carousel slide"
            style={{ marginTop: "1.2rem" }}
          >
            <div className="carousel-inner" style={{ borderRadius: "30px" }}>
              <div className="carousel-item ">
                <img
                  src="/images/carousel1.jpg"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item active">
                <img
                  src="/images/carousel2.jpg"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="d-flex text-center flex-column">
          <h2 className="mt-5 fw-bold  ">SUMMER HOT DEALS</h2>
          <p>Browse The Collection of Top Products</p>
        </div>
        <div>
          <div className="home-page mb-5">
            {" "}
            <div className="d-flex flex-wrap">
              {products &&
                products.map((p) => (
                  <div className="card m-2" key={p._id}>
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
                        <h5 className="card-title">{p.name}</h5>
                        <h5 className="card-title card-price">
                          {p.price.toLocaleString("en-PK", {
                            style: "currency",
                            currency: "PKR",
                          })}
                        </h5>
                      </div>
                      <p
                        className="card-text "
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        {p.description.substring(0, 60)}...
                      </p>
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

                          <BsFillCartFill
                            size={25}
                            onClick={() => {
                              setCart([...cart, p]);
                              localStorage.setItem(
                                "cart",
                                JSON.stringify([...cart, p])
                              );
                              toast.success("Item added to Cart");
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-6 d-flex justify-content-end">
            <img
              src="/images/ad1.jpg"
              alt="Advertisment"
              onClick={() => navigate(`/category/electronic-devices`)}
              style={{ borderRadius: "50px", height: "15rem" }}
            />
          </div>
          <div className="col-6 d-flex justify-content-start">
            <img
              src="/images/ad1.jpg"
              alt="Advertisment"
              onClick={() => navigate(`/category/electronic-devices`)}
              style={{ borderRadius: "50px", height: "15rem" }}
            />
          </div>
        </div>
      </div>
      <KommunicateChat />
    </Layout>
  );
};

export default HomePage;
