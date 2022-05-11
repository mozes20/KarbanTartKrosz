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
	const [categoryID, setCategoryID] = React.useState('');
	const [interval, setInterval] = React.useState('');
	const timeInterval = [
		1,2,3,4,5,6,7,8,9,10
	]
	const [normaTime, setNormaTime] = React.useState('');
	const [description, setDescription] = React.useState('');

	React.useEffect(() => {
		const URL = '/categories';
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
		console.log(mainCategories)
	};
	const putTime = () => {
		console.log('category: ' + category)
		axios.put('/updatecategory', {
			"category": category,
			"interval": interval,
			"normatime": normaTime,
			"description": description,
			token: localStorage.getItem('token')
		})
		.then((response) => {
			console.log(response?.data)
		})
	};

	return (
		<div>
			<div className='flex justify-center'>
				
				<Card sx={{ minWidth: 120 }} className='bg-white p-2'>
					<div>
						<div className='mb-4'>
							<label htmlFor="addskill" className=' text-gray-700 text-sm font-bold mx-2 mb-10'>Modify category</label>
						</div>
						<div>
							<FormControl fullWidth >
								<InputLabel id="demo-simple-select-label mt-10">Category</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={category}
									label="Category"
									onChange={(e) => setCategory(e.target.value)}
								>
									{
										mainCategories?.map((mc) => (
											<MenuItem key={mc._id} value={mc._id}>{mc.Name}</MenuItem>
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
									onChange={(e) => setInterval(e.target.value)}
								>
									{
										timeInterval?.map((ti) => (
											<MenuItem key={ti} value={ti}>{ti + " hét"}</MenuItem>
										))
									}
								</Select>
							</FormControl>
						</div>
						<div className='mt-4'>
							<TextField label="Normatime" color='grey' focused 
							value={normaTime}
							onChange={(e) => setNormaTime(e.target.value)}
							/>
						</div>
						<div className='mt-4'>
							<TextField label="Description" color='grey' focused 
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							/>
						</div>
						<div className='flex justify-end my-2'>
								<button className="bg-gray-500 hover:bg-gray-700 text-white text-sm 
								font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={putTime} >
									ADD
								</button>
							</div>
					</div>
				</Card>
			</div>
		</div>
	)

}