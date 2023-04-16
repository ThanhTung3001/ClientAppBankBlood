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
import HomePage from './pages/Home/Index'


const App = () => {
  const [loading, setLoading] = useState(true)

  const preloader = document.getElementById('preloader');
  const dispatch = useDispatch();
  const auth = useSelector(state=>state.SignUp.auth);
  const token = useSelector(state=>state.SignUp.token);


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
   if(token!=null){
    
      dispatch(initToken(token));
     
   }
   if(Info!=null){
     dispatch(initUserInfo(JSON.parse(Info)))
   }
  }, [])

  return (
    !loading && (
      <>
        <Routes>
          <Route exact path='/admin' element={<Analytics />} />
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
          <Route path='/' element={<HomePage />} />
          <Route path='/admin/users' element={<ProtectedRoute auth={auth} children={<UserManagement/>} />} />
        </Routes>
      </>
    )
  )
}

export default App


const ProtectedRoute = ({ auth, children }) => {
  if (!auth) {
    return <Navigate to="/auth/signin" replace />;
  }

  return children;
};