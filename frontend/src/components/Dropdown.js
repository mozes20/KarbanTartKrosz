import React, { Children } from 'react'
import { useEffect, useState } from 'react'
import axios from '../api/axios'

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

const Dropdown = () => {
	const [datas, setData] = useState([]);
	const [counter, setCounter] = useState(0);

	const [open, setOpen] = useState(true);
	const [openID, setOpenID] = useState(0);

	const handleClick = (value) => {
		if (value != openID) {
			setOpenID(value);
		} else {
			setOpenID(0);
		}

		console.log(openID);
		setOpen(!open);
	};
	const addCategory = () => {
			const URL = '/maincategory';
			axios.post(URL, {
				name:"egyel tobb lett",
				token: localStorage.getItem('token')
			})
				/* .then((response) => console.log(response.data[0].Name)) */
				.then((response) => console.log(response))
				.then((error) => console.log(error))
	}

	useEffect(() => {
		const URL = '/maincategory';
		axios.get(URL, {
			params:
			{
				token: localStorage.getItem('token')
			}
		})
			/* .then((response) => console.log(response.data[0].Name)) */
			.then((response) => setData(response?.data))
	}, [])
	return (
		<div >
			<div className='justify-center flex mt-10'>
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
									{(openID != data._id) ? <ExpandLess /> : <ExpandMore />}
									{console.log(data._id)}
								</ListItemButton>
								<div>
									<Collapse in={openID === data._id} timeout="auto" unmountOnExit>
										<List component="div" disablePadding>
											<ListItemButton sx={{ pl: 4 }}>
												<ListItemIcon>
													<StarBorder />
												</ListItemIcon>
												<ListItemText primary="Furogep" />
											</ListItemButton>
										</List>
									</Collapse>
								</div>
							</div>

						</div>
					))}
				</List>

			</div>
			<div className='justify-center flex ml-56 mt-4'>
				<Button variant="contained" onClick={addCategory}>Add Category</Button>
			</div>
		</div>
	)
}


export default Dropdown
