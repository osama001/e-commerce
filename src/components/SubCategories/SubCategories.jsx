import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { RotatingLines } from  'react-loader-spinner'
export default function SubCategories() {
    async function getAllSubCat(){
        return await axios.get('https://ecommerce.routemisr.com/api/v1/subcategories')
      }
      let {data,isLoading}  = useQuery('sub',getAllSubCat)
      

      
  return (
    
<>

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
    
      {data?.data.data.map((element,index)=>{
        if(index < 10){
            return(<div className='col-md-3 mb-3' key={element._id}>
         
 

            <p className="card-text border text-center p-2 ">{element.name}</p>
        
        </div>
               
        
                )
        }
      
      })}
    </div>
  </div>
    
    }
</>
  )
}
