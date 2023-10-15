import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import DashboardProfile from './pages/DashboardProfile';
import DashboardPortfolio from './pages/DashboardPortfolio';
import DashboardResume from './pages/DashboardResume';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import NotFound from './components/utils/notFound/NotFound';
import DashboardSkills from './pages/DashboardSkills';
import AddSkill from './pages/AddSkill';
import UpdateSkill from './pages/UpdateSkill';
import AddPortfolio from './pages/AddPortfolio';
import { getUserInfor } from './features/user/userSlice';
import { getUserSkillInfo } from './features/skill/skillSlice';
import { getUserPortfolio } from './features/portfolio/portfolioSlice';
import UpdatePortfolio from './pages/UpdatePortfolio';

function App({ darkMode }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserInfor())
    dispatch(getUserPortfolio())
    dispatch(getUserSkillInfo())
  }, [dispatch])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path='/'>
            <Route index element={<Home darkMode={darkMode} />} />
            <Route path="auth" element={<Auth />} />
            <Route path='forgot' element={<ForgotPassword />} />
            <Route path='user/reset/:token' element={<ResetPassword />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='profile' element={<DashboardProfile />} />
            <Route path='skill/'>
              <Route index element={<DashboardSkills />} />
              <Route path="add" element={<AddSkill />} />
              <Route path='update/:id' element={<UpdateSkill />} />
            </Route>
            <Route path='portfolio/'>
              <Route index element={<DashboardPortfolio />} />
              <Route path='add' element={<AddPortfolio />} />
              <Route path='update/:id' element={<UpdatePortfolio />} />
            </Route>
            <Route path='resume' element={<DashboardResume />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer position="top-center" autoClose={1000} />
    </>

  )
}

export default App;
