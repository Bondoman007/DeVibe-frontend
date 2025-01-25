import React from "react";
import Img from "./icon.png"
import { Router } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
export default function NavBar (){
    return <div className="navbar bg-base-300">
    {/* Left Section with Logo */}
    <div className="flex-1">
      <a className="btn btn-ghost text-xl flex items-center ">
        {/* Logo Image */}
        <img
          src={Img}
          alt="DeVibe Logo"
          className="h-8 w-30 sm:h-8 sm:w-28" // Adjust size for responsiveness
        />
        {/* Brand Name */}
       
      </a>
    </div>

    {/* Right Section with Avatar and Dropdown */}
    <div className="flex-none gap-2">
      <div className="form-control"></div>
      <div className="dropdown dropdown-end mx-5">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li>
            <a className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li>
            <a>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
}