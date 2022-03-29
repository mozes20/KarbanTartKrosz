import React, { Fragment, useMemo, useState } from 'react';
import { Footer, Navbar } from './components';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.scss'
import AdminTable from './components/Table/AdminTable';
import Login from './components/Login/Login';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';

import LinkPage from './components/LinkPage';

const App = () => (

  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path='login' element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route path="admintable" element={<AdminTable />} />
      </Route>
    </Route>
  </Routes>

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
