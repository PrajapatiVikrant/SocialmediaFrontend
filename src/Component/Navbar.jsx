import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { UpdateSelectedProfile } from "../State/Slice/SelectProfileData";

function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function logout() {
    localStorage.setItem("token", "");
    window.location.reload();
  }

  async function searched(e) {
    if (e.key === "Enter") {
      const data = await axios.get(
        `https://socialmedia-backend-two.vercel.app/socialmedia/profile/otherprofile/${search}`
      );

      if (data.data === "Not found") {
        alert(data.data);
      } else {
        dispatch(UpdateSelectedProfile(data.data));
        setSearch("");
        navigate("./otherprofile");
      }
    }
  }

  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 flex justify-between items-center">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <div className="text-2xl font-bold text-purple-600 tracking-wide">
          CONNEXT
        </div>

        {/* Search Box */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <i className="fas fa-search"></i>
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={searched}
            placeholder="Search profile here..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-64 transition"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex gap-6 text-gray-700 font-medium items-center">
        <Link
          to="/"
          className="hover:text-purple-600 transition duration-200"
        >
          Profile
        </Link>
        <Link
          to="/mynetwork"
          className="hover:text-purple-600 transition duration-200"
        >
          My Network
        </Link>
        <Link
          to="/postform"
          className="hover:text-purple-600 transition duration-200"
        >
          Post
        </Link>
        <button
          onClick={logout}
          className="text-red-600 hover:text-red-800 transition duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
