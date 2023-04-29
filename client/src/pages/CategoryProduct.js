import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { BsFillCartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const CategoryProduct = () => {
  const navigate = useNavigate();

  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data.products);
      setCategory(data.category);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params.slug) getProductByCat();
  }, [params.slug]);
  return (
    <Layout title={"Product Category Wise"}>
      <div className=" container mt-5 ">
        <h1 className="text-center fw-bold">{category.name}</h1>
        <h5 className="text-center">{products.length} result/s found</h5>

        {products.length > 0 && (
          <div className="home-page" style={{ justifyContent: "center" }}>
            {" "}
            <div className="d-flex flex-wrap mt-4">
              {products.map((p) => (
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
        )}
      </div>
    </Layout>
  );
};

export default CategoryProduct;
