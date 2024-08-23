import { BiChevronRight } from 'react-icons/bi'
import { IoIosArrowDown } from 'react-icons/io'
import { Card, CardBody, CardFooter, CardHeader, Chip } from '@nextui-org/react'

export const SalesDashboard = () => {
  const salesData = [
    { rank: 1, name: 'Mario Carmen', sales: 200 },
    { rank: 2, name: 'Ana Pérez', sales: 180 },
    { rank: 3, name: 'Luis Gómez', sales: 150 },
  ]

  const getRankClass = (rank) => {
    if (rank == 1) return 'bg-[var(--c-top-1)]'
    if (rank == 2) return 'bg-[var(--c-top-2)]'
    if (rank >= 3) return 'bg-[var(--c-top-3)]'
    return 'bg-bronze'
  }

  return (
    <Card classNames={{ base: 'rounded-lg' }}>
      <CardHeader>
        <div className='flex w-full justify-between'>
          <div className='text-[15px] flex gap-2 items-center justify-center font-[500] cursor-pointer text-c-title '>
            Mas vendido <IoIosArrowDown />
          </div>
          <Chip size='sm' radius='sm'>
            <div className='text-[12px] flex gap-2 items-center justify-center font-[500] cursor-pointer text-c-title-opacity'>
              Mensual <IoIosArrowDown />
            </div>
          </Chip>
        </div>
      </CardHeader>
      <CardBody>
        <div className='rounded-lg flex flex-col gap-4'>
          <div className='flex w-full gap-3 flex-col'>
            {salesData.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className='items-center flex justify-between border-1 border-[#7e828749] p-2 rounded-xl'
              >
                <div className='flex gap-2'>
                  <div
                    className={`${getRankClass(item.rank)} w-[20px] h-[20px] rounded-[6px] flex justify-center items-center text-c-title font-bold text-white`}
                  >
                    {item.rank}
                  </div>
                  <div className='flex justify-center gap-1 flex-col'>
                    <span className='text-c-title font-[500] text-[13px]'>{item.name}</span>
                  </div>
                </div>
                <span className='text-c-gray font-[500] text-[13px]'>{item.sales} ventas</span>
              </div>
            ))}
          </div>
        </div>
      </CardBody>
      <CardFooter className='flex items-center text-center content-center'>
        <div className=' flex gap-2 text-c-title-opacity text-[12px] justify-center items-center content-center cursor-pointer '>
          <span>Ver todo</span>
          <BiChevronRight size={20} />
        </div>
      </CardFooter>
    </Card>
  )
}
