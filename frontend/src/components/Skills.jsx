import React from 'react'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import axios from '../api/axios';

const Skills = () => {
	const [category, setCategory] = React.useState('');
	const [data, setData] = React.useState([]);
	const [ids, setIds] = React.useState([]);
	const [names, setNames] = React.useState([]);
	const [skills, setSkills] = React.useState([]);
	const [skill, setSkill] = React.useState('');
	const [canLoad, setCanLoad] = React.useState(false)
	const [loaded, setLoaded] = React.useState(0)

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
				console.log("skills " + response?.data[0]?.Name)
			})
	}, [])

	React.useEffect(async () => {
		console.log("useeffect -0")
		setIds([])
		const URL = '/maincategory';
		await axios.get(URL, {
			params:
			{
				token: localStorage.getItem('token')
			}
		})
			.then((response) => {
				response?.data?.map((d) => {
					setIds(ids => [...ids, d._id])
				})
				console.log('asd')
			})

	}, [])

	React.useEffect(async () => {
		console.log('useEffec-1')
		setNames([])
		ids.map((id) => {
			axios.get('/category', {
				params:
				{
					maincategory: id,
					token: localStorage.getItem('token')
				}
			})
				.then((response) => {
					response?.data[0].categorys.map((category) => {
						setNames(names => [...names, category.Name])
						setCanLoad(true)
					})
				})
		})

		console.log(canLoad) 
		 /* names.map((names)=>(console.log("name: " + names))) */
	}, [])


	const load = () => {
		if(loaded > 1){
			return
		}
		setLoaded(loaded+1)
		setIds([])
		const URL = '/maincategory';
		axios.get(URL, {
			params:
			{
				token: localStorage.getItem('token')
			}
		})
			.then((response) => {
				response?.data?.map((d) => {
					setIds(ids => [...ids, d._id])
				})
				setNames([])
				ids.map((id) => {
					axios.get('/category', {
						params:
						{
							maincategory: id,
							token: localStorage.getItem('token')
						}
					})
						.then((response) => {
							response?.data[0].categorys.map((category) => {
								setNames(names => [...names, category.Name])
							})
						})
				})
				console.log('asd')
			})

	
	};
	const handleChange = (event) => {
		setCategory(event.target.value);
	};

	const buttonClick = () => {
		if(!canLoad){
			load()
		}
		setCanLoad(!canLoad)
	}
	return (
		<div >
			<Card sx={{ minWidth: 120 }} className='bg-white p-2'>
				{!canLoad ? <button className="bg-gray-500 hover:bg-gray-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={buttonClick} >
					ATTACH SKILL
				</button>
					:
					<div>
						<div className='flex justify-end'>
							<button className="bg-gray-500 hover:bg-gray-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline " onClick={buttonClick} >
								CLOSE
							</button>
						</div>

						<div className='mb-4'>
							<label htmlFor="addskill" className=' text-gray-700 text-sm font-bold mx-2 mb-10'>Add skill</label>
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
										names?.map((name) => (
											<MenuItem value={name}>{name}</MenuItem>
										))
									}
								</Select>
							</FormControl>
						</div>
						<div className='mt-4 w-60'>
								<FormControl fullWidth >
									<InputLabel id="demo-simple-select-label">Skill</InputLabel>
									<Select
										label="Skills"
										value={skill}
										onChange={(e) => setSkill(e.target.value)}
									>
										{
										skills.map((name) => (
											<MenuItem key={name._id} value={name._id}>{name.Name}</MenuItem>
										))
									}
									</Select>
								</FormControl>
							</div>
						<div className='flex justify-end my-2'>
							<button className="bg-gray-500 hover:bg-gray-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
								ATTACH SKILL
							</button>
						</div>

					</div>
				}


			</Card>

		</div>
	)
}

export default Skills