import React from 'react'
import { RootState } from '@renderer/store'
import { BiMailIcon } from '../Icons/BiMailIcon'
import { useSelector } from 'react-redux'
import { IoPersonSharp } from 'react-icons/io5'
import { EmployeeModel } from '@renderer/interfaces/employee'
import { BiChevronRight } from 'react-icons/bi'
import { IoIosArrowDown } from 'react-icons/io'
import { reqGetActiveEmployeesByUnitId } from '@renderer/api/requests'
import { Avatar, Badge, Card, CardBody, CardFooter, CardHeader, Chip } from '@nextui-org/react'

const TeamMember = ({ name, role, roleColor }) => {
  return (
    <div className='items-center flex justify-between'>
      <div className='flex gap-2 items-center'>
        <Avatar
          as='button'
          size='sm'
          classNames={{
            icon: 'text-[#ffffff]',
            base: 'bg-[--c-primary]',
          }}
        />
        <div className='flex justify-center gap-1 flex-col'>
          <span className='text-c-title font-[500] text-[13px]'>{name}</span>
          <div
            className={`text-[10px] px-2 flex justify-center items-center rounded-md`}
            style={{ color: roleColor.text, backgroundColor: roleColor.bg }}
          >
            {role}
          </div>
        </div>
      </div>
      <Badge
        color='danger'
        content=''
        showOutline={false}
        shape='circle'
        size='sm'
        classNames={{ badge: 'bg-[#e97067] w-2 h-2 min-w-2 min-h-2' }}
      >
        <BiMailIcon />
      </Badge>
    </div>
  )
}

export const TeamDashboard = () => {
  const unit = useSelector((state: RootState) => state.currentUnit)
  const [initialData, setInitialData] = React.useState<EmployeeModel[]>([])

  React.useEffect(() => {
    reqGetActiveEmployeesByUnitId(unit.id)
      .then((res) => setInitialData(res.data))
      .catch(() => setInitialData([]))
  }, [unit.id])

  return (
    <Card classNames={{ base: 'rounded-lg' }}>
      <CardHeader>
        <div className='flex w-full justify-between'>
          <div className='flex gap-2 items-center justify-center text-[15px] font-[500] cursor-pointer text-c-title '>
            Equipo <IoIosArrowDown />
          </div>
          <Chip size='sm' radius='sm'>
            <div className='flex gap-1 items-center'>
              <IoPersonSharp />
              <span className='font-[500] text-c-title-opacity'>{initialData.length}</span>
            </div>
          </Chip>
        </div>
      </CardHeader>
      <CardBody>
        <div className='rounded-lg flex flex-col gap-4 '>
          <div className='flex w-full h-full gap-3 flex-col'>
            {initialData.slice(0, 3).map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                role='Vendedor'
                roleColor={{ text: '#32ADE6', bg: '#32ade621' }}
              />
            ))}
          </div>
        </div>
      </CardBody>
      <CardFooter className='flex items-center text-center content-center'>
        <div className=' flex gap-2 text-c-title-opacity text-[12px] justify-center items-center content-center cursor-pointer '>
          <span>Ver todo el equipo</span>
          <BiChevronRight size={20} />
        </div>
      </CardFooter>
    </Card>
  )
}
