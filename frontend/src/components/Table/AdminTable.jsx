import React from 'react'
import { useState, useMemo, useEffect, setState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from '../../api/axios';


const columns = [
	{
		title: 'ID', field: '_id', editable: false, width:250
	},
	{ title: 'Name', field: 'Name', width:200 },
	{ title: 'Location', field: 'Location', width:130 },
	{
		title: 'Category',
		field: 'Category',
		width:250
		/* render: rowData => dataName,
		lookup: { '0': 'hidd el mukodik', '1': 'szia bence', '2': 'dfg' }, */
	},
]

const AdminTable = () => {
	const [data, setData] = useState([])
	const [name, setName] = useState('')
	const [location, setLocation] = useState('')
	const [category, setCategory] = useState('');
	const [categories, setCategories] = useState([]);
	const [devices, setDevices] = useState([]);

	/* 	const addNewDevice = (value) => {
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
	 */


	React.useEffect(() => {
		const URL = '/alldevic';
		axios.get(URL, {
			params:
			{
				token: localStorage.getItem('token')
			}
		})
			.then((response) => {
				setDevices(response?.data)
				console.log(response?.data)
				
			})
	}, [])

	return (
		<div className='mt-40 lg:mx-40 md:mx-20'>
			<div style={{ width: '100%' }}>
				<Box sx={{ height: 400, bgcolor: 'background.paper' }}>
					<DataGrid hideFooter 
					getRowId={(row) => row._id}
					rows={devices} 
					columns={columns} />
				</Box>
			</div>
		</div>
	);
}

export default AdminTable