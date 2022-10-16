import { useParams, useSearchParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from 'react';
// Custom
import axios from "../../api/axios";
import { API_URL } from "../../config";
// Design
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ products, setSearchResults }) => {
  const handleSubmit = (e) => e.preventDefault()

  const handleSearchChange = (e) => {
    if (!e.target.value && !!products) return setSearchResults(products)

    const resultsArray = products?.filter(product => product.name.toLowerCase().includes(e.target.value.toLowerCase()) || product.description.toLowerCase().includes(e.target.value.toLowerCase()))

    setSearchResults(resultsArray)
  }

  return (

    <div className="input-group mb-3 px-1 pt-2">
      <input
        type="search"
        className="form-control rounded"
        placeholder="Введите название"
        aria-label="Введите название"
        aria-describedby="search-addon"
        onChange={handleSearchChange}
      />
      <button type="button" className="btn btn-outline-primary" onClick={handleSubmit}>
        поиск
      </button>
    </div>
  )
}

const Filters = ({ products, setSearchResults }) => {
  // Filtering attributes
  const [lowPrice, setLowPrice] = useState(1);
  const [highPrice, setHighPrice] = useState(10000000);
  const [sizes, setSizes] = useState([]);
  const [sizesChosen, setSizesChosen] = useState([]);

  useEffect(() => {
    if (products) {
      //  Price boundaries
      const allPrices = products.map(prod => parseInt(prod.price));
      setLowPrice(Math.min(...allPrices));
      setHighPrice(Math.max(...allPrices));

      // Sizes options
      const rawSizes = products.map(prod => prod.sizes); 
      const allSizes = [...new Set(rawSizes.flat())];
      setSizes([...allSizes]);
      setSizesChosen([...allSizes]);
    }
  }, [products]);

  // Functions
  const handleSubmit = (e) => {
    e.preventDefault();
    if ( highPrice < lowPrice ) return console.log('mistake in pricing');
    const priceRanged = products?.filter(product => parseInt(product.price) >= lowPrice &&  parseInt(product.price) <= highPrice);
    console.log(sizesChosen);
    const resultsArray = sizesChosen.length ? priceRanged.filter(product => product.sizes.some(size => sizesChosen.includes(size))) : null;
    setSearchResults(resultsArray);
  }

  const handleCheckedSize = (e) => {
    if ( e.target.checked ) {
      sizesChosen.push(e.target.value);
    }
    else {
      var index = sizesChosen.indexOf(e.target.value);
      if (index !== -1) sizesChosen.splice(index, 1);
    }
  }

  return (

    <div className="mb-3 px-1 pt-2">
      <button data-bs-toggle="collapse" data-bs-target="#filters" className="text-center m-auto">Фильтр <FontAwesomeIcon icon={faFilter}/></button>
      <div className="collapse" id="filters">
        <form onSubmit={handleSubmit}>

        <div className="accordion accordion-flush" id="accordionFlushExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingOne">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                Цена
              </button>
            </h2>
            <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
              <div className="accordion-body">
                <label htmlFor="priceFilter">В диапозоне:</label>
                <div className="priceFilter d-flex justify-content-between align-items-center">
                  <input type="number" className="form-control rounded-pill" id="lowPrice" value={lowPrice} onChange={(e) => setLowPrice(parseInt(e.target.value))}/>
                  
                  <svg height={2} width={100} className="mx-1">
                    <line x1={0} y1={0} x2={100} y2={0} style={{stroke: 'rgb(0,0,0)', strokeWidth: 2}} />
                  </svg>
                  <input type="number" className="form-control rounded-pill" id="highPrice" value={highPrice} onChange={(e) => setHighPrice(parseInt(e.target.value))}/>  
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingTwo">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                Размеры
              </button>
            </h2>
            <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
              <div className="accordion-body">
                <div className="sizeFilter d-flex flex-wrap">

                {/* Sizes show */}
                {sizes?.map((size, i) => (
                  <div className="size my-2 w-50" key={i}>
                    <input className="form-check-input" type="checkbox" value={size} id={i} onChange={handleCheckedSize} defaultChecked={false}/>
                    <label className="form-check-label" htmlFor="size1">{size} см</label>
                  </div> 
                ))}
                </div>
              </div>
            </div>
            <br />
          </div>
        </div>
        
        <input type="submit" value="Применить"/>
        </form>
      </div>
    </div>
  )
}

const Catalog = ({ products, setSize }) => {
  const navigate = useNavigate();

  return (
    <div className="catalog py-2">
      <h2>Каталог:</h2>
      {/* Catalog */}
      {products?.length 
      ? products.map((prod, i) => (
        <div key={i} className="catalog-item col-10 rounded bg-white container-fluid mb-3 p-2">
          <img crossOrigin="anonymous" src={API_URL+prod.thumb_path} className="img-fluid rounded catalog-item-img" alt={prod.name} id="image"/>
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
        <Link to={"https://britishasiahome.kz/"}><span>BritishAsia Home</span></Link>
      </nav>

      <SearchBar products={products} setSearchResults={setSearchResults}/>
      <Filters products={products} setSearchResults={setSearchResults}/>
      <Catalog products={searchResults} setSize={setSize}/>

      <footer className="bg-dark d-flex justify-content-center text-white p-3">
        <span>INROOM.TECH 2022&copy;</span>
      </footer>
    </div>

  )
}

export default BrandFittingRoom