import Img from "./signup.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
export default function SignUp() {
  const [gender, setGender] = useState("");
  const [emailId, setEmailId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate("/");
  const dispatch = useDispatch();
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/signup",
        {
          emailId,
          firstName,
          lastName,
          password,
          gender,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data?.data));
      if (res.data?.message === "signup done!") {
        navigate("/profile");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center my-10 px-4 md:px-0">
      <div className="card flex flex-col md:flex-row bg-base-300 shadow-xl w-full max-w-4xl">
        <figure className="w-full md:w-1/2">
          <img
            src={Img}
            alt="Sign Up"
            className="object-cover w-full h-64 md:h-auto rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
        </figure>
        <div className="card-body w-full md:w-1/2 p-6 flex flex-col justify-between">
          <label className="input input-bordered flex items-center gap-2">
            First Name
            <input
              type="text"
              value={firstName}
              className="grow"
              placeholder=""
              autoComplete="given-name"
              required
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Last Name
            <input
              type="text"
              value={lastName}
              className="grow"
              placeholder=""
              autoComplete="family-name"
              required
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Email
            <input
              type="email"
              value={emailId}
              className="grow"
              placeholder="example@gmail.com"
              autoComplete="email"
              required
              onChange={(e) => {
                setEmailId(e.target.value);
              }}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Password
            <input
              type="password"
              value={password}
              className="grow"
              placeholder="password"
              autoComplete="new-password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <label className="flex items-center gap-2">
            <span className="ml-2">Gender</span>
            <select
              className="select select-bordered w-full max-w-xs ml-2 py-2"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              aria-label="Select your gender"
            >
              <option value="" disabled>
                Select your gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </label>

          <div className="card-actions flex justify-end items-center w-full my-2">
            <Link
              to={"/login"}
              className="text-xs text-[#c3c3c3] mx-2 hover:text-[#8892b0] transition-colors"
            >
              Already a user? login here
            </Link>
            <button
              className="btn btn-primary w-full md:w-auto text-white"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
