import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ products, setSearchResults }) => {
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
    <div className="input-group mb-3 px-1 pt-2 mt-2">
      <input
        type="search"
        className="form-control rounded"
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
    </div>
  );
};

export default SearchBar;
