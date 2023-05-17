import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  // const [scrapeValues, setScrapeValues] = useState([]);
  // console.log(scrapeValues);
  // const [searching, setSearching] = useState(false); // New state variable to track search operation

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const key = values.keyword;

      const scrapeRequest = axios.post("/api/v1/scraper/scrape-search/", {
        query: key,
      });

      const productsRequest = axios.get(`/api/v1/product/search/${key}`);

      const [scrapeResponse, productsResponse] = await Promise.all([
        scrapeRequest,
        productsRequest,
      ]);

      const data = {
        scrapeData: scrapeResponse.data,
        productsData: productsResponse.data,
      };

      navigate("/search", { state: { data } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {" "}
      <form className="d-flex w-100" role="search" onSubmit={handleSubmit}>
        {" "}
        <div className="input-group mb-3 " style={{ marginTop: "16px" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search Here"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
            style={{
              borderRight: "none",
              borderTopLeftRadius: "20px",
              borderBottomLeftRadius: "20px",
              width: "430px",
            }}
          />
          <button
            className="btn btn-outline-secondary"
            type="submit"
            style={{
              border: "1px solid rgba(129, 129, 126, 0.2)",
              borderLeft: "none",
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
            }}
          >
            <BsSearch />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
