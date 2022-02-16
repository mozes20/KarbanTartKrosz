import React from 'react'
import { useMemo } from 'react'

import { useTable, useGlobalFilter, useSortBy, useFilters, usePagination } from 'react-table'
import MOCK_DATA from '../MOCK_DATA.json'
import { COLUMNS } from './Columns'
import { GlobalFilter } from './GlobalFilter'


const FilteringTable = () => {

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
		state,
		setGlobalFilter,
	} = useTable({
		columns,
		data
	},
		useFilters,
		useGlobalFilter,
		useSortBy,
		usePagination
	)

	const { globalFilter } = state

	return (

		<>
			<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
			<div className='justify-center p-2 flex '>
				<table {...getTableProps()} className='mt-2 text-center mb-4 mx-4 table-auto '>
					<thead className='border-2 border-black'>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{
									headerGroup.headers.map((column) => (
										<th {...column.getHeaderProps(column.getSortByToggleProps)}
											className='border-2 border-black px-5 py-2 hidden 2xl:table-cell'> {column.render('Header')}
											<span>
												<ion-icon name={column.isSorted ? (column.isSortedDesc ? 'caret-down-outline' : 'caret-up-outline') : 'filter-outline'}></ion-icon>
											</span>
											<div>{column.canFilter ? column.render('Filter') : null}</div>
										</th>
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
										return <td {...cell.getCellProps()} className='border-2 border-white p-2 hidden 2xl:table-cell'> {cell.render('Cell')} </td>
									})}
								</tr>
							);
						})
						}
					</tbody>
				</table>
			</div>

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
	);
}

export default FilteringTable