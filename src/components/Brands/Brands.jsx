import React, { useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { RotatingLines } from  'react-loader-spinner'
export default function SubCategories() {
  const [subCate,SetSub]=useState('')
    async function getAllBrands(){
        return await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
      }
    async function getSpecificBrand(id){
        let{data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
        console.log(data)
        SetSub(data?.data)
      }
      let {data,isLoading}  = useQuery('Brands',getAllBrands)
      


  return (
    
<>
<h1 className='text-center'> All Brands </h1>
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
    <div className="container my-5">
    <div className="row">
    
    {data?.data.data.map((item)=>{
        return(<div className='col-md-3 mb-3' key={item._id}>
         
        

  <div className="card text-center" >
  <img src={item.image} className="card-img-top w-100" height={300} alt="..."  data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={()=>{
    getSpecificBrand(item._id)
  }}/>
  <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
       
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        {subCate? <img src={subCate.image} className='w-100 ' />:""}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary"  data-bs-dismiss="modal">ok</button>
      </div>
    </div>
  </div>
</div>
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
</>
  )
}
