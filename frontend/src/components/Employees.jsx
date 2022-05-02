import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import axios from '../api/axios'

const columns = [
	{ id: 'id', label: 'ID', minWidth: 100 },
	{ id: 'name', label: 'Name', minWidth: 170 },
	{ id: 'permission', label: 'Permission', minWidth: 170 },
	{ id: 'skills', label: 'Skills', minWidth: 170 },
];

function createData(id, name, permission, skills) {
	return { id, name, permission, skills };
}

const rows = [
	createData('1', 'Teszt1', 'Karbantartó', ['skill1, ', 'skill2, ']),
	createData('2', 'Teszt2', 'Karbantartó'),
	createData('3', 'Teszt3', 'Karbantartó'),
];

const Employees = () => {
	const [datas, setData] = React.useState([]);
	const Permissions = [
		'1','2','3'
	]
	const [permission, setPermission] = React.useState('');
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};
	const handleChange = (event) => {
		setPermission((event.target.value))
	};
	const buttonClick = () => {
			console.log(username + " " + password + " " + permission)
			const URL = '/register';
		axios.post(URL, {
			"username": username,
			"password": password,
			"permission" : permission,
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
								<label htmlFor="addskill" className=' text-gray-700 text-sm font-bold mx-2 mb-10'>	Register </label>
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

				<div>
				{/* 	<Paper sx={{ width: '100%', overflow: 'hidden' }} >
						<TableContainer sx={{ maxHeight: 440 }}>
							<Table stickyHeader aria-label="sticky table">
								<TableHead>
									<TableRow>
										{columns.map((column) => (
											<TableCell
												key={column.id}
												align={column.align}
												style={{ minWidth: column.minWidth }}
											>
												{column.label}
											</TableCell>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									{rows
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((row) => {
											return (
												<TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
													{columns.map((column) => {
														const value = row[column.id];
														return (
															<TableCell key={column.id} align={column.align}>
																{column.format && typeof value === 'number'
																	? column.format(value)
																	: value}
															</TableCell>
														);
													})}
												</TableRow>
											);
										})}
								</TableBody>
							</Table>
						</TableContainer>
						<TablePagination
							rowsPerPageOptions={[10, 25, 100]}
							component="div"
							count={rows.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>

					</Paper> */}
				</div>
				<div className='flex ml-20'>
					{/* <Card className='bg-white p-2 max-h-80 w-60'>
						<div>
							<div className='mb-4'>
								<label htmlFor="addskill" className=' text-gray-700 text-sm font-bold mx-2 mb-10'>	Add skill </label>
							</div>
							<div className='mt-4'>
								<FormControl fullWidth >
									<InputLabel id="demo-simple-select-label">Username</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										label="Category"
										onChange={handleChange}
									>
										<MenuItem value={'p1'}>{'p1'}</MenuItem>
										<MenuItem value={'p2'}>{'p1'}</MenuItem>
										<MenuItem value={'p3'}>{'p1'}</MenuItem>
									</Select>
								</FormControl>
								<div className='mt-4'>
									<FormControl fullWidth >
										<InputLabel id="demo-simple-select-label">Skills</InputLabel>
										<Select
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											label="Category"
											onChange={handleChange}
										>
											<MenuItem value={'1'}>{'1'}</MenuItem>
											<MenuItem value={'2'}>{'2'}</MenuItem>
											<MenuItem value={'3'}>{'3'}</MenuItem>
										</Select>
									</FormControl>
								</div>

							</div>
							<div className='flex justify-end my-2'>
								<button className="bg-gray-500 hover:bg-gray-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
									ADD SKILL
								</button>
							</div>
						</div>
					</Card> */}
				</div>

			</div>

		</div>

	);
}

export default Employees;