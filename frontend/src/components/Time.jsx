import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import axios from '../api/axios';

export const Time = () => {

	const [mainCategories, setMainCategories] = React.useState([]);
	const [category, setCategory] = React.useState('');
	const [interval, setInterval] = React.useState('');
	const timeInterval = [
		1,2,3,4,5,6,7,8,9,10
	]

	React.useEffect(() => {
		const URL = '/maincategory';
		axios.get(URL, {
			params:
			{
				token: localStorage.getItem('token')
			}
		})
			.then((response) => {
				setMainCategories(response?.data)
				console.log(response?.data)
			})
	}, [])
	const handleChange = (event) => {
		setCategory(event.target.value);
	};

	return (
		<div>
			<div className='flex justify-center'>
				<Card sx={{ minWidth: 120 }} className='bg-white p-2'>
					<div>
						<div className='mb-4'>
							<label htmlFor="addskill" className=' text-gray-700 text-sm font-bold mx-2 mb-10'>Add time inteval</label>
						</div>
						<div>
							<FormControl fullWidth >
								<InputLabel id="demo-simple-select-label mt-10">Category</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={category}
									label="Category"
									onChange={handleChange}
								>
									{
										mainCategories?.map((mc) => (
											<MenuItem value={mc.Name}>{mc.Name}</MenuItem>
										))
									}
								</Select>
							</FormControl>
							<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label " className='mt-4'>Time Interval</InputLabel>
							<Select
							className='mt-4'
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={interval}
									label="Time Interval"
									onChange={handleChange}
								>
									{
										timeInterval?.map((ti) => (
											<MenuItem value={ti}>{ti + " hét"}</MenuItem>
										))
									}
								</Select>
							</FormControl>
						</div>
						<div className='mt-4'>
							<TextField label="Required Time" color='grey' focused />
						</div>
						<div className='mt-4'>
							<TextField label="Instructions" color='grey' focused />
						</div>

					</div>
				</Card>
			</div>
		</div>
	)

}