import React, { useContext, useEffect,useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { TokenContext } from "../../context/tokenContext";
import { cartContext } from "../../context/cartContext";
import { useQuery } from "react-query";

export default function Navbar() {
 
  let {userCart} =useContext(cartContext)

console.log()


  let { token, setToken } = useContext(TokenContext);
  let navigate = useNavigate();

  function logOut() {
    localStorage.clear();
    setToken(null);
    navigate("/login");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link to="/">
            <img src={logo} alt="" className="navbar-brand navbar-expand " />
          </Link>
          <div
            className="collapse navbar-collapse  d-md-flex justify-content-around "
            id="navbarTogglerDemo01"
          >
            {token ? (
              <ul className="navbar-nav     mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/carts">
                    cart
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/WishList">
                    wish list
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Products">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Categories">
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Brands">
                    brands
                  </Link>
                </li>

              
              </ul>
            ) : (
              ""
            )}

            {!token ? (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <div className=" d-flex justify-content-around">
                  <li className="nav-item">
                    <Link
                      className="nav-link active "
                      aria-current="page"
                      to="/signup"
                    >
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                </div>
              </ul>
            ) : (
              <div className="d-flex justify-content-between">
                {" "}
                  
                  <Link className="nav-link mx-3 " aria-current="page" to="/carts">
             
                    <i className="fa-solid fa-cart-shopping fa-xl">{userCart?.data?.numOfCartItems} </i>
                  </Link>
                
                <span className="cursorPointer" onClick={logOut}>
                  log out
                </span>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
