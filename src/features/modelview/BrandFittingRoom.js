import React, { useState } from 'react';
import axios from "../../api/axios";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../../config";
import { useParams, useSearchParams, useNavigate, Link,  } from "react-router-dom";
import CatalogSwiper from "./CatalogSwiper";


const fetchBrandProducts = ( client_id ) => {
  return axios.get(`/modelview/products/${client_id}`);
}

const BrandFittingRoom = () => {
  const navigate = useNavigate();
  const { client_id } = useParams();
  const [ searchParams ] = useSearchParams();
  
  const [size, setSize] = useState('');

  const { data:products, isError, error } = useQuery(
    ["products-brand", client_id], 
    () => fetchBrandProducts(client_id),
    {
      select: (data) => {
        const withModels = data.data.filter((prod) => !!prod.models.length);
        return withModels;
      }
    }
  );

  if (isError) return <p>{error}</p>

  return (
    <div className="h-100 text-center w-100">
      <nav class="bg-dark d-flex justify-content-center navbar navbar-dark navbar-expand-sm text-white">
        <span>BritishAsia Home</span>
      </nav>
        {/* <div className="upper mb-4">
            <div className="input-group">
            <input
                type="search"
                className="form-control rounded"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
            />
            <button type="button" className="btn btn-outline-primary">
                поиск
            </button>
            </div>
            <button>Filter</button>
            <div className="collapse filter-settings" id="filter">Filter settings</div>
        </div> */}
        <div className="catalog py-2">
            <h2>Каталог:</h2>
            {/* Catalog */}
            {products?.length 
            ? products.map((prod, i) => (
              <div key={i} className="catalog-item col-10 rounded bg-white container-fluid mb-3 p-2">
                <img src={API_URL+prod.thumb_link} className="img-fluid rounded catalog-item-img" alt={prod.name} id="image"/>
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
                      {prod.sizes?.map((size) => (
                        <option value={size}>
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
        <footer className="bg-dark d-flex justify-content-center text-white p-3">
          <span>INROOM.TECH 2022&copy;</span>
        </footer>
    </div>

  )
}

export default BrandFittingRoom