import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { cartContext } from '../../context/cartContext'

export default function Checkout() {
 let {onlinePayment,cartProducts}=useContext(cartContext)
   async function onlinepay(values){
    let data = await cartProducts()
    console.log(data.data.data._id)
    console.log(values)
 let pay = await onlinePayment(data.data.data._id ,values)
 console.log(pay.data.session.url)
 document.location.href=pay.data.session.url
  }


    let formik = useFormik({
        initialValues:{
            details:'',
            phone:"",
            city:""
        },
        onSubmit:onlinepay
    })


  return (
    <>
    <div className="w-75 mx-auto py-5">
     <form action="" onSubmit={formik.handleSubmit}>
        <label htmlFor="details" className='my-2'>details</label>
        <input type="text" className='form-control' id='details' name='details'  onBlur={formik.handleBlur} onChange={formik.handleChange}/>
        <label htmlFor="phone" className='my-2'>phone</label>
        <input type="tel" id='phone' className='form-control' name='phone'  onBlur={formik.handleBlur} onChange={formik.handleChange}/>
        <label htmlFor="city" className='my-2' >city</label>
        <input type="text" className='form-control' name='city'  id='city' onBlur={formik.handleBlur} onChange={formik.handleChange}/>
        <button className='btn btn-outline-success text-black px-3 my-3' type="submit">pay </button>
     </form>
    </div>
    </>
  )
}
