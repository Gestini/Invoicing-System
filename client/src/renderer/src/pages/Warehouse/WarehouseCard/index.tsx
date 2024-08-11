import React from 'react'
import { useParams } from 'react-router-dom'
import { SlOptions } from 'react-icons/sl'
import { EditWarehouse } from '../Modals/EditWarehouse'
import { CreateWarehouse } from '../Modals/CreateWarehouse'
import { useDispatch, useSelector } from 'react-redux'
import {
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  useDisclosure,
  DropdownTrigger,
  Input,
} from '@nextui-org/react'
import { reqGetDepositByUnit, reqDeleteDeposit } from '@renderer/api/requests'
import {
  setWarehouses,
  deleteWarehouse,
  wareHouseInterface,
  setCurrentWarehouseId,
} from '@renderer/features/warehouseSlice'
import { SearchIcon, VerticalDotsIcon } from '@renderer/components/Icons'
import SearchBar from '@renderer/components/SearchBar'
import FilterButton from '@renderer/components/FilterButon'
import { LocalIcon } from '@renderer/components/Icons/LocalIcon'
import { ShortCellValue } from '@renderer/components/AppTable/TableComponents/ShortCellValue'

export const WarehouseCard = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const [currentEdit, setCurrentEdit] = React.useState(-1)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const warehouse: wareHouseInterface = useSelector((state: any) => state.warehouse)
  const currentWarehouseId = warehouse.currentWarehouseId
  const [searchTerm, setSearchTerm] = React.useState('')
  const [results, setResults] = React.useState([])

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const response = await reqGetDepositByUnit(params.id)
        dispatch(setWarehouses(response.data))
      } catch (error) {
        console.log(error)
      }
    }
    loadData()
  }, [])

  const handleSearch = (e: any) => setSearchTerm(e.target.value)

  const openWarehouse = (depositId: number) => dispatch(setCurrentWarehouseId(depositId))

  const handleDelete = async (id) => {
    try {
      dispatch(deleteWarehouse(id))
      await reqDeleteDeposit(id)
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = (id) => {
    setCurrentEdit(id)
    onOpen()
  }

  const loadData = async () => {
    try {
      const response = await reqGetDepositByUnit(params.id)
      setResults(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      <div className='flex gap- flex-col w-full'>
        <div className={`flex items-center justify-between gap-4`}>
          {warehouse.data.length === 0 && (
            <p className='text-foreground-400 align-middle text-center'>
              No tienes depósitos creados.
            </p>
          )}
          {/*  <div className='w-[384px] h-[100%] flex gap-[14px]'>
            <SearchBar />
            <FilterButton />
          </div> */}
        </div>
        <div className='flex gap-4 flex-wrap'>
          {warehouse.data.length > 0 &&
            warehouse.data.map((ele: any, ind: number) => (
              <div
                key={ind}
                onClick={() => openWarehouse(ele.id)}
                className={`${currentWarehouseId == ele.id ? 'bg-c-primary-variant-3' : 'bg-[#1f2121]'}
                w-[285px] h-[76px] rounded-[10px] px-[19px] py-[21px] flex items-center justify-between cursor-pointer`}
              >
                <div
                  className={`${currentWarehouseId == ele.id ? 'bg-c-primary-variant-3' : 'bg-[#323535]'}  p-2 rounded-lg`}
                >
                  <LocalIcon
                    color={`${currentWarehouseId == ele.id ? 'var(--c-primary-variant-1)' : 'white'}`}
                  />
                </div>
                <div className='flex items-center gap-[10px]'>
                  <div className='flex flex-col '>
                    <span className='text-[24px] h-8 text-white'>
                      <ShortCellValue cellValue={ele.name} minLength={10} />
                    </span>
                    <span className='text-[12px] text-c-gray'>Buenos aires</span>
                  </div>
                  {/* <div className='h-[37px] w-[35px] ml-1 bg-[#323535] text-white flex items-center justify-center rounded-lg'>
                    01
                  </div> */}
                  <div>
                    <Dropdown placement='bottom-start' className='bg-c-card text-c-title'>
                      <DropdownTrigger>
                        <div>
                          <VerticalDotsIcon className='cursor-pointer text-c-gray ml-[10px]' />
                        </div>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label='Static Actions'
                        className='text-c-title bg-c-bg-color'
                      >
                        <DropdownItem key='Open' onClick={() => openWarehouse(ele.id)}>
                          Abrir
                        </DropdownItem>
                        <DropdownItem key='Edit' onPress={() => handleEdit(ele.id)}>
                          Editar
                        </DropdownItem>
                        <DropdownItem
                          key='delete'
                          className='text-danger'
                          showDivider={false}
                          color='danger'
                          onPress={() => handleDelete(ele.id)}
                        >
                          Eliminar depósito
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              </div>
            ))}
          <CreateWarehouse />
        </div>
      </div>
      <EditWarehouse
        id={currentEdit}
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </>
  )
}
