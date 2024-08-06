import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "./context/AuthContext"; // Adjust the path as needed

import Course from "./component/Course";
import Home from "./home/Home";
import Layout from "./layout/Layouts";
import Signup from "./component/Signup";
import Login from "./component/Login";
import ContactUs from "./component/ContactUs";
import About from "./component/About";
import ProfilePage from "./component/Setting";
import HomeLogin from "./component/HomeLogin";
// import { AuthProvider } from "./context/AuthContext";
import GlobalSpinner from "./home/GlobalSpinner";
// import AccountSettings from "./component/AccountSetting";
// import Setting from "./component/ProfilePage";

function App() {
  const { loading } = useContext(AuthContext) || {};  // Added default value to avoid destructuring errors

  if (loading) {
    return <GlobalSpinner />;
  }
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/home" />} />
            <Route path="home" element={<Home />} />
            <Route path="course" element={<Course />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="about" element={<About />} />
            <Route path="setting/*" element={<ProfilePage />} />

            {/* <Route path="account-setting" element={<AccountSettings/>} /> */}
          </Route>
          <Route path="sign-up" element={<Signup />} />
          <Route path="logout" element={<HomeLogin />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
