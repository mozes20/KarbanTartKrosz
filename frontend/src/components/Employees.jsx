import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import axios from '../api/axios'



const Employees = () => {
	const [datas, setData] = React.useState([]);
	const Permissions = [
		'1', '2', '3'
	]
	const [permission, setPermission] = React.useState('');
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [skills, setSkills] = React.useState([]);
	const [skill, setSkill] = React.useState('');
	const [users, setUsers] = React.useState([]);
	const [user, setUser] = React.useState('');

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

	React.useEffect(() => {
		const URL = '/user';
		axios.get(URL, {
			params:
			{
				token: localStorage.getItem('token')
			}
		})
			.then((response) => {
				setUsers(response?.data?.data)
				console.log("users: " + response?.data?.data[0]._id)
			})
	}, [])

	const attachSkill = () => {
		axios.put('/skilluser', {
			"user": user,
			"skillid": skill,
			token: localStorage.getItem('token')

		})
			.then((response) => {
				console.log(response?.data)
			})
	}

	const handleChange = (event) => {
		setPermission((event.target.value))
	};
	const buttonClick = () => {
		console.log(username + " " + password + " " + permission)
		const URL = '/register';
		axios.post(URL, {
			"username": username,
			"password": password,
			"permission": permission,
			token: localStorage.getItem('token')

		})
			.then((response) => {
				console.log(response)
			})
	}
	return (
		<div>
			<div className=' mt-10 justify-center flex '>
				<div className='flex mr-20'>
					<Card className='bg-white p-2 max-h-80'>
						<div>
							<div className='mb-4'>
								<label htmlFor="addskill" className=' text-gray-700 text-sm font-bold mx-2 mb-10'>	Attach skill to employee </label>
							</div>
							<div className='mt-4'>
								<TextField label="Username" color='grey' focused
									value={username}
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>
							<div className='mt-4'>
								<TextField label="Password" color='grey'
									focused value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div className='mt-4'>
								<FormControl fullWidth >
									<InputLabel id="demo-simple-select-label">Permission</InputLabel>
									<Select
										label="Permission"
										value={permission}
										onChange={handleChange}
									>
										{
											Permissions?.map((name) => (
												<MenuItem key={name} value={name}>{name}</MenuItem>
											))
										}
									</Select>
								</FormControl>
							</div>
							<div className='flex justify-end my-2'>
								<button className="bg-gray-500 hover:bg-gray-700 text-white text-sm 
								font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={buttonClick} >
									REGISTER
								</button>
							</div>
						</div>
					</Card>
				</div>
				<div className='flex mr-20'>
					<Card className='bg-white p-2 max-h-100 w-44'>
						<div>
							<div className='mb-4'>
								<label htmlFor="addskill" className=' text-gray-700 text-sm font-bold mx-2 mb-10'>	Attach Skill </label>
							</div>
							<div className='mt-4'>
								<FormControl fullWidth >
									<InputLabel id="demo-simple-select-label mt-10">Users</InputLabel>
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

export default Employees;