import axios from "../../api/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams, Link, useNavigate  } from "react-router-dom";
import "@google/model-viewer/dist/model-viewer";
import "../../mv.css";
import { useState} from "react";
import { RWebShare } from 'react-web-share';
import { API_URL } from "../../config";
import { BrowserView, MobileView} from 'react-device-detect';
import QRCode from "../qrcodes/QRCode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import CatalogSwiper from "./CatalogSwiper";


const fetchModelInfo = ( product_id ) => {
  return axios.get(`/modelview/${product_id}`);
};

const fetchBrandProducts = ( client_id ) => {
  return axios.get(`/modelview/products/${client_id}`);
}

const ModelView = () => {
  const navigate = useNavigate();
  // URL data
  const { client_id, product_id } = useParams();
  const [searchParams] = useSearchParams();
  const colorQuery = searchParams.get("color");
  const sizeQuery = searchParams.get("size");

  // Settings
  const [color, setColor] = useState();
  const [size, setSize] = useState();       

  // Model Info
  const [found, setFound] = useState();

  // Get all Products with models
  const { data:products } = useQuery(
    ["products-by-client", client_id], 
    () => fetchBrandProducts(client_id),
    {
      select: (data) => {
        const withModels = data.data.filter((prod) => !!prod.models.length);
        return withModels;
      }
    }
  );

  const chooseModel = (data) => {
    if (!colorQuery || !sizeQuery) {
      setColor(data.data[0].color);
      setSize(data.data[0].size);
      setFound(data.data[0]);
    }
    else {
      const model = data.data.find((md) => (md.color === colorQuery && md.size === sizeQuery));
      if (model) {
        setFound(model);
        setColor(colorQuery);
        setSize(sizeQuery);
      }
      else {
        return( <p>Модель не найдена, ваш URL был изменен</p>); 
      }
    }
  }

  // Fetching all models for product
  const { isLoading, isError, isSuccess, data:variations, error } = useQuery(
    ["variations", product_id], 
    () => fetchModelInfo(product_id),
    {
      onSuccess: chooseModel,
    }
  );

  if (isLoading) return(
    <span className='spinner-border'/>
  )
  if (isError) return(
    <p>Что-то пошло не так... {error}</p>
  )

  // Functions
  const onColorChange = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    const base = variations.data.find((model) => model.color === newColor);
    setSize(base.size);
  };

  const handleSubmit = () => {
    searchParams.set("color", color);
    searchParams.set("size", size);
  };

  if(isSuccess) {
    const uniqueColors = [...new Set(variations?.data?.map((model) => model.color))];
    return ( 
      <>
        <MobileView className="h-100">
          <model-viewer
            src={API_URL+found?.link}
            alt="Couch"
            ar
            ar-modes="scene-viewer quick-look"
            environment-image="neutral"
            auto-rotate
            camera-controls
            camera-orbit="90deg 50deg 2m"
          >
            <nav className="navbar">
              <div className="container-fluid d-flex justify-content-between">
                <RWebShare
                  data = {{
                    title: 'BritishAsia Home',
                    text: '[BritishAsia Home] Примерьте ковер не выходя из дома!',
                    url: window.location.href
                  }}
                  onClick={() => console.log("onShare successfully!")}
                >
                <svg
                  className="share"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                >
                  <path d="M503.7 226.2l-176 151.1c-15.38 13.3-39.69 2.545-39.69-18.16V272.1C132.9 274.3 66.06 312.8 111.4 457.8c5.031 16.09-14.41 28.56-28.06 18.62C39.59 444.6 0 383.8 0 322.3c0-152.2 127.4-184.4 288-186.3V56.02c0-20.67 24.28-31.46 39.69-18.16l176 151.1C514.8 199.4 514.8 216.6 503.7 226.2z" />
                </svg>
                </RWebShare>
                <button className="btn rounded-pill btn-outline-secondary w-75" 
                  onClick={() => navigate(`/modelview/${client_id}`)}>Каталог</button>
                <svg
                  className="back"
                  onClick={() => navigate(`/modelview/${client_id}`)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 320 512"
                >
                  <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
                </svg>
              </div>
            </nav>
            <button slot="ar-button" id="ar-button">
              Посмотреть у себя
            </button>
            <div className="container-fluid fixed-bottom pt-2 px-0 d-flex justify-content-center align-items-center flex-column">
              <button
                data-bs-toggle="collapse"
                data-bs-target="#settings"
                className="btn btn-primary rounded-0 rounded-top"
              >
                ПОМЕНЯТЬ
              </button>
              <div className="collapse p-2 container-fluid text-center bg-cp-clouds" id="settings">
                <h3>Настройки:</h3>
                {variations?.data?.length ? (
                  <form onSubmit={() => handleSubmit()}>
                    <div className="d-flex align-items-center justify-content-between text-nowrap mb-1">
                      <label htmlFor="color" className="me-2">Выберите цвет:</label>
                      <select
                        name="color"
                        id="color"
                        value={color}
                        onChange={(e) => onColorChange(e)}
                        className="form-select w-50 px-2 py-1"
                        required
                      >
                        {uniqueColors.map((color, i) => (
                          <option key={i} value={color}>
                            {color}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="d-flex align-items-center justify-content-between text-nowrap">
                      <label htmlFor="size" className="me-2">Выберите размер:</label>
                      <select
                        name="size"
                        id="size"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        className="form-select w-50 px-2 py-1"
                        required
                      >
                        {variations?.data?.map(
                          (model, i) =>
                            model.color === color && (
                              <option key={i} value={model.size}>
                                {model.size}
                              </option>
                            )
                        )}
                      </select>
                    </div>
                    
                    <br />
                    <button className="btn btn-success rounded-pill">Применить настройки</button>
                  </form>
                ) : (
                  <p>Нет вариаций</p>
                )}
                <button 
                className="btn btn-primary w-100" 
                data-bs-toggle="collapse"
                data-bs-target="#catalog,#settings"
                >
                  Другая модель
                </button>
                
                               
              </div>
              <div className="collapse p-2 container-fluid text-center bg-cp-clouds fixed-bottom" id="catalog">
                  <nav className="navbar mb-2">
                    <div className="container-fluid d-flex ">
                      <h3>Каталог</h3>
                      <svg
                        className="back justify-self-end"
                        data-bs-toggle="collapse"
                        data-bs-target="#catalog,#settings"
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
                      </svg>
                    </div>
                  </nav>

                  {/* Catalog */}
                  {products?.length 
                  ? (
                    <CatalogSwiper data={products} client_id={client_id}/>
                  )
                  : (
                    <p>Товаров у этого бренда больше нет</p>
                  )
                  }
                </div>
            </div>
          </model-viewer>
        </MobileView>
        <BrowserView className="text-center">
          <h1>Пожалуйста, используйте QR код</h1>
          <p>Наведите камеру на QR код, чтобы открыть примерочную.</p>
          <QRCode url={window.location.href} isImage={true} isButton={false}/>
          <p>Создано INROOM.TECH&copy;</p>
        </BrowserView>
      </>
    
    );  
  }
};

export default ModelView;
