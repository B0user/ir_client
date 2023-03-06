import React from "react";
import "./main.css";
import OnSaleSection from "./OnSaleSection";
import SearchBar from "./SearchBar";
import BottomNavBar from "./BottomNavbar";
import Salesview3D from "./Salesview3D";

function WelcomeCatalog() {
  return (
    <div>
      <p style={{ paddingTop: "2rem", paddingLeft: "3rem", fontSize: "20px" }}>
        Каталог
      </p>
      <SearchBar />
      <OnSaleSection />
      <p style={{ paddingTop: "2rem", paddingLeft: "3rem", fontSize: "20px" }}>
        Посмотреть в 3Д
      </p>
      <BottomNavBar />
      <Salesview3D />
    </div>
  );
}

export default WelcomeCatalog;
