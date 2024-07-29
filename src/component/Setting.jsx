import React from "react";
import { Link, Routes, Route, NavLink, Navigate } from "react-router-dom";
import AccountSettings from './AccountSetting';
// import Notifications from './Notification';
import ProfilePage from "./ProfilePage";
// import { Table } from "@chakra-ui/react";
import { Table } from "@chakra-ui/react";
import Tables from "./Tables";

const Setting = () => {
  return (
    <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
      <aside className=" hidden  py-4 md:w-1/3 lg:w-1/4 md:block">
        <div className=" mt-5 fixed flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
          <h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>
          <NavLink 
            to="profile-page" 
            className={({ isActive }) => 
              `flex items-center px-3 py-2.5 font-bold  rounded-full ${
                isActive ? 'text-indigo-900' : 'hover:text-indigo-900 hover:border hover:rounded-full'
              }`
            }
          >
            Public Profile
          </NavLink>


          <NavLink 
            to="account-setting" 
            className={({ isActive }) => 
              `flex items-center px-3 py-2.5 font-semibold ${
                isActive ? 'text-indigo-900 border rounded-full' : 'hover:text-indigo-900 hover:border hover:rounded-full'
              }`
            }
          >
            Account Settings
          </NavLink>


            

          <NavLink 
            to="table" 
            className={({ isActive }) => 
              `flex items-center px-3 py-2.5 font-semibold ${
                isActive ? 'text-indigo-900 border rounded-full' : 'hover:text-indigo-900 hover:border hover:rounded-full'
              }`
            }
          >
            Users
          </NavLink>
        </div>
      </aside>
      <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
        <div className="p-2 md:p-4">
          <div className="w-full px-6 pb-8 mt-8 sm:rounded-lg">
          <Routes>
              <Route path="/" element={<Navigate to="profile-page" replace />} />
              <Route path="profile-page" element={<ProfilePage />} />
              <Route path="account-setting" element={<AccountSettings />} />
              <Route path="table" element={<Tables/>} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Setting;
