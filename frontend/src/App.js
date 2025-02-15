import React, { useEffect } from 'react'
import './App.css'
import {createBrowserRouter, Navigate, RouterProvider, useNavigate} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp'
import Jobs from './components/Jobs'
import JobDescription from './components/JobDescription'
import Browse from './components/Browse'
import Profile from './components/Profile'
import ProtectedRoute from './components/admin/ProtectedRoute'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import AdminJobs from './components/admin/AdminJobs'
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import CompanySetup from './components/admin/CompanySetup'
import TokenValidate from './components/admin/TokenValidate'
import UpdateJob from './components/admin/UpdateJob'

const App = () => {

  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Home/>
    },
    {
      path: '/login',
      element: <Login/>
    },
    {
      path: '/signup',
      element: <SignUp/>
    },
    {
      path: '/jobs',
      element: <Jobs/>
    },
    {
      path: '/description/:id',
      element: <JobDescription/>
    },
    // {
    //   path: '/browse',
    //   element: <Browse/>
    // },
    {
      path: '/profile',
      element: <TokenValidate><Profile/></TokenValidate>
    },

    // For admin
    {
      path: '/admin/companies',
      element: <TokenValidate><ProtectedRoute><Companies/> </ProtectedRoute></TokenValidate>
    },
    {
      path: '/admin/companies/create',
      element: <TokenValidate><ProtectedRoute><CompanyCreate/></ProtectedRoute></TokenValidate>
    },
    {
      path: '/admin/companies/:id',
      element: <TokenValidate><ProtectedRoute><CompanySetup/></ProtectedRoute></TokenValidate>
    },
    {
      path: '/admin/jobs',
      element: <TokenValidate><ProtectedRoute><AdminJobs/></ProtectedRoute></TokenValidate>
    },
    {
      path: '/admin/jobs/create',
      element: <TokenValidate><ProtectedRoute><PostJob/></ProtectedRoute></TokenValidate>
    },
    {
      path: '/admin/jobs/update/:id',
      element: <TokenValidate><ProtectedRoute><UpdateJob/></ProtectedRoute></TokenValidate>
    },
    {
      path: '/admin/jobs/:id/applicants',
      element: <TokenValidate><ProtectedRoute><Applicants/></ProtectedRoute></TokenValidate>
    }
  ])
  
  return (
    <div>
        <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App
