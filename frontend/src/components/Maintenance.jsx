import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
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

const columns = [
	{ field: '_id', headerName: 'ID', width: 70 },
  { field: 'Name', headerName: 'Device ame', width: 130 },
  { field: 'Location', headerName: 'Location', width: 130 },
  { field: 'ErrorDate', headerName: 'Error Date', width: 130 },
  { field: 'ErrorDescription', headerName: 'Error Description', width: 130 },
];

const Maintenance = () => {
	const [devices, setDevices] = React.useState([]);
	const [device, setDevice] = React.useState('');
	const [description, setDescription] = React.useState('');

	const [value, setValue] = React.useState(new Date());
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [categories, setCategories] = React.useState([]);
	const [category, setCategory] = React.useState('');
	const [jobName, setJobName] = React.useState('');
	const [jobs, setJobs] = React.useState([]);
	const [deviceArray, setDeviceArray] = React.useState([]);

	React.useEffect(() => {
		const URL = '/jobsDevice';
		axios.get(URL, {
			params:
			{
				token: localStorage.getItem('token')
			}
		})
			.then((response) => {
				setJobs(response?.data)
				console.log("jobs: " + response.data)
				jobs.map((d)=> {
					setDeviceArray(deviceArray => [...deviceArray,d.DeviceId]) 
				})
				/* console.log("device array: "+deviceArray[0].Name) */
			})
	}, [])


	React.useEffect(() => {
		const URL = '/categories';
		axios.get(URL, {
			params:
			{
				token: localStorage.getItem('token')
			}
		})
			.then((response) => {
				setCategories(response?.data)
				console.log(response?.data)

			})
	}, [])

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
	const registerJob = () => {
		axios.post('/emergencyjob', {
			"deviceid": device,
			"ErrorDescription": description,
			"JobName  ": jobName,
			token: localStorage.getItem('token')
		})
			.then((response) => {
				console.log(response)
			})
	}

	const HandleChangeCategory = (event) => {
		setCategory(event.target.value)
		console.log("category: " + category)

		axios.get('/alldevic', {
			params:
			{
				/* "category": category, */
				token: localStorage.getItem('token')
			}
		})
			.then((response) => {
				setDevices(response?.data)
				console.log('setf: ' + devices[0].Name)
				console.log("devices: " + response?.data[0].Name)
			})
	}
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};
	return (
		<div>
			<div className=' mt-10 justify-center flex '>
				<div className='flex mr-20'>
					<Card className='bg-white p-2 max-h-100'>
						<div>
							<div className='mb-4'>
								<label htmlFor="addskill" className=' text-gray-700 text-sm font-bold mx-2 mb-10'>	Register Job </label>
							</div>
							<div className='mt-4'>
								<FormControl fullWidth >
									<InputLabel >Device</InputLabel>
									<Select
										value={device}
										label="devices"
										onChange={(e) => setDevice(e.target.value)}
									>
										{
											devices?.map((d) => (
												<MenuItem key={d._id} value={d._id}>{d.Name}</MenuItem>
											))
										}
									</Select>
								</FormControl>
							</div>
							<div className='mt-4'>
								<TextField label="Details" color='grey' focused
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								/>
							</div>
							<div className='mt-4'>
								<TextField label="Job name" color='grey' focused
									value={jobName}
									onChange={(e) => setJobName(e.target.value)}
								/>
							</div>
							<div className='mt-4'>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<Stack spacing={3}>
										<DesktopTimePicker
											label="For desktop"
											value={value}
											onChange={(newValue) => {
												setValue(newValue);
											}}
											renderInput={(params) => <TextField {...params} />}
										/>
									</Stack>
								</LocalizationProvider>
							</div>
							<div className='flex justify-end my-2'>
								<button className="bg-gray-500 hover:bg-gray-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
									onClick={registerJob}
								>
									REGISTER JOB
								</button>
							</div>
						</div>
					</Card>
				</div>
				<div style={{ height: 400, width: '100%' }} className='bg-white'>
					<DataGrid
					/*  getRowId={(row) => row.internalId} */
						rows={[]}
						columns={columns}
						pageSize={5}
						rowsPerPageOptions={[5]}
						checkboxSelection
					/>
				</div>
			</div>
		</div>

	);
}

export default Maintenance;