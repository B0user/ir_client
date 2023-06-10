import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faTrash } from "@fortawesome/free-solid-svg-icons";

const Checkbox = ({ value, id, chosen }) => {
  const [checked, setChecked] = useState(false);

  const handleChecked = (e) => {
    setChecked(e.target.checked);
    if (e.target.checked) {
      chosen.push(e.target.value);
    } else {
      var index = chosen.indexOf(e.target.value);
      if (index !== -1) chosen.splice(index, 1);
    }
  };

  useEffect(
    (value) => {
      chosen.includes(value) ? setChecked(true) : setChecked(false);
    },
    [chosen]
  );

  return (
    <input
      className="form-check-input"
      type="checkbox"
      value={value}
      id={id}
      onChange={handleChecked}
      defaultChecked={false}
      checked={checked}
    />
  );
};

const Filters = ({ products, setSearchResults }) => {
  // Filtering attributes
  const [lowestPrice, setLowestPrice] = useState(1);
  const [lowPrice, setLowPrice] = useState(1);
  const [highestPrice, setHighestPrice] = useState(10000000);
  const [highPrice, setHighPrice] = useState(10000000);
  const [sizes, setSizes] = useState([]);
  const [sizesChosen, setSizesChosen] = useState([]);
  const [chars, setChars] = useState([]);
  const [charsChosen, setCharsChosen] = useState([]);

  const clearFilter = () => {
    setSizesChosen([]);
    setCharsChosen([]);
    
    setSearchResults(products);
  };

  useEffect(() => {
    if (products) {
      //  Price boundaries
      const allPrices = products.map((prod) => prod.spoma_chain.map(chain => parseInt(chain.price))).flat().filter((size) => !Number.isNaN(size));
      setLowPrice(Math.min(...allPrices));
      setLowestPrice(Math.min(...allPrices));
      setHighPrice(Math.max(...allPrices));
      setHighestPrice(Math.max(...allPrices));

      // Sizes options
      const rawSizes = products.map((prod) => prod.spoma_chain.map(chain => chain.size));
      const allSizes = [...new Set(rawSizes.flat())];
      setSizes([...allSizes]);
      // setSizesChosen([...allSizes]);

      // Characteristics
      const rawChars = products.map((prod) => getChars(prod.description));
      const allChars = [...new Set(rawChars.flat().filter(val => !!val))];
      setChars([...allChars]);
      // setCharsChosen([...allChars]);
    }
  }, [products]);

  const getChars = (str) => {
    let res = str.replace(/\s+/, "");
    res = res?.split(/\r?\n/);
    res = res
      .filter((line) => line.startsWith("СОСТАВ: "))
      .toString()
      .toUpperCase();
    res = res?.replace(",СОСТАВ: ", ", ").split(": ");
    res = res[1]?.replace(" / ", ", ").replace(" И ", ", ").split(", ");
    return res;
  };

  // Functions
  const handleSubmit = (e) => {
    e.preventDefault();
    if (highPrice < lowPrice) return console.log("mistake in pricing");

    let resultsArray = products;

    const priceRanged = products?.filter(
      (product) => product.spoma_chain.some((chain) => parseInt(chain.price) >= lowPrice && parseInt(chain.price) <= highPrice)
    );
    if (priceRanged) resultsArray = priceRanged;

    if (sizesChosen?.length)
      resultsArray = resultsArray.filter((product) =>
        product.spoma_chain.some((chain) => sizesChosen.includes(chain.size))
      );
      console.log(charsChosen);
    if (charsChosen?.length)
      resultsArray = resultsArray.filter((product) =>
       {
        var fromProduct = getChars(product.description);
        var result = charsChosen.some((charInProductd) => fromProduct?.includes(charInProductd));
        return result;
       }
      );

    console.log(resultsArray);
    setSearchResults(resultsArray);
  };

  const handleChangeLowPrice = (e) => {
    var price = parseInt(e.target.value)
    if (price >= lowestPrice) setLowPrice(price)
  } 
  const handleChangeHighPrice = (e) => {
    var price = parseInt(e.target.value)
    if (price <= highestPrice) setHighPrice(price)
  } 


  return (
    <div
      className="collapse text-center "
      id="filters"
    >
      <nav className="navbar navbar-expand-sm text-white ">
        <div className="container-fluid d-flex ">
          <button
            data-bs-toggle="collapse"
            data-bs-target="#filters"
            className="bg-transparent"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
            {" Закрыть"}
          </button>
          <button
          className="btn btn-danger my-2 mx-2 "
          data-bs-toggle="collapse"
          data-bs-target="#filters"
          onClick={clearFilter}
        >
          
          <FontAwesomeIcon icon={faTrash} />
          {" Сбросить Фильтры"}
        </button>
        </div>
      </nav>
      <form onSubmit={handleSubmit}>
        <div
          className="accordion accordion-flush mb-1"
          id="accordionFlushExample"
        >
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="true"
                aria-controls="flush-collapseOne"
              >
                Цена (тг)
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <div className="priceFilter d-flex justify-content-between align-items-center">
                  от{" "}
                  <input
                    type="number"
                    className="form-control rounded-pill ms-1"
                    id="lowPrice"
                    value={lowPrice}
                    onChange={handleChangeLowPrice}
                  />
                  <svg height={2} width={100} className="mx-1">
                    <line
                      x1={0}
                      y1={0}
                      x2={100}
                      y2={0}
                      style={{ stroke: "rgb(0,0,0)", strokeWidth: 2 }}
                    />
                  </svg>
                  до{" "}
                  <input
                    type="number"
                    className="form-control rounded-pill ms-1"
                    id="highPrice"
                    value={highPrice}
                    onChange={handleChangeHighPrice}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo"
                aria-expanded="false"
                aria-controls="flush-collapseTwo"
              >
                Размеры
              </button>
            </h2>
            <div
              id="flush-collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingTwo"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <div className="sizeFilter d-flex flex-wrap row-cols-1 row-cols-sm-3 ">
                  {/* Sizes show */}
                  {sizes?.map((size, i) => (
                    <div
                      className="size me-3 d-flex align-items-center"
                      key={i}
                    >
                      <Checkbox value={size} id={i} chosen={sizesChosen} />
                      <label className="form-check-label" htmlFor="size1">
                        {size} см
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <br />
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseThree"
                aria-expanded="false"
                aria-controls="flush-collapseTwo"
              >
                Характеристика
              </button>
            </h2>
            <div
              id="flush-collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingTwo"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <div className="sizeFilter d-flex flex-column">
                  {/* Sizes show */}
                  {chars?.map((char, i) => (
                    <div className="char d-flex align-items-center" key={i}>
                      <Checkbox value={char} id={i} chosen={charsChosen} />
                      <label className="form-check-label" htmlFor={i}>
                        {char}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <br />
          </div>
        </div>

        

        <input
          type="submit"
          value="Применить"
          data-bs-toggle="collapse"
          data-bs-target="#filters"
          className="btn btn-primary rounded-0"
        />
      </form>
    </div>
  );
};

export default Filters;
