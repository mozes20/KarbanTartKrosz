import React, { Fragment, useMemo, useState } from 'react';
import { Footer, Navbar } from './components';
import { Routes, Route } from 'react-router-dom'
import './App.scss'
import AdminTable from './components/Table/AdminTable';
import Login from './components/Login/Login';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import RequireAuth from './components/RequireAuth';
import Dropdown from './components/Dropdown';
import { Admin } from './components/Admin';
import  Maintenance  from './components/Maintenance';
import Employees from './components/Employees';

const App = () => (

  <div>
    <div className='mb-40'>
      <Navbar />
    </div>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path='login' element={<Login />} />
        <Route path='home' element={<HomePage />} />
        <Route path='maintenance' element={<Maintenance />} />
        <Route path='employees' element={<Employees />} />
        <Route path='categories' element={<Dropdown />} />
        <Route element={<RequireAuth />}>
          <Route path='admin' element={<Admin />} />
          <Route path="admintable" element={<AdminTable />} />
          

        </Route>
      </Route>
    </Routes>
  </div>


  /*  <div>
     <div className='mb-20'>
       <Navbar />
     </div>
     <div className='mt-30'>
       <AdminTable />
     </div>
   </div> */

);

export default App;
