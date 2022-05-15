import React from 'react'
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from '../api/axios';
import { Description } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import useAuth from "../hooks/useAuth";

const columns = [
	{ field: '_id', headerName: 'job ID', width: 220 },
	{ field: 'Name', headerName: 'Device name', width: 130 },
	{ field: 'Location', headerName: 'Location', width: 130 },
	{ field: 'ErrorDate', headerName: 'Error Date', width: 220 },
	{ field: 'ErrorDescription', headerName: 'Error Description', width: 130 },
	{
		field: 'Status', headerName: 'Status', editable: true, width: 130
	},
];

const MyJobs = () => {

	const [jobs, setJobs] = React.useState([])
	const [selectedData, setSelectedData] = React.useState([]);
	const { auth } = useAuth()

	React.useEffect(() => {
		setJobs([])
		const URL = '/jobsDevice';
		axios.get(URL, {
			params:
			{
				jobsDevice: auth?.username,
				token: localStorage.getItem('token')
			}
		})
			.then((response) => {
				console.log(response.data)
				response.data.map((d) => {
					let status = ""
					d.Status == -1 ? status = 'declined' : status = status
					d.Status == 1 ? status = 'waiting' : status = status
					d.Status == 2 ? status = 'accepted' : status = status
					d.Status == 3 ? status = 'in progress' : status = status
					d.Status == 4 ? status = 'finished' : status = status
					let obj = {
						_id: d._id,
						Name: d.DeviceId.Name,
						Location: d.DeviceId.Location,
						ErrorDate: d.ErrorDate,
						ErrorDescription: d.ErrorDescription,
						Status: status,
					}

					setJobs(jobs => [...jobs, obj])
				})
			})
	}, [])

	const accept = async (e) => {
		e.preventDefault()
		if (selectedData[0].Status == 'waiting') {
			axios.put('/status', {
				jobId: selectedData[0]._id,
				token: localStorage.getItem('token')
			})
				.then((response) => {
					console.log(response)
				})
		}
	}
	const start = async (e) => {
		e.preventDefault()
		if (selectedData[0].Status == 'accepted') {
			axios.put('/status', {
				jobId: selectedData[0]._id,
				token: localStorage.getItem('token')
			})
				.then((response) => {
					console.log(response)
				})
		}
	}

	const finish = async (e) => {
		e.preventDefault()
		if (selectedData[0].Status == 'in progress') {
			axios.put('/status', {
				jobId: selectedData[0]._id,
				token: localStorage.getItem('token')
			})
				.then((response) => {
					console.log(response)
				})
		}
	}
	const decline = async (e) => {
		e.preventDefault()

		axios.post('/status', {
			jobId: selectedData[0]._id,
			token: localStorage.getItem('token')
		})
			.then((response) => {
				console.log(response)
			})

	}



	return (
		<div>
			<div style={{ height: 400 }} className='bg-white mx-40 flex justify-center'>
				<DataGrid
					getRowId={(row) => row._id}
					rows={jobs}
					columns={columns}
					pageSize={10}
					rowsPerPageOptions={[10]}
					checkboxSelection={true}
					onSelectionModelChange={(ids) => {
						const selectedIDs = new Set(ids)
						const selectedRowData = jobs.filter((row) =>
							selectedIDs.has(row._id.toString())
						)
						setSelectedData(selectedRowData)
						console.log(selectedRowData)
					}
					}
				/>
			</div>
			<div className='mx-40'>
				<div className="flex items-center justify-end mt-5">
					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold 
					py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-1"
						onClick={accept}
					>
						Accept
					</button>
					<button className="mx-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						onClick={start}
					>
						Start
					</button>
					<button className="mx-1 bg-white hover:bg-green-300 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						onClick={finish}
					>
						Finished
					</button>
					<button className="mx-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						onClick={decline}
					>
						Decline
					</button>
				</div>
			</div>

		</div>
	)
}

export default MyJobs;