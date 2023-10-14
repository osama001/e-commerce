import { useState, createContext } from "react";




export let TokenContext = createContext()


export default function TokenContextProvider({children}){
    
    const [token,setToken]=useState()
   
  

    return <TokenContext.Provider value ={{token,setToken}}>
        {children}
    </TokenContext.Provider>
}