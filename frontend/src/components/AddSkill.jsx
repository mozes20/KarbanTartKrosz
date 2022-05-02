import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import axios from '../api/axios'


const AddSkill = () => {
	const [skillname, setSkillname] = React.useState('');
	const [description, setDescreption] = React.useState('');
	const [level, setLevel] = React.useState('');

	const buttonClick = () => {
		const URL = '/skill';
		axios.post(URL, {
			"name": skillname,
			"description": description,
			"level": level,
			token: localStorage.getItem('token')

		})
			.then((response) => {
				console.log(response)
			})
	}
	return (
		<div>
			<div className=' mt-10 justify-center flex '>
				<div className='flex'>
					<Card className='bg-white p-2 max-h-80'>
						<div>
							<div className='mb-4'>
								<label htmlFor="addskill" className=' text-gray-700 text-sm font-bold mx-2 mb-10'>	Create skill </label>
							</div>
							<div className='mt-4'>
								<TextField label="skillName" color='grey' focused
									value={skillname}
									onChange={(e) => setSkillname(e.target.value)}
								/>
							</div>
							<div className='mt-4'>
								<TextField label="Description" color='grey'
									focused value={description}
									onChange={(e) => setDescreption(e.target.value)}
								/>
							</div>
							<div className='mt-4'>
								<TextField label="Level" color='grey'
									focused value={level}
									onChange={(e) => setLevel(e.target.value)}
								/>
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


			</div>

		</div>

	);
}

export default AddSkill;