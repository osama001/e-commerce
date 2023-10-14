// import axios from 'axios';
// import React, { useContext, useEffect, useState } from 'react'
// import {Helmet} from "react-helmet";
// import { useQuery } from 'react-query';
// import { cartContext } from '../../context/cartContext';
// export default function Carts() {

// const [products,setProducts]=useState([])
// const [ totalCartPrice,setTotalPrice]=useState(0)

// let {cartProducts,removeItem} =useContext(cartContext)
// async function removingItem(id){
//   let {data} = await removeItem(id).catch((e) => {
//     console.log(data.response.data)
//   })
//   console.log(data)
// }
// async function getCartProducts(){
//  let {data}=  await cartProducts().catch((err)=>{
//   console.log(err)
//  })
//  console.log(data)
// if(data.status === "success"){

//     setProducts(data.data.products)
//     setTotalPrice(data.data.totalCartPrice)

// }else{

// }
// }

// useEffect(()=>{
//   getCartProducts()
 

    
// },[])
// console.log(products)
//   return (
//     <div>
//       <Helmet>
//     <meta charSet="utf-8" />
//     <title>Cart</title>

// </Helmet>

// <div className="container ">
//   <div className="general d-flex justify-content-between">
//     <h3 className='maincolor'>totla price :{totalCartPrice}EGP</h3>
//   <button className='btn btn-outline-primary' >Clear your Cart </button>
//   </div>
//   {products.map((product)=>{
//     return(<div className='row my-2 bg-body-tertiary  border-bottom p-3'>
//      <div className="col-md-6">
//     <div className="row align-items-center">
//     <div className="col-md-6">
//   <div className="inner">
//     <img src={product.product.imageCover} alt=""  className='w-100'/>
//   </div>

// </div>
// <div className="col-md-6">
//   <h3>
//   {product.product.title.split(' ').slice(0,2).join(' ')}
//   </h3>
//   <p>{product.price} EGP</p>
//   <p className='redColor pointer ' onClick={()=>{
//     removingItem(product.product.id )
//   }}>remove item <i class="fa-solid fa-trash"></i></p>
// </div>
//     </div>
//      </div>
//      <div className="col-md-6 d-flex align-items-center ">
//       <div className="item ms-auto">
//       <button className='btn btn-outline-danger'>-</button>
//       <span className='mx-4'>{product.count}</span>
//       <button className='btn btn-outline-success'>+</button>
//       </div>
//      </div>

//     </div>)
//   })}
// </div>

// </div>
//   )
// }
import React, { useContext,useEffect } from 'react'
import { cartContext } from '../../context/cartContext'
import { Link, useNavigate } from "react-router-dom";

export default function Carts() {
  
  let {cartProducts,userCart,removeItem,setUsercart,totalPrice,updateCart,setTotalPrice}=useContext(cartContext)
  async function updating(id,count){
    if(count != 0){
      let {data}= await updateCart(id,count)
      
      if(data.status =='success' ){

     setTotalPrice(data.data.totalCartPrice)
     setUsercart(data.data.products)
   } 

    }else{
   
      removingItem(id)
  
    }
  

  }

  async function removingItem(id){
    let {data}= await removeItem(id)
    console.log(data.data.products) 
    setUsercart(data.data.products)
    setTotalPrice(data.data.totalCartPrice)

    cartProducts()
  }
 
  useEffect(()=>{
    
     cartProducts()
    
   },[])
  return (
    <>
    <div className="container ">  
   <div className="d-flex justify-content-between">
   <h2> total price: {totalPrice}EGP</h2> 
    <Link to={'/checkout'}><button className='btn btn-success'>  online payment </button></Link>
   </div>
    
    {userCart?.map((element)=>{
      
        return( <>
        {element.count !==0 ?<div key={element.product._id}>

          
<div className="row border my-2 px-3 mx-3">
  <div className="col-6 d-flex align-items-center">
    <div className="col-6 mx-2">
      <img src={element.product.imageCover} alt="" className='w-100 p-3' />
    </div>
    <div className="col-6">
      <p>{element.price}</p>
      <p>{element.product.title}</p>
      <p className='redColor pointer' onClick={()=>{
    
       removingItem(element.product._id)
      }}>remove item <i class="fa-solid fa-trash"></i></p>
    </div>
  </div>
  <div className="col-2 align-self-center  ms-auto">
  <div className=" ms-auto">
<button className='btn btn-outline-danger'onClick={()=>{

 updating(element.product._id,element.count-1)}} >-</button>
<span className='mx-4'>{element.count}</span>
<button className='btn btn-outline-success' onClick={()=>{
 
 updating(element.product._id,element.count+1)}}>+</button>
</div>
</div> 
  </div>

</div>:""}

        </>)
      })}
      
     
      </div>
    
    </>
  )
}
