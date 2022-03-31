import React from 'react'
import { useState, useMemo, useEffect } from 'react'
import MaterialTable from 'material-table'
import { MuiThemeProvider, createTheme } from '@material-ui/core'

import { COLUMNS } from './Columns'
import axios from '../../api/axios';

const URL = '/maincategory'

const empList = [
	{ id: 1, name: 'Mózes', email: 'exmp@asd.com', status: 1 },
	{ id: 2, name: 'Tamas Gaywood', email: 'exm2p@asd.com', status: 1 },
	{ id: 3, name: 'Armando', email: 'exmp3@asd.com', status: 0 },
	{ id: 4, name: 'Bence', email: 'exmp4@asd.com', status: 1 },
]

const toolList = [
	{ id: 1, name: 'Utvefuro', location: 'Hungary', category: 1 },
]

const AdminTable = () => {

	useEffect(() => {
		axios
			.get(URL, {
				params:
				{
					token: localStorage.getItem('token')
				}
			})
			.then((response) => console.log(response))
			.then((error) => console.log(error))
	})

	const columns = useMemo(() => COLUMNS, [])
	const [data, setData] = useState(toolList)

	const theme = createTheme({
		palette: {
			mode: 'dark',
		}
	});

	return (
		<div className='mt-40'>
			<MaterialTable
				title='Tools'
				data={data}
				columns={columns}
				editable={{
					onRowAdd: (newRow) =>
						new Promise((resolve, reject) => {
							const updatedRows = [...data, { id: 5, ...newRow }]
							setTimeout(() => {
								setData(updatedRows)
								resolve()
							}, 1500)
						}),
					onRowDelete: (selectedRow) =>
						new Promise((resolve, reject) => {
							const index = selectedRow.tableData.id;
							const updatedRows = [...data]
							updatedRows.splice(index, 1)
							setTimeout(() => {
								setData(updatedRows)
								resolve()
							}, 1500)
						}),
					onRowUpdate: (newData, oldData) =>
						new Promise((resolve, reject) => {
							setTimeout(() => {
								const dataUpdate = [...data];
								const index = oldData.tableData.id;
								dataUpdate[index] = newData;
								setData([...dataUpdate]);

								resolve();
							}, 1000);
						}),
				}}
				options={{
					actionsColumnIndex: -1,
					addRowPosition: 'first',
				}}

			/>
		</div>
	)
}

export default AdminTable