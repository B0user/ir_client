import React from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const CatalogSwiper = ({ data = {}, client_id = "" }) => {
  const navigate = useNavigate();
  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={15}
      slidesPerGroup={2}
      loop={true}
      loopFillGroupWithBlank={true}
      navigation={true}
      modules={[Navigation]}
      className="catalog"
    >
      {data?.length ? (
        data.map((prod, i) => (
          <SwiperSlide key={i}>
            <div key={i} className="view">
              <img
                src={API_URL + prod.thumb_path}
                crossOrigin="anonymous"
                className="img-fluid rounded catalog-item-img"
                alt={prod.name}
                height={250}
                onClick={(e) => navigate(`/modelview/${client_id}/${prod._id}`)}
              />
              <div className="img-size-info">
                <p>Размеры:</p>
                {prod.sizes?.map((size, j) => (
                  <button
                    onClick={(e) =>
                      navigate(
                        `/modelview/${client_id}/${prod._id}?size=${size}`
                      )
                    }
                    className="btn btn-sm btn-outline-dark rounded-pill mt-1"
                    key={j}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))
      ) : (
        <p>Нет Товаров</p>
      )}
    </Swiper>
  );
};

export default CatalogSwiper;
