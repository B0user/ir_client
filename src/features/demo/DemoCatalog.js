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
      "name":"Пуфик Мышька",
      "img_src":"/demo/img/32.webp",
      "model_src":"/demo/models/xz.glb"
    }
  ];

  return (
    <div className="container-fluid px-4">
      <div className="bg-white header-demo sticky-top">
        <h1 className="text-center lspace-50 demo-header fw-bold">
          INROOM DEMO
        </h1>
        {/* <div className="setiings d-flex justify-content-between align-items-center pb-4">
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
        </div> */}
      </div>
      <Catalog products={products}/>
    </div>
  );
};

export default DemoCatalog;