import React from 'react'
import { BiUser } from 'react-icons/bi'
import { SearchIcon } from '@renderer/components/Icons/SearchIcon'
import {
  Input,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
} from '@nextui-org/react'
import { Role } from '@renderer/features/roleSlice'
import { setRoles } from '@renderer/features/roleSlice'
import { useParams } from 'react-router-dom'
import { CreateRoleModal } from '../Modals/CreateRoleModal'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentRoleId, setInitialUsersRole } from '@renderer/features/roleSlice'
import { reqGetRoletByUnit, reqLoadEmployeeByRole } from '@renderer/api/requests'

export const RoleTable = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = React.useState('')
  const roles = useSelector((state: any) => state.roles)
  const currentRole = roles.data.find((item: Role) => item.id === roles.currentRoleIdEdit)

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const response = await reqGetRoletByUnit(params.id)

        dispatch(setRoles(response.data))

        if (currentRole) {
          const res = await reqLoadEmployeeByRole(currentRole.id)
          dispatch(setInitialUsersRole({ users: res.data }))
        }
      } catch (error) {
        console.log(error)
      }
    }
    loadData()
  }, [])

  const columns = [
    {
      key: 'name',
      label: 'ROLE',
    },
    {
      key: 'users',
      label: 'USERS',
    },
  ]

  const setCurrentRole = async (id: number) => {
    dispatch(setCurrentRoleId(id))
    const res = await reqLoadEmployeeByRole(id)
    dispatch(setInitialUsersRole({ users: res.data }))
  }

  const handleSearch = (e: any) => setSearchTerm(e.target.value)

  const renderCell = React.useCallback((item: any, columnKey: any) => {
    const cellValue = item[columnKey]

    switch (columnKey) {
      case 'users':
        return (
          <div className='flex items-center gap-4'>
            {cellValue?.length || 0}
            <BiUser />
          </div>
        )
      default:
        return cellValue
    }
  }, [])

  return (
    <Table
      className='h-full flex flex-col w-[50%] rounded-md bg-c-bg-color gap-4'
      aria-label='Example table with dynamic content'
      topContentPlacement='outside'
      isHeaderSticky
      defaultSelectedKeys={[String(currentRole?.id)]}
      selectionMode='single'
      topContent={
        <div className='flex justify-between gap-3 items-end'>
          <Input
            isClearable
            radius='sm'
            className='text-c-gray'
            placeholder='Buscar'
            startContent={<SearchIcon />}
            onChange={handleSearch}
          />
          <div className='flex gap-3'>
            <CreateRoleModal />
          </div>
        </div>
      }
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        emptyContent={'Tabla de roles vacía'}
        items={roles.data.filter((item: any) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )}
      >
        {(item: any) => (
          <TableRow key={item.id} onClick={() => setCurrentRole(item.id)}>
            {(columnKey) => (
              <TableCell className='cursor-pointer'>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
