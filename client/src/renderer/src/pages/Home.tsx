import { GraphView } from '@renderer/components/Chart'
import Clients from '@renderer/components/Clients'
import { Card, CardBody } from '@nextui-org/react'
import {
  BiCart,
  BiCrown,
  BiBullseye,
  BiBriefcase,
  BiBadgeCheck,
  BiBarChartAlt2,
} from 'react-icons/bi'

const Home = () => {
  const cards = [
    {
      title: 'Ganancias',
      value: 0,
      icon: <BiBarChartAlt2 />,
    },
    {
      title: 'Stock',
      value: 0,
      icon: <BiCart />,
    },
    {
      title: 'Pedidos',
      value: 0,
      icon: <BiBadgeCheck />,
    },
    {
      title: 'Proveedores',
      value: 0,
      icon: <BiCrown />,
    },
    {
      title: 'Clientes',
      value: 0,
      icon: <BiBriefcase />,
    },

    {
      title: 'Ventas',
      value: 0,
      icon: <BiBullseye />,
    },
  ]

  return (
    <>
      <div className='flex gap-4'>
        {cards.map((item, index) => (
          <Card className='w-full bg-c-card' key={index}>
            <CardBody>
              <span className='dashboardIcon text-c-primary w-fit p-2.5 bg-c-bg-color-2 rounded text-xl'>
                {item.icon}
              </span>
              <div className='flex flex-col'>
                <h3 className='font-medium'>{item.title}</h3>
                <span className='text-small text-default-500'>{item.value}</span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      <GraphView />
      <Clients />
    </>
  )
}

export default Home
