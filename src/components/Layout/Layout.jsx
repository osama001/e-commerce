import React, { useContext ,useEffect} from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router'

import { TokenContext } from '../../context/tokenContext'


export default function Layout() {
  let {setToken} =useContext(TokenContext)
  useEffect(()=>{
    if(localStorage.getItem('token') != null){
      setToken(localStorage.getItem('token'))
    }
  })

  return (<>
  <Navbar/>
   <div className='mt-5 pt-5'>


   <Outlet/>
   </div>
 
  </>
   
  )
}
