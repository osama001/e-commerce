import axios from 'axios'
import Slider from "react-slick";
import React from 'react'
import { useQuery } from 'react-query'
import {Helmet} from "react-helmet";
export default function SmallSlider() {
 const  settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnHover: true,
    slidesToShow: 5,
    slidesToScroll: 3,
   
  };
  async function GetCate(){
    return await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
}
let {data} =useQuery('category',GetCate )

  return (
    <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Categories</title>
              
            </Helmet>
    <div className="container pt-0 mb-3">

    <div className="row">
    <Slider {...settings}>
    {data?.data.data.map((cat,index)=>{
      return <div className="col-md-3" key={index}>
        <div className="category">
          <img src={cat.image} alt="" className='w-100' height={200}/>
        </div>
      </div>
    })}
  </Slider>
    </div>
   </div>
   </>
)
  
}
