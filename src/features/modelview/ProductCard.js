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

const DetailsThumb = ({ images, thumb, setBigImg }) => {
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    return () => {
      // Cleanup function: This will be executed when the component is unmounted.
      // Set the isMounted state to false to indicate that the component is unmounted.
      setIsMounted(false);
    };
  }, []);

  if (!Array.isArray(images)) {
    // If images is not an array, you can return null or handle it in a different way
    return null;
  }

  if (images.length === 0) {
    // If images array is empty, you can return null or handle it in a different way
    return null;
  }

  if (!isMounted) {
    // If the component is unmounted, return null
    return null;
  }

  return (
    <div className="images col-auto mb-3">
      <img
        crossOrigin="anonymous"
        src={API_URL + thumb}
        alt=""
        height="100"
        width="100"
        objectFit=""
        className="px-1"
        onClick={() => setBigImg(thumb)}
      />
      {images.map((img, index) => (
        <img
          crossOrigin="anonymous"
          src={API_URL + img}
          alt=""
          key={index}
          height="100"
          width="100"
          objectFit="crop"
          className="px-1"
          onClick={() => setBigImg(img)}
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
    const [bigImg, setBigImg] = useState();
    const {isLoading,
        isSuccess,
        data: result,
      } = useQuery(["product", product_id], () => fetchModelInfo(product_id));
    const product= result?.data;



    if(isLoading) return <p>Loading...</p>
    if(isSuccess && product) 
    return (
        <div className="" key={product?._id}>
            <div className="align-items-baseline details">
              <FontAwesomeIcon icon={faAngleLeft}  onClick={() => navigate(-1)}/>
              <h2 className='w-75'>{product?.name}</h2>
              <FontAwesomeIcon icon={faXmark}  onClick={() => navigate(-1)}/>
            </div>
            
            <div className="big-img mb-3">
                <img crossOrigin="anonymous" src={API_URL + (bigImg? bigImg : product.thumb_path)} alt="" />
            </div>
            
            <div className="mx-4">
                <DetailsThumb images={product?.image_paths? product.image_paths: ''} thumb={product.thumb_path} setBigImg={setBigImg} />
        
            
                <div className="row">
                </div>

                {/* <p>{product?.description}</p> */}
                <div className="sticky-bottom pb-4">
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