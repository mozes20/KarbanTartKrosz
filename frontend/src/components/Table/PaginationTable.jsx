import React from 'react'
import { useMemo } from 'react'

import { useTable, useGlobalFilter, usePagination } from 'react-table'
import MOCK_DATA from '../MOCK_DATA.json'
import { COLUMNS } from './Columns'

const PaginationTable = () => {

	const columns = useMemo(() => COLUMNS, [])
	const data = useMemo(() => MOCK_DATA, [])

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		nextPage,
		previousPage,
		canNextPage,
		canPreviousPage,
		prepareRow,
	} = useTable({
		columns,
		data
	},
		usePagination
	)

	return (

		<>
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{
								headerGroup.headers.map((column) => (
									<th {...column.getHeaderProps()}> {column.render('Header')} </th>
								))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map(row => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return <td {...cell.getCellProps()}> {cell.render('Cell')} </td>
								})}
							</tr>
						);
					})
					}
				</tbody>
			</table>
			<div className='flex justify-end'>
				<button onClick={() => previousPage()} disabled={!canPreviousPage}
					className='bg-transparent hover:bg-gray-800 text-black font-semibold 
				hover:text-white py-2 px-4 border border-black hover:border-transparent rounded align-middle
				disabled:text-zinc-500 disabled:border-zinc-500 '>
					Previous
				</button>
				<button onClick={() => nextPage()} disabled={!canNextPage}
					className='bg-transparent hover:bg-gray-800 text-black font-semibold 
				hover:text-white py-2 px-4 ml-4 border border-black hover:border-transparent rounded align-middle
				disabled:text-zinc-500 disabled:border-zinc-500'>
					Next
				</button>
			</div>
		</>
	)
}

export default PaginationTable