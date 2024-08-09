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
import NotFoundPage from "./component/Unauthorized";
// import AccountSettings from "./component/AccountSetting";
// import Setting from "./component/ProfilePage";
// import NotFoundPage from "./component/Unauthorized";
import SavedCards from "./component/SavedCards";

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
            <Route path="saved-item" element={<SavedCards />} />
            <Route path="course" element={<Course />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="about" element={<About />} />
            <Route path="setting/*" element={<ProfilePage />} />
            <Route path="save/*" element={<ProfilePage />} />
            {/* <Route path="not-found" element={<NotFoundPage/>} /> */}


            {/* <Route path="account-setting" element={<AccountSettings/>} /> */}
          </Route>
          <Route path="sign-up" element={<Signup />} />
          <Route path="logout" element={<HomeLogin />} />
          <Route path="/not-found" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
