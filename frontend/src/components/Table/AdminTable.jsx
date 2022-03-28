import React from 'react'
import { useState, useMemo } from 'react'
import MaterialTable from 'material-table'
import { MuiThemeProvider, createTheme } from '@material-ui/core'

import { COLUMNS } from './Columns'

const empList = [
	{ id: 1, name: 'Mózes', email: 'exmp@asd.com', status: 1 },
	{ id: 2, name: 'Tamas Gaywood', email: 'exm2p@asd.com', status: 1 },
	{ id: 3, name: 'Armando', email: 'exmp3@asd.com', status: 0 },
	{ id: 4, name: 'Bence', email: 'exmp4@asd.com', status: 1 },
]

const AdminTable = () => {

	const columns = useMemo(() => COLUMNS, [])
	const [data, setData] = useState(empList)

	const theme = createTheme({
		palette: {
				mode: 'dark',
		}
	});

	return (
		<div>
				<MaterialTable
					title='Employees'
					data={data}
					columns={columns}
					editable={{
						onRowAdd: (newRow) =>
							new Promise((resolve, reject) => {
								const updatedRows = [...data, { id: 6, ...newRow }]
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