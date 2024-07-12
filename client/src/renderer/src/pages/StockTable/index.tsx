import React from 'react'
import toast from 'react-hot-toast'
import { setData } from '@renderer/features/tableSlice'
import { AppTable } from '@renderer/components/AppTable'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { useParams } from 'react-router-dom'
import { AddProductModal } from '@renderer/components/AppTable/Modals/ProductAdd'
import { EditProductModal } from '@renderer/components/AppTable/Modals/ProductEdit'
import { useDispatch, useSelector } from 'react-redux'
import { columnsData, modalInputs } from './data'
import { addItem, editItem, deleteItem } from '@renderer/features/tableSlice'
import { reqCreateProduct, reqEditProduct, reqGetProductByUnit } from '@renderer/api/requests'
import { Button } from "@nextui-org/react";
import { SlOptions } from 'react-icons/sl'
import { ChevronDownIcon, PlusIcon, SearchIcon } from '@renderer/components/Icons';
import MultiStepForm from '@renderer/components/CreateCompanyForm';
import { GoArrowSwitch } from "react-icons/go";
import CreateWarehouse from './CreateWarehouse';


export const StockTable = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dispatch = useDispatch()
  const table = useSelector((state: any) => state.table)
  const params = useParams()
  const [searchTerm, setSearchTerm] = React.useState('');
  const data = [
    {
      title: 'Deposito',
      products: [
        {
          name: 'Producto'
        },
        {
          name: 'Producto'
        },
        {
          name: 'Producto'
        },
        {
          name: 'Producto'
        },
        {
          name: 'Producto'
        }
      ]
    },
    {
      title: 'Deposito',
      products: [
        {
          name: 'Producto'
        },
        {
          name: 'Producto'
        },
        {
          name: 'Producto'
        },
        {
          name: 'Producto'
        },
        {
          name: 'Producto'
        }
      ]
    }
  ]
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((ele) =>
    ele.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  React.useEffect(() => {
    const GetProduct = async () => {
      const response = await reqGetProductByUnit(params.id)
      dispatch(setData(response.data))
    }
    GetProduct()
  }, [])

  const tableActions = {
    delete: async (id: any) => {
      try {
        dispatch(deleteItem(id))
        toast.success('Producto eliminado correctamente')
      } catch (error: any) {
        toast.error(error.response.data.message)
      }
    },
    create: async (data: any) => {
      try {
        reqCreateProduct(data)
        dispatch(addItem({ ...data, id: table.data.length }))
        toast.success('Producto guardado correctamente')
      } catch (error: any) {
        toast.error(error.response.data.message)
      }
    },
    edit: async (id: any, data: any) => {
      try {
        reqEditProduct(id, data)
        dispatch(editItem({ data, id: id }))
        toast.success('Producto editado correctamente')
      } catch (error) {
        console.log(error)
      }
    },
  }

  const newUserModal = {
    title: 'Agrega un nuevo producto',
    buttonTitle: 'Agregar',
    ...modalInputs,
    action: tableActions.create,
  }

  const editUserModal = {
    title: 'Editar producto',
    ...modalInputs,
    action: tableActions.edit,
  }



  return (
    <>
      {/* <AppTable
        columnsData={columnsData}
        tableActions={tableActions}
        addItemModal={<AddProductModal modal={newUserModal} />}
        editItemModal={<EditProductModal modal={editUserModal} />}
      /> */}
      <div>

        <div className='flex flex-col w-full mb-2 rounded-md bg-c-bg-color gap-4'>
          <div className='flex justify-between gap-3 items-end'>
          <Input
          isClearable
          className='text-c-gray'
          classNames={{
            base: 'w-full sm:max-w-[44%]',
            inputWrapper: 'border-1',
          }}
          placeholder='Search by name...'
          size='sm'
          startContent={<SearchIcon className='text-c-title' />}
          variant='bordered'
          onChange={handleSearch}
        />
            <div className='flex gap-3'>
              <Button
                onPress={onOpen}
                className='bg-c-primary'
                color='secondary'
                size='sm'
                endContent={<GoArrowSwitch />}
              >
                Traspaso
              </Button>
              <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                  {(onClose) => (
                    <div className='p-10'>
                      <h4 className='text-c-primary font-semibold text-2xl mb-3'>Traspaso de productos</h4>
                      <div className='w-[300px]'>
                        <span>Almacen origen</span>
                        <Input type="email" variant="bordered" />
                        <span>Almacen destino</span>
                        <Input type="text" variant="bordered" />
                        <Button color="primary" className='mt-2  bg-c-primary' >
                          Traspaso
                        </Button>
                      </div>
                    </div>
                  )}
                </ModalContent>
              </Modal>
              <CreateWarehouse />
            </div>
          </div>
        </div>
      </div>

      <div>


        <div className='flex gap-2 flex-wrap mt-4'>
          {filteredData.length > 0 ? (
            filteredData.map((ele, ind) => (
              <div key={ind} className='h-[200px] p-5 w-[300px] rounded-md border-2 border-c-primary'>
                <div className='flex justify-between'>
                  <h4 className='text-c-primary font-semibold text-2xl mb-3'>{ele.title + ' ' + ind}</h4>
                  <SlOptions />
                </div>
                <ul>
                  {ele.products.slice(0, 3).map((item, ind) => (
                    <li key={ind}>{item.name}</li>
                  ))}
                  {ele.products.length > 3 && (
                    <p className='text-blue-500 text-sm underline cursor-pointer mt-3'>
                      Mostrar más productos...
                    </p>
                  )}
                </ul>
              </div>
            ))
          ) : (
            <p>No hay resultados.</p>
          )}
        </div>
      </div>
    </>
  )
}
