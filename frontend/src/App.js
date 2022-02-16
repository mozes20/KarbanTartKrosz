import React from 'react';
import { Navbar } from './components';
import { Table } from './components'
import { SortingTable } from './components'
import { FilteringTable } from './components'
import { PaginationTable } from './components'

import logo from './logo.svg';
import './App.css';

const App = () => (
  <div >
    <div >
      <Navbar />
    </div>

    <div className='mt-20 p-5  mx-20 bg-slate-200  text-black font-bold bg-grey '>

      <FilteringTable />

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
