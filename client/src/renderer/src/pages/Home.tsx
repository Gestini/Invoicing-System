import { Card, CardBody } from '@nextui-org/react'
import DailySalesChart from '@renderer/components/Chart'
import {
  BiCart,
  BiCrown,
  BiBullseye,
  BiBriefcase,
  BiBadgeCheck,
  BiBarChartAlt2
} from 'react-icons/bi'

const Home = () => {
  const cards = [
    {
      title: 'Ganancias',
      value: 0,
      icon: <BiBarChartAlt2 />
    },
    {
      title: 'Stock',
      value: 0,
      icon: <BiCart />
    },
    {
      title: 'Pedidos',
      value: 0,
      icon: <BiBadgeCheck />
    },
    {
      title: 'Proveedores',
      value: 0,
      icon: <BiCrown />
    },
    {
      title: 'Clientes',
      value: 0,
      icon: <BiBriefcase />
    },

    {
      title: 'Ventas',
      value: 0,
      icon: <BiBullseye />
    }
  ]

  return (
    <div className="px-3 py-4 w-full h-full flex flex-col gap-4">
      <h5 className="text-4xl font-semibold text-[#721ff7]">General</h5>
      <div className="flex gap-4">
        {cards.map((item, index) => (
          <Card className="w-full" key={index}>
            <CardBody>
              <span className="dashboardIcon text-[#721ff7] w-fit p-2.5 bg-[#f4f4f5] rounded text-xl">
                {item.icon}
              </span>
              <div className="flex flex-col ">
                <h3 className="font-medium">{item.title}</h3>
                <span className="text-small text-default-500">{item.value}</span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      <DailySalesChart />
    </div>
  )
}

export default Home
