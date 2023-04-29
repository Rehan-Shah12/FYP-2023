import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { BsFillCartFill } from "react-icons/bs";

import { useNavigate } from "react-router-dom";
const Search = () => {
  const navigate = useNavigate();

  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search results"}>
      <div
        className="container-fluid row mt-3 home-page d-flex "
        style={{ margin: "0px" }}
      >
        <div className="text-center">
          <h1>Search Resuts</h1>
          <h6>
            {values.results.length < 1
              ? "No Products Found"
              : `Found ${values.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values.results.map((p) => (
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

                      {/* //     onClick={() => {
                        //       setCart([...cart, p]);
                        //       localStorage.setItem(
                        //         "cart",
                        //         JSON.stringify([...cart, p])
                        //       );
                        //       toast.success("Item Added to cart");
                        //     }} */}

                      <BsFillCartFill size={25} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
