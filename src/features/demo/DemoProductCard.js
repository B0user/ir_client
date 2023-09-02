import React, { useEffect, useRef, useState } from 'react'
import {
    useParams,
    useNavigate,
  } from "react-router-dom";
import "@google/model-viewer/dist/model-viewer";
// Design
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faXmark, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const MobileProductCard = ({ thumbnail, images, name, description }) => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <button className="btn btn-primary mb-3">Back</button>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <img src={thumbnail} className="card-img-top" alt="Product Thumbnail" />
              {images && images.length > 0 && (
                <div className="row mt-3">
                    <div className="col-12">
                    <h6>Images</h6>
                    <div className="d-flex flex-wrap">
                        {images.map((image, index) => (
                        <img key={index} src={image} alt={`Product Image ${index + 1}`} className="img-thumbnail me-2 mb-2" />
                        ))}
                    </div>
                    </div>
                </div>
                )}
              <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{description}</p>
                <button className="btn btn-primary me-2">AR</button>
                <button className="btn btn-primary">Cart</button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    );
  };

const DetailsThumb = ({ images, setBigImg }) => {
return (
    <div className="images">
    {images.isArray && images.map((img, index) => (
        <img src={img} alt="" key={index} width="100" onClick={()=>setBigImg(img)}/>
    ))}
    </div>
);
};
  

const DemoProductCard = () => {
    const navigate = useNavigate();
    // URL data
    const { product_id } = useParams();
    const products = [
        {
          "id":1,
          "name":"Шкаф 01",
          "img_src":"/demo/img/1.webp",
          "model_src":"/demo/models/1.8x.4x1 shkaf.glb",
          "image_paths": [
          ],
          "description": "Some text about the product no.1"
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
    const [bigImg, setBigImg] = useState();
    const product = products.find(el => el.id == product_id);
    useEffect(() => {
      document.title = product?.name; 
    }, []); 

    if (!product) console.log("wrong URL");
    else return (
      <div className="details vh-100" key={product.id}>
          <FontAwesomeIcon icon={faAngleLeft}  onClick={() => navigate(-1)}/>
          <h2 className="w-75">{product.name}</h2>
          <FontAwesomeIcon icon={faXmark}  onClick={() => navigate(-1)}/>
          
          <div className="big-img">
              <img src={bigImg? bigImg : product?.img_src} alt="" />
          </div>
          
          <div className="mx-4">
              <DetailsThumb images={product.image_paths? product.image_paths: ''} setBigImg={setBigImg}/>
      
          
              <div className="row">
              </div>

              <p>{product.description? product.description : ''}</p>
              <div className="sticky-bottom px-3 pb-4">
                  <button className="btn btn-danger rounded-pill w-100 mb-2" onClick={()=>navigate('ar')}>Открыть в 3D</button>
                  <button className="btn btn-primary w-100" onClick={()=>navigate('/show')}>Открыть на сайте</button>
              </div>
          </div>
      </div>
      
    )
    
    
}

export default DemoProductCard;