import { useParams, useSearchParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from 'react';
// Custom
import axios from "../../api/axios";
import { API_URL } from "../../config";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
// Design
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const Catalog = ({ products, setSize }) => {
  const navigate = useNavigate();

  return (
    <div className="catalog py-2">
      <h2>Каталог:</h2>
      {/* Catalog */}
      {products?.length 
      ? products.map((prod, i) => (
        <div key={i} className="catalog-item col-10 rounded bg-white container-fluid mb-3 p-2">
          <img crossOrigin="anonymous" src={API_URL+prod.thumb_path} className="img-fluid rounded catalog-item-img" alt={prod.name} id="image" height={1100} width={700} />
          <form>
            <label htmlFor="image"><b>{prod.name}</b></label>
            <br />
            <div className="d-flex align-items-center justify-content-between text-nowrap">
              <label htmlFor="sizes" className="me-2">Размер:</label>
              <select 
              name="sizes" 
              id="sizes" 
              onChange={(e) => setSize(e.target.value)} 
              className="form-select w-75 px-2 py-1 rounded-pill"
              >
                {prod.sizes?.map((size, j) => (
                  <option value={size} key={j}>
                    {size} см
                  </option>
                ))}
              </select>
            </div>
            
            <button className="btn btn-success rounded-pill mt-2" onClick={(e) => navigate(`${prod._id}`)}>Примерить</button>
          </form>
        </div>
      ))
      : (
      <p>Товаров у этого бренда больше нет</p>
      )
      }
  </div>
  )
}

const BrandFittingRoom = () => {
  const { client_id } = useParams();
  const [ searchParams ] = useSearchParams();
  const [ size, setSize ] = useState('');
  const [searchResults, setSearchResults] = useState();

  const { data:products, isError, error } = useQuery(
    ["products-brand", client_id], 
    () => axios.get(`/mv/products/${client_id}`),
    {
      select: (data) => {
        const withModels = data.data.filter((prod) => !!prod.models.length);
        return withModels;
      },
      onSuccess: (data) => setSearchResults(data)
    }
  );

  if (isError) return <p>{error}</p>

  return (
    <div className="h-100 text-center w-100">
      <nav className="bg-dark d-flex justify-content-center navbar navbar-dark navbar-expand-sm text-white">
        <a target="_blank" rel="noreferrer" href='https://britishasiahome.kz/'><span>BritishAsia Home</span></a>
      </nav>

      <SearchBar products={products} setSearchResults={setSearchResults}/>
      
      <button data-bs-toggle="collapse" data-bs-target="#filters" className="btn btn-outline-dark m-auto text-center collapsed">Фильтр <FontAwesomeIcon icon={faFilter}/></button>
      <Filters products={products} setSearchResults={setSearchResults}/>
      <Catalog products={searchResults} setSize={setSize}/>

      <footer className="bg-dark d-flex justify-content-center text-white p-3">
        <span>INROOM.TECH 2022&copy;</span>
      </footer>
    </div>

  )
}

export default BrandFittingRoom