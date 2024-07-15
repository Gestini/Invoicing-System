import React from 'react'
import { useParams } from 'react-router-dom'
import { SlOptions } from 'react-icons/sl'
import { SearchIcon } from '@renderer/components/Icons'
import { useNavigate } from 'react-router-dom'
import { EditWarehouse } from './EditWarehouse'
import { CreateWarehouse } from './CreateWarehouse'
import { ProductTransfer } from './ProductTransfer'
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

  return (
    <>
      <div>
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
              <ProductTransfer />
              <CreateWarehouse results={results} setResults={setResults} />
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
                    className='w-[300px] cursor-pointer h-[200px] p-3 select-none'
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
                    </div>
                  </div>
                </Card>
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
