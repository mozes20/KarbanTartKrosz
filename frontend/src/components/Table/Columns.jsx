import { ColumnFilter } from './ColumnFilter'

export const COLUMNS = [
  {
    Header: 'Id',
    accessor: 'id',
    Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: 'First Name',
    accessor: 'first_name',
    Filter: ColumnFilter,
  },
  {
    Header: 'Last Name',
    accessor: 'last_name',
    Filter: ColumnFilter,
  },
  {
    Header: 'E-mail',
    accessor: 'email',
    Filter: ColumnFilter
  },
  {
    Header: 'Job',
    accessor: 'job',
    Filter: ColumnFilter
  },
  {
    Header: 'Phone Number',
    accessor: 'phone_number',
    Filter: ColumnFilter,
  },
]