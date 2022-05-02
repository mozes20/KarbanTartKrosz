import React, { Children } from 'react'
import { useEffect, useState } from 'react'
import axios from '../api/axios'
import Skills from './Skills';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Button from '@mui/material/Button';
import { Time } from './Time';
import AddSkill from './AddSkill';


const Dropdown = () => {
	const [datas, setData] = useState([]);
	const [subCategories, setSubcategories] = useState([]);

	const [open, setOpen] = useState(false);
	const [openID, setOpenID] = useState(0);
	const [buttonName, setButtonName] = useState('ADD CATEGORY');
	const [mainCategory, setMainCategory] = useState('');
	const [category, setCategory] = useState('');
	const [added, setAdded] = useState(false);

	useEffect(() => {
		const URL = '/maincategory';
		axios.get(URL, {
			params:
			{
				token: localStorage.getItem('token')
			}
		})
			.then((response) => setData(response?.data))
	}, [])

	const categoryForm = () => {
		open ? setButtonName('ADD CATEGORY') : setButtonName('CLOSE FORM')
		setOpen(!open)
		setAdded(false)
	}
	const addCategory = () => {
		if (mainCategory != '') {
			if (category == '') {

				console.log('justMaincategory')
				axios.post('/maincategory', {
					name: mainCategory,
					token: localStorage.getItem('token')
				})
					.then((response) => console.log(response))
				setAdded(true)
			} else {
				console.log('BothCategory is set')
				console.log(datas)
				let id = ''
				datas.map((data) => {
					if (data.Name == mainCategory) {
						id = data._id
					}
				})
				console.log('id: ' + id);
				axios.post('/category', {
					name: category,
					maincategory: id,
					token: localStorage.getItem('token')
				})
					.then((response) => console.log(response))
				setAdded(true)
			}
		}
		setMainCategory('')
		setCategory('')
	}
	const handleClick = (value) => {
		console.log(value)
		const URL = '/category';
		axios.get(URL, {
			params:
			{
				maincategory: value,
				token: localStorage.getItem('token')
			}
		})
			.then((response) => setSubcategories(response?.data[0].categorys))
			.then((response) => console.log(response?.data[0]))

		if (value != openID) {
			setOpenID(value);
		} else {
			setOpenID(0);
		}
		/* .then((response) => console.log(response?.data[0].categorys)) */
	};
	const [icon, setIcon] = useState('false')
	return (
		<div >
			<div className=' mt-10 justify-center flex'>
				<div className='flex mr-10'>
				<AddSkill/>
				</div>
			<div className='flex mr-10'>
					<Time />
				</div>
				<div className='flex mr-10'>
					<Skills />
				</div>
					<List
						sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
						component="nav"
						aria-labelledby="nested-list-subheader"
						subheader={
							<ListSubheader component="div" id="nested-list-subheader">
								Categories
							</ListSubheader>
						}
					>
						{datas?.map((data) => (
							<div>
								<div>
									<ListItemButton key={data._id} value={data._id} onClick={() => handleClick(data._id)}>
										<ListItemIcon>
											<InboxIcon />
										</ListItemIcon>
										<ListItemText primary={data.Name} />
										{icon ? (!(openID != data._id) ? <ExpandLess /> : <ExpandMore />) : ""}
									</ListItemButton>
								</div>
								<div>
									{subCategories?.map((category) => (
										<Collapse in={openID === data._id} timeout="auto" unmountOnExit>
											<List component="div" disablePadding>
												<ListItemButton sx={{ pl: 4 }}>
													<ListItemIcon>
														<StarBorder />
													</ListItemIcon>
													<ListItemText primary={category.Name} />
												</ListItemButton>
											</List>
										</Collapse>
									))}

								</div>
							</div>
						))}
					</List>
				</div>
			<div className='justify-center flex ml-56 mt-4'>
				<Button variant="contained" onClick={categoryForm}>{buttonName}</Button>
			</div>
			<div className='flex justify-center'>
				{
					open ?
						<section >
							<div className='md:flex md:justify-center mt-4'>
								<div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
									<label htmlFor="username" className=' text-gray-700 text-sm font-bold mx-2'>Main Category:</label>
									<input
										type='text'
										className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
										placeholder="Main Category"
										autoComplete="off"
										onChange={(e) => setMainCategory(e.target.value)}
										value={mainCategory}
										required
									/>
									<label htmlFor="username" className=' text-gray-700 text-sm font-bold mx-2'>Category:</label>
									<input
										type='text'
										className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
										placeholder="Category"
										autoComplete="off"
										onChange={(e) => setCategory(e.target.value)}
										value={category}
									/>
									<div className="flex items-center justify-end mt-5">
										{
											added ?
												<span className='mx-10 text-green-700 text-lg'> Succsessfuly added! </span>
												:
												''
										}
										<button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={addCategory}>
											Add Category
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
	)
}

export default Dropdown
