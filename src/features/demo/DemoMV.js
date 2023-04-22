import React, { useEffect, useState } from 'react'
import {
    useParams,
    useNavigate,
    Link,
  } from "react-router-dom";
import "@google/model-viewer/dist/model-viewer";
import { RWebShare } from "react-web-share";
import { BrowserView, MobileView } from "react-device-detect";
import QRCode from "../qrcodes/QRCode";
import Popup from "../popup/Popup";
// Design
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faXmark, faAngleLeft} from "@fortawesome/free-solid-svg-icons";




const DemoMV = () => {
    const navigate = useNavigate();
    // URL data
    const { product_id } = useParams();
    const products = [
        {
          "id":1,
          "name":"Шкаф 01",
          "img_src":"/demo/img/1.webp",
          "model_src":"/demo/models/1.8x.4x1 shkaf.glb"
        },
        {
          "id":2,
          "name":"Полка 01",
          "img_src":"/demo/img/2.webp",
          "model_src":"/demo/models/1.8x.5x.4 polka.glb"
          
        },
        {
          "id":3,
          "name":"Полка 02",
          "img_src":"/demo/img/3.webp",
          "model_src":"/demo/models/1.65x.1x.2 polka.glb"
          
        },
        {
          "id":4,
          "name":"Бита",
          "img_src":"/demo/img/4.webp",
          "model_src":"/demo/models/1x.1x.1 bita.glb"
    
        },
        {
          "id":5,
          "name":"Стул 01",
          "img_src":"/demo/img/5.webp",
          "model_src":"/demo/models/1x.3x1 chair.glb"
          
        },
        {
          "id":6,
          "name":"Стол 01",
          "img_src":"/demo/img/6.webp",
          "model_src":"/demo/models/1x.4x.6 table.glb"
          
        },
        {
          "id":7,
          "name":"Ковер 01",
          "img_src":"/demo/img/7.webp",
          "model_src":"/demo/models/2.3x1.6 carpet.glb"
    
        },
        {
          "id":8,
          "name":"Кровать 01",
          "img_src":"/demo/img/8.webp",
          "model_src":"/demo/models/2.3x1.8x.7 bedwithlamp.glb"
          
        },
        {
          "id":9,
          "name":"Стул 02",
          "img_src":"/demo/img/9.webp",
          "model_src":"/demo/models/chair.glb"
          
        },
        {
          "id":10,
          "name":"Диван с креслом",
          "img_src":"/demo/img/10.webp",
          "model_src":"/demo/models/divan i kreslo.glb"
    
        },
        {
          "id":11,
          "name":"Диван 01",
          "img_src":"/demo/img/11.webp",
          "model_src":"/demo/models/divan.glb"
          
        },
        {
          "id":12,
          "name":"Диван 02",
          "img_src":"/demo/img/12.webp",
          "model_src":"/demo/models/divan2.glb"
          
        },
        {
          "id":13,
          "name":"Офисный стeл 01",
          "img_src":"/demo/img/13.webp",
          "model_src":"/demo/models/kompstul.glb"
    
        },
        {
          "id":14,
          "name":"Офисный стул 02",
          "img_src":"/demo/img/14.webp",
          "model_src":"/demo/models/kompstul2.glb"
          
        },
        {
          "id":15,
          "name":"Ковер 02",
          "img_src":"/demo/img/15.webp",
          "model_src":"/demo/models/kover.glb"
          
        },
        {
          "id":16,
          "name":"Кресло 01",
          "img_src":"/demo/img/16.webp",
          "model_src":"/demo/models/kreslo.glb"
    
        },
        {
          "id":17,
          "name":"Кресло 02",
          "img_src":"/demo/img/17.webp",
          "model_src":"/demo/models/kreslo3.glb"
          
        },
        {
          "id":18,
          "name":"Кресло 03",
          "img_src":"/demo/img/18.webp",
          "model_src":"/demo/models/kreslo4.glb"
          
        },
        {
          "id":19,
          "name":"Кровать 02",
          "img_src":"/demo/img/19.webp",
          "model_src":"/demo/models/krovat`.glb"
    
        },
        {
          "id":20,
          "name":"Кровать 03",
          "img_src":"/demo/img/20.webp",
          "model_src":"/demo/models/krovat`2.glb"
          
        },
        {
          "id":21,
          "name":"Матрас",
          "img_src":"/demo/img/21.webp",
          "model_src":"/demo/models/matrac.glb"
          
        },
        {
          "id":22,
          "name":"Полка 03",
          "img_src":"/demo/img/22.webp",
          "model_src":"/demo/models/polka.glb"
    
        },
        {
          "id":23,
          "name":"Полка 04",
          "img_src":"/demo/img/23.webp",
          "model_src":"/demo/models/polka5.glb"
          
        },
        {
          "id":24,
          "name":"Стол 02",
          "img_src":"/demo/img/24.webp",
          "model_src":"/demo/models/stol2.glb"
          
        },
        {
          "id":25,
          "name":"Стол 03",
          "img_src":"/demo/img/25.webp",
          "model_src":"/demo/models/stolik.glb"
    
        },
        {
          "id":26,
          "name":"Стол 04",
          "img_src":"/demo/img/26.webp",
          "model_src":"/demo/models/stolik2.glb"
    
        },
        {
          "id":27,
          "name":"Тумбочка 01",
          "img_src":"/demo/img/27.webp",
          "model_src":"/demo/models/stolik3.glb"
      
        },
        {
          "id":28,
          "name":"Тумбочка 02",
          "img_src":"/demo/img/28.webp",
          "model_src":"/demo/models/table.glb"
          
        },
        {
          "id":29,
          "name":"Тумбочка 03",
          "img_src":"/demo/img/28.webp",
          "model_src":"/demo/models/tumbo4ka.glb"
          
        },
        {
          "id":30,
          "name":"Шкаф 02",
          "img_src":"/demo/img/30.webp",
          "model_src":"/demo/models/wkaf.glb"
    
        },
        {
          "id":31,
          "name":"Шкаф 03",
          "img_src":"/demo/img/31.webp",
          "model_src":"/demo/models/wkaf2.glb"
          
        },
        {
          "id":32,
          "name":"Пуфик Мышка",
          "img_src":"/demo/img/32.webp",
          "model_src":"/demo/models/xz.glb"
        }
      ];
    const [isIG, setIsIG] = useState(false);
    const [instagramChangePopupActive, setInstagramChangePopupActive] = useState(false);
    
    useEffect(() => {
      const isInstagramBrowser = () => {
        const userAgent = navigator.userAgent;
        const isIOS = !!userAgent.match(/iPad/i) || !!userAgent.match(/iPhone/i);
        const isInstagram = !!userAgent.match(/Instagram/i);
        const isWebView = !!(window.webkit && window.webkit.messageHandlers);

        return isIOS && isInstagram && isWebView;
      };
  
      if (isInstagramBrowser()) {
        setIsIG(true);
        setInstagramChangePopupActive(true);
      }
    }, [setInstagramChangePopupActive]);

    

    const product = products.find(el => el.id == product_id);
    if (!product) console.log("wrong URL");
    else return (
      <>
        <MobileView className="h-100">

        <model-viewer
        src={product.model_src}
        alt="Carpet model"
        ar-modes="scene-viewer webxr quick-look"
        ar 
        poster={product.img_src}
        environment-image="neutral"
        auto-rotate
        camera-controls
        camera-orbit="30deg"
        >
        <nav className="navbar">
            <div className="container-fluid d-flex justify-content-between px-4">
            <RWebShare
                data={{
                title: "INROOM",
                text: "Выбирайте мебель не выходя из дома",
                url: window.location.href,
                }}
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
            <a
                className="btn rounded-pill btn-primary w-75 text-white"
                // href={product?.link}
                rel="noreferrer"
                target="_blank"
                disabled
            >
                {product.name}
            </a>
            <FontAwesomeIcon icon={faXmark}  onClick={() => navigate(`/show/`)}/>
            </div>
        </nav>
        <button slot="ar-button" id="ar-button">
            Посмотреть у себя
        </button>
        <button className={isIG ? 'd-flex' : 'd-none'} id="ar-button" onClick={() => setInstagramChangePopupActive(true)}>
            Открыть в Браузере
        </button>
        <Popup active={instagramChangePopupActive} setActive={setInstagramChangePopupActive}>
          <div className="tutorial-popup mx-2 h-100">
            <FontAwesomeIcon className='float-end' icon={faXmark}  onClick={() => setInstagramChangePopupActive(false)}/>
            <div className="h5 mb-3 text-center">Чтобы примерить, следуйте инструкции:</div>
            <img src="/tutorial/browser/instagram-ios.jpg" alt="Change browser" className='w-100'/>
          </div>
        </Popup>
        </model-viewer>
        </MobileView>
        <BrowserView >
          <div class="sample">
            <div id="demo-container" class="demo">
              <model-viewer
                src={product.model_src}
                alt="Carpet model"
                ar-modes="scene-viewer webxr quick-look"
                ar 
                poster={product.img_src}
                environment-image="neutral"
                auto-rotate
                camera-controls
                camera-orbit="30deg"
                >
                </model-viewer>
            </div>
            <div class="content bg-light  text-center">
              <div className="back-btn" onClick={() => navigate('/show')}><FontAwesomeIcon icon={faAngleLeft} className='fa-2xl'/>Назад</div>
              
              <div class="wrapper-demo">
              
                <h1>Пожалуйста, используйте QR код</h1>
                <p className='mb-5'>Наведите камеру на QR код, чтобы открыть примерочную.</p>
                <QRCode
                  url={window.location.href}
                  isImage={true}
                  isButton={false}
                />
                <p>
                  Создано <Link to="/show">INROOM.TECH</Link>&copy;
                </p>
              </div>
            </div>
          </div>
        </BrowserView>
      </>
    )
}

export default DemoMV;