import React, { Fragment, useMemo, useState } from 'react';
import { Footer, Navbar } from './components';

import './App.scss'
import AdminTable from './components/Table/AdminTable';
import LoginForm from './components/Login/LoginForm';

const App = () => (

/*   <main>
    <LoginForm />
  </main> */
  <div>
    <div className='mb-20'>
      <Navbar />
    </div>
    <div className='mt-30'>
      <AdminTable />
    </div>
  </div>

);

export default App;
