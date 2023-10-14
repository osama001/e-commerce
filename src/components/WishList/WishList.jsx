import React, { useContext, useEffect,useState } from 'react'
import {Helmet} from "react-helmet";
import { WishContext } from '../../context/wishLIstContext';
export default function WishList() {
let {getWishList,userWisList,removeItem} = useContext(WishContext)



useEffect(()=>{
  getWishList()

},[])

  return (
    <div className='p-3 text-center'>
      <h2>my  WishList</h2>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Wish list</title>
            
            </Helmet>
            {userWisList?.data?.map((ele)=>{
              
              return    <div className="row border my-2 px-3 mx-3">
          <div className="col-6 d-flex align-items-center justify-content-between">
            <div className="col-6 mx-2">
              <img src={ele.imageCover} alt="" className='w-100 p-3' />
            </div>
            <div className="col-6">
              <p>{ele.price}EGP</p>
              <p>{ele.title}</p>
              <p className='redColor pointer' onClick={()=>{
                removeItem(ele.id)
              }}>remove item <i class="fa-solid fa-trash"></i></p>
            </div>
          </div>
          <div className="col-2 align-self-center  ms-auto">
          <div className=" ms-auto">
    

       </div>
  </div> 
          </div>
           
            })}
    </div>
  )
}
