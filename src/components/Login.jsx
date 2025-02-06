import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { Link } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  async function handleLogin() {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err);
      console.log(err);
    }
  }
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl flex justify-center">
        <div className="card-body text-center">
          <p className="text-xl">Login</p>
          <div>
            <label className="input input-bordered flex items-center gap-2 my-4">
              Email
              <input
                type="text"
                value={emailId}
                className="grow"
                placeholder="example@gmail.com"
                onChange={(e) => {
                  setEmailId(e.target.value);
                }}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              password
              <input
                type="password"
                value={password}
                className="grow"
                placeholder="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
          </div>

          <div className="card-actions flex justify-between items-center w-full my-2">
            <Link
              to={"/signup"}
              className="text-xs text-[#c3c3c3] mx-2 hover:text-[#8892b0] transition-colors"
            >
              New to DeVibe? Sign up here
            </Link>
            <button
              onClick={handleLogin}
              className="btn hover:bg-black bg-[#1f3a92]"
            >
              Login
            </button>
          </div>
          {error && <p className="text-red-600">{error.response?.data}</p>}
        </div>
      </div>
    </div>
  );
}
