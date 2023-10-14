import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import {Helmet} from "react-helmet";
import toast from 'react-hot-toast';
import { RotatingLines } from  'react-loader-spinner'
import { Link } from 'react-router-dom'
import { cartContext } from '../../context/cartContext';
import { WishContext } from '../../context/wishLIstContext';
export default function Products() {
  const [isLoading,setIsLoading]=useState(false)
  const [spinner,setSpinner]=useState(false)
  const [products,setProducts]=useState([])
  let {AddtoCart} =useContext(cartContext)
  let {AddToWishList} =useContext(WishContext)
async function AddingToCart(id){

  
  let {data} =await AddtoCart(id)
    console.log(data)
  
  if(data?.status=='success'){

   toast.success(data?.message)
  }else{
   toast.error(data?.message)
 }

}






async function getProducts(){
  setIsLoading(true)
    let data =  await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    console.log(data.data.data)
    setIsLoading(false)

    setProducts(data.data.data)
  }

  useEffect(()=>{
    getProducts()
  },[])
  return (
    <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Products</title>
               
            </Helmet>
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
   {isLoading  ?<div className='d-flex justify-content-center align-items-center vh-100 p-0'>
 <RotatingLines
  strokeColor="grey"
  strokeWidth="5"
  animationDuration="0.75"
  width="96"
  visible={true}
/>
    </div>
    
    :
    <div className="container">
    <div className="row">
    
    {products.map((item)=>{
        return(<div className='col-md-3 mb-3' key={item._id}>
          <div className="item text-start p-2 position-relative ">
            <Link to={'/productdetails/'+item._id} className='text-decoration-none'>
            <img src={item.imageCover} className='w-100' alt={item.title} />
            <p className='maincolor mb-0'>{item.category.name}</p>
            <h6 className='text-muted'>{item.title.split(' ').slice(0,2).join(' ')}</h6>
            </Link>
            <div className="itemFooter d-flex justify-content-between px-1">
              <span>{item.price} EGP</span>
              <span>
              <i className="fa-solid fa-star"></i>
                <span>{item.ratingsAverage}</span>
              </span>
            </div>
               <div className="adding d-flex justify-content-between ">
              <button className='w-50 btn btn-success text-black  ' onClick={(e)=>{AddingToCart(item._id)
             
              }}> Add +</button>

               <i className="  fa-regular fa-heart fa-lg p-2 my-1" onClick={async(e)=>{
              await  AddToWishList(item._id)
                 e.target.classList.replace('fa-regular','fa-solid')
               }} ></i>
               </div>
          </div>
        </div>

        )
      })}
    </div>
  </div>
    
    }
    </>
      
  
  )
}
