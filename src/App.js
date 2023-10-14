
import './App.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Layout from './components/Layout/Layout';
import toast, { Toaster } from 'react-hot-toast';
import Products from './components/Products/Products';
import NotFound from './components/Notfound/NotFound';
import Carts from './components/Carts/Carts';

import SignUp from './components/Signup/SignUp';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import WishList from './components/WishList/WishList';
import TokenContextProvider from './context/tokenContext';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';

import RouterProtector from './components/RouterProtector/RouterProtector';
import ProductDetails from './components/productDetails/ProductDetails';
import UpdatedPassword from './components/UpdatedPassword/UpdatedPassword';
import CartcontextProvider from './context/cartContext';
import WishContextProvider from './context/wishLIstContext';
import Checkout from './components/CheckOutSession/Checkout';
import Allorders from './components/allorders/Allorders';


const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,children:[
      {index:true,element: <RouterProtector><Home/></RouterProtector> },
      {path:'',element:<RouterProtector><Home/></RouterProtector> },
      {path:'signup',element:<SignUp/>},
      {path:'Categories',element:<RouterProtector><Categories/></RouterProtector> },
      {path:'Brands',element:<RouterProtector><Brands/></RouterProtector> },
      {path:'ForgetPassword',element:<ForgetPassword/> },
      {path:'updatedPassword',element:<UpdatedPassword/> },
      {path:'WishList',element:<RouterProtector><WishList/></RouterProtector> },
      {path:'checkout',element:<RouterProtector><Checkout/></RouterProtector> },
      {path:'allorders',element:<RouterProtector><Allorders/></RouterProtector> },
      {path:'productdetails/:id',element:<RouterProtector><ProductDetails/></RouterProtector> },
      {path:'login',element:<Login/>},
      {path:'carts',element:<RouterProtector><Carts/></RouterProtector> },
      {path:'products',element:<RouterProtector><Products/></RouterProtector> },
      {path:'*',element:<NotFound/>},
    ]
  }
]);
function App() {
  
  return ( <>
  <WishContextProvider> 
    <CartcontextProvider>
  <TokenContextProvider>
  <Toaster />
<RouterProvider router={routes} >

</RouterProvider>
</TokenContextProvider>
  </CartcontextProvider>
  </WishContextProvider>
 
 
  </>
  );
}

export default App;
