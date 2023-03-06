import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "./main.css";

const ProductDoubleRowList = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div>
      <p style={{ paddingLeft: "1.5rem", paddingTop: "2rem"}}>Примерить в 3Д</p>
      <div>
        <div style={{ paddingLeft: "1.5rem", paddingTop: "2rem" }}>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Фильтр
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Сначала дороже</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Сначала дешевле</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div style={{ paddingLeft: "1.5rem", paddingTop: "2rem" }}>
          <input
            type="text"
            placeholder="Поиск"
            value={searchTerm}
            onChange={handleSearch}
            style={{
              paddingLeft: "1rem",
              border: "none",
              borderBottom: "1px solid gray",
              outline: "none",
              fontSize: "18px",
            }}
          />
        </div>
      </div>
      <div style={{ paddingTop: "2rem", paddingLeft: "1.5rem" }}>
        <div class="product-row" style={{ paddingTop: "2rem"}}>
          <div class="product-doubleRow-card">
            <div className="header-1">
              <div>
                <p className="text-1">Classic Table</p>
                <p className="text-2" style={{ color: "red" }}>
                  25% off
                </p>
              </div>
            </div>
            <div className="card---image">
              <img src={require("./pics/table-1.png")} />
            </div>
          </div>
          <div class="product-doubleRow-card">
            <div className="header-1">
              <div>
                <p className="text-1">Classic Table</p>
                <p className="text-2" style={{ color: "red" }}>
                  25% off
                </p>
              </div>
            </div>
            <div className="card---image">
              <img src={require("./pics/table-1.png")} />
            </div>
          </div>
        </div>
        <div class="product-row" style={{ paddingTop: "2rem"}}>
          <div class="product-doubleRow-card">
            <div className="header-1">
              <div>
                <p className="text-1">Classic Table</p>
                <p className="text-2" style={{ color: "red" }}>
                  25% off
                </p>
              </div>
            </div>
            <div className="card---image">
              <img src={require("./pics/table-1.png")} />
            </div>
          </div>
          <div class="product-doubleRow-card">
            <div className="header-1">
              <div>
                <p className="text-1">Classic Table</p>
                <p className="text-2" style={{ color: "red" }}>
                  25% off
                </p>
              </div>
            </div>
            <div className="card---image">
              <img src={require("./pics/table-1.png")} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDoubleRowList;
