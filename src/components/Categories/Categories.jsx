import React, { useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import {Helmet} from "react-helmet";
import { RotatingLines } from  'react-loader-spinner'
import SubCategories from '../SubCategories/SubCategories'
export default function Categories() {


  async function getAllCat(){
    return await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }

  let {data,isLoading}  = useQuery('categories',getAllCat)
 


  return (
<>
<Helmet>
                <meta charSet="utf-8" />
                <title>Categories</title>
               
            </Helmet>
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
    
      {data?.data.data.map((item)=>{
        return(<div className='col-md-3 mb-3' key={item._id}>
         
        

  <div className="card text-center" >
  <img src={item.image} className="card-img-top w-100" height={300} alt="..."/>
  <div className="card-body">
    <p className="card-text">{item.name}</p>
  </div>
</div>
        </div>
        )
      })}
    </div>
  </div>
    
    }
        <SubCategories/>
</>
  )
}
