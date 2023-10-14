import { useFormik } from 'formik'
import React from 'react'
import axios from 'axios'
import * as yup from 'yup'
import { RotatingLines } from "react-loader-spinner";
import { useState } from 'react'
import { useNavigate } from 'react-router'

import Swal from 'sweetalert2'
export default function UpdatedPassword() {
   let [loading,setLoading]=useState(false)

 let navigate = useNavigate()
    let schema = yup.object({
        email:yup.string().email('enter a valid email pls ').required('pls enter your email'),
        newPassword: yup
        .string()
        .required('Please Enter your new password').matches(/^[A-z][a-z0-9]{4,}$/,'pls enter min 4 char one of them Capital')
      ,
    })
  async  function update(values){
    setLoading(true)
       let {data} =await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',values).catch((err)=>{
       
        setLoading(false)
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
        
          })
        console.log(err)
         
       })
       setLoading(false)
       navigate('/login')
    }

    let formik = useFormik({
        initialValues:{
            email:'',
            newPassword:''
        },
  validationSchema:schema,
        onSubmit:update
    })
  return (
<div className='w-75 mx-auto my-5'>
<form onSubmit={formik.handleSubmit}>

<div className="form-floating">
           <input type="email" value={formik.values.email} id='email'  className='form-control' placeholder="name@example.com" onChange={formik.handleChange} onBlur={formik.handleBlur} />
        <label htmlFor='email'>email</label>
        </div>
   
        {formik.touched.email  &&  formik.errors.email ? 
          <div className="alert alert-danger my-3" role="alert">
       {formik.errors.email}
        </div>
          : ''}



  
<div className="form-floating my-3">
  <input type="password" value={formik.values.newPassword} className="form-control" onChange={formik.handleChange} onBlur={formik.handleBlur} id="newPassword" />
  <label htmlFor="newPassword">New Password</label>
</div>
{formik.touched.newPassword  &&  formik.errors.newPassword ? 
  <div className="alert alert-danger my-3" role="alert">
{formik.errors.newPassword}
</div>
  : ''}


{loading ? (
            <div className="d-flex justify-content-center align-items-center  p-0">
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
              />
            </div>
          ) : (
            <button className="btn btn-outline-success" type='submit' disabled={formik.errors.email || formik.errors.newPassword} > update </button>
          )}

        
</form>

</div>
  )
}
