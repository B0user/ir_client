import React from 'react'
import {
    useParams,
    useSearchParams,
    useNavigate,
    Link,
  } from "react-router-dom";
import "@google/model-viewer/dist/model-viewer";
import { RWebShare } from "react-web-share";
// Design
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBars } from "@fortawesome/free-solid-svg-icons";




const DemoMV = () => {
    const navigate = useNavigate();
    // URL data
    const { product_id } = useParams();
    const products = [
        {
          "id":1,
          "name":"Шкаф 01",
          "img_src":"/demo/thumbnails/2.PNG",
          "model_src":"/demo/models/1.8x.4x1 shkaf.glb"
        },
        {
          "id":2,
          "name":"Полка 01",
          "img_src":"/demo/thumbnails/3.PNG",
          "model_src":"/demo/models/1.8x.5x.4 polka.glb"
          
        },
        {
          "id":3,
          "name":"Полка 02",
          "img_src":"/demo/thumbnails/4.PNG",
          "model_src":"/demo/models/1.65x.1x.2 polka.glb"
          
        },
        {
          "id":4,
          "name":"Бита",
          "img_src":"/demo/thumbnails/5.PNG",
          "model_src":"/demo/models/1x.1x.1 bita.glb"
    
        },
        {
          "id":5,
          "name":"Стул 01",
          "img_src":"/demo/thumbnails/6.PNG",
          "model_src":"/demo/models/1x.3x1 chair.glb"
          
        },
        {
          "id":6,
          "name":"Стол 01",
          "img_src":"/demo/thumbnails/7.PNG",
          "model_src":"/demo/models/1x.4x.6 table.glb"
          
        },
        {
          "id":7,
          "name":"Ковер 01",
          "img_src":"/demo/thumbnails/8.PNG",
          "model_src":"/demo/models/2.3x1.6 carpet.glb"
    
        },
        {
          "id":8,
          "name":"Кровать 01",
          "img_src":"/demo/thumbnails/9.PNG",
          "model_src":"/demo/models/2.3x1.8x.7 bedwithlamp.glb"
          
        },
        {
          "id":9,
          "name":"Стул 02",
          "img_src":"/demo/thumbnails/10.PNG",
          "model_src":"/demo/models/chair.glb"
          
        },
        {
          "id":10,
          "name":"Диван с креслом",
          "img_src":"/demo/thumbnails/11.PNG",
          "model_src":"/demo/models/divan i kreslo.glb"
    
        },
        {
          "id":11,
          "name":"Диван 01",
          "img_src":"/demo/thumbnails/12.PNG",
          "model_src":"/demo/models/divan.glb"
          
        },
        {
          "id":12,
          "name":"Диван 02",
          "img_src":"/demo/thumbnails/13.PNG",
          "model_src":"/demo/models/divan2.glb"
          
        },
        {
          "id":13,
          "name":"Офисный стол 01",
          "img_src":"/demo/thumbnails/15.PNG",
          "model_src":"/demo/models/kompstul.glb"
    
        },
        {
          "id":14,
          "name":"Офисный стул 02",
          "img_src":"/demo/thumbnails/16.PNG",
          "model_src":"/demo/models/kompstul2.glb"
          
        },
        {
          "id":15,
          "name":"Ковер 02",
          "img_src":"/demo/thumbnails/17.PNG",
          "model_src":"/demo/models/kover.glb"
          
        },
        {
          "id":16,
          "name":"Кресло 01",
          "img_src":"/demo/thumbnails/18.PNG",
          "model_src":"/demo/models/kreslo.glb"
    
        },
        {
          "id":17,
          "name":"Кресло 02",
          "img_src":"/demo/thumbnails/19.PNG",
          "model_src":"/demo/models/kreslo3.glb"
          
        },
        {
          "id":18,
          "name":"Кресло 03",
          "img_src":"/demo/thumbnails/20.PNG",
          "model_src":"/demo/models/kreslo4.glb"
          
        },
        {
          "id":19,
          "name":"Кровать 02",
          "img_src":"/demo/thumbnails/21.PNG",
          "model_src":"/demo/models/krovat`.glb"
    
        },
        {
          "id":20,
          "name":"Кровать 03",
          "img_src":"/demo/thumbnails/22.PNG",
          "model_src":"/demo/models/krovat`2.glb"
          
        },
        {
          "id":21,
          "name":"Матрас",
          "img_src":"/demo/thumbnails/23.PNG",
          "model_src":"/demo/models/matrac.glb"
          
        },
        {
          "id":22,
          "name":"Полка 03",
          "img_src":"/demo/thumbnails/24.PNG",
          "model_src":"/demo/models/polka.glb"
    
        },
        {
          "id":23,
          "name":"Полка 04",
          "img_src":"/demo/thumbnails/25.PNG",
          "model_src":"/demo/models/polka5.glb"
          
        },
        {
          "id":24,
          "name":"Стол 02",
          "img_src":"/demo/thumbnails/26.PNG",
          "model_src":"/demo/models/stol2.glb"
          
        },
        {
          "id":25,
          "name":"Стол 03",
          "img_src":"/demo/thumbnails/28.PNG",
          "model_src":"/demo/models/stolik2.glb"
    
        },
        {
          "id":26,
          "name":"Стол 04",
          "img_src":"/demo/thumbnails/30.PNG",
          "model_src":"/demo/models/table.glb"
          
        },
        {
          "id":27,
          "name":"Тумбочка",
          "img_src":"/demo/thumbnails/31.PNG",
          "model_src":"/demo/models/tumbo4ka.glb"
          
        },
        {
          "id":28,
          "name":"Шкаф 02",
          "img_src":"/demo/thumbnails/32.PNG",
          "model_src":"/demo/models/wkaf.glb"
    
        },
        {
          "id":29,
          "name":"Шкаф 03",
          "img_src":"/demo/thumbnails/33.PNG",
          "model_src":"/demo/models/wkaf2.glb"
          
        },
        {
          "id":30,
          "name":"Пуфик Мышька",
          "img_src":"/demo/thumbnails/34.PNG",
          "model_src":"/demo/models/xz.glb"
        }
      ];
    
    const product = products.find(el => el.id == product_id);
    if (!product) console.log("wrong URL");
    else return (
        <model-viewer
        src={product.model_src}
        alt="Carpet model"
        ar-modes="webxr quick-look"
        ar 
        ar-scale="fixed"
        environment-image="neutral"
        auto-rotate
        camera-controls
        camera-orbit="90deg 50deg 2m"
        >
        <nav className="navbar">
            <div className="container-fluid d-flex justify-content-between">
            <FontAwesomeIcon icon={faBars} />
            <a
                className="btn rounded-pill btn-primary w-75 text-white"
                // href={product?.link}
                rel="noreferrer"
                target="_blank"
            >
                {product.name}
            </a>
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
            </div>
        </nav>
        <button slot="ar-button" id="ar-button">
            Посмотреть у себя
        </button>
        </model-viewer>
        )
}

export default DemoMV;