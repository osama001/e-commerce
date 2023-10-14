import React from 'react'
import { Navigate } from 'react-router'

export default function RouterProtector(props) {
    if(localStorage.getItem('token') != null){
    return props.children
    }else{
        return <Navigate to ='/login'/>
    }

}
