import React from "react";
import Filters from "./Filters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";


const SearchBar = ({ products, setSearchResults, filtersEnabled }) => {
  const handleSubmit = (e) => e.preventDefault();

  const handleSearchChange = (e) => {
    if (!e.target.value && !!products) return setSearchResults(products);

    const resultsArray = products?.filter(
      (product) =>
        product.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        product.description.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setSearchResults(resultsArray);
  };

  return (
    <>
      <div className="input-group mb-3 px-1 pt-2 mt-2">
        <input
          type="search"
          className="form-control"
          placeholder="Введите название"
          aria-label="Введите название"
          aria-describedby="search-addon"
          onChange={handleSearchChange}
        />
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={handleSubmit}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <button
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#filters"
          className={`btn btn-outline-danger ${ filtersEnabled ? 'd-block' : 'd-none'}`}
        >
          <FontAwesomeIcon icon={faFilter} />
        </button>
      </div>
      <Filters products={products} setSearchResults={setSearchResults}/>
    </>
  );

};

export default SearchBar;
