import React, { useEffect, useRef, useState } from 'react'
import {
    useParams,
    useNavigate,
  } from "react-router-dom";
// Design
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import axios from "../../api/axios";
import { faXmark, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import "./productcard.css";
import { API_URL } from "../../config";

const DetailsThumb = ({ images, setSelectedImage }) => {
    if (!Array.isArray(images)) {
      // If images is not an array, you can return null or handle it in a different way
      return null;
    }
  
    const handleImageClick = (image) => {
      setSelectedImage(image);
    };
  
    return (
      <div className="images">
        {images.map((img, index) => (
          <img
            crossOrigin="anonymous"
            src={API_URL + img}
            alt=""
            key={index}
            height="100"
            onClick={() => handleImageClick(img)}
          />
        ))}
      </div>
    );
  };
  

const fetchModelInfo = (product_id) => {
    return axios.get(`/mv/exactproduct/${product_id}`);
  };

const ProductCard = () => {
    const navigate = useNavigate();
    // URL data
    const { product_id } = useParams();
    const [selectedImage, setSelectedImage] = useState(product?.thumb_path);

    const {isLoading,
        isSuccess,
        data: result,
      } = useQuery(["product", product_id], () => fetchModelInfo(product_id));
    const product= result?.data;
    if(isLoading) return <p>Loading...</p>
    if(isSuccess && product) return (
        <div className="align-items-baseline details vh-100" key={product?._id}>
            <FontAwesomeIcon icon={faAngleLeft}  onClick={() => navigate(-1)}/>
            <h2 className='w-75'>{product?.name}</h2>
            <FontAwesomeIcon icon={faXmark}  onClick={() => navigate(-1)}/>
            
            <div className="big-img">
                <img crossOrigin="anonymous" src={API_URL + selectedImage} alt="" />
            </div>
            
            <div className="mx-4">
                <DetailsThumb images={product?.image_paths? product.image_paths: ''} setSelectedImage={setSelectedImage}/>
        
            
                <div className="row">
                </div>

                {/* <p>{product?.description}</p> */}
                <div className="sticky-bottom px-3 pb-4">
                    <button className="btn btn-danger rounded-pill w-100 mb-2" onClick={()=>navigate('ar')}>Открыть в 3D</button>
                    <a className="btn btn-primary w-100" href={`${product?.link}`}>Открыть на сайте</a>
                </div>
            </div>
        </div>
      
    )
    // Add a default return statement
    return null;
}

export default ProductCard;