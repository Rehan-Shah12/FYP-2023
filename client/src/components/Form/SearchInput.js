import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const key = values.keyword;
      setIsLoading(true); // Start the loader

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

      setIsLoading(false); // Stop the loader
      navigate("/search", { state: { data } });
    } catch (error) {
      console.log(error);
      setIsLoading(false); // Stop the loader on error
    }
  };

  return (
    <div className="mt-2 pb-0">
      <form className="d-flex w-100" role="search" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control form-control-lg  search-bar"
            placeholder="Search Here"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          />
          <button
            className="btn btn-outline-secondary btn-lg  search-button"
            type="submit"
            id="button-addon2"
            disabled={isLoading} // Disable button during loading
          >
            {isLoading ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <BsSearch />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
