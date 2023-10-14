import React from 'react'

import {Helmet} from "react-helmet";
import Products from '../Products/Products'
import MainSlider from '../MainSlider/MainSlider'
import SmallSlider from '../SmallSlider/SmallSlider';

export default function Home() {

  return (<>
  <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
            
            </Helmet>
  <MainSlider/>
  <SmallSlider/>
  <Products/>
  </>
   
  )
}
