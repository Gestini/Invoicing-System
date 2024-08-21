import React from 'react'
import { AppTable } from '@renderer/components/AppTable'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AddItemModal } from '@renderer/components/AppTable/Modals/AddItem'
import { EditItemModal } from '@renderer/components/AppTable/Modals/EditItem'
import { columnsData, modalInputs } from './data'
import { Tabs } from '../../components/tab/Tabs'
import { addItem, editItem, deleteItem, setTableData } from '@renderer/features/tableSlice'
import {
  reqEditEmployee,
  reqDeleteEmployee,
  reqCreateEmployee,
  reqGetEmployeesByUnit,
} from '@renderer/api/requests'

export const EmployeeTable = () => {
  const dispatch = useDispatch()
  const params = useParams()

  React.useEffect(() => {
    const loadData = async () => {
      const response = await reqGetEmployeesByUnit(params.unitId)
      dispatch(setTableData(response.data))
    }
    loadData()
  }, [])

  const tableActions = {
    delete: async (id: any) => {
      try {
        dispatch(deleteItem(id))
        await reqDeleteEmployee(id)
      } catch (error: any) {
        console.log(error)
      }
    },
    create: async (data: any) => {
      try {
        const response = await reqCreateEmployee({
          ...data,
          status: 'PENDING',
          businessUnit: {
            id: params.unitId,
          },
        })
        dispatch(addItem(response.data))
      } catch (error: any) {
        console.log(error)
      }
    },
    edit: async (data: any, currentUserEdit: any) => {
      try {
        dispatch(editItem({ data, id: currentUserEdit?.id }))
        await reqEditEmployee(currentUserEdit?.id, data)
      } catch (error) {
        console.log(error)
      }
    },
  }

  const tabs = [{ name: 'Empleados' }, { name: 'Roles' }, { name: 'Invitaciones' }]

  const newEmployeeModal = {
    title: 'Invitar a un empleado',
    buttonTitle: 'Invitar',
    ...modalInputs,
    action: tableActions.create,
  }

  const editEmployeeModal = {
    title: 'Editar empleado',
    ...modalInputs,
    action: tableActions.edit,
  }

  return (
    <>
      <Tabs tabs={tabs} />
      <div className='flex gap-4 w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 pb-[15px] '>
        <div
          className={` w-[285px] h-[76px] rounded-[10px] flex-shrink-0   flex flex-col justify-center cursor-pointer`}
        >
          <span className=' text-[18px] text-white font-[500]'>Vendedor</span>
          <div className='tarjetaempleados flex gap-4'>
            <p className=' flex justify-center items-center gap-1  text-white  '>
              20 <span className=' text-[#4b4b4b] font-[500] '>Empleados</span>{' '}
            </p>
            <p className=' flex justify-center items-center gap-1  text-white  '>
              20 <span className=' text-[#4b4b4b] font-[500] '>Empleados</span>{' '}
            </p>
          </div>
        </div>
        <div
          className={` w-[285px] h-[76px] rounded-[10px] flex-shrink-0   flex flex-col justify-center cursor-pointer`}
        >
          <span className=' text-[18px] text-white font-[500]'>Vendedor</span>
          <div className='tarjetaempleados flex gap-4'>
            <p className=' flex justify-center items-center gap-1  text-white  '>
              20 <span className=' text-[#4b4b4b] font-[500] '>Empleados</span>{' '}
            </p>
            <p className=' flex justify-center items-center gap-1  text-white  '>
              20 <span className=' text-[#4b4b4b] font-[500] '>Empleados</span>{' '}
            </p>
          </div>
        </div>
        <div
          className={` w-[285px] h-[76px] rounded-[10px] flex-shrink-0   flex flex-col justify-center cursor-pointer`}
        >
          <span className=' text-[18px] text-white font-[500]'>Vendedor</span>
          <div className='tarjetaempleados flex gap-4'>
            <p className=' flex justify-center items-center gap-1  text-white  '>
              20 <span className=' text-[#4b4b4b] font-[500] '>Empleados</span>{' '}
            </p>
            <p className=' flex justify-center items-center gap-1  text-white  '>
              20 <span className=' text-[#4b4b4b] font-[500] '>Empleados</span>{' '}
            </p>
          </div>
        </div>
        <div
          className={` w-[285px] h-[76px] rounded-[10px] flex-shrink-0   flex flex-col justify-center cursor-pointer`}
        >
          <span className=' text-[18px] text-white font-[500]'>Vendedor</span>
          <div className='tarjetaempleados flex gap-4'>
            <p className=' flex justify-center items-center gap-1  text-white  '>
              20 <span className=' text-[#4b4b4b] font-[500] '>Empleados</span>{' '}
            </p>
            <p className=' flex justify-center items-center gap-1  text-white  '>
              20 <span className=' text-[#4b4b4b] font-[500] '>Empleados</span>{' '}
            </p>
          </div>
        </div>
        <div
          className={` w-[285px] h-[76px] rounded-[10px] flex-shrink-0   flex flex-col justify-center cursor-pointer`}
        >
          <span className=' text-[18px] text-white font-[500]'>Vendedor</span>
          <div className='tarjetaempleados flex gap-4'>
            <p className=' flex justify-center items-center gap-1  text-white  '>
              20 <span className=' text-[#4b4b4b] font-[500] '>Empleados</span>{' '}
            </p>
            <p className=' flex justify-center items-center gap-1  text-white  '>
              20 <span className=' text-[#4b4b4b] font-[500] '>Empleados</span>{' '}
            </p>
          </div>
        </div>
      </div>
      <AppTable
        columnsData={columnsData}
        tableActions={tableActions}
        addItemModal={<AddItemModal modal={newEmployeeModal} />}
        editItemModal={<EditItemModal modal={editEmployeeModal} />}
      />
    </>
  )
}
