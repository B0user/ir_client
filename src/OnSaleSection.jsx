import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./main.css";

function OnSaleSection() {
  return (
    //room sets section
    <div>
      <div>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={2}
          // navigation
          // pagination={{ clickable: true }}
          // scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          style={{ paddingTop: "4rem", paddingLeft: "1rem", paddingRight: "1.5rem"}}
        >
          <SwiperSlide>
            <div className="card-1">
              <div className="header-1">
                <div className="content---area">
                  <p className="text-1">Gray Living Room Set</p>
                  <p className="text-2">25% off</p>
                </div>
              </div>
              <div className="card---image">
                <img
                  src={require("./pics/istockphoto-1271897890-170667a.jpg")}
                />
              </div>
              <div className="action---bar">
                <div className="action">
                  <p className="text-4">View</p>
                </div>
                <div className="action">
                  <p className="text-5">Add</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card-1">
              <div className="header-1">
                <div className="content---area">
                  <p className="text-1">Gray Living Room Set</p>
                  <p className="text-2">25% off</p>
                </div>
              </div>
              <div className="card---image">
                <img
                  src={require("./pics/istockphoto-1271897890-170667a.jpg")}
                />
              </div>
              <div className="action---bar">
                <div className="action">
                  <p className="text-4">View</p>
                </div>
                <div className="action">
                  <p className="text-5">Add</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card-1">
              <div className="header-1">
                <div className="content---area">
                  <p className="text-1">Gray Living Room Set</p>
                  <p className="text-2">25% off</p>
                </div>
              </div>
              <div className="card---image">
                <img
                  src={require("./pics/istockphoto-1271897890-170667a.jpg")}
                />
              </div>
              <div className="action---bar">
                <div className="action">
                  <p className="text-4">View</p>
                </div>
                <div className="action">
                  <p className="text-5">Add</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card-1">
              <div className="header-1">
                <div className="content---area">
                  <p className="text-1">Gray Living Room Set</p>
                  <p className="text-2">25% off</p>
                </div>
              </div>
              <div className="card---image">
                <img
                  src={require("./pics/istockphoto-1271897890-170667a.jpg")}
                />
              </div>
              <div className="action---bar">
                <div className="action">
                  <p className="text-4">View</p>
                </div>
                <div className="action">
                  <p className="text-5">Add</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default OnSaleSection;
