import React, { useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Slider from "react-slick";
import toast from 'react-hot-toast';
import { useQuery } from "react-query";
import { RotatingLines } from "react-loader-spinner";
import { cartContext } from "../../context/cartContext";
import { useState } from "react";
export default function ProductDetails() {
  const [spinner,setSpinner]=useState(false)


  let { AddtoCart } = useContext(cartContext);
  async function AddingtoCart(id) {
    setSpinner(true)
    let { data } = await AddtoCart(id);
   
    if(data.status =='success'){
      setSpinner(false)
      toast.success(data.message)
    }else{
      setSpinner(false)
      toast.error(data.message)
    }
  }
  let { id } = useParams();

  async function getProduct(id) {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }
  let { data, isLoading } = useQuery("productDetails", () => {
    return getProduct(id);
  });
  console.log(data);
  const settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 1000,
    fade:true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>


{spinner ?<div className='d-flex justify-content-center align-items-center vh-100 p-0'>
 <RotatingLines
  strokeColor="grey"
  strokeWidth="5"
  animationDuration="0.75"
  width="96"
  visible={true}
/>
    </div>
    
    :''}




      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center vh-100 p-0">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      ) : (
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-md-3">
              <Slider {...settings}>
                {data?.data.data.images.map((photo, index) => {
                  return (
                    <div key={index}>
                      <img
                        src={photo}
                        className="w-100"
                        alt={data?.data.data.title}
                      />
                    </div>
                  );
                })}
              </Slider>
            </div>
            <div className="col-md-9">
              <h2>{data?.data.data.title} </h2>
              <p>{data?.data.data.description}</p>
              <div className=" d-flex justify-content-between px-1">
                <span>{data?.data.data.price} EGP</span>
                <span>
                  <i className="fa-solid fa-star"></i>
                  <span>{data?.data.data.ratingsAverage}</span>
                </span>
              </div>
              <button
                className="w-75 btn btn-success mainbgColor text-black my-3 "
                onClick={() => {
                  AddingtoCart(id);
                }}
              >
                {" "}
                Add +
              </button>
            
            </div>
          </div>
        </div>
      )}
    </>
  );
}
