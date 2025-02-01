import React, { useEffect, useState } from "react";
import Img from "../../public/icon.png";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeFeed, removeFullFeed } from "../utils/feedSlice";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const [profile, setProfile] = useState(user);
  // useEffect(()=>{
  //   setProfile(user)
  // },[])
  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  async function handleLogout() {
    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {}, // Empty object instead of sending credentials in body
        { withCredentials: true }
      );
      console.log(res.data);

      // Clear user state in Redux
      dispatch(removeUser());
      dispatch(removeFullFeed());
      // Navigate to login page after logout
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <div className="navbar bg-base-300">
      {/* Left Section with Logo */}
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl flex items-center ">
          {/* Logo Image */}
          <img
            src={Img}
            alt="DeVibe Logo"
            className="h-8 w-30 sm:h-8 sm:w-28" // Adjust size for responsiveness
          />
          {/* Brand Name */}
        </Link>
      </div>

      {/* Right Section with Avatar and Dropdown */}
      {user && (
        <div className="flex-none gap-2">
          <div className="form-control"> Welcome, {user.firstName}</div>
          <div className="dropdown dropdown-end mx-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="user photo" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
