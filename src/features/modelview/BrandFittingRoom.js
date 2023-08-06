import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
// Custom
import axios from "../../api/axios";
import { API_URL } from "../../config";
import SearchBar from "./SearchBar";
import ReactGA from 'react-ga';

// import '../demo/demo.css';

const ProductCard = ({ img_src, alt, id}) => {  
  const navigate = useNavigate();
  return (
    <div key={id} className={`product-card col-6 col-lg-3 mb-3 text-center ${id%2 ? 'pe-2' : 'ps-2'}`}>
      <img 
      height={330}
      crossOrigin="anonymous"
      src={img_src} 
      alt={alt} 
      className="w-100 rounded-1" 
      onClick={(e) => navigate(`${id}`)}/>

      <span className="text-center">{alt}</span>
    </div>
  )
}

const Catalog = ({ products, size, setSize }) => {
  return (
    <div className="catalog d-flex flex-wrap justify-content-between">
        {/* Catalog */}
      {products?.length ? (
        products.map((prod) => <ProductCard img_src={API_URL + prod.thumb_path} alt={prod.name} id={prod._id}/>)
      ) : (
        <p>Каталог пуст или в процессе разработки</p>
      )}
    </div>
  );
};

const BrandFittingRoom = () => {
  const { client_id } = useParams();
  const [size, setSize] = useState("");
  const [searchResults, setSearchResults] = useState();

  useEffect(() => {
    ReactGA.pageview(window.location.pathname, { dimension1: 'brand_page'});
  }, []);

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
    <div className="container-fluid px-4">
      <div className="bg-white header-demo sticky-top">
        <h1 className="text-center lspace-50 demo-header fw-bold">
          BRITISH ASIA HOME
        </h1>
        <div className="process pb-1">
          <SearchBar products={products} setSearchResults={setSearchResults} filtersEnabled={true}/>
        </div>
      </div>
      <Catalog products={searchResults}/>
    </div>
  );
};



export default BrandFittingRoom;
