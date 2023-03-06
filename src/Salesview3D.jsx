import React from "react";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./main.css";

function Salesview3D() {
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        slidesPerView={2}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        style={{
          paddingTop: "2rem",
          paddingBottom: "2.5rem",
          paddingLeft: "1rem"
        }}
      >
        <SwiperSlide>
          <div className="card-1" style={{ border: "none" }}>
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
        </SwiperSlide>
        <SwiperSlide>
          <div className="card-1" style={{ border: "none" }}>
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
        </SwiperSlide>
        <SwiperSlide>
          <div className="card-1" style={{ border: "none" }}>
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
        </SwiperSlide>
        <SwiperSlide>
          <div className="card-1" style={{ border: "none" }}>
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
        </SwiperSlide>
        <SwiperSlide>
          <div className="card-1" style={{ border: "none" }}>
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
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Salesview3D;
