import React from 'react';
import { Navbar } from './components';
import { Table } from './components'
import { SortingTable } from './components'

import logo from './logo.svg';
import './App.css';

const App = () => (
  <div className='bg-grey'>
    <div className=''>
      <Navbar />
    </div>

    <div className='mt-20 flex justify-center bg-slate-200  w-full h-screen text-black font-bold'>

        <SortingTable />


    </div>
    {/*     <Header />
    <AboutUs />
    <SpecialMenu />
    <Chef />
    <Intro />
    <Laurels />
    <Gallery />
    <FindUs />
    <Footer /> */}
  </div>

);

export default App;
