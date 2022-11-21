import React from "react";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiChevronDown } from "react-icons/fi";

const MessengerHomePage = () => {
  const { authData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      navigate("/");
    } else {
      navigate("/register");
    }
  }, []);

  console.log(authData);
  return (
    <div className="flex min-h-screen">
      <div className="border w-3/12  border-amber-700">
        <h1>hello world</h1>
      </div>
      <div className="flex-1 border border-amber-700">
        <h1>hello world</h1>
      </div>
      <div className="border w-3/12 border-amber-700 text-center py-9">
        <div className="inline-block min-h-[80px]  w-3/12 bg-current rounded-full ring-2 ring-white">
          {/* <h1 className="text-white">{authData.firstName.charAt(0)}</h1> */}
          <img
            class="rounded-full ring-2 ring-white"
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt={authData.firstName.charAt(0)}
          />
        </div>

        <h1 className="text-[2rem] font-bold">
          {authData.firstName} {authData.lastName}
        </h1>
        <div className="border w-11/12 m-auto p-2 flex flex-row">
          <button>
            <span>Personal Info</span>
            <FiChevronDown />
          </button>
        </div>
        <button className="w-11/12 border text-[1.2rem] p-2 font-bold bg-gradient-to-br bg-gradient-to-r from-violet-500 to-fuchsia-500">
          Log out
        </button>
      </div>
    </div>
  );
};

export default MessengerHomePage;
