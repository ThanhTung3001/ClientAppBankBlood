import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Analytics from './pages/Dashboard/Analytics'
import Calendar from './pages/Calendar'
import Profile from './pages/Profile'
import FormElements from './pages/Form/FormElements'
import FormLayout from './pages/Form/FormLayout'
import Tables from './pages/Tables'
import Settings from './pages/Settings'
import Chart from './pages/Chart'
import Alerts from './pages/UiElements/Alerts'
import Buttons from './pages/UiElements/Buttons'
import SignIn from './pages/Authentication/SignIn'
import SignUp from './pages/Authentication/SignUp'
import { UserManagement } from './pages/UserManager/UserManagement';
import { useSelector, useDispatch } from 'react-redux';
import { initToken, initUserInfo } from './pages/Authentication/signupSlice'
// import { HomePage } from './pages/Home/Index'
import BloodGroup from './pages/BloodGroup/Index'
import { Forbidden } from './pages/403/Index'
import Hospital from './pages/Hospitals/Index'
import RegisterBloodBank from './pages/Register/Index'
import Category from './pages/Category/Index'
// import Blog from './pages/Blogs/Index'
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer'
import { About } from './pages/about'
import { Campaing } from './pages/campaings'
import Blog from './pages/Blog/Index'
// import Footer from './components/Layout/Footer'
import {HomePage} from './pages/home/index';

import { BaseBlog } from './pages/BaseBlog'
import { Contact } from './pages/home/Contact'
import { motion, useScroll } from "framer-motion"
import { IoIosArrowUp } from 'react-icons/io'
import { BlogDetail } from './pages/BaseBlog/BlogDetail'
import Event from './pages/Event/Index'


const App = () => {
  const [loading, setLoading] = useState(true)

  const preloader = document.getElementById('preloader');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.SignUp.auth);
  const token = useSelector(state => state.SignUp.token);
  const userInfo = useSelector(state => state.SignUp.userResponse);


  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none'
      setLoading(false)
    }, 2000);
  }

  useEffect(() => {
    // setTimeout(() => setLoading(false), 1000)
    var token = localStorage.getItem("Token");
    var Info = localStorage.getItem("UserInfo")
    if (token != null) {

      dispatch(initToken(token));

    }
    if (Info != null) {
      dispatch(initUserInfo(JSON.parse(Info)))
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [])

  return (
    !loading && (
      <>
        <Routes>
          <Route exact path='/admin' element={<ProtectedRoute auth={auth} children={<Analytics />} userInfo={userInfo} />} />
          {/* <PrivateRoute isAuthenticated={auth} path='/calendar' element={<Calendar />} /> */}
          <Route path='/profile' element={<Profile />} />
          <Route path='/forms/form-elements' element={<FormElements />} />
          <Route path='/forms/form-layout' element={<FormLayout />} />
          <Route path='/tables' element={<Tables />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/chart' element={<Chart />} />
          <Route path='/ui/alerts' element={<Alerts />} />
          <Route path='/ui/buttons' element={<Buttons />} />
          <Route path='/auth/signin' element={<SignIn />} />
          <Route path='/auth/signup' element={<SignUp />} />

          <Route path='/admin/users' element={<ProtectedRoute auth={auth} children={<UserManagement />} userInfo={userInfo} />} />
          <Route path='/admin/bloodgroups' element={<ProtectedRoute auth={auth} children={<BloodGroup />} userInfo={userInfo} />} />
          <Route path='/admin/hospitals' element={<ProtectedRoute auth={auth} children={<Hospital />} userInfo={userInfo} />} />
          <Route path='/admin/registers' element={<ProtectedRoute auth={auth} children={<RegisterBloodBank />} userInfo={userInfo} />} />
          <Route path='/admin/post/categories' element={<ProtectedRoute auth={auth} children={<Category />} userInfo={userInfo} />} />
          <Route path='/admin/post/blogs' element={<ProtectedRoute auth={auth} children={<Blog />} userInfo={userInfo} />} />
          <Route path='/admin/events' element={<ProtectedRoute auth={auth} children={<Event />} userInfo={userInfo} />} />
          <Route path='/admin/profile' element={<ProtectedRoute auth={auth} children={<Profile />} userInfo={userInfo} />} />
          {/* basepage */}
          <Route path='/' element={<BasePage children={<HomePage />} />} />
          <Route path='/about' element={<BasePage children={<About />} />} />
          <Route path='/campaing' element={<BasePage children={<Campaing />} />} />
          <Route path='/contact' element={<BasePage children={<Contact />} />} />
          <Route path='/blogs' element={<BasePage children={<BaseBlog />} />} />
          <Route path='/blogs/:id' element={<BasePage children={<BlogDetail />} />} />
          {/* /admin/profile   */}
        </Routes>
      </>
    )
  )
}

export default App


const ProtectedRoute = ({ auth, children, userInfo, role = "Admin" }) => {
  if (!auth) {
    return <Navigate to="/auth/signin" replace />;
  }
  var roles = userInfo.data.roles;
  console.log(roles);
  if (!roles.includes(role)) {

    return <Forbidden />
  }

  return children;
};


const BasePage = ({ children }) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setVisible(scrollTop > 0);
  };
  window.addEventListener('scroll', handleScroll);
  return <>
    <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />
    <Header />
    {children}
    <Footer />
    <button
        className={`scroll-to-top ${visible ? 'visible' : ''}`}
        onClick={scrollToTop}
      >
        <IoIosArrowUp size={32} />
      </button>
  </>
}