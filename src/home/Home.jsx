import React from 'react'
// import Navbar from '../component/Navbar';
// import { BrowserRouter,Routes,Route } from 'react-router-dom';
// import Footer from '../component/Footer';
import Banner from '../component/Banner'
import Freebook from '../component/Freebook'
import Login from '../component/Login'
import { useLocation } from 'react-router-dom'

const Home = () => {
  const location = useLocation();
  const isModalOpen = location.state?.openLoginModal || false;
  const [showLoginModal, setShowLoginModal] = React.useState(isModalOpen);


  return (
    <>


       {/* <Navbar/> */}
       <Banner />
      <Freebook/>
      {/* <Footer/> */}
      {/* <Freebook/> */}
      
  
   
    </>
  )
}

export default Home;
