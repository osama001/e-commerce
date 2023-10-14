
import React, { useContext, useState } from 'react'
import {useFormik} from 'formik'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'


import axios from 'axios'
import { useNavigate } from 'react-router'
import { TokenContext } from '../../context/tokenContext'
import {Helmet} from "react-helmet";
export default function Login() {
  const [errorMassage,setErrorMessage]=useState()
  const [loading,setloading]=useState(false)
      let navigate = useNavigate()
      let {setToken} = useContext(TokenContext)
      async function sendData(values){
        setloading(true)
        let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values).catch((err)=>{
     
   
            setErrorMessage(err.response.data.message)
        
        setloading(false)
        Swal.fire({  
            
            text:errorMassage,
            icon: 'error'
          }); 
        }
        )
        if(data.message === 'success'){
            navigate('/home')
            setErrorMessage('')
            localStorage.setItem('token',data.token)
            setToken(localStorage.getItem('token'))
            
        }
        setloading(false)
        console.log(data.message)
       }
  let formik = useFormik({
    initialValues:{
        name:'',
        email:"",
        password:"",
        rePassword:"",
        phone:""
    },
    onSubmit:sendData
})



    return (<div className='w-75 mx-auto my-5'>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Login </title>
                
            </Helmet>
    <h3>Register now </h3>
     <div>
      
        <form onSubmit={formik.handleSubmit}>
    
            <div className='mb-3'>
                <label htmlFor="email">Email:</label>
                             <input type="email" id='email' onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} className='form-control' />
                             {formik.errors.email&& formik.touched.email  ? <div className='alert alert-danger' >{formik.errors.email}</div>:''}

            </div>
            <div className='mb-3'>
                <label htmlFor="password">password:</label>
                             <input type="password" id='password'  onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} className='form-control' />
                             {formik.errors.password&& formik.touched.password  ? <div className='alert alert-danger' >{formik.errors.password}</div>:''}
            </div>
         
            {loading?   <button className='btn btn-success d-block w-100 my-3'><i className=' fa-solid fa-spinner fa-spin'></i></button>:       <button type="submit" className='btn btn-success d-block ms-auto my-3' disabled={!(formik.isValid && formik.dirty)}>login now</button>}
        </form>
     </div>
      
           <span className=' forgetPass me-auto d-block text-black'><Link to={'/ForgetPassword'} className='text-decoration-none forgetPass '> forget password ...!</Link></span>
  </div>
    

  )
}
