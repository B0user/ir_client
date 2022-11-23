import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
// import required modules
import { Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// Tutorial CSS
import "./tutorial.css";

const TutorialSwiper = ({active, setActive}) => {
  const [swiper, setSwiper] = useState(null);
  const quitTutorial = () => {
    swiper.slideTo(0);
    setActive(false);
  }

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={1}
      slidesPerGroup={1}
      loop={false}
      navigation={true}
      modules={[Navigation]}
      className={active ? "tutorial active" : "tutorial"}
      onSwiper={setSwiper}
    >
      <div className="quit fixed-top d-flex justify-content-center align-items-center p-2"><button className="btn btn-outline-danger rounded-pill" onClick={quitTutorial}>Завершить обучение</button></div>
      <SwiperSlide className="tutorial-slide">
        <div className="tutorial-slide-content block-1" onClick={(e) => e.stopPropagation()}>
          <h2>Шаг 1:</h2>
          <p>Нажмите на кнопку "Примерить у себя"</p>
          <button id="ar-button" onClick={() => swiper.slideTo(1)}>Примерить у себя</button>
        </div>
      </SwiperSlide>
      <SwiperSlide className="tutorial-slide">
        <div className="tutorial-slide-content block-2"  onClick={(e) => e.stopPropagation()}>
          <h2>Шаг 2:</h2>
          <p>Наведите камеру на пустую поверхность и поводите вокруг</p>
          {/* GIF, animation or video */}
          <img src="/tutorial/gif1.gif" alt="" className="w-100"/>
        </div>
      </SwiperSlide>
      <SwiperSlide className="tutorial-slide">
        <div className="tutorial-slide-content block-3"  onClick={(e) => e.stopPropagation()}>
          <h2>Шаг 3:</h2>
          <p>Для перемещения модели водите пальцем</p>
          <img src="/tutorial/gif2.gif" alt="" className="w-100"/>
        </div>
      </SwiperSlide>
      <SwiperSlide className="tutorial-slide">
        <div className="tutorial-slide-content block-4"  onClick={(e) => e.stopPropagation()}>
          <h2>Шаг 4:</h2>
          <p>Поворачивайте модель двумя пальцами</p>
          <img src="/tutorial/gif3.gif" alt="" className="w-100"/>
        </div>
      </SwiperSlide>
      <SwiperSlide className="tutorial-slide">
        <div className="tutorial-slide-content block-5"  onClick={(e) => e.stopPropagation()}>
          <h2>Шаг 5:</h2>
          <p>Попробуйте на реальной модели</p>
          <button className="btn btn-outline-primary rounded-pill w-100" onClick={quitTutorial}>Попробовать</button>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default TutorialSwiper;