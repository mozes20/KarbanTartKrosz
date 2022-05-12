import * as React from 'react';
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
import { Description } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import axios from '../api/axios';


const columns = [
	{ field: '_id', headerName: 'ID', width: 70 },
  { field: 'Name', headerName: 'Device ame', width: 130 },
  { field: 'Location', headerName: 'Location', width: 130 },
  { field: 'ErrorDate', headerName: 'Error Date', width: 130 },
  { field: 'ErrorDescription', headerName: 'Error Description', width: 130 },
];

const Jobs = () => {
	React.useEffect(() => {
		const URL = '/jobDev';
		axios.get(URL, {
			params:
			{
				token: localStorage.getItem('token')
			}
		})
			.then((response) => {
				console.log("jobs: " + response.data[0]._id)
			})
	}, [])


	return(
	<div>
	

	</div>
	);
}
export default Jobs;