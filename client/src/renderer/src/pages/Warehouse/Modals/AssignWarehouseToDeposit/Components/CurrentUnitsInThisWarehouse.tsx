import React from 'react'
import { MdDelete } from 'react-icons/md'
import { RootState } from '@renderer/store'
import { useSelector } from 'react-redux'
import { reqGetUnitsWithDeposit, reqUnlinkDepositFromUnit } from '@renderer/api/requests'

export const CurrentUnitsInThisWarehouse = ({ sucursalesAsignadas, setSucursalesAsignadas }) => {
  const company = useSelector((state: RootState) => state.currentCompany)
  const warehouse = useSelector((state: RootState) => state.unit.warehouse)

  React.useEffect(() => {
    const loadData = async () => {
      try {
        if (warehouse.currentEditWarehouseId == -1) return
        const response = await reqGetUnitsWithDeposit(company.id, warehouse.currentEditWarehouseId)
        setSucursalesAsignadas(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    loadData()
  }, [])

  const handleClose = (sucursalId: number) => {
    if (warehouse.currentEditWarehouseId == -1) return
    setSucursalesAsignadas(sucursalesAsignadas.filter((sucursal) => sucursal.id !== sucursalId))
    reqUnlinkDepositFromUnit(warehouse.currentEditWarehouseId, sucursalId)
  }

  return (
    <div className='flex gap-3 w-full flex-col'>
      {sucursalesAsignadas.length > 0 && <h3>Sucursales asignadas</h3>}
      <div className='flex gap-2'>
        {sucursalesAsignadas.map((sucursal, index) => (
          <div
            className='flex gap-4 items-center justify-center bg-[#383a3e] rounded-lg p-2 pl-3 pr-3'
            key={index}
          >
            <div className='flex flex-col '>
              <h3 className='text-c-title text-[15px]'>{sucursal.name}</h3>
              <p className='text-c-text opacity-70 text-[13px]'> {sucursal.description}</p>
            </div>
            <div
              onClick={() => handleClose(sucursal.id)}
              className='bg-[#5b4546] p-2 rounded-lg cursor-pointer'
            >
              <MdDelete className='text-[#e97067]' />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
