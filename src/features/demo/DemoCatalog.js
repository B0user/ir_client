import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import './demo.css';

const ProductCard = ({ img_src, alt, id}) => {  
  const navigate = useNavigate();
  return (
    <div key={id} className={`product-card col-6 mb-3 text-center ${id%2 ? 'pe-2' : 'ps-2'}`}>
      <img 
      crossOrigin="anonymous"
      src={img_src} 
      alt={alt} 
      className="w-100 rounded-1" 
      onClick={(e) => navigate(`${id}`)}/>

      <span className="text-center">{alt}</span>
    </div>
  )
}

const Catalog = ({ products }) => {
  return (
    <div className="catalog d-flex flex-wrap justify-content-between">
        {/* Catalog */}
      {products?.length ? (
        products.map((prod) => <ProductCard img_src={prod.img_src} alt={prod.name} id={prod.id}/>)
      ) : (
        <p>Демо Каталог пуст или в процессе разработки</p>
      )}
    </div>
  );
};

const DemoCatalog = () => {
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

  return (
    <div className="container-fluid px-4">
      <div className="bg-white header-demo sticky-top">
        <h1 className="text-center lspace-50 demo-header fw-bold">
          INROOM DEMO
        </h1>
        <div className="setiings d-flex justify-content-between align-items-center pb-4">
          <div className="show3d form-check form-switch ms-1">
            <input className="form-check-input" type="checkbox" id="3dswitch" />
            <label
              className="form-check-label fw-bold text-settings"
              htmlFor="3dswitch"
            >
              3D
            </label>
          </div>
          <div className="filters">
            <button className="border-0 fw-bold py-1 rounded-pill text-settings filter-btn">
              ФИЛЬТРЫ
            </button>
          </div>
        </div>
      </div>
      <Catalog products={products}/>
    </div>
  );
};

export default DemoCatalog;