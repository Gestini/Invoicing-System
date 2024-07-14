import React from 'react'
import { useParams } from 'react-router-dom'
import { SlOptions } from 'react-icons/sl'
import { SearchIcon } from '@renderer/components/Icons'
import { useNavigate } from 'react-router-dom'
import { WarehouseData } from './data'
import { EditWarehouse } from './EditWarehouse'
import { CreateWarehouse } from './CreateWarehouse'
import { ProductTransfer } from './ProductTransfer'
import {
  Input,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  useDisclosure,
  DropdownTrigger,
} from '@nextui-org/react'

export const Warehouse = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [results, setResults] = React.useState(WarehouseData)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [currentEdit, setCurrentEdit] = React.useState(-1)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  React.useEffect(() => {
    const filteredData = WarehouseData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setResults(filteredData)
  }, [searchTerm])

  const handleSearch = (e: any) => setSearchTerm(e.target.value)
  const openWarehouse = () => navigate(`/stock/${params.id}`)

  const handleDelete = (id) => {
    const auxResults = [...results]
    const wareHouseIndex = results.findIndex((item) => item.id == id)
    if (wareHouseIndex == -1) return
    auxResults.splice(wareHouseIndex, 1)
    setResults(auxResults)
  }

  const handleEdit = (id) => {
    setCurrentEdit(id)
    onOpen()
  }

  return (
    <>
      <div>
        <div className='flex flex-col w-full mb-2 rounded-md bg-c-bg-color gap-4'>
          <div className='flex justify-between gap-3 items-end'>
            <Input
              isClearable
              onClear={() => setResults(WarehouseData)}
              className='text-c-gray'
              placeholder='Buscar por nombre...'
              startContent={<SearchIcon  />}
              onChange={handleSearch}
            />
            <div className='flex gap-3'>
              <ProductTransfer />
              <CreateWarehouse results={results} setResults={setResults} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='flex gap-2 flex-wrap mt-4'>
          {results.length > 0 ? (
            results.map((ele, ind) => (
              <div
                key={ind}
                onDoubleClick={() => openWarehouse()}
                className='w-[300px] cursor-pointer h-[200px] rounded-lg bg-c-card shadow-md p-3'
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
                      <DropdownItem key='Open' onClick={openWarehouse}>
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
                        Eliminar deposito
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            ))
          ) : (
            <p className='text-[16px] text-c-title font-semibold'>No hay resultados.</p>
          )}
        </div>
      </div>
      <EditWarehouse
        id={currentEdit}
        isOpen={isOpen}
        results={results}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </>
  )
}
