import React from 'react'
import { useMemo } from 'react'

import { useTable, useSortBy } from 'react-table'
import MOCK_DATA from '../MOCK_DATA.json'
import { COLUMNS } from './Columns'

import './Table.css'

const Table = () => {

	const columns = useMemo(() => COLUMNS, [])
	const data = useMemo(() => MOCK_DATA, [])

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable({
		columns,
		data
	},
		useSortBy
	)

	return (

		<table {...getTableProps()} border='1'>
			<thead>
				{headerGroups.map((headerGroup) => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps(column.getSortByToggleProps)}> 
								{column.render('Header')}
								<span>
								<ion-icon name={column.isSorted ? (column.isSortedDesc ? 'caret-down-outline':'caret-up-outline') : 'filter-outline'}></ion-icon>
								</span>
								
								
								</th>
							))}
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map(row => {
						prepareRow(row);
						return(
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
	);
}

export default Table