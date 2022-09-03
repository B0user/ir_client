import React from 'react'
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../../config";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const CatalogSwiper = ({data = {}, client_id = ''}) => {
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
                <SwiperSlide key={i} onClick={(e) => navigate(`/modelview/${client_id}/${prod._id}`)}>
                    <div key={i} className="view">
                        <img src={API_URL+prod.thumb_link} crossorigin="anonymous" className="img-fluid rounded catalog-item-img" alt={prod.name}/>
                        <div className="img-size-info">
                            <p>Размеры:</p>
                            {prod.sizes?.map((size, j) => (
                                <p key={j} >{size}</p>
                            ))}
                        </div>
                    </div>
                </SwiperSlide>
                )
            )
        )
        : (
            <p>Нет слайдов</p>
        )    
        }   
    </Swiper>
  )
}

export default CatalogSwiper