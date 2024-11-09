import React from 'react'
import { RootState } from '@renderer/store'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BiChevronRight } from 'react-icons/bi'
import { IoIosArrowDown } from 'react-icons/io'
import { reqGetTopSellers } from '@renderer/api/requests'
import { Card, CardBody, CardFooter, CardHeader, Chip } from '@nextui-org/react'

export const SalesDashboard = () => {
  const [initialData, setInitialData] = React.useState<TopSellers[]>([])
  const unit = useSelector((state: RootState) => state.currentUnit)
  const params = useParams()

  interface TopSellers {
    username: string
    sales: number
  }

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const res = await reqGetTopSellers(unit.id)
        setInitialData(res.data)
      } catch (error) {
        setInitialData([])
      }
    }
    loadData()
  }, [unit.id, params.unitId, params.companyId])

  const getRankClass = (rank: number) => {
    if (rank == 0) return 'bg-[var(--c-top-1)]'
    if (rank == 1) return 'bg-[var(--c-top-2)]'
    if (rank >= 2) return 'bg-[var(--c-top-3)]'
    return 'bg-bronze'
  }

  return (
    <Card classNames={{ base: 'rounded-lg' }}>
      <CardHeader>
        <div className='flex w-full justify-between'>
          <div className='text-[15px] flex gap-2 items-center justify-center font-[500] cursor-pointer text-c-title '>
            Top vendedores <IoIosArrowDown />
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
            {initialData.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className='items-center flex justify-between border-1 border-[#7e828749] p-2 rounded-xl'
              >
                <div className='flex gap-2'>
                  <div
                    className={`${getRankClass(index)} w-[20px] h-[20px] rounded-[6px] flex justify-center items-center text-c-title font-bold text-white`}
                  >
                    {index + 1}
                  </div>
                  <div className='flex justify-center gap-1 flex-col'>
                    <span className='text-c-title font-[500] text-[13px]'>{item.username}</span>
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
