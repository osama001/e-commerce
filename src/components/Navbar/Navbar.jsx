import React, { useContext, useEffect,useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { TokenContext } from "../../context/tokenContext";
import { cartContext } from "../../context/cartContext";
import { useQuery } from "react-query";
import './Navbar.module.css'

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
          <NavLink to="/">
            <img src={logo} alt="" className="navbar-brand navbar-expand " />
          </NavLink>
          <div
            className="collapse navbar-collapse  d-md-flex justify-content-around "
            id="navbarTogglerDemo01"
          >
            {token ? (
              <ul className="navbar-nav     mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-NavLink active" aria-current="page" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-Link" to="/carts">
                    cart
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-Link" to="/WishList">
                    wish list
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-Link" to="/Products">
                    Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-Link" to="/Categories">
                    Categories
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-Link" to="/Brands">
                    brands
                  </NavLink>
                </li>

              
              </ul>
            ) : (
              ""
            )}

            {!token ? (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <div className=" d-flex justify-content-around">
                  <li className="nav-item">
                    <NavLink
                      className="nav-Link  "
                      aria-current="page"
                      to="/signup"
                    >
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-Link" to="/login">
                      Login
                    </NavLink>
                  </li>
                </div>
              </ul>
            ) : (
              <div className="d-flex justify-content-between">
                {" "}
                  
                  <NavLink className="nav-NavLink mx-3 " aria-current="page" to="/carts">
             
                    <i className="fa-solid fa-cart-shopping fa-xl">{userCart?.data?.numOfCartItems} </i>
                  </NavLink>
                
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
