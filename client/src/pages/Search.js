import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { BsFillCartFill } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";

import { useNavigate } from "react-router-dom";
const Search = () => {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [sites, setSites] = useState([
    { name: "Daraz", value: "daraz" },
    { name: "ELO", value: "elo" },
    { name: "iShopping", value: "ishopping" },
  ]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [siteFilter, setSiteFilter] = useState();
  const [filteredProducts, setFilteredProducts] = useState([]);

  // const { scrape } = location.state;

  const [values, setValues] = useSearch();

  const [scrapeValues, setScrapeValues] = useState([]);
  // console.log(scrapeValues);

  console.log(filteredProducts);

  useEffect(() => {
    if (location.state) {
      setScrapeValues(location.state.data);
    }
  }, [location.state]);

  function extractIntegerValue(str) {
    // Remove any non-digit characters except commas
    let cleanedStr = str.replace(/[^\d,]/g, "");

    // Remove commas from the cleaned string
    let commaRemovedStr = cleanedStr.replace(/,/g, "");

    // Parse the remaining string as an integer
    let integerValue = parseInt(commaRemovedStr);

    return integerValue;
  }

  // filter by cat
  const handleFilter = (isChecked, value) => {
    if (isChecked) {
      // Add value to checked array
      setChecked((prevChecked) => [...prevChecked, value]);
    } else {
      // Remove value from checked array
      setChecked((prevChecked) => prevChecked.filter((item) => item !== value));
    }
  };

  useEffect(() => {
    // apply price(min, max), categories, titleSearch filters
    let filteredProducts = scrapeValues;
    // if (minPrice && maxPrice) {
    //   filteredProducts = filteredProducts.filter((product) => {
    //     const price = extractIntegerValue(product.price);
    //     return price >= minPrice && price <= maxPrice;
    //   });
    // }
    if (minPrice || maxPrice) {
      filteredProducts = filteredProducts.filter((product) => {
        const price = extractIntegerValue(product.price);
        if (minPrice && maxPrice) {
          return price >= minPrice && price <= maxPrice;
        } else if (minPrice) {
          return price >= minPrice;
        } else if (maxPrice) {
          return price <= maxPrice;
        }
        return true;
      });
    }

    if (checked.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        checked.includes(product.site.toLowerCase())
      );
    }

    // if (price.min > -1 && price.max <= 100000) {
    // );
    // }

    // if (titleSearch !== '') {
    //   filteredProducts = filteredProducts.filter((product) =>
    //     product.title.toLowerCase().includes(titleSearch.toLowerCase())
    //   );
    // }
    // console.log(filteredProducts);
    setFilteredProducts(filteredProducts);
  }, [minPrice, maxPrice, checked]);

  return (
    <Layout title={"Search results"}>
      <div
        className="container-fluid row mt-3 home-page d-flex "
        style={{ margin: "0px" }}
      >
        {/* Filter Start */}
        <div className="col-md-3 filters">
          <h4 className="text-center">Filter By Sites</h4>
          <div className="d-flex flex-column">
            {sites &&
              sites.map((c) => (
                <Checkbox
                  key={c.value}
                  onChange={(e) => handleFilter(e.target.checked, c.value)}
                  checked={checked.includes(c.value)}
                >
                  {c.name}
                </Checkbox>
              ))}
          </div>
          {/* price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices.map((p) => (
                <div key={p._id}>
                  <Radio
                    value={p.array}
                    onChange={(e) => {
                      setMinPrice(e.target.value[0]);
                      setMaxPrice(e.target.value[1]);
                    }}
                  >
                    {p.name}
                  </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        {/* Filters End */}
        <div className="text-center col-9">
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
            {filteredProducts.length > 0
              ? filteredProducts.map((p) => (
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img src={p.image} className="card-img-top" alt={p.name} />
                    <div className="card-body">
                      <div className="card-name-price">
                        <h5 className="card-title text-start">
                          {p.name.substring(0, 30)}...
                        </h5>
                        <h5 className="card-title card-price">
                          {p.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </h5>
                      </div>

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
                          {p.site}
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
                ))
              : scrapeValues.map((p) => (
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img src={p.image} className="card-img-top" alt={p.name} />
                    <div className="card-body">
                      <div className="card-name-price">
                        <h5 className="card-title text-start">
                          {p.name.substring(0, 30)}...
                        </h5>
                        <h5 className="card-title card-price">
                          {p.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </h5>
                      </div>

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
                          {p.site}
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
