import { createContext, useState } from "react";
import axios from "axios";


export let WishContext = createContext()

let token =localStorage.getItem('token')
const baseUrl ='https://ecommerce.routemisr.com'
 
async function AddToWishList(id){
  try {
    let {data}= await axios.post(`${baseUrl}/api/v1/wishlist`,{productId:id},{
        headers:{
            token:localStorage.getItem('token')
        }
    })
    console.log(data , ' wish cart response ')
    
  } catch (error) {
    console.log(error)
  }
}


export default function WishContextProvider({children}){
const [userWisList,setUserWishList]=useState([])
async function getWishList(){
    try {
        let {data}= await axios.get(`${baseUrl}/api/v1/wishlist`,{
            headers:{
                token:localStorage.getItem('token')
            }
        })
        console.log(data , ' wish cart response ')
        setUserWishList(data)
        console.log(userWisList)
        
      } catch (error) {
        console.log(error)
      }
}
async function removeItem(id){
    try {
        let {data}= await axios.delete(`${baseUrl}/api/v1/wishlist/${id}`,{
            headers:{
                token:localStorage.getItem('token')
            }
        })
        console.log(data , ' wish cart response ')
        getWishList()
      } catch (error) {
        console.log(error)
      }
}
    return <WishContext.Provider  value={{AddToWishList,getWishList,userWisList,removeItem}}>
        {children}
    </WishContext.Provider>
}