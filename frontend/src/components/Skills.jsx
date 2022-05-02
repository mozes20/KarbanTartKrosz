import React from 'react'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import axios from '../api/axios';

const Skills = () => {

	const [categories, setCategories] = React.useState([]);
	const [category, setCategory] = React.useState('');
	const [skills, setSkills] = React.useState([]);
	const [skill, setSkill] = React.useState('');
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
		const URL = '/skills';
		axios.get(URL, {
			params:
			{
				token: localStorage.getItem('token')
			}
		})
			.then((response) => {
				setSkills(response?.data)
				console.log(response?.data)
			})
	}, [])

	const attachSkill = () => {
		axios.put('/skillcategory', {
			"category": category,
			"skillid": skill,
			token: localStorage.getItem('token')

		})
			.then((response) => {
				console.log(response?.data)
			})
	}

	return (
		<div>
			<div className=' mt-10 justify-center flex'>
				<div className='flex mr-20'>
					<Card className='bg-white p-2 max-h-100 w-44'>
						<div>
							<div className='mb-4'>
								<label htmlFor="addskill" className=' text-gray-700 text-sm font-bold mx-2 mb-10'>	Attach Skill </label>
							</div>
							<div className='mt-4'>
								<FormControl fullWidth >
									<InputLabel id="demo-simple-select-label mt-10">Category</InputLabel>
									<Select
										value={category}
										label="categories"
										onChange={(e) => setCategory(e.target.value)}
									>
										{
											categories?.map((mc) => (
												<MenuItem key={mc._id} value={mc._id}>{mc.Name}</MenuItem>
											))
										}
									</Select>
								</FormControl>
							</div>
							<div className='mt-4'>
								<FormControl fullWidth >
									<InputLabel >Skills</InputLabel>
									<Select
										value={skill}
										label="skills"
										onChange={(e) => setSkill(e.target.value)}
									>
										{
											skills?.map((d) => (
												<MenuItem key={d._id} value={d._id}>{d.Name}</MenuItem>
											))
										}
									</Select>
								</FormControl>
							</div>
							<div className='flex justify-end my-2'>
								<button className="bg-gray-500 hover:bg-gray-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
									onClick={attachSkill}
								>
									ATTACH SKILL
								</button>
							</div>
						</div>
					</Card>
				</div>


			</div>

		</div>

	);
}

export default Skills