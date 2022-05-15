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
import Jobs from './Jobs';
import { gridColumnsMetaSelector } from '@material-ui/data-grid';

const columns = [
	{ field: '_id', headerName: 'job ID', width: 220},
	{ field: 'Name', headerName: 'Device name', width: 130 },
	{ field: 'Location', headerName: 'Location', width: 130 },
	{ field: 'ErrorDate', headerName: 'Error Date', width: 220 },
	{ field: 'ErrorDescription', headerName: 'Error Description', width: 130 },
	{ field: 'Status', headerName: 'Status', type: 'number', editable: true, width: 70 },
	{ field: 'Skills', headerName: 'Skills',  width: 300 },
];

const Maintenance = () => {
	const [devices, setDevices] = React.useState([]);
	const [device, setDevice] = React.useState('');
	const [description, setDescription] = React.useState('');
	const [selectedData, setSelectedData] = React.useState([]);
	const [value, setValue] = React.useState(new Date());
	const [categories, setCategories] = React.useState([]);
	const [category, setCategory] = React.useState('');
	const [jobName, setJobName] = React.useState('');
	const [jobs, setJobs] = React.useState([]);
	const [deviceID, setDeviceID] = React.useState([]);
	const [users, setUsers] = React.useState([]);
	const [user, setUser] = React.useState('');
	const [canSelect, setCanSelect] = React.useState(true);
	const [temp, setTemp] = React.useState([]);

	React.useEffect(() => {
		let i = 0
		setDeviceID([])
		const URL = '/jobDev';
		axios.get(URL, {
			params:
			{
				token: localStorage.getItem('token')
			}
		})
			.then((response) => {
				setJobs(response.data)
				console.log(response.data[0]._id)
				response.data.map((d) => {
					i++
					let obj = {
						_id: d._id,
						Name: d.DeviceId.Name,
						Location: d.DeviceId.Location,
						ErrorDate: d.ErrorDate,
						ErrorDescription: d.ErrorDescription,
						Status: d.Status,
						Skills: d.DeviceId.Category.skills,
					}
					/* console.log("skills")
					console.log(d.DeviceId.Category.skills) */
					setDeviceID(deviceID => [...deviceID, obj])
				})
				/* deviceID.map((d) => (console.log(d))) */
			})
	}, [])

	React.useEffect(() => {
		const URL = '/user';
		axios.get(URL, {
			params:
			{
				token: localStorage.getItem('token')
			}
		})
			.then((response) => {
				setUsers(response?.data.data)
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
	const [open, setOpen] = React.useState(true);
	const addJobToEmployee = () => {
		let i = 0
		users.map((u) =>{
			
			if(u._id == user && u.Skills.length != 0){
				console.log("u.skills: ")
			console.log(u.Skills)
				u.Skills.map((s) => {
					console.log(selectedData)
					if(selectedData[0].Skills.length != 0){
						selectedData[0].Skills.map((sd) => {
							console.log("asd")
							if(sd == s){
								i++
							}
						})
					}
				})
			}
		})
		if(i == selectedData[0].Skills.length){
			console.log("megvan a kepesitese a munkahoz")

			axios.put('/usertojob', {
				jobId: selectedData[0]._id,
				token: localStorage.getItem('token')
			})
				.then((response) => {
					console.log(response)
				})
				
			axios.put('/status', {
				jobId: selectedData[0]._id,
				token: localStorage.getItem('token')
			})
				.then((response) => {
					console.log(response)
				})
		}
		
	}

	const handleClick = () => {
		setOpen(!open);
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
				<div>
					{/* <Jobs /> */}
				</div>
				<div style={{ height: 400, width: '100%' }} className='bg-white mr-12'>
					<DataGrid
						getRowId={(row) => row._id}
						rows={deviceID}
						columns={columns}
						pageSize={10}
						rowsPerPageOptions={[10]}
						checkboxSelection ={true}
						onSelectionModelChange={(ids) => {
							const selectedIDs = new Set(ids)
							const selectedRowData = deviceID.filter((row) =>
								selectedIDs.has(row._id.toString())
							)							
							setSelectedData(selectedRowData)
							console.log(selectedRowData)
						}
						}
					/>
				</div>
			</div>

			<div className="flex justify-end mt-2 mr-12">
				{
					!open ?
						<button className="justify-end bg-gray-500 hover:bg-gray-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							onClick={handleClick}
						>
							ATTACH JOB
						</button> :
						open ?
							<section >
								<div className="justify-end flex ">
									<button className="justify-end bg-gray-500 hover:bg-gray-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
										onClick={handleClick}
									>
										Close
									</button>
								</div>
								<div className='md:flex md:justify-center mt-4'>
									<div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
										<label htmlFor="username" className=' text-gray-700 text-sm font-bold mx-2'>Job:</label>
										<span className='mr-4'>{selectedData.length != 0 ? selectedData[0].Name + " "+selectedData[0].ErrorDescription + " " +selectedData[0].Location: "no job selected"}</span>

										<FormControl className='w-60'>
											<InputLabel >Employee</InputLabel>
											<Select
												value={user}
												label="users"
												onChange={(e) => setUser(e.target.value)}
											>
												{
													users?.map((d) => (
														<MenuItem key={d._id} value={d._id}>{d.Username}</MenuItem>
													))
												}
											</Select>
										</FormControl>
										<div className="flex items-center justify-end mt-5">
											<button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
												onClick={addJobToEmployee}
											>
												Attach job to Employee
											</button>
										</div>
									</div>
								</div>
							</section>
							:
							null
				}
			</div>
		</div>

	);
}

export default Maintenance;