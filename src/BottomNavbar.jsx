import React from "react";

import "./main.css";

function BottomNavBar() {
  return (
    <div className="bottom-nav">
      <ul>
        <li>
          <a href="/">
            <img
              src={require("./pics/homenavbar.png")}
              width="20px"
              height="20px"
            />
          </a>
        </li>
        <li>
          <a href="/">
            <img
              src={require("./pics/cartnavbar.png")}
              width="20px"
              height="20px"
            />
          </a>
        </li>
        <li>
          <a href="/">
            <img
              src={require("./pics/3dnavbar.png")}
              width="20px"
              height="20px"
            />
          </a>
        </li>
        <li>
          <a href="/">
            <img
              src={require("./pics/showlocationnavbar.png")}
              width="20px"
              height="20px"
            />
          </a>
        </li>
        <li>
          <a href="/">
            <img
              src={require("./pics/showinfonavbar.png")}
              width="20px"
              height="20px"
            />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default BottomNavBar;

// <div>
// <img className = "column" src = {require("./pics/HomeButton")} />
// <img className = "column" src = {require("./pics/HomeButton")} />
// <img className = "column" src = {require("./pics/HomeButton")} />
// <img className = "column" src = {require("./pics/HomeButton")} />
// <img className = "column" src = {require("./pics/HomeButton")} />
// </div>
