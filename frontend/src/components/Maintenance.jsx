import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import Stack from '@mui/material/Stack';

const columns = [
	{ id: 'id', label: 'ID', minWidth: 100 },
	{ id: 'device', label: 'Device', minWidth: 170 },
	{ id: 'details', label: 'Details', minWidth: 170 },
	{ id: 'details', label: 'Details', minWidth: 170 },
	{ id: 'status', label: 'Status', minWidth: 100 },
	{ id: 'time', label: 'Time', minWidth: 170 },
];

function createData(id, device, details, status,time) {
	return { id, device, details, status, time };
}

const rows = [
	createData('1', 'Teszt1', 'Karbantartó', "OK", '05:22 pm'),
	createData('2', 'Teszt2', 'Karbantartó', 'OK'),
	createData('3', 'Teszt3', 'Karbantartó', 'OK'),
];

const Maintenance = () => {
	const [value, setValue] = React.useState(new Date());
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

	};
	return (
		<div>
			<div className=' mt-10 justify-center flex '>
				<div className='flex mr-20'>
					<Card className='bg-white p-2 max-h-80'>
						<div>
							<div className='mb-4'>
								<label htmlFor="addskill" className=' text-gray-700 text-sm font-bold mx-2 mb-10'>	Register Malfunction </label>
							</div>
							<div className='mt-4'>
								<TextField label="Device" color='grey' focused />
							</div>
							<div className='mt-4'>
								<TextField label="Details" color='grey' focused />
							</div>
							<div className='mt-4'>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<Stack spacing={3}>
										<DesktopTimePicker
											label="For desktop"
											value={value}
											onChange={(newValue) => {
												setValue(newValue);
											}}
											renderInput={(params) => <TextField {...params} />}
										/>
									</Stack>
								</LocalizationProvider>
							</div>
							<div className='flex justify-end my-2'>
								<button className="bg-gray-500 hover:bg-gray-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
									REGISTER
								</button>
							</div>
						</div>
					</Card>
				</div>

				<div>
					<Paper sx={{ width: '100%', overflow: 'hidden' }} >
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

					</Paper>
				</div>

			</div>

		</div>

	);
}

export default Maintenance;