import React, { useContext, useEffect, useState } from "react";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (location.state && location.state.openLoginModal) {
      setIsModalOpen(true);
    }
  }, [location]);

  // useEffect(()=>{
  //   const token = Cookies.get("uid");
  //   if (token) setIsLoggedIn(true);
  //   navigate('/home')

  // },[])

  // const handleLogout = () => {
  //   Cookies.remove("uid");
  //   setIsLoggedIn(false);
  // };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

 const handleLogout=()=>{
    logout();
    navigate("sign-up")
  };

  const element = document.documentElement;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", changeBGOnScroll);
  }, []);

  const changeBGOnScroll = () => {
    const searchBar = document.getElementById("searchBar");
    const NavBar = document.getElementById("Navbar");
    if(Navbar&&searchBar){
      if(window.scrollY>0){
        NavBar.style.backgroundColor="#080808";
        searchBar.style.backgroundColor = "#080808";
      }
      else{
        NavBar.style.backgroundColor = "transparent";
        searchBar.style.backgroundColor = "transparent";

      }
    }
  
  };

  const navItems = (
    <>
      <nav>
        <ul className="flex">
          <li className="text-gray-600 font-semibold">
            <Link to="/home">Home</Link>
          </li>
          <li className="text-gray-600 font-semibold">
            <Link to="/course">Course</Link>
          </li>
          <li className="text-gray-600 font-semibold">
            <Link to="/contact-us">Contact</Link>
          </li>
          <li className="text-gray-600 font-semibold">
            <Link to="/about">About</Link>
          </li>
          <li>
          {isLoggedIn ? (
            
            <button onClick={handleLogout}className=" text-gray-600  bg-fuchsia-300">
              Logout
            </button >
          ) : (
            <button onClick={openModal} className=" text-gray-600 px-3 py-2 rounded-lg ml-2 bg-[#f5f5f5]">
              Login
            </button>
    
            
          )}
          </li>
          

          <Login isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </ul>
      </nav>
    </>
  );

  return (
    <>
      <div
      id="Navbar"
        className={`main-div bg-[#f5f5f5] w-full max-screen-2xl mx-auto  md:px-20 px-4 sticky top-0 left-0 right-0 z-50 ${
          sticky
            ? "sticky-navbar shadow-md bg-base-300 duration-300 transition-all ease-in-out"
            : ""
        }`}
      >
        <div className="navbar">
          <div className="flex-1">
            <a href="/" className="btn btn-ghost text-2xl cursor-pointer">
              Books
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navItems}</ul>
          </div>
          <div className="changing-theme-mode mx-5">
            <label className="swap swap-rotate">
              <input
                type="checkbox"
                className="theme-controller"
                value="synthwave"
              />
              <svg
                className="swap-off fill-current w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                // onClick={()=>setTheme(theme==="light"?"dark":"light")}
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
              <svg
                className="swap-on fill-current w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                // onClick={()=>setTheme(theme==="dark"?"light":"dark")}
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </div>
          <div className="flex-none gap-2">
            <div className="form-control hidden md:block">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto"
                id="searchBar"
              />
            </div>
            {/* {isLoggedIn&&( */}
              <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/setting">
                    <a href="/profile" className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <a href="/settings">Settings</a>
                </li>
                <li>
                  <a onClick={logout} href="/sign-up">
                    Logout
                  </a>
                </li>
              </ul>
            </div>

            {/* )} */}
            
          </div>
          <div className="lg:hidden">
            <button className="btn btn-ghost" onClick={toggleMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
          {menuOpen && (
            <div className="lg:hidden">
              <ul className="menu menu-vertical px-1">{navItems}</ul>
            </div>
          )}
        </div>
      </div>
      <Routes>
        <Route
          path="/sign-up"
          element={<Signup setLoginModalOpenn={setIsModalOpen} />}
        />
      </Routes>
      {isModalOpen && <Login closeModal={closeModal} />}
    </>
  );
};

export default Navbar;
