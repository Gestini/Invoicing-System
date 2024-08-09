
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { SlOptions } from 'react-icons/sl'
import { SearchIcon, VerticalDotsIcon } from '@renderer/components/Icons'
import { useNavigate } from 'react-router-dom'
// import { EditWarehouse } from './EditWarehouse'
// import { CreateWarehouse } from './CreateWarehouse'
// import { ProductTransfer } from './ProductTransfer'
import { StockTable } from './StockTable'
import { WarehouseCard } from './WarehouseCard'

import {
  Card,
  Input,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  useDisclosure,
  DropdownTrigger,
} from '@nextui-org/react'
import { reqGetDepositByUnit, reqDeleteDeposit } from '@renderer/api/requests'
import { LocalIcon } from '@renderer/components/Icons/LocalIcon'
import { ErrorIcon } from '@renderer/components/Icons/ErrorIcon'

export const Warehouse = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [results, setResults] = React.useState([])
  const [searchTerm, setSearchTerm] = React.useState('')
  const [currentEdit, setCurrentEdit] = React.useState(-1)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

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

  const handleSearch = (e: any) => setSearchTerm(e.target.value)
  const openWarehouse = (depositId: number) => navigate(`/stock/${params.id}/${depositId}`)

  const handleDelete = async (id) => {
    const auxResults = [...results]
    const wareHouseIndex = results.findIndex((item: any) => item.id == id)
    if (wareHouseIndex == -1) return
    auxResults.splice(wareHouseIndex, 1)
    setResults(auxResults)
    try {
      await reqDeleteDeposit(id)
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = (id) => {
    setCurrentEdit(id)
    onOpen()
  }

  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: 'Productos', content: 'Contenido de Opción 1' },
    { name: 'Stock Pendiente', content: 'Contenido de Opción 2' },
    { name: 'Reposición', content: 'Contenido de Opción 3' },
    { name: 'Ventas', content: 'Contenido de Opción 3' },
    { name: 'Empleados', content: 'Contenido de Opción 3' },
  ];

  const datita = [
    {
      text: 'stock total',
      amount: '100.000'
    },
    {
      text: 'stock total',
      amount: '100.000'
    },
    {
      text: 'stock total',
      amount: '100.000'
    },
    {
      text: 'stock total',
      amount: '100.000'
    },
    {
      text: 'stock total',
      amount: '100.000'
    },
  ]

  return (
    <>
      <div>

        <div className='w-fit'>
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">Select your option</label>
            <select
              id="tabs"
              className="text-gray-900 text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 "
              value={activeTab}
              onChange={(e) => setActiveTab(Number(e.target.value))}
            >
              {tabs.map((tab, index) => (
                <option key={index} value={index}>{tab.name}</option>
              ))}
            </select>
          </div>
          <ul className="hidden border border-c-border text-sm font-medium text-center rounded-lg shadow sm:flex dark:divide-gray-700 text-c-gray w-fit">
            {tabs.map((tab, index) => (
              <li key={index} className="cursor-pointer">
                <span
                  className={`inline-block w-full px-5 py-[6px]  
                ${activeTab === index ? 'text-c-primary-variant-1 bg-c-primary-variant-3 ' : ' hover:text-c-primary-variant-4  bg-transparent hover:bg-c-primary-variant-4'}
                ${index === 0 ? 'rounded-l-lg' : ''}
                ${index === tabs.length - 1 ? 'rounded-r-lg' : ''}`}
                  onClick={() => setActiveTab(index)}
                >
                  {tab.name}
                </span>
              </li>
            ))}
          </ul>

          <div className="my-5 flex flex-wrap gap-2">
            <div className='w-[285px] h-[76px] rounded-[10px] px-[19px] py-[21px] bg-c-primary-variant-3 flex items-center justify-between'>
              <div className='bg-c-primary-variant-2 p-2 rounded-lg'>
                <LocalIcon color={'var(--c-primary-variant-1)'} />
              </div>
              <div className='flex items-center '>
                <div className='flex flex-col '>
                  <span className='text-[24px] h-8 text-white'>General</span>
                  <span className='text-[12px] text-c-gray'>Santa fe</span>
                </div>
                <div>
                  <VerticalDotsIcon className='cursor-pointer text-c-gray ml-[10px]' />
                </div>
              </div>
            </div>

            <div className='w-[285px] h-[76px] rounded-[10px] px-[19px] py-[21px] bg-[#1f2121] flex items-center justify-between'>
              <div className='bg-[#323535] p-2 rounded-lg'>
                <LocalIcon color={'white'} />
              </div>
              <div className='flex items-center gap-[10px]'>
                <div className='flex flex-col '>
                  <span className='text-[24px] h-8 text-white'>Deposito</span>
                  <span className='text-[12px] text-c-gray'>Buenos aires</span>
                </div>
                <div className='h-[37px] w-[35px] ml-1 bg-[#323535] text-white flex items-center justify-center rounded-lg'>
                  01
                </div>
                <div>
                  <VerticalDotsIcon className='cursor-pointer text-c-gray' />
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-wrap gap-[53px] mb-[39px]'>
            {
              datita.map((ele, ind) =>
                <div key={ind}>
                  <p className='flex gap-1 items-center text-c-gray text-[16px]'>
                    {ele.text} <ErrorIcon />
                  </p>
                  <span className='font-semibold text-white text-[24px]'>
                    {ele.amount}
                  </span>
                </div>
              )
            }
          </div>

        </div>
        <div className='flex flex-col w-full mb-2 rounded-md bg-c-bg-color gap-4'>
          <div className='flex justify-between gap-3 items-end'>
            <Input
              isClearable
              onClear={loadData}
              className='text-c-gray'
              placeholder='Buscar por nombre...'
              startContent={<SearchIcon />}
              onChange={handleSearch}
            />
            <div className='flex gap-3'>
              {/* <ProductTransfer /> */}
              {/* <CreateWarehouse results={results} setResults={setResults} /> */}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='flex gap-4 flex-wrap mt-4'>
          {results.length > 0 ? (
            results
              .filter((item: any) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((ele: any, ind: number) => (
                <Card key={ind}>
                  <div
                    onDoubleClick={() => openWarehouse(ele.id)}
                    className='w-[300px] cursor-pointer h-[100px] p-3 select-none'
                  >
                    <div className='flex justify-between items-center'>
                      <h4 className='text-[16px] text-c-title font-semibold'>{ele.name}</h4>
                      <Dropdown placement='bottom-start' className='bg-c-card text-c-title'>
                        <DropdownTrigger>
                          <div>
                            <SlOptions className='text-c-title w-4 h-4 cursor-pointer' />
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
                      {

                      }
                    </div>
                  </div>
                </Card>
              ))
          ) : (
            <p className='text-[16px] text-c-title font-semibold'>No hay resultados.</p>
          )}
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <WarehouseCard />
        <StockTable />
      </div>
      {/* <EditWarehouse
        id={currentEdit}
        isOpen={isOpen}
        results={results}
        onClose={onClose}
        onOpenChange={onOpenChange}
      /> */}
    </>
  )
}