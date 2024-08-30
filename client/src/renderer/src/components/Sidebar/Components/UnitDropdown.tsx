import { setUnit } from '@renderer/features/currentUnitSlice'
import { BiDoorOpen } from 'react-icons/bi'
import { deleteUnit } from '@renderer/features/unitsSlice'
import { useNavigate } from 'react-router-dom'
import { reqLeaveUnit } from '@renderer/api/requests'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Tooltip } from '@nextui-org/react'

export const UnitDropdown = ({ unitItem, openDropdownId, setOpenDropdownId }) => {
  const navigate = useNavigate()
  const unit = useSelector((state: any) => state.currentUnit)
  const user = useSelector((state: any) => state.user.user)
  const dispatch = useDispatch()

  const handleOpenDropdown = (event: any) => {
    event.preventDefault()
    if (user.id == unitItem.owner.id) return
    setOpenDropdownId(unitItem.id)
  }

  const leaveUnit = async () => {
    try {
      dispatch(deleteUnit(unitItem.id))
      await reqLeaveUnit(unitItem.id)

      if (unitItem.id == unit.id) {
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleNavigate = () => {
    dispatch(setUnit(unitItem))
    navigate(`/dashboard/${unitItem?.id}`)
    dispatch({ type: 'RESET_UNIT_STATE' })
  }

  return (
    <Dropdown
      isOpen={openDropdownId == unitItem.id}
      onClose={() => setOpenDropdownId(null)}
      classNames={{
        content: 'bg-c-sidebar-bg-2',
      }}
    >
      <DropdownTrigger>
        <div
          className={`${unitItem.id == unit.id ? 'rounded-md bg-c-primary-variant-4' : ''
            } transition-all duration-500 ease-in-out flex items-center justify-center h-[32px] w-[32px] cursor-pointer`}
        >
          <Tooltip
            placement='right'
            content={
              <div className='px-1 py-2'>
                <div className='text-small font-bold text-c-title'>{unitItem?.name}</div>
                <div className='text-tiny text-c-title'>{unitItem?.description}</div>
              </div>
            }
            color='secondary'
            classNames={{
              content: 'bg-c-sidebar-bg-2',
            }}
          >
            {/* {
              unitItem.image ?
                <img src={unitItem.image} className='w-[24px] h-[24px]' alt=''>
                </img>
                : */}
                <div
                  onContextMenu={handleOpenDropdown}
                  onClick={handleNavigate}
                  className={`${unitItem.id == unit.id ? 'rounded-full' : 'rounded-full'
                    } transition-all duration-500 ease-in-out w-[24px] h-[24px] uppercase flex items-center justify-center font-semibold text-c-title`}
                >
                  {unitItem.name.slice(0, 2)}
                </div>
            {/* } */}
          </Tooltip>
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label={`Dropdown menu for ${unit.name}`} variant='flat'>
        <DropdownItem
          key='logout'
          className='text-danger'
          color='danger'
          onPress={() => leaveUnit()}
          startContent={<BiDoorOpen className='text-[20px]' />}
        >
          Abandonar unidad
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
