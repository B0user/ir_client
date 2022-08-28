import axios from "../../api/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams, useNavigate  } from "react-router-dom";
import "@google/model-viewer/dist/model-viewer";
import "../../mv.css";
import { useState} from "react";
import { RWebShare } from 'react-web-share';
import { API_URL } from "../../config";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import QRCode from "../qrcodes/QRCode";

const ModelView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const colorQuery = searchParams.get("color");
  const sizeQuery = searchParams.get("size");

  const [color, setColor] = useState();
  const [size, setSize] = useState();
  
  const [model, setModel] = useState();

  const { isLoading, isError, isSuccess, data, error } = useQuery(["variations", id], () => axios.get(`/modelview/${id}`).then((res) => {
    const result = res.data;
    const first = result[0];
    if( !colorQuery || !sizeQuery) {
      setColor(first.color);
      setSize(first.size);
    }
    else {
      setColor(colorQuery);
      setSize(sizeQuery);
    }
    return result;
  }));

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
    const base = data.find((model) => model.color === newColor);
    setSize(base.size);
  };

  const handleSubmit = () => {
    searchParams.set("color", color);
    searchParams.set("size", size);
  };

  if(isSuccess) {
    const uniqueColors = [...new Set(data.map((model) => model.color))];
    const found = data.find((model) => { return model.color === color && model.size === size; });
    if (!found) return( <p>Модель не найдена, ваш URL был изменен</p>);  
    return ( 
      <>
        <MobileView>
          <model-viewer
            src={API_URL+found.model}
            alt="Couch"
            ar
            ar-modes="webxr scene-viewer quick-look"
            environment-image="neutral"
            auto-rotate
            camera-controls
            camera-orbit="90deg 50deg 2m"
          >
            <nav className="navbar">
              <div className="container-fluid d-flex justify-content-between">
                <svg
                  className="back"
                  onClick={() => navigate(-1)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 320 512"
                >
                  <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
                </svg>
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
              </div>
            </nav>
            <button slot="ar-button" id="ar-button">
              Посмотреть у себя
            </button>
            <div className="container-fluid fixed-bottom py-2 px-0 d-flex justify-content-center align-items-center flex-column bg-light">
              <button
                data-bs-toggle="collapse"
                data-bs-target="#info"
                className="btn btn-primary"
              >
                ВВЕРХ
              </button>
              <div className="collapse" id="info">
                {data?.length ? (
                  <form onSubmit={() => handleSubmit()}>
                    <label htmlFor="color">Выберите цвет:</label>
                    <select
                      name="color"
                      id="color"
                      value={color}
                      onChange={(e) => onColorChange(e)}
                      required
                    >
                      {uniqueColors.map((color, i) => (
                        <option key={i} value={color}>
                          {color}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="size">Выберите размер:</label>
                    <select
                      name="size"
                      id="size"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      required
                    >
                      {data.map(
                        (model, i) =>
                          model.color === color && (
                            <option key={i} value={model.size}>
                              {model.size}
                            </option>
                          )
                      )}
                    </select>
                    <br />
                    <button className="btn btn-success">Применить настройки</button>
                  </form>
                ) : (
                  <p>Нет вариаций</p>
                )}
              </div>
            </div>
          </model-viewer>
        </MobileView>
        <BrowserView>
          <QRCode url={window.location.href} isImage={true} isButton={false}/>
        </BrowserView>
      </>
    
    );  
  }
};

export default ModelView;
