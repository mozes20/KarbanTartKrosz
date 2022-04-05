import React from 'react'
import { useState, useMemo, useEffect, setState } from 'react'
import MaterialTable from 'material-table'
import Button from '@mui/material/Button';
import axios from '../../api/axios';



const AdminTable = () => {
	const [data, setData] = useState([])
	const [dataName, setDataName] = useState('')
	const [category, setCategory] = useState([]);
	let lookupArray = [''];
	lookupArray.push('asdcategory')
	const addNewDevice = (value) => {
		try {
			console.log('addnew ' + value.Name)
			axios.post('/device', {

				name: value.Name,
				location: value.Location,
				category: "62456cddf27a4458d58dfdc2",
				token: localStorage.getItem('token')

			})
				.then((response) => console.log(response))
		} catch (error) {
			console.log(error)
		}

	}

/* 	useEffect(() => {
		const URL = '/category';
		axios.get(URL, {
			params:
			{
				maincategory: '6244aa4742838825e4dae8c5',
				token: localStorage.getItem('token')
			}
		})
			.then((response) => {
				setCategory(response?.data[0].categorys[0])
				console.log(response?.data[0].categorys[0].Name);
			})
	}, [])
 */

	useEffect(() => {
		const URL = '/devices';
		axios.get(URL, {
			params:
			{
				category: "62456cddf27a4458d58dfdc2",
				token: localStorage.getItem('token')
			}
		})
			.then((response) => {
				setData(response?.data[0]?.devices)
				setDataName(response?.data[0]?.Name)
			})

	}, [])

	const columns = React.useMemo(() => ([
		{
			title: 'ID', field: '_id', editable: false,
			cellStyle: {
				backgroundColor: '#039be5',
				color: '#FFF'
			}
		},
		{ title: 'Name', field: 'Name' },
		{ title: 'Location', field: 'Location' },
		{
			title: 'Category',
			field: 'Category',
			render: rowData => dataName,
	  	lookup: category,
		},
	]), [category]);
	return (
		<div className='mt-40 lg:mx-40 md:mx-20'>
			<MaterialTable
				title='Tools'
				data={data}
				columns={([
					{
						title: 'ID', field: '_id', editable: false,
						cellStyle: {
							backgroundColor: '#039be5',
							color: '#FFF'
						}
					},
					{ title: 'Name', field: 'Name' },
					{ title: 'Location', field: 'Location' },
					{
						title: 'Category',
						field: 'Category',
						render: rowData => dataName,
						lookup: {'0':'hidd el mukodik', '1':'szia bence', '2':'dfg'},
					},
				])}
				editable={{
					onRowAdd: (newRow) =>
						new Promise((resolve, reject) => {
							const updatedRows = [...data, { ...newRow }]
							setTimeout(() => {
								setData(updatedRows)
								addNewDevice(newRow)
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
					grouping: false,
				}}

			/>
		</div>
	)
}

export default AdminTable