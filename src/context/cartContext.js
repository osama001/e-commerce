import { createContext, useEffect, useState } from "react";
  
import axios from "axios";


export  let cartContext = createContext()
let token =localStorage.getItem('token')
const baseUrl ='https://ecommerce.routemisr.com'
async function AddtoCart(id){


return   await axios.post(`${baseUrl}/api/v1/cart`,
 {
    productId:id
 },
 {
    headers: {
        token:localStorage.getItem('token')
    } 
 }).catch((err)=>{console.log(err)})


}





export default function CartcontextProvider({children}){
 
  const [userCart,setUsercart]=useState([])
  const [totalPrice,setTotalPrice]=useState(0)
  async function cartProducts(){
    
    try {
      let token =localStorage.getItem('token')
      let res =  await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
       headers:{
         token:localStorage.getItem('token')
       }})

       setUsercart(res.data.data.products)
       setTotalPrice(res.data.data.totalCartPrice)
      return res
    } catch (error) {
      console.log(error)
    }
   
   }
   
async function removeItem(id){

    
  return   await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
      headers:{
        token:localStorage.getItem('token')
      }
    })

  }
   
async function updateCart(id,count){

    
  return   await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
    count:count
  },{
      headers:{
        token:localStorage.getItem('token')
      }
    })

  }
 async function onlinePayment(id,shippingAddress){
    return   await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}`,{
      shippingAddress:shippingAddress
    },{
        headers:{
          token:localStorage.getItem('token')
        }
      })
  
    }
  

    return <cartContext.Provider value={{AddtoCart,onlinePayment,cartProducts,setUsercart,userCart,setTotalPrice,removeItem,totalPrice,updateCart}}>
        {children}
    </cartContext.Provider>
}

