import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
// Custom
import axios from "../../api/axios";
import { API_URL } from "../../config";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
// Design
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const Catalog = ({ products, size, setSize }) => {
  const navigate = useNavigate();
  return (
    <div className="catalog d-flex flex-wrap justify-content-evenly py-2">
      {/* Catalog */}
      {products?.length ? (
        products.map((prod, i) => (
          <div
            key={i}
            className="catalog-item col-5 rounded bg-white container-fluid mb-3 mx-0 p-2"
          >
            <img
              crossOrigin="anonymous"
              src={API_URL + prod.thumb_path}
              className="img-fluid rounded catalog-item-img"
              alt={prod.name}
              id="image"
              height={205}
              width={130}
              onClick={(e) => navigate(`${prod._id}?size=${size}`)}
            />
            <form>
              <label htmlFor="image">
                <b>{prod.name}</b>
              </label>
              <br />
              <div className="d-flex align-items-center justify-content-between text-nowrap">
                <label htmlFor="sizes" className="me-1">
                  Размер:
                </label>
                <select
                  name="sizes"
                  id="sizes"
                  onChange={(e) => setSize(e.target.value)}
                  className="w-75 py-1 rounded-pill"
                >
                  {prod.spoma_chain?.map((chain, j) => (
                    <option value={chain.size} key={j}>
                      {chain.size} см
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="btn-sm btn-success rounded-pill mt-2"
                onClick={(e) => navigate(`${prod._id}?size=${size}`)}
              >
                Примерить
              </button>
            </form>
          </div>
        ))
      ) : (
        <p>Товаров у этого бренда больше нет</p>
      )}
    </div>
  );
};

const BrandFittingRoom = () => {
  const { client_id } = useParams();
  const [size, setSize] = useState("");
  const [searchResults, setSearchResults] = useState();

  const {
    data: products,
    isSuccess,
    isLoading,
  } = useQuery(
    ["products-brand", client_id],
    () => axios.get(`/mv/products/${client_id}`),
    {
      select: (data) => {
        const withModels = data.data.filter((prod) => !!prod.spoma_chain.map((chain) => chain.model));
        return withModels;
      },
      onSuccess: (data) => setSearchResults(data),
    }
  );

  return (
    <div className="h-100 text-center w-100">
      <nav className="bg-dark d-flex justify-content-center navbar navbar-dark navbar-expand-sm text-white">
        <a target="_blank" rel="noreferrer" href="https://britishasiahome.kz/">
          <span>BritishAsia Home</span>
        </a>
      </nav>
      {isSuccess ? (
        <>
          <SearchBar products={products} setSearchResults={setSearchResults} />

          <button
            data-bs-toggle="collapse"
            data-bs-target="#filters"
            className="btn btn-outline-dark m-auto text-center collapsed"
          >
            Фильтр <FontAwesomeIcon icon={faFilter} />
          </button>
          <Filters products={products} setSearchResults={setSearchResults} />
          <h2>Каталог:</h2>
          <Catalog products={searchResults} size={size} setSize={setSize} />
        </>
      ) : isLoading ? (
        <p>Товары загружаются...</p>
      ) : (
        <p>У этого бренда нет товаров</p>
      )}
      <footer className="bg-dark d-flex justify-content-center text-white p-3">
        <span>INROOM.TECH 2022&copy;</span>
      </footer>
    </div>
  );
};

export default BrandFittingRoom;
