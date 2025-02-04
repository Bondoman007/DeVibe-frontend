import React, { useEffect, useState } from "react";
import Img from "/icon.png";
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
  const [requestNotification, setRequestsNotification] = useState([]);
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
      {user && requestNotification && (
        <div className="flex-none gap-2">
          <div className="form-control"> Welcome, {user.firstName}</div>
          <div className="dropdown dropdown-end mx-5 relative">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar flex justify-center"
              // onClick={setFlag(!flag)}
            >
              <div className="w-10 rounded-full relative">
                <img alt="user photo" src={user.photoUrl} />
              </div>
              {/* {requestNotification?.length > 0 && (
                <span className="badge bg-red-700 absolute -top-1 -right-1 text-white text-xs px-2">
                  {requestNotification.length}
                </span>
              )} */}
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to={"/request"} className="justify-between">
                  Request
                  {/* {requestNotification.length > 0 && (
                    <span className="badge bg-red-700">
                      {requestNotification.length}
                    </span>
                  )} */}
                </Link>
              </li>
              <li>
                <Link to={"/connections"} className="justify-between">
                  Connections
                </Link>
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
