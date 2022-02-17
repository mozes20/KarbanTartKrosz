import React, {Fragment, useMemo} from 'react';
import { Footer, Navbar } from './components';
import { Table } from './components'
import { FilteringTable } from './components'
import { DataGrid } from './components'
import { SuperResponsiveTable } from './components'


import MOCK_DATA from './components/MOCK_DATA.json'

import {Header} from './components';
import './App.scss'
import { COLUMNS } from './components/Table/Columns';

const data = MOCK_DATA
const columns = COLUMNS

const driversData = [
  {
    number: 44,
    name: 'Lewis Hamilton',
    team: 'Mercedes',
    country: 'United Kingdom',
    dob: '07/01/1985',
    placeOfBirth: 'Stevenage, England'
  },
  {
    number: 77,
    name: 'Valtteri Bottas',
    team: 'Mercedes',
    country: 'Finland',
    dob: '28/08/1989',
    placeOfBirth: 'Nastola, Finland'
  },
  {
    number: 5,
    name: 'Sebastian Vettel',
    team: 'Ferrari',
    country: 'Germany',
    dob: '03/07/1987',
    placeOfBirth: 'Heppenheim, Germany'
  },
];

const tracksData = [
  {
    name: 'Spa-Francorchamps',
    country: 'Belgium',
    length: 7.004,
    numberOfLaps: 44
  },
  {
    name: 'Circuit de Monaco',
    country: 'Monaco',
    length: 3.337,
    numberOfLaps: 78
  },
  {
    name: 'Silverstone',
    country: 'England',
    length: 5.891,
    numberOfLaps: 52
  },
];

const App = () => (
  
  
  <div className='bg-[#2d2d2d]'>
    <Fragment>
      <Navbar / >
    </Fragment>
    

    <Fragment>
      <Header title="A megszerelők" />
      <SuperResponsiveTable 
        tableData={data}
        headingColumns={['#', 'first_name', 'last_name', 'email', 'job', 'phone_number']}
        /* headingColumns={['#', 'Name', 'Team', 'Country', 'Date of birth', 'Place of birth']} */
        title="Szerelők"
      />
    </Fragment>
    
    <Footer />

   {/*  <div >
      <Navbar />
    </div>

    <div className='mt-20 p-5  mx-20 bg-slate-200  text-black font-bold bg-grey '>

    <SuperResponsiveTable />


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
