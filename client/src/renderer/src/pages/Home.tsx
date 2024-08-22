import { GraphView } from '@renderer/components/Chart'
import { Card, CardBody } from '@nextui-org/react'
import {
  BiCart,
  BiCrown,
  BiBullseye,
  BiBriefcase,
  BiBadgeCheck,
  BiBarChartAlt2,
} from 'react-icons/bi'
import { IoIosArrowDown } from 'react-icons/io'
import { IoPersonSharp } from 'react-icons/io5'
import { BiSolidMessageDetail } from 'react-icons/bi'
import { IoIosArrowForward } from 'react-icons/io'
import { FaStore } from 'react-icons/fa'
import { FaLongArrowAltUp } from 'react-icons/fa'

import './Home.scss'
import TeamDashboard from '@renderer/components/Dashbord/TeamMember'
import SalesDashboard from '@renderer/components/Dashbord/SalesItem'
import StatsCardGrid from '@renderer/components/Dashbord/StatsItem'

const Home = () => {
  // const cards = [
  //   {
  //     title: 'Ganancias',
  //     value: 0,
  //     icon: <BiBarChartAlt2 />,
  //   },
  //   {
  //     title: 'Stock',
  //     value: 0,
  //     icon: <BiCart />,
  //   },
  //   {
  //     title: 'Pedidos',
  //     value: 0,
  //     icon: <BiBadgeCheck />,
  //   },
  //   {
  //     title: 'Proveedores',
  //     value: 0,
  //     icon: <BiCrown />,
  //   },
  //   {
  //     title: 'Clientes',
  //     value: 0,
  //     icon: <BiBriefcase />,
  //   },

  //   {
  //     title: 'Ventas',
  //     value: 0,
  //     icon: <BiBullseye />,
  //   },
  // ]
  {
    /* {cards.map((item, index) => (
          <Card className='w-full bg-c-card' key={index}>
            <CardBody>
              <span className='dashboardIcon text-c-primary-variant-1 w-fit p-2.5 bg-c-bg-color-2 rounded text-xl'>
                {item.icon}
              </span>
              <div className='flex flex-col'>
                <h3 className='font-medium'>{item.title}</h3>
                <span className='text-small text-default-500'>{item.value}</span>
              </div>
            </CardBody>
          </Card>
        ))} */
  }
  return (
    <div className='flex gap-4 w-full justify-end dashbordsection '>
      <div className='maindashboard flex-grow flex flex-col gap-4 '>
        <div className='homewelcomedashbord w-full rounded-lg py-[30px] px-[40px] flex justify-between items-center '>
          <div className='leftwelcome flex flex-col text-c-title  '>
            <span className='titlewelcome  text-[60px] '> Buen dia Nicolas!</span>

            <span className=' text-c-gray mt-[-10px] font-[500] '>Sabado, Julio 19, 2024</span>
          </div>
          <div className='rigthwelcome flex gap-8'>
            <div className='cardwelcomeselect gap-4 items-center flex'>
              <div className='imageselectwelcome w-[60px] h-[60px] bg-white rounded-lg '></div>
              <div className='midcardselect flex flex-col '>
                <span className=' text-c-gray '>Estas en</span>
                <span className=' text-c-title text-[23px] '>Revolut</span>
              </div>
              <IoIosArrowDown className='text-c-gray text-[30px] cursor-pointer ' />
            </div>
            <div className='separator w-[1px] bg-c-gray '></div>
            <div className='cardwelcomeselect gap-4 items-center flex'>
              <div className='midcardselect flex flex-col '>
                <span className=' text-c-gray '>Grupo</span>
                <span className=' text-c-title text-[23px] '>Vendedores PC 1</span>
              </div>
            </div>
          </div>
        </div>
        <StatsCardGrid />
      </div>
      <div className='columnderdashboard flex flex-col w-[350px]  gap-4'>
        <div className='cardteamdashboard bg-c-card-4 rounded-lg flex flex-col gap-4  p-[20px] '>
          <div className='topcardteamdashbord flex w-full justify-between'>
            <div className='teamdivnavdashbord flex gap-2 items-center justify-center text-[20px] font-[500] cursor-pointer text-c-title '>
              Equipo <IoIosArrowDown />{' '}
            </div>
            <div className='personsinteam flex justify-center items-center gap-1 rounded-xl bg-c-card w-[60px] text-c-title'>
              <IoPersonSharp />
              <span className=' font-[500] '>20</span>
            </div>
          </div>
          <TeamDashboard />
          <div className='bottomteamdashboard flex justify-center items-center'>
            <div className='vertodoteamdashboard flex gap-2 text-c-gray text-[20px] justify-center items-center cursor-pointer '>
              Ver todo <IoIosArrowForward />{' '}
            </div>
          </div>
        </div>
        <div className='cardteamdashboard bg-c-card-4 rounded-lg flex flex-col gap-4  p-[20px] '>
          <div className='topcardteamdashbord flex w-full justify-between'>
            <div className='teamdivnavdashbord flex gap-2 items-center justify-center text-[20px] font-[500] cursor-pointer text-c-title '>
              Mas vendido <IoIosArrowDown />{' '}
            </div>
            <div className='personsinteam flex justify-center cursor-pointer items-center gap-1 rounded-xl bg-c-card  px-[10px] text-c-title'>
              <span className=' font-[500] text-[1rem] '>Mensual</span>
              <IoIosArrowDown />
            </div>
          </div>
          <SalesDashboard />
          <div className='bottomteamdashboard flex justify-center items-center'>
            <div className='vertodoteamdashboard flex gap-2 text-c-gray text-[20px] justify-center items-center cursor-pointer '>
              Ver todo <IoIosArrowForward />{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
