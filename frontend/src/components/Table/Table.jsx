import React, { useState, useEffect, useMemo } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import MOCK_DATA from '../MOCK_DATA.json'
import { COLUMNS } from './Columns'
import { ClassNames } from '@emotion/react'

const columns = [
  { field: 'id', headerName: 'ID', },
  { field: 'title', headerName: 'Title', width:600},
  { field: 'body', headerName: 'Body', width: 300 },

]

const Table = () => {

  const [tableData, setTableData] = useState([])
  /*   const columns = useMemo(() => COLUMNS, []) */


  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((data) => data.json())
      .then((data) => setTableData(data))
  })

  return (
    <div style={{ height: 400 }} className='justify-center'>
      <div style={{ display: 'flex', height: '100%' }} >
        <div style={{ flexGrow: 1 }}>
          <DataGrid sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
            rows={tableData}
            columns={columns}
            pageSize={10}
            checkboxSelection
            rowsPerPageOptions={[10]}
          />
        </div>
      </div>
    </div>


  )
}

export default Table