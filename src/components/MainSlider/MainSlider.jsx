
import React from 'react'
import Slider from "react-slick";
import img1 from './../../assets/images/slider-image-1.jpeg'
import img2 from './../../assets/images/slider-image-2.jpeg'
import img3 from './../../assets/images/slider-image-3.jpeg'
import img4 from './../../assets/images/grocery-banner.png'
import img5 from './../../assets/images/grocery-banner-2.jpeg'

export default function MainSlider() {
    const  settings = {
  
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 1500,
        pauseOnHover: true,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1
      }
   
  return ( <>
       <div className="container ">
 
<div className="row gx-0">
    <div className="col-md-9 ">
    <Slider {...settings}>

     <div>
     <img height={400} src={img1} alt="" className='w-100' />
     </div>


     <div>
     <img height={400} src={img2} alt="" className='w-100' />
     </div>


     <div>
     <img height={400} src={img3} alt="" className='w-100' />
     </div>


   
  
 </Slider>
    </div>
    <div className="col-md-3">
    <div className='' >
      <img src={img4} alt="" className='w-100 ' height={200} />
      </div>
    <div >
      <img src={img5} alt="" className='w-100' height={200} />
      </div>
    </div>

</div>
</div>
  </>
  )
}
